const REDIRECT_URI = 'http://localhost:3000';
const API_ROOT = `${REDIRECT_URI}/api/v2`;

export async function getAppId() {
  const response = await fetch(
    `${API_ROOT}/oauth/yandex/service-id?redirect_uri=${REDIRECT_URI}`
  );
  const {
    data: { service_id },
  } = await response.json();
  return service_id;
}

export function getRedirectUri() {
  return REDIRECT_URI;
}

export async function doLoginWithCode(code: string) {
  const response = await fetch(`${API_ROOT}/oauth/yandex`, {
    method: 'POST',
    body: JSON.stringify({
      code,
      redirect_uri: `${REDIRECT_URI}`,
    }),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  // TODO check "already logged in error"
  return response;
}

export function logoutUser() {
  return fetch(`${API_ROOT}/auth/logout`, {
    method: 'POST',
  });
}

export async function getMe() {
  const response = await fetch(`${API_ROOT}/auth/user`, {
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}
