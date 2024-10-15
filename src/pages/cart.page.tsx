import { useNavigate } from 'react-router-dom';

export const CartPage = (): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Cart Page</h1>
      <button onClick={() => navigate('/product')} type='button' title='return-button'>
        돌아가기
      </button>
    </>
  );
};
