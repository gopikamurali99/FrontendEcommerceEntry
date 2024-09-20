import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white-200 text-gray-900 py-8">
      <div className="container mx-auto px-4 border-t border-gray-700 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Vogue Vista</h3>
            <p className="text-sm">
              Vogue Vista is your go-to destination for the latest trends in fashion and accessories.
              We offer a wide range of clothing to elevate your style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/shop" className="hover:text-white">Shop</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="/returns" className="hover:text-white">Returns & Exchanges</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-900" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i> {/* Facebook Icon */}
              </a>
              <a href="https://twitter.com" className="hover:text-gray-900" aria-label="Twitter">
                <i className="fab fa-twitter"></i> {/* Twitter Icon */}
              </a>
              <a href="https://instagram.com" className="hover:text-gray-950" aria-label="Instagram">
                <i className="fab fa-instagram"></i> {/* Instagram Icon */}
              </a>
              <a href="https://pinterest.com" className="hover:text-gray-900" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i> {/* Pinterest Icon */}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8  pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Vogue Vista. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
