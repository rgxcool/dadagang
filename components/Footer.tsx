export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Drink Delivery</h3>
            <p className="text-gray-400">Your favorite beverages delivered to your door.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          <div id="contact">
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <p className="text-gray-400">📞 +1 (555) 123-4567</p>
            <p className="text-gray-400 mt-2">📧 support@drinkdelivery.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Drink Delivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
