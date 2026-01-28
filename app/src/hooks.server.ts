import type { Handle } from '@sveltejs/kit';
import { compare } from 'bcryptjs';

const unauthorized = () =>
	new Response('Unauthorized', {
		status: 401,
		headers: {
			'WWW-Authenticate': 'Basic realm="CCTV"'
		}
	});

export const handle: Handle = async ({ event, resolve }) => {
	const username = process.env.AUTH_USER;
	const passwordHash = process.env.AUTH_PASS_HASH;

	if (!username || !passwordHash) {
		return resolve(event);
	}

	const authHeader = event.request.headers.get('authorization');
	if (!authHeader?.startsWith('Basic ')) {
		return unauthorized();
	}

	const token = authHeader.slice('Basic '.length);
	const decoded = Buffer.from(token, 'base64').toString('utf-8');
	const [user, pass] = decoded.split(':');

	if (!user || !pass || user !== username) {
		return unauthorized();
	}

	const ok = await compare(pass, passwordHash);
	if (!ok) {
		return unauthorized();
	}

	return resolve(event);
};
