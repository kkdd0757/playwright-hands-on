import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <>
      <h1>Login Page</h1>
      <button type='button' onClick={isLoggedIn ? handleLogout : handleLogin}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
      <button onClick={() => navigate('/product')} type='button' title='return-button'>
        돌아가기
      </button>
    </>
  );
};
