import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const body = (await readBody(event)) as { email: string; password: string };

	const client = await serverSupabaseClient(event);

	try {
		const response = await client.from('profiles').select('*').eq('email', body.email).single();

		setCookie(event, 'user-uuid', response?.data?.id, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});

		return { user: response.data };
	} catch (err) {}
});
