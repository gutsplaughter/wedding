import { CFP_COOKIE_MAX_AGE } from './constants';
import { sha256, getCookieKeyValue } from './utils';

export async function onRequestPost(context: {
  request: Request;
  env: { CFP_PASSWORD?: string };
}): Promise<Response> {
  const { request, env } = context;
  const body = await request.formData();
  const { password, redirect } = Object.fromEntries(body);
  const hashedPassword = await sha256(password.toString());
  const allowedPasswords = (env.CFP_PASSWORD || '').split(',').map(p => p.trim());

  let valid = false;
  let matchedPassword = '';
  for (const allowed of allowedPasswords) {
    if (hashedPassword === await sha256(allowed)) {
      valid = true;
      matchedPassword = allowed;
      break;
    }
  }

  const redirectPath = redirect.toString() || '/';

  if (valid) {
    // Valid password. Redirect to home page and set cookie with auth hash.
    const cookieKeyValue = await getCookieKeyValue(matchedPassword);

    return new Response('', {
      status: 302,
      headers: {
        'Set-Cookie': `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path=/; HttpOnly; Secure`,
        'Cache-Control': 'no-cache',
        Location: redirectPath
      }
    });
  } else {
    // Invalid password. Redirect to login page with error.
    return new Response('', {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache',
        Location: `${redirectPath}?error=1`
      }
    });
  }
}
