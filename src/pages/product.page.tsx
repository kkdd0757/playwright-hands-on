import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUser } from '../common/isUser';

import './product.css';

export const ProductPage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useMemo(isUser, []);
  const isMobile = useMemo(() => window.innerWidth <= 480, []);

  const price = isLoggedIn ? '15,900 원' : '37,800 원';
  const discount = isLoggedIn ? '50% 할인' : null;

  const handleClickCartButton = (): void => {
    if (isLoggedIn) navigate('/cart');
    else navigate('/login');
  };

  return (
    <>
      <div className={`product-card ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className={`product-image ${isMobile ? 'mobile' : 'desktop'}`}>이미지 영역</div>
        <div className='product-info'>
          <h2>playwright 테스트</h2>
          <p className='price'>
            {price} {discount && <span className='discount'>{discount}</span>}
          </p>
          <button className='add-to-cart' onClick={handleClickCartButton}>
            장바구니 담기
          </button>
        </div>
      </div>
      {(!isMobile || isOpen) && (
        <p className='description' data-testid='description'>
          playwright란,,,? <br />
          주요 특징: 다중 브라우저 지원: Chromium(Chrome), Firefox, WebKit(Safari) 등의 브라우저에서
          테스트를 실행할 수 있습니다. 자동화된 테스트: 사용자 인터페이스와 상호작용(클릭, 입력,
          탐색 등)을 자동화하고, 이를 통해 기능적 테스트를 수행할 수 있습니다. 크로스 플랫폼: 다양한
          운영 체제(Windows, macOS, Linux)에서 동일한 테스트 스크립트를 실행할 수 있습니다.
        </p>
      )}
      {isMobile && (
        <button
          className='view-details'
          onClick={() => setIsOpen(prev => !prev)}
          data-testid='view-details-button'
        >
          설명 {isOpen ? '가리기' : '보기'}
        </button>
      )}
    </>
  );
};
