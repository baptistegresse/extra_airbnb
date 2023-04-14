import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/contexts/constant';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/router';

const Cart = () => {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const router = useRouter();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    Object.keys(cart).forEach((productId) => {
      const product = products.find((p) => p.id === parseInt(productId));
      const quantity = cart[productId];
      totalPrice += quantity * parseFloat(product.price.substring(1));
    });
    return totalPrice.toFixed(2);
  };

  const sendEmail = () => {
    const emailData = {
      cart_items: Object.keys(cart).map((productId) => {
        const product = products.find((p) => p.id === parseInt(productId));
        const quantity = cart[productId];
        return `${product.name} - Quantité: ${quantity} - Prix unitaire: ${product.price}`;
      }),
      total_price: `$${calculateTotalPrice()}`,
      payment_method: paymentMethod === 'cash' ? 'Espèces' : 'Carte de crédit',
    };

    emailjs
      .send(
        'service_i99d3zk',
        'template_yt6sk3b',
        emailData,
        process.env.NEXT_PUBLIC_YOUR_EMAILJS_API_KEY
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          router.push('/waiting');
        },
        (error) => {
          console.log('FAILED...', error);
          alert('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
        }
      );
  };

  const handleOrder = () => {
    sendEmail();
  };

  const isCartEmpty = Object.keys(cart).length === 0;

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-2xl font-bold mb-6 sticky top-0 bg-white">
          Récapitulatif du panier
        </h1>
        {isCartEmpty ? (
          <p className="font-medium text-xl">Panier vide</p>
        ) : (
          <>
            <div className="space-y-4">
              {Object.keys(cart).map((productId) => {
                const product = products.find(
                  (p) => p.id === parseInt(productId)
                );
                const quantity = cart[productId];

                return (
                  <div
                    key={productId}
                    className="bg-beige p-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="font-medium text-base">
                        Prix unitaire: {product.price}
                      </p>
                    </div>
                    <p className="font-medium text-xl">
                      Quantité: {quantity}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <p className="font-medium text-xl">
                Prix total: ${calculateTotalPrice()}
              </p>
            </div>
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-2">Espèces</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="radio"
                      className="form-radio"
                      name="paymentMethod"
                      value="creditCard"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-2">Carte de crédit</span>
                  </label>
                </div>
                <div className="mt-6">
                  <button
                    className="bg-marron w-full py-2 text-white font-medium rounded"
                    onClick={handleOrder}
                  >
                    Valider la commande
                  </button>
                </div>
              </>
            )}
          </div>
        </>
  );
}        
     
export default Cart;