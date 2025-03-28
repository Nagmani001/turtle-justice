"use client";
import { Scale } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function NavBar() {
  return <div>
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Scale className="w-8 h-8 text-primary" />
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">Turtle Justice</span>
            <div className="hidden md:flex items-center ml-10 space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">Pricing</a>
              <a href="#docs" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">Documentation</a>
              <a href="#blog" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">Blog</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <SignInButton>
              <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors px-4 py-2"
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </nav>
  </div>
}
