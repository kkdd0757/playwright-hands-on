import { useNavigate } from 'react-router-dom';

export const HomePage = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <>
      <h1>hello</h1>
      <button onClick={() => navigate('/product')} type='button' title='return-button'>
        product 페이지로 이동
      </button>
    </>
  );
};
