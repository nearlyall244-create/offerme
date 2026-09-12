export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { supabaseAdmin } = await import('../_lib/supabaseAdmin.js')

      const { category, search, page = 1, limit = 20 } = req.query
      const offset = (page - 1) * limit

      let query = supabaseAdmin
        .from('shops')
        .select('*', { count: 'exact' })
        .eq('is_active', true)

      if (category) {
        query = query.eq('category', category)
      }

      if (search) {
        query = query.ilike('shop_name', `%${search}%`)
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

    if (req.method === 'PUT') {
      const { verifyToken } = await import('../_lib/verifyToken.js')
      const { supabaseAdmin } = await import('../_lib/supabaseAdmin.js')

      const authResult = await verifyToken(req)
      if (authResult.error) {
        return res.status(authResult.status).json({ error: authResult.error })
      }

      const { decodedToken } = authResult
      const { hasRole } = await import('../_lib/resolveRole.js')
      const isAdmin = decodedToken.email === 'nearlyall244@gmail.com'
      const isVendor = await hasRole(supabaseAdmin, decodedToken.uid, 'vendor')
      if (!isAdmin && !isVendor) {
        return res.status(403).json({ error: 'Forbidden: vendor or admin role required' })
      }

      const { shop_id, ...updateFields } = req.body
      if (!shop_id) {
        return res.status(400).json({ error: 'shop_id is required' })
      }

      const { data: shop, error: fetchError } = await supabaseAdmin
        .from('shops')
        .select('vendor_id')
        .eq('id', shop_id)
        .single()

      if (fetchError || !shop) {
        return res.status(404).json({ error: 'Shop not found' })
      }

      if (!isAdmin && shop.vendor_id !== decodedToken.uid) {
        return res.status(403).json({ error: 'Forbidden: you do not own this shop' })
      }

      const allowed = ['shop_name', 'category', 'phone_number', 'email', 'address', 'logo_url']
      const filtered = {}
      for (const key of allowed) {
        if (updateFields[key] !== undefined) filtered[key] = updateFields[key]
      }

      if (Object.keys(filtered).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' })
      }

      const { data, error } = await supabaseAdmin
        .from('shops')
        .update(filtered)
        .eq('id', shop_id)
        .select()
        .single()

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.status(200).json({ shop: data })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
