import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	// Validation logic
	if (!body.title || !body.price || !body.category) {
		throw createError({ statusCode: 400, message: 'Missing required fields' });
	}

	const sellerID = getCookie(event, 'user-uuid');

	const client = await serverSupabaseClient(event);

	const { data, error } = await client
		.from('listings')
		.insert({
			seller_id: sellerID,
			title: body.title,
			description: body.description,
			price: body.price,
			subject: body.subject,
			category: body.category,
			condition: body.condition,
			image_url: body.image_url,
			status: 'available',
		})
		.select()
		.single();

	if (error) throw createError({ statusCode: 500, message: error.message });

	return data;
});
