import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  
  // Validation logic
  if (!body.title || !body.price || !body.category) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  // Walled Garden Check (Example)
  if (!user.email?.endsWith('.edu') && !user.email?.includes('school')) {
     // Optional: throw createError({ statusCode: 403, message: 'Only school emails allowed' })
  }

  const client = await serverSupabaseClient(event)

  const { data, error } = await client.from('listings').insert({
    seller_id: user.id,
    title: body.title,
    description: body.description,
    price: body.price,
    subject: body.subject,
    category: body.category,
    condition: body.condition,
    image_url: body.image_url,
    status: 'available'
  }).select().single()

  if (error) throw createError({ statusCode: 500, message: error.message })

  return data
})
