import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrderForm } from '@/components/OrderForm';
import { Product } from '@/types/product';
import Image from 'next/image';

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const productsData: { products: Product[] } = await import('@/data/products.json').then(m => m.default);
  
  const product = productsData.products.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <a href="/" className="text-green-600 hover:text-green-700 font-medium">
              ← Back to Products
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Details */}
            <div>
              <div className="bg-gray-100 rounded-xl overflow-hidden mb-6 h-96 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                    <span className="text-gray-500 line-through">Original price</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Delivery Information</h3>
                  <p className="text-blue-800 text-sm">
                    <strong>Delivery Charge:</strong> ₹{product.deliveryCharge}
                  </p>
                  <p className="text-blue-800 text-sm mt-2">
                    <strong>Availability:</strong> {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Why Order From Us?</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>✓ Fast delivery to your location</li>
                    <li>✓ Ice cold beverages guaranteed</li>
                    <li>✓ Easy tracking with GPS</li>
                    <li>✓ Best prices in town</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div>
              <div className="bg-gray-50 rounded-xl p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Place Your Order</h2>
                <OrderForm product={product} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
