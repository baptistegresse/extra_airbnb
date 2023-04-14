import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();

  return (
    <>
      <div className="w-screen h-12 flex items-center justify-around bg-marron fixed z-30">
        <Link href="./">
          <p className="text-lg font-medium text-black">La Maison d'Albatre</p>
        </Link>
        <Link href="/cart">
        <img src="https://cdn-icons-png.flaticon.com/512/118/118089.png" height={20} width={20} />
        </Link>
      </div>
    </>
  );
}

