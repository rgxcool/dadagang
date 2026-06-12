import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { Product } from '@/types/product';

export default async function Home() {
  const productsData: { products: Product[] } = await import('@/data/products.json').then(m => m.default);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
                Refresh Your Day with Cold Drinks
              </h1>
              <p className="text-xl text-gray-600 mb-8 text-pretty">
                Fast delivery of your favorite beverages right to your door
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">🚀</p>
                  <p className="text-sm text-gray-600">Quick Delivery</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">❄️</p>
                  <p className="text-sm text-gray-600">Ice Cold</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">💰</p>
                  <p className="text-sm text-gray-600">Best Prices</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Our Products
              </h2>
              <p className="text-gray-600">Choose from our selection of refreshing beverages</p>
            </div>
            <ProductGrid products={productsData.products} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
