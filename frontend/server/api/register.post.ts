import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const body = (await readBody(event)) as {
		id: string;
		firstname: string;
		lastname: string;
		email: string;
		password: string;
	};

	const newUUID = crypto.randomUUID();

	const client = await serverSupabaseClient(event);

	try {
		const response = await client.from('profiles').insert({
			id: newUUID,
			firstname: body.firstname,
			lastname: body.lastname,
			email: body.email,
		});

		return response;
	} catch (err) {
		console.error(err);
	}
});
