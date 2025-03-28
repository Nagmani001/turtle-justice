
"use client";
import { features, stats } from "../data";

export default function Pitch() {
  return <>

    <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary">{stat.number}</div>
              <div className="mt-2 text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Empowering Legal Access Through Technology
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Our AI-powered platform makes legal assistance accessible to everyone in Nepal.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white text-center">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
}
