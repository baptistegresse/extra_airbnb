import '@/styles/globals.css'
import { CartProvider } from '@/contexts/CartContext';

function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default App;

