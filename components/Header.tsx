import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-green-600">🥤</div>
          <span className="text-xl font-bold text-gray-800">Drink Delivery</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-green-600 transition">
            Home
          </Link>
          <a href="#about" className="text-gray-600 hover:text-green-600 transition">
            About
          </a>
          <a href="#contact" className="text-gray-600 hover:text-green-600 transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
