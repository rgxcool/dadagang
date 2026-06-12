'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        
        <div className="space-y-1 text-sm text-gray-600 mb-4 flex-grow">
          <p><span className="font-semibold text-gray-700">Price:</span> ₹{product.price}</p>
          <p><span className="font-semibold text-gray-700">Delivery:</span> ₹{product.deliveryCharge}</p>
          <p>
            <span className="font-semibold text-gray-700">Stock:</span> {' '}
            <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </p>
        </div>
        
        <Link href={`/order/${product.id}`} className="w-full">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
            disabled={product.stock === 0}
          >
            Order Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
