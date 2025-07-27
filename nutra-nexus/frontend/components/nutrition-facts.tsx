interface NutritionFactsProps {
  nutrition?: {
    servingSize?: string
    servingsPerContainer?: string
    calories?: number
    totalFat?: number
    saturatedFat?: number
    transFat?: number
    cholesterol?: number
    sodium?: number
    totalCarbohydrate?: number
    dietaryFiber?: number
    totalSugars?: number
    addedSugars?: number
    protein?: number
    vitaminD?: number
    calcium?: number
    iron?: number
    potassium?: number
    vitaminA?: number
    vitaminB6?: number
    vitaminB9?: number
    vitaminC?: number
    vitaminE?: number
    magnesium?: number
    zinc?: number
    phosphorus?: number
  }
}

export default function NutritionFacts({ nutrition }: NutritionFactsProps) {
  // Default values based on FARELABS lab report (per 30g serving)
  const defaultNutrition = {
    servingSize: "30g (1 scoop)",
    servingsPerContainer: "9",
    calories: Math.round(581.03 * 0.3), // 174 kcal per 30g serving
    totalFat: Math.round(41.79 * 0.3 * 10) / 10, // 12.5g per serving
    saturatedFat: Math.round(6.35 * 0.3 * 10) / 10, // 1.9g per serving
    transFat: 0,
    cholesterol: Math.round(4.73 * 0.3 * 10) / 10, // 1.4mg per serving
    sodium: Math.round(104.4 * 0.3), // 31mg per serving
    totalCarbohydrate: Math.round(22.59 * 0.3 * 10) / 10, // 6.8g per serving
    dietaryFiber: Math.round(2.0 * 0.3 * 10) / 10, // 0.6g per serving
    totalSugars: Math.round(18.88 * 0.3 * 10) / 10, // 5.7g per serving
    addedSugars: 0,
    protein: Math.round(28.64 * 0.3 * 10) / 10, // 8.6g per serving
    vitaminD: 0, // ND in lab report
    calcium: Math.round(194.45 * 0.3), // 58mg per serving
    iron: Math.round(10.66 * 0.3 * 10) / 10, // 3.2mg per serving
    potassium: Math.round(570.84 * 0.3), // 171mg per serving
    vitaminA: Math.round(114.23 * 0.3), // 34mcg per serving
    vitaminB6: Math.round(0.53 * 0.3 * 100) / 100, // 0.16mg per serving
    vitaminB9: Math.round(6.36 * 0.3 * 10) / 10, // 1.9mcg per serving
    vitaminC: Math.round(21.89 * 0.3 * 10) / 10, // 6.6mg per serving
    vitaminE: Math.round(3.87 * 0.3 * 10) / 10, // 1.2mg per serving
    magnesium: Math.round(169.82 * 0.3), // 51mg per serving
    zinc: Math.round(3.524 * 0.3 * 10) / 10, // 1.1mg per serving (converted from mg/kg)
    phosphorus: Math.round(1322.08 * 0.3), // 397mg per serving
  }

  const finalNutrition = { ...defaultNutrition, ...nutrition }

  return (
    <div className="max-w-md rounded-lg border p-6 bg-white shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Nutrition Facts</h2>
      <div className="mb-2 border-b-2 border-black pb-1">
        <p className="text-sm">
          <span className="font-semibold">Serving Size:</span> {finalNutrition.servingSize}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Servings Per Container:</span> {finalNutrition.servingsPerContainer}
        </p>
      </div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p className="font-bold">Calories</p>
          <p className="font-bold">{finalNutrition.calories}</p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-1 text-right text-xs">% Daily Value*</div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p>
            <span className="font-bold">Total Fat</span> {finalNutrition.totalFat}g
          </p>
          <p>{Math.round((finalNutrition.totalFat / 78) * 100)}%</p>
        </div>
        <div className="flex justify-between pl-4">
          <p>Saturated Fat {finalNutrition.saturatedFat}g</p>
          <p>{Math.round((finalNutrition.saturatedFat / 20) * 100)}%</p>
        </div>
        <div className="pl-4">
          <p>Trans Fat {finalNutrition.transFat}g</p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p>
            <span className="font-bold">Cholesterol</span> {finalNutrition.cholesterol}mg
          </p>
          <p>{Math.round((finalNutrition.cholesterol / 300) * 100)}%</p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p>
            <span className="font-bold">Sodium</span> {finalNutrition.sodium}mg
          </p>
          <p>{Math.round((finalNutrition.sodium / 2300) * 100)}%</p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p>
            <span className="font-bold">Total Carbohydrate</span> {finalNutrition.totalCarbohydrate}g
          </p>
          <p>{Math.round((finalNutrition.totalCarbohydrate / 275) * 100)}%</p>
        </div>
        <div className="flex justify-between pl-4">
          <p>Dietary Fiber {finalNutrition.dietaryFiber}g</p>
          <p>{Math.round((finalNutrition.dietaryFiber / 28) * 100)}%</p>
        </div>
        <div className="pl-4">
          <p>Total Sugars {finalNutrition.totalSugars}g</p>
        </div>
        <div className="flex justify-between pl-8">
          <p>Includes {finalNutrition.addedSugars}g Added Sugars</p>
          <p>{finalNutrition.addedSugars > 0 ? Math.round((finalNutrition.addedSugars / 50) * 100) : 0}%</p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p>
            <span className="font-bold">Protein</span> {finalNutrition.protein}g
          </p>
          <p>{Math.round((finalNutrition.protein / 50) * 100)}%</p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p>Vitamin D {finalNutrition.vitaminD}mcg</p>
          <p>{finalNutrition.vitaminD > 0 ? Math.round((finalNutrition.vitaminD / 20) * 100) : 0}%</p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p>Calcium {finalNutrition.calcium}mg</p>
          <p>{Math.round((finalNutrition.calcium / 1300) * 100)}%</p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p>Iron {finalNutrition.iron}mg</p>
          <p>{Math.round((finalNutrition.iron / 18) * 100)}%</p>
        </div>
      </div>

      <div className="border-b border-gray-300 py-1">
        <div className="flex justify-between">
          <p>Potassium {finalNutrition.potassium}mg</p>
          <p>{Math.round((finalNutrition.potassium / 4700) * 100)}%</p>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-semibold">Additional Vitamins & Minerals</h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex justify-between">
            <p>Vitamin A</p>
            <p>
              {finalNutrition.vitaminA} mcg ({Math.round((finalNutrition.vitaminA / 900) * 100)}%)
            </p>
          </div>
          <div className="flex justify-between">
            <p>Vitamin B6</p>
            <p>
              {finalNutrition.vitaminB6} mg ({Math.round((finalNutrition.vitaminB6 / 1.7) * 100)}%)
            </p>
          </div>
          <div className="flex justify-between">
            <p>Vitamin B9 (Folate)</p>
            <p>
              {finalNutrition.vitaminB9} mcg ({Math.round((finalNutrition.vitaminB9 / 400) * 100)}%)
            </p>
          </div>
          <div className="flex justify-between">
            <p>Vitamin C</p>
            <p>
              {finalNutrition.vitaminC} mg ({Math.round((finalNutrition.vitaminC / 90) * 100)}%)
            </p>
          </div>
          <div className="flex justify-between">
            <p>Vitamin E</p>
            <p>
              {finalNutrition.vitaminE} mg ({Math.round((finalNutrition.vitaminE / 15) * 100)}%)
            </p>
          </div>
          <div className="flex justify-between">
            <p>Magnesium</p>
            <p>
              {finalNutrition.magnesium} mg ({Math.round((finalNutrition.magnesium / 420) * 100)}%)
            </p>
          </div>
          <div className="flex justify-between">
            <p>Zinc</p>
            <p>
              {finalNutrition.zinc} mg ({Math.round((finalNutrition.zinc / 11) * 100)}%)
            </p>
          </div>
          <div className="flex justify-between">
            <p>Phosphorus</p>
            <p>
              {finalNutrition.phosphorus} mg ({Math.round((finalNutrition.phosphorus / 1250) * 100)}%)
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-600">
        * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000
        calories a day is used for general nutrition advice.
      </p>

      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-xs text-green-800">
          <span className="font-semibold">Lab Verified:</span> All nutritional values verified by FARELABS Pvt. Ltd., a
          certified testing laboratory. Report Date: June 24, 2025 | Batch: N20250619-001-001
        </p>
      </div>
    </div>
  )
}
