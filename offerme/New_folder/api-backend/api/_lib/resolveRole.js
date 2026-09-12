export async function resolveRole(supabaseAdmin, firebaseUid) {
  const roles = []

  const { data: customer } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('firebase_uid', firebaseUid)
    .maybeSingle()

  if (customer) roles.push('customer')

  const { data: shop } = await supabaseAdmin
    .from('shops')
    .select('id')
    .eq('vendor_id', firebaseUid)
    .maybeSingle()

  if (shop) roles.push('vendor')

  return roles
}

export async function hasRole(supabaseAdmin, firebaseUid, requiredRole) {
  if (requiredRole === 'admin') return false
  const roles = await resolveRole(supabaseAdmin, firebaseUid)
  return roles.includes(requiredRole)
}
