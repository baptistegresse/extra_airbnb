import Product from '@/components/Product/Product';
import Navbar from '@/components/Navbar/Navbar';
import { useCart } from '@/contexts/CartContext';

export default function Home() {
  const { cart, setCart } = useCart();

  return (
    <main>
      <Navbar />
      <Product cart={cart} setCart={setCart} />
    </main>
  );
}
