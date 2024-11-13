// Footer.js

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-medium text-black font-custom">NftmetA</h2>
            <p className="text-gray-400 max-w-xs">
              Discover and trade unique digital assets with confidence and ease on our NFT marketplace.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold text-white">Explore</h3>
              <a href="#" className="text-gray-400 hover:text-white">Marketplace</a>
              <a href="#" className="text-gray-400 hover:text-white">Collections</a>
              <a href="#" className="text-gray-400 hover:text-white">Trending</a>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <a href="#" className="text-gray-400 hover:text-white">About Us</a>
              <a href="#" className="text-gray-400 hover:text-white">Careers</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()}<span className="text-3xl font-medium font-custom">NftmetA</span>. All rights reserved.<br></br>
          additonal rights reserved by <span className="text-3xl font-medium font-custom">BlackmetA.api by -- </span><span className="font-medium text-3xl">Amit Sakpal</span>
        </div>
      </div>
    </footer>
  );
}
