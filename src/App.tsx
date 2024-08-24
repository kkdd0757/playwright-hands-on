import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CartPage } from './pages/cart.page';
import { HomePage } from './pages/home.page';
import { LoginPage } from './pages/login.page';
import { ProductPage } from './pages/product.page';

import './App.css';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/product' element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
