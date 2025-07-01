export function getToken(): string | null {
  return typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;
}

export function clearToken() {
  localStorage.removeItem('token');
}
