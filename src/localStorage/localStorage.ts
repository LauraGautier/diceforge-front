export function addRefreshTokenToLocalStorage(
  refreshToken: string,
  user: {
    userId: number;
    lastname: string;
    firstname: string;
    image: string;
  }
) {
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
}

export function getRefreshTokenFromLocalStorage() {
  const refreshToken = localStorage.getItem('refreshToken')!;
  const user = JSON.parse(localStorage.getItem('user')!);

  return { refreshToken, user };
}


export function resetLocalStorage() {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}