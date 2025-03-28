
"use client";
import { Scale, Github, Twitter, Linkedin } from 'lucide-react';
export default function Footer() {
  return <>

    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#press" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#help" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#guides" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#security" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest features and releases.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <Scale className="w-8 h-8 text-primary" />
              <span className="text-xl font-semibold">Turtle Justice</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#github" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#linkedin" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400">
            © {new Date().getFullYear()} Turtle Justice. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </>
}
