'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-' + Date.now();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Order Placed Successfully! 🎉
          </h1>

          <p className="text-xl text-gray-600 mb-2">
            Thank you for your order!
          </p>

          <p className="text-gray-600 mb-8">
            Your delicious beverages are on their way. We&apos;ve sent a confirmation email to your registered email address.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <p className="text-gray-600 mb-2">Order ID</p>
            <p className="text-2xl font-bold text-green-600 font-mono">{orderId}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Location</h3>
              <p className="text-gray-600 text-sm">Follow your order in real-time using GPS</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-3xl mb-2">⏱️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Expected Time</h3>
              <p className="text-gray-600 text-sm">Check your email for estimated delivery time</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 text-sm">Contact us at support@drinkdelivery.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/" className="inline-block w-full md:w-auto">
              <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8">
                Order More Drinks
              </Button>
            </Link>
            
            <div>
              <p className="text-gray-600">
                Questions?{' '}
                <a href="mailto:support@drinkdelivery.com" className="text-green-600 hover:text-green-700 font-medium">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
