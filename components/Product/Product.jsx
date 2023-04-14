import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import products from  '../../contexts/constant'

export default function Product() {
  const { cart, setCart, productList, setProductList } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setProductList(productList);
  }, [productList]);

  const addToCart = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId]) {
        newCart[productId] += quantity;
      } else {
        newCart[productId] = quantity;
      }
      return newCart;
    });
  
    setProductList((prevProductList) => {
      const updatedProductList = prevProductList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity - quantity };
        }
        return product;
      });
      return updatedProductList;
    });
    setQuantities({});
  };  

  const handleImageClick = (product) => (e) => {
    e.preventDefault();
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity = Math.min(
        Math.max(currentQuantity + change, 1),
        productList.find((p) => p.id === productId).quantity
      );
      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productList.map((product) => (
              <div key={product.id} className="group relative">
                <a href="#" onClick={handleImageClick(product)}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                </a>
                <div className="flex justify-between mt-1 w-full">
                  <div>
                    <p className="text-lg font-medium text-gray-900">{product.price}</p>
                    <p className="text-sm font-medium text-gray-500">{product.quantity} restant(s)</p>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="px-3 py-1 text-sm font-medium text-black bg-white border-r border-gray-300 rounded-l"
                      disabled={product.quantity <= 0}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-medium text-black bg-white border-gray-300 flex">
                      {quantities[product.id] || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="px-3 py-1 text-sm font-medium text-black bg-white border-l border-gray-300 rounded-r"
                      disabled={product.quantity <= 0}
                    >
                      +
                    </button>
                    <button
                      onClick={() => addToCart(product.id, quantities[product.id] || 1)}
                      className={`ml-2 px-5 text-sm font-medium text-black bg-marron rounded ${product.quantity <= 0 ? 'opacity-50 cursor-not-allowed' : 'text-black'}`}
                      disabled={product.quantity <= 0}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
                {selectedProduct === product && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded">
                      <button onClick={closePopup} className="float-right">
                        X
                      </button>
                      <p>{product.imageAlt}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}  