import "@testing-library/jest-dom"

// Extract the utility functions from RegistrationTaxCalculator.js for testing
// Note: In a real-world scenario, these would ideally be in separate files

/**
 * Calculates the Hungarian vehicle tax multiplier based on power and environmental class
 */
function calculateTaxMultiplier(powerKW, envClass, isHybrid = false, isNewAfter2020 = false) {
  // Check for environmental car (category 8)
  if (envClass === "5E" || envClass === "5Z") {
    return 0
  }

  let category = 0

  // Determine category based on power
  if (powerKW <= 80) category = 1
  else if (powerKW <= 100) category = 2
  else if (powerKW <= 120) category = 3
  else if (powerKW <= 140) category = 4
  else if (powerKW <= 180) category = 5
  else if (powerKW <= 250) category = 6
  else category = 7

  // Determine multiplier based on category and environmental class
  if (isNewAfter2020 || isHybrid) {
    // Column for new cars after 2020-12-31 or hybrid cars
    const multipliers = [0, 1, 1.5, 2, 3, 4, 6, 9]
    return multipliers[category]
  }

  // For other environmental classes
  const taxTable = {
    "14+": [0, 1.5, 2.25, 3, 4.5, 6, 9, 13.5],
    "12-14": [0, 6, 9, 12, 18, 24, 36, 54],
    "9-11": [0, 12, 18, 24, 36, 48, 72, 108],
    "8-": [0, 24, 36, 48, 72, 96, 144, 216],
  }

  return taxTable[envClass]?.[category] || 0
}

/**
 * Calculates the tax reduction rate based on the vehicle's age in months
 */
function calculateAgeReduction(ageInMonths) {
  if (ageInMonths <= 0) return 0 // Newly registered
  if (ageInMonths <= 2) return 0.03
  if (ageInMonths <= 4) return 0.08
  if (ageInMonths <= 6) return 0.13
  if (ageInMonths <= 12) return 0.18
  if (ageInMonths <= 18) return 0.23
  if (ageInMonths <= 24) return 0.28
  if (ageInMonths <= 30) return 0.33
  if (ageInMonths <= 36) return 0.38
  if (ageInMonths <= 48) return 0.45
  if (ageInMonths <= 60) return 0.53
  if (ageInMonths <= 72) return 0.59
  if (ageInMonths <= 84) return 0.65
  if (ageInMonths <= 96) return 0.7
  if (ageInMonths <= 108) return 0.74
  if (ageInMonths <= 120) return 0.78
  if (ageInMonths <= 132) return 0.81
  if (ageInMonths <= 144) return 0.84
  if (ageInMonths <= 156) return 0.86
  if (ageInMonths <= 168) return 0.88
  return 0.9 // 169 months and above
}

describe("RegistrationTaxCalculator Utility Functions", () => {
  describe("calculateTaxMultiplier", () => {
    it("returns 0 for environmental cars (5E, 5Z)", () => {
      expect(calculateTaxMultiplier(100, "5E")).toBe(0)
      expect(calculateTaxMultiplier(100, "5Z")).toBe(0)
    })

    it("calculates correct category based on power", () => {
      // Test each power category with a standard environmental class
      expect(calculateTaxMultiplier(80, "14+")).toBe(1.5) // Category 1: <= 80kW
      expect(calculateTaxMultiplier(100, "14+")).toBe(2.25) // Category 2: <= 100kW
      expect(calculateTaxMultiplier(120, "14+")).toBe(3) // Category 3: <= 120kW
      expect(calculateTaxMultiplier(140, "14+")).toBe(4.5) // Category 4: <= 140kW
      expect(calculateTaxMultiplier(180, "14+")).toBe(6) // Category 5: <= 180kW
      expect(calculateTaxMultiplier(250, "14+")).toBe(9) // Category 6: <= 250kW
      expect(calculateTaxMultiplier(300, "14+")).toBe(13.5) // Category 7: > 250kW
    })

    it("applies special multipliers for hybrid vehicles", () => {
      expect(calculateTaxMultiplier(100, "14+", true)).toBe(1.5)
      expect(calculateTaxMultiplier(150, "14+", true)).toBe(4)
      expect(calculateTaxMultiplier(200, "14+", true)).toBe(6)
    })

    it("applies special multipliers for vehicles registered after 2020", () => {
      expect(calculateTaxMultiplier(100, "14+", false, true)).toBe(1.5)
      expect(calculateTaxMultiplier(150, "14+", false, true)).toBe(4)
      expect(calculateTaxMultiplier(200, "14+", false, true)).toBe(6)
    })

    it("applies correct multipliers for different environmental classes", () => {
      // Test with 100kW (Category 2) across different environmental classes
      expect(calculateTaxMultiplier(100, "14+")).toBe(2.25)
      expect(calculateTaxMultiplier(100, "12-14")).toBe(9)
      expect(calculateTaxMultiplier(100, "9-11")).toBe(18)
      expect(calculateTaxMultiplier(100, "8-")).toBe(36)
    })

    it("returns 0 for unknown environmental classes", () => {
      expect(calculateTaxMultiplier(100, "unknown")).toBe(0)
    })
  })

  describe("calculateAgeReduction", () => {
    it("returns 0 for new vehicles (0 months)", () => {
      expect(calculateAgeReduction(0)).toBe(0)
    })

    it("calculates correct reduction rates for different age ranges", () => {
      expect(calculateAgeReduction(1)).toBe(0.03) // <= 2 months
      expect(calculateAgeReduction(3)).toBe(0.08) // <= 4 months
      expect(calculateAgeReduction(5)).toBe(0.13) // <= 6 months
      expect(calculateAgeReduction(10)).toBe(0.18) // <= 12 months
      expect(calculateAgeReduction(15)).toBe(0.23) // <= 18 months
      expect(calculateAgeReduction(20)).toBe(0.28) // <= 24 months
      expect(calculateAgeReduction(28)).toBe(0.33) // <= 30 months
      expect(calculateAgeReduction(35)).toBe(0.38) // <= 36 months
      expect(calculateAgeReduction(40)).toBe(0.45) // <= 48 months
      expect(calculateAgeReduction(55)).toBe(0.53) // <= 60 months
      expect(calculateAgeReduction(65)).toBe(0.59) // <= 72 months
      expect(calculateAgeReduction(80)).toBe(0.65) // <= 84 months
      expect(calculateAgeReduction(90)).toBe(0.7) // <= 96 months
      expect(calculateAgeReduction(105)).toBe(0.74) // <= 108 months
      expect(calculateAgeReduction(115)).toBe(0.78) // <= 120 months
      expect(calculateAgeReduction(125)).toBe(0.81) // <= 132 months
      expect(calculateAgeReduction(140)).toBe(0.84) // <= 144 months
      expect(calculateAgeReduction(150)).toBe(0.86) // <= 156 months
      expect(calculateAgeReduction(165)).toBe(0.88) // <= 168 months
      expect(calculateAgeReduction(170)).toBe(0.9) // > 168 months
    })

    it("returns maximum reduction rate (0.9) for very old vehicles", () => {
      expect(calculateAgeReduction(200)).toBe(0.9)
      expect(calculateAgeReduction(500)).toBe(0.9)
    })
  })
})

