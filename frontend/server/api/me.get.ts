import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		const uid = getCookie(event, 'user-uuid');

		const response = await client.from('profiles').select('*').eq('id', uid!).single();

		return { user: response.data };
	} catch (err) {}
});
