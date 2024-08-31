export const isUser = (): boolean => {
  return localStorage.getItem('isLoggedIn') === 'true';
};
