"use client"

import { Check, Circle } from "lucide-react"

export default function ComparisonTable() {
  const features = [
    { name: "Vitamins", nutriPro: true, multivitamins: true, proteinPowders: false, energyDrinks: false },
    { name: "Minerals", nutriPro: true, multivitamins: true, proteinPowders: false, energyDrinks: false },
    { name: "Dry Fruit Blend", nutriPro: true, multivitamins: false, proteinPowders: false, energyDrinks: false },
    { name: "Protein", nutriPro: true, multivitamins: false, proteinPowders: true, energyDrinks: false },
    { name: "Antioxidants", nutriPro: true, multivitamins: false, proteinPowders: false, energyDrinks: false },
    {
      name: "Natural Sweeteners",
      nutriPro: true,
      multivitamins: false,
      proteinPowders: false,
      energyDrinks: false,
    },
    { name: "No Added Sugar", nutriPro: true, multivitamins: false, proteinPowders: false, energyDrinks: false },
    { name: "Energy Booster", nutriPro: true, multivitamins: false, proteinPowders: false, energyDrinks: true },
    { name: "Immunity Support", nutriPro: true, multivitamins: true, proteinPowders: false, energyDrinks: false },
    { name: "Brain Health", nutriPro: true, multivitamins: false, proteinPowders: false, energyDrinks: false },
    {
      name: "Digestive Enzymes",
      nutriPro: true,
      multivitamins: false,
      proteinPowders: false,
      energyDrinks: false,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white text-sm font-medium rounded-full shadow-lg">
              Comparison
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent">
            NutriPro+ vs. Other Supplements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how our all-natural <span className="font-semibold text-[#1b4332]">NutriPro+</span> compares to other
            supplements on the market
          </p>
        </div>

        <div
          id="full-comparison"
          className="block overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 md:p-4 text-left border-b dark:border-gray-700">Feature</th>
                <th className="p-2 md:p-4 text-center border-b bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white">
                  <div className="font-bold">NutriPro+</div>
                </th>
                <th className="p-2 md:p-4 text-center border-b dark:border-gray-700">
                  <div className="font-medium">Multivitamins</div>
                </th>
                <th className="p-2 md:p-4 text-center border-b dark:border-gray-700">
                  <div className="font-medium">Protein Powders</div>
                </th>
                <th className="p-2 md:p-4 text-center border-b dark:border-gray-700">
                  <div className="font-medium">Energy Drinks</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "dark:bg-gray-900"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200`}
                >
                  <td className="p-2 md:p-4 border-b font-medium dark:border-gray-700">{feature.name}</td>
                  <td className="p-2 md:p-4 border-b text-center bg-[#1b4332]/5 dark:bg-[#2d6a4f]/20 dark:border-gray-700">
                    {feature.nutriPro ? (
                      <Check className="h-6 w-6 text-green-600 dark:text-green-500 mx-auto" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-2 md:p-4 border-b text-center dark:border-gray-700">
                    {feature.multivitamins ? (
                      <Check className="h-6 w-6 text-green-600 dark:text-green-500 mx-auto" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-2 md:p-4 border-b text-center dark:border-gray-700">
                    {feature.proteinPowders ? (
                      <Check className="h-6 w-6 text-green-600 dark:text-green-500 mx-auto" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-2 md:p-4 border-b text-center dark:border-gray-700">
                    {feature.energyDrinks ? (
                      <Check className="h-6 w-6 text-green-600 dark:text-green-500 mx-auto" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block p-6 bg-gradient-to-r from-[#1b4332]/10 to-[#2d6a4f]/10 rounded-2xl">
            <p className="text-[#1b4332] font-semibold">
              NutriPro+ is the only supplement that provides complete nutrition from 100% natural sources
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
