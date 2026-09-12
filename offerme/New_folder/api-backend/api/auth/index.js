export default async function handler(req, res) {
  try {
  const { action } = req.query

  if (action === 'get-profile') {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }
    try {
      const { verifyToken } = await import('../_lib/verifyToken.js')
      const { supabaseAdmin } = await import('../_lib/supabaseAdmin.js')

      const authResult = await verifyToken(req)
      if (authResult.error) {
        return res.status(authResult.status).json({ error: authResult.error })
      }

      const uid = authResult.decodedToken.uid

      const { data: customer } = await supabaseAdmin
        .from('customers')
        .select('*')
        .eq('firebase_uid', uid)
        .maybeSingle()

      if (customer) {
        return res.status(200).json({ role: 'customer', profile: customer })
      }

      const { data: shop } = await supabaseAdmin
        .from('shops')
        .select('*')
        .eq('vendor_id', uid)
        .maybeSingle()

      if (shop) {
        return res.status(200).json({ role: 'vendor', profile: shop })
      }

      return res.status(200).json({ role: null, profile: null })
    } catch (err) {
      console.error('[auth] get-profile error:', err)
      return res.status(500).json({ error: err.message || String(err) })
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (action === 'signup-customer') {
    try {
      const { verifyToken } = await import('../_lib/verifyToken.js')
      const { setCustomClaims } = await import('../_lib/firebaseAdmin.js')
      const { supabaseAdmin } = await import('../_lib/supabaseAdmin.js')

      const authResult = await verifyToken(req)
      if (authResult.error) {
        return res.status(authResult.status).json({ error: authResult.error })
      }

      const { decodedToken } = authResult
      const uid = decodedToken.uid
      const body = req.body || {}
      const { name, phone_number } = body

      console.log('[auth] signup-customer uid=' + uid)

      const { data: existing, error: existErr } = await supabaseAdmin
        .from('customers')
        .select('id')
        .eq('firebase_uid', uid)
        .maybeSingle()

      console.log('[auth] existing:', existing, 'existErr:', existErr)

      if (existErr) {
        return res.status(500).json({ error: `Lookup error: ${existErr.message}` })
      }

      if (existing) {
        return res.status(200).json({ message: 'Customer already exists', customer: existing })
      }

      const { data, error } = await supabaseAdmin
        .from('customers')
        .insert({
          firebase_uid: uid,
          name: name || decodedToken.name || null,
          phone_number: phone_number || null,
          email: decodedToken.email || null,
        })
        .select()
        .single()

      console.log('[auth] insert data:', data, 'error:', error)

      if (error) {
        return res.status(500).json({ error: `Insert error: ${error.message}` })
      }

      try {
        await setCustomClaims(uid, { role: 'customer' })
      } catch (claimErr) {
        return res.status(201).json({
          message: 'Customer profile created (role claim pending)',
          customer: data,
          warning: claimErr.message,
        })
      }

      return res.status(201).json({ message: 'Customer profile created', customer: data })
    } catch (err) {
      console.error('[auth] signup-customer error:', err)
      return res.status(500).json({ error: err.message || String(err) })
    }
  }

  if (action === 'signup-vendor') {
    try {
      const { verifyToken } = await import('../_lib/verifyToken.js')
      const { setCustomClaims } = await import('../_lib/firebaseAdmin.js')
      const { supabaseAdmin } = await import('../_lib/supabaseAdmin.js')

      const authResult = await verifyToken(req)
      if (authResult.error) {
        return res.status(authResult.status).json({ error: authResult.error })
      }

      const { decodedToken } = authResult
      const uid = decodedToken.uid
      const body = req.body || {}
      const { shop_name, category, phone_number, email, address } = body

      if (!shop_name) {
        return res.status(400).json({ error: 'shop_name is required' })
      }

      const { data: existing, error: existErr } = await supabaseAdmin
        .from('shops')
        .select('id')
        .eq('vendor_id', uid)
        .maybeSingle()

      if (existErr) {
        return res.status(500).json({ error: `Lookup error: ${existErr.message}` })
      }

      if (existing) {
        return res.status(200).json({ message: 'Shop already exists', shop: existing })
      }

      const { data, error } = await supabaseAdmin
        .from('shops')
        .insert({
          vendor_id: uid,
          shop_name,
          category: category || null,
          phone_number: phone_number || null,
          email: email || decodedToken.email || null,
          address: address || null,
        })
        .select()
        .single()

      if (error) {
        return res.status(500).json({ error: `Insert error: ${error.message}` })
      }

      try {
        await setCustomClaims(uid, { role: 'vendor' })
      } catch (claimErr) {
        return res.status(201).json({
          message: 'Vendor shop created (role claim pending)',
          shop: data,
          warning: claimErr.message,
        })
      }

      return res.status(201).json({ message: 'Vendor shop created', shop: data })
    } catch (err) {
      console.error('[auth] signup-vendor error:', err)
      return res.status(500).json({ error: err.message || String(err) })
    }
  }

  return res.status(404).json({ error: `Unknown action: ${action}` })
  } catch (err) {
    console.error('[auth] outer error:', err)
    return res.status(500).json({ error: err.message || String(err) })
  }
}
