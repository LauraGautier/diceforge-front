export function addAccessTokenToSessionStorage(accessToken: string) {
  sessionStorage.setItem('accessToken', accessToken);
}

export function getAccessTokenFromSessionStorage() {
  const accessToken = sessionStorage.getItem('accessToken');

  return { accessToken };
}

export function resetSessionStorage() {
  sessionStorage.removeItem('accessToken');
}