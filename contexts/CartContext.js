import { createContext, useContext, useState } from 'react';
import { products } from './constant';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [productList, setProductList] = useState(products);

  return (
    <CartContext.Provider value={{ cart, setCart, productList, setProductList }}>
      {children}
    </CartContext.Provider>
  );
};