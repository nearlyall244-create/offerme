export default async function handler(req, res) {
  try {
    const { verifyToken } = await import('../_lib/verifyToken.js')
    const { supabaseAdmin } = await import('../_lib/supabaseAdmin.js')

    const authResult = await verifyToken(req)
    if (authResult.error) {
      return res.status(authResult.status).json({ error: authResult.error })
    }

    const { decodedToken } = authResult

    const isAdmin = decodedToken.email === 'nearlyall244@gmail.com'
    if (!isAdmin) {
      return res.status(403).json({ error: 'Forbidden: admin role required' })
    }

    // ── GET ?type=shops → list shops / GET ?type=offers → list offers ──
    if (req.method === 'GET') {
      const { type, status, page = 1, limit = 20 } = req.query
      const offset = (page - 1) * limit

      if (type === 'shops') {
        let query = supabaseAdmin
          .from('shops')
          .select('*', { count: 'exact' })

        if (status === 'active') {
          query = query.eq('is_active', true)
        } else if (status === 'inactive') {
          query = query.eq('is_active', false)
        }

        const { data, count, error } = await query
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1)

        if (error) {
          return res.status(500).json({ error: error.message })
        }

        return res.status(200).json({
          shops: data,
          total: count,
          page: Number(page),
          limit: Number(limit),
        })
      }

      if (type === 'offers') {
        let query = supabaseAdmin
          .from('offers')
          .select('*, shops(shop_name, vendor_id)', { count: 'exact' })

        if (status === 'active') {
          query = query.eq('is_active', true)
        } else if (status === 'inactive') {
          query = query.eq('is_active', false)
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

      return res.status(400).json({ error: 'type=shops or type=offers is required' })
    }

    // ── PUT → admin toggles shop active/inactive ──
    if (req.method === 'PUT') {
      const { shop_id } = req.body
      if (!shop_id) {
        return res.status(400).json({ error: 'shop_id is required' })
      }

      const { data: shop, error: fetchError } = await supabaseAdmin
        .from('shops')
        .select('id, is_active, shop_name')
        .eq('id', shop_id)
        .single()

      if (fetchError || !shop) {
        return res.status(404).json({ error: 'Shop not found' })
      }

      const newStatus = !shop.is_active
      const { data, error } = await supabaseAdmin
        .from('shops')
        .update({ is_active: newStatus })
        .eq('id', shop_id)
        .select()
        .single()

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      await supabaseAdmin.from('admin_logs').insert({
        admin_uid: decodedToken.uid,
        action: newStatus ? 'activate_shop' : 'deactivate_shop',
        target_type: 'shop',
        target_id: String(shop_id),
        details: { shop_name: shop.shop_name, is_active: newStatus },
      })

      return res.status(200).json({
        message: newStatus ? 'Shop activated' : 'Shop deactivated',
        shop: data,
      })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
