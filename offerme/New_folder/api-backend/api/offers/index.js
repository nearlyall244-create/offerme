export default async function handler(req, res) {
  try {
    const { supabaseAdmin } = await import('../_lib/supabaseAdmin.js')

    // ── GET → public offers list ──
    if (req.method === 'GET') {
      const { category, shop_id, search, page = 1, limit = 20 } = req.query
      const offset = (page - 1) * limit

      let query = supabaseAdmin
        .from('offers')
        .select('*, shops(shop_name, category, logo_url)', { count: 'exact' })
        .eq('is_active', true)

      if (shop_id) {
        query = query.eq('shop_id', shop_id)
      }

      if (category) {
        query = query.eq('shops.category', category)
      }

      if (search) {
        query = query.ilike('title', `%${search}%`)
      }

      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.status(200).json({
        offers: data,
        total: count,
        page: Number(page),
        limit: Number(limit),
      })
    }

    // ── POST → create, claim, or redeem ──
    if (req.method === 'POST') {
      const { verifyToken } = await import('../_lib/verifyToken.js')
      const { hasRole } = await import('../_lib/resolveRole.js')
      const { action } = req.query

      const authResult = await verifyToken(req)
      if (authResult.error) {
        return res.status(authResult.status).json({ error: authResult.error })
      }

      const { decodedToken } = authResult
      const uid = decodedToken.uid

      // POST ?action=claim → customer claims an offer
      if (action === 'claim') {
        if (!(await hasRole(supabaseAdmin, uid, 'customer'))) {
          return res.status(403).json({ error: 'Forbidden: customer role required' })
        }

        const { offer_id } = req.body
        if (!offer_id) {
          return res.status(400).json({ error: 'offer_id is required' })
        }

        const { data: offer, error: offerError } = await supabaseAdmin
          .from('offers')
          .select('id, is_active, valid_until')
          .eq('id', offer_id)
          .single()

        if (offerError || !offer) {
          return res.status(404).json({ error: 'Offer not found' })
        }

        if (!offer.is_active) {
          return res.status(400).json({ error: 'Offer is no longer active' })
        }

        if (offer.valid_until && new Date(offer.valid_until) < new Date()) {
          return res.status(400).json({ error: 'Offer has expired' })
        }

        const { data: customer, error: custError } = await supabaseAdmin
          .from('customers')
          .select('id')
          .eq('firebase_uid', uid)
          .single()

        if (custError || !customer) {
          return res.status(404).json({ error: 'Customer profile not found. Sign up as customer first.' })
        }

        const { data: existing } = await supabaseAdmin
          .from('offer_redemptions')
          .select('id')
          .eq('offer_id', offer_id)
          .eq('customer_id', customer.id)
          .maybeSingle()

        if (existing) {
          return res.status(400).json({ error: 'You have already claimed this offer' })
        }

        const { data, error } = await supabaseAdmin
          .from('offer_redemptions')
          .insert({ offer_id, customer_id: customer.id })
          .select()
          .single()

        if (error) {
          return res.status(500).json({ error: error.message })
        }

        return res.status(201).json({ message: 'Offer claimed', redemption: data })
      }

      // POST ?action=redeem → vendor marks a redemption as redeemed
      if (action === 'redeem') {
        if (!(await hasRole(supabaseAdmin, uid, 'vendor'))) {
          return res.status(403).json({ error: 'Forbidden: vendor role required' })
        }

        const { redemption_id } = req.body
        if (!redemption_id) {
          return res.status(400).json({ error: 'redemption_id is required' })
        }

        const { data: redemption, error: fetchError } = await supabaseAdmin
          .from('offer_redemptions')
          .select('id, offer_id, offers(shop_id, shops(vendor_id))')
          .eq('id', redemption_id)
          .single()

        if (fetchError || !redemption) {
          return res.status(404).json({ error: 'Redemption not found' })
        }

        if (redemption.offers?.shops?.vendor_id !== uid) {
          return res.status(403).json({ error: 'Forbidden: you do not own this shop' })
        }

        if (redemption.redeemed_at) {
          return res.status(400).json({ error: 'Redemption already redeemed' })
        }

        const { data, error } = await supabaseAdmin
          .from('offer_redemptions')
          .update({ redeemed_at: new Date().toISOString() })
          .eq('id', redemption_id)
          .select()
          .single()

        if (error) {
          return res.status(500).json({ error: error.message })
        }

        return res.status(200).json({ message: 'Offer redeemed', redemption: data })
      }

      // POST (no action) → vendor creates an offer
      if (!(await hasRole(supabaseAdmin, uid, 'vendor'))) {
        return res.status(403).json({ error: 'Forbidden: vendor role required' })
      }

      const { shop_id, title, description, discount_percent, coupon_code, image_url, valid_from, valid_until } = req.body

      if (!shop_id || !title) {
        return res.status(400).json({ error: 'shop_id and title are required' })
      }

      const { data: shop, error: fetchError } = await supabaseAdmin
        .from('shops')
        .select('vendor_id')
        .eq('id', shop_id)
        .single()

      if (fetchError || !shop) {
        return res.status(404).json({ error: 'Shop not found' })
      }

      if (shop.vendor_id !== uid) {
        return res.status(403).json({ error: 'Forbidden: you do not own this shop' })
      }

      const { data, error } = await supabaseAdmin
        .from('offers')
        .insert({
          shop_id,
          title,
          description: description || null,
          discount_percent: discount_percent || null,
          coupon_code: coupon_code || null,
          image_url: image_url || null,
          valid_from: valid_from || null,
          valid_until: valid_until || null,
        })
        .select()
        .single()

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.status(201).json({ offer: data })
    }

    // ── PUT → vendor updates an offer ──
    if (req.method === 'PUT') {
      const { verifyToken } = await import('../_lib/verifyToken.js')
      const { hasRole } = await import('../_lib/resolveRole.js')

      const authResult = await verifyToken(req)
      if (authResult.error) {
        return res.status(authResult.status).json({ error: authResult.error })
      }

      const { decodedToken } = authResult
      const uid = decodedToken.uid

      if (!(await hasRole(supabaseAdmin, uid, 'vendor'))) {
        return res.status(403).json({ error: 'Forbidden: vendor role required' })
      }

      const { offer_id, ...updateFields } = req.body
      if (!offer_id) {
        return res.status(400).json({ error: 'offer_id is required' })
      }

      const { data: offer, error: fetchError } = await supabaseAdmin
        .from('offers')
        .select('shop_id, shops(vendor_id)')
        .eq('id', offer_id)
        .single()

      if (fetchError || !offer) {
        return res.status(404).json({ error: 'Offer not found' })
      }

      if (offer.shops?.vendor_id !== uid) {
        return res.status(403).json({ error: 'Forbidden: you do not own this offer' })
      }

      const allowed = ['title', 'description', 'discount_percent', 'coupon_code', 'image_url', 'valid_from', 'valid_until']
      const filtered = {}
      for (const key of allowed) {
        if (updateFields[key] !== undefined) filtered[key] = updateFields[key]
      }

      if (Object.keys(filtered).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' })
      }

      const { data, error } = await supabaseAdmin
        .from('offers')
        .update(filtered)
        .eq('id', offer_id)
        .select()
        .single()

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.status(200).json({ offer: data })
    }

    // ── DELETE → vendor deactivates an offer ──
    if (req.method === 'DELETE') {
      const { verifyToken } = await import('../_lib/verifyToken.js')
      const { hasRole } = await import('../_lib/resolveRole.js')

      const authResult = await verifyToken(req)
      if (authResult.error) {
        return res.status(authResult.status).json({ error: authResult.error })
      }

      const { decodedToken } = authResult
      const uid = decodedToken.uid

      if (!(await hasRole(supabaseAdmin, uid, 'vendor'))) {
        return res.status(403).json({ error: 'Forbidden: vendor role required' })
      }

      const { offer_id } = req.body
      if (!offer_id) {
        return res.status(400).json({ error: 'offer_id is required' })
      }

      const { data: offer, error: fetchError } = await supabaseAdmin
        .from('offers')
        .select('shop_id, shops(vendor_id)')
        .eq('id', offer_id)
        .single()

      if (fetchError || !offer) {
        return res.status(404).json({ error: 'Offer not found' })
      }

      if (offer.shops?.vendor_id !== uid) {
        return res.status(403).json({ error: 'Forbidden: you do not own this offer' })
      }

      const { data, error } = await supabaseAdmin
        .from('offers')
        .update({ is_active: false })
        .eq('id', offer_id)
        .select()
        .single()

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.status(200).json({ message: 'Offer deactivated', offer: data })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
