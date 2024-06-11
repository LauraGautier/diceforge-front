export function addTokenToLocalStorage() {
  localStorage.setItem('bonjour', 'bonjour');
}

export function getTokenFromLocalStorage() {
  const jwt = localStorage.getItem('jwt');

  return { jwt };
}
