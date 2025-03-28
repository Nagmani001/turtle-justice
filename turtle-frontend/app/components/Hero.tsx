
"use client";
import { SignUpButton } from "@clerk/clerk-react";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return <div>
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight sm:text-6xl md:text-7xl">
            <span className="block dark:text-white">Legal Assistance</span>
            <span className="block text-[#2D6BF6] mt-2">Powered by AI</span>
          </h1> <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
            Experience the future of legal support with our AI-powered platform. Get instant access to Nepal's legal resources and expert guidance at your fingertips. </p>
          <div className="mt-10 flex justify-center gap-4">
            <SignUpButton>
              <button className="bg-[#2D6BF6] text-white px-6 py-3 rounded-lg hover:bg-[#2D6BF6]/90 transition-colors flex items-center" >
                Try It Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </SignUpButton>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="dark:text-white">
                View Demo
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

}
