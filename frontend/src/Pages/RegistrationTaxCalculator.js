import React, { useEffect, useState } from 'react'
import 'tom-select/dist/css/tom-select.css'
import { Link } from 'react-router-dom'
import TomSelect from 'tom-select';
import InformationModal from '../Components/InformationModal';

/**
 * Calculates the Hungarian vehicle tax multiplier based on power and environmental class
 *
 * @param {number} powerKW - Vehicle power in kilowatts
 * @param {string} envClass - Environmental class ('14+', '12-14', '9-11', '8-', '5E', '5Z')
 * @param {boolean} isHybrid - Whether the vehicle is hybrid
 * @param {boolean} isNewAfter2020 - Whether the vehicle was first registered after Dec 31, 2020
 * @returns {number} The tax multiplier
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
 *
 * @param {number} ageInMonths - Age of the vehicle in months
 * @returns {number} The tax reduction rate (0 to 0.90)
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

function yearRange() {
  const years = []
  const currentYear = new Date().getFullYear()
  for (let i = 1885; i <= currentYear; i++) {
    years.push(i)
  }
  return years.reverse()
}

export default function RegistrationTaxCalculator() {
  const years = yearRange()

  function setInputFilter(textbox, inputFilter, errMsg) {
    ;["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(
      (event) => {
        textbox.addEventListener(event, function (e) {
          if (inputFilter(this.value)) {
            // Accepted value
            if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
              this.classList.remove("input-error")
              this.setCustomValidity("")
            }
            this.oldValue = this.value
            this.oldSelectionStart = this.selectionStart
            this.oldSelectionEnd = this.selectionEnd
          } else if (this.hasOwnProperty("oldValue")) {
            // Rejected value - restore the previous one
            this.classList.add("input-error")
            this.setCustomValidity(errMsg)
            this.reportValidity()
            this.value = this.oldValue
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd)
          } else {
            // Rejected value - nothing to restore
            this.value = ""
          }
        })
      },
    )
  }

  const handleInputChange = () => {
    //Ccm ellenörzés
    setInputFilter(document.getElementById("kw"), (value) => /^\d*$/.test(value), "Ide csak egész számot adhatsz meg!")
  }

  useEffect(() => {
    // For fuel select
    new TomSelect("#fuel", {
      create: false,
      controlInput: null,
      maxOptions: false,
      allowEmptyOption: true,
      placeholder: "Válassz",
    })

    // For emission select
    new TomSelect("#emission", {
      create: false,
      controlInput: null,
      maxOptions: false,
      allowEmptyOption: true,
      placeholder: "Válassz",
    })

    // For year select
    new TomSelect("#year", {
      create: false,
      controlInput: null,
      maxOptions: false,
      allowEmptyOption: true,
      placeholder: "Válassz",
    })

    // For month select
    new TomSelect("#month", {
      create: false,
      controlInput: null,
      maxOptions: false,
      allowEmptyOption: true,
      placeholder: "Válassz",
    })
  }, [])

  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    text: "",
    theme: "information",
  })

  // Add a handler to close the modal
  const handleCloseModal = () => {
    setModalInfo({
      ...modalInfo,
      show: false,
    })
  }

  function CalculateTax() {
    // Get values from the form
    const powerKW = document.getElementById("kw").value
    const fuelType = document.getElementById("fuel").value
    const emissionType = document.getElementById("emission").value
    const registrationYear = document.getElementById("year").value
    const registrationMonth = document.getElementById("month").value

    
    if (fuelType == "elektromos") {
      const finalTaxAmount = 0;

      // Calculate vehicle age in months
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth() + 1 // JavaScript months are 0-indexed

      const ageInMonths = (currentYear - registrationYear) * 12 + (currentMonth - registrationMonth)

      document.getElementById("result").innerText = finalTaxAmount.toLocaleString("hu-HU")
      console.log(
        `Power: ${powerKW}kW, Multiplier: ${0}, Age: ${ageInMonths} months, Reduction: ${0}, Tax: ${finalTaxAmount} Ft`,
      )
    }
    else if (powerKW == "" || fuelType == "" || emissionType == "" || registrationYear == "" || registrationMonth == ""){
      setModalInfo({
        show: true,
        title: "",
        text: "Kérlek töltsd ki a mezőket!",
        theme: "error",
      })
    }
    else{
      // Determine if it's a hybrid vehicle
      const isHybrid = fuelType === "2" || emissionType === "0" // Hybrid fuel type or emission type

      // Determine if it's registered after Dec 31, 2020
      const isNewAfter2020 = registrationYear >= 2021

      // Map emission dropdown value to the environmental class codes
      let envClass
      switch (emissionType) {
        case "0": // Hidrid
          envClass = "hybrid" // Special case handled in calculation
          break
        case "1": // 5E, 5Z
          envClass = "5E"
          break
        case "2": // 14-nél jobb
          envClass = "14+"
          break
        case "3": // 14-12
          envClass = "12-14"
          break
        case "4": // 11-9
          envClass = "9-11"
          break
        case "5": // 8 vagy annál rosszabb
          envClass = "8-"
          break
        default:
          envClass = "14+" // Default to best case if not specified
      }

      // Calculate the tax multiplier
      const multiplier = calculateTaxMultiplier(powerKW, envClass, isHybrid, isNewAfter2020)

      // Calculate vehicle age in months
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth() + 1 // JavaScript months are 0-indexed

      const ageInMonths = (currentYear - registrationYear) * 12 + (currentMonth - registrationMonth)

      // Calculate the age-based reduction rate
      const reductionRate = calculateAgeReduction(ageInMonths)

      // Use the official base rate as defined by Hungarian regulations
      // You should replace this with the correct value from the official source
      const baseRate = 120 // Example value - replace with the correct official value

      // Calculate the final tax amount with age reduction
      const baseTaxAmount = powerKW * multiplier * baseRate
      const finalTaxAmount = Math.round(baseTaxAmount * (1 - reductionRate))

      // Update the result display
      document.getElementById("result").innerText = finalTaxAmount.toLocaleString("hu-HU")
      console.log(
        `Power: ${powerKW}kW, Multiplier: ${multiplier}, Age: ${ageInMonths} months, Reduction: ${reductionRate}, Tax: ${finalTaxAmount} Ft`,
      )
    }
  }

  return (
    <div className="etc content">
      <h2 className="text-center">Regisztrációs adókalkulátor</h2>
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-6">
              <label htmlFor="fuel">Üzemanyag típusa:</label>
              <br />
              <select id="fuel" name="fuel" className="form-select w-100">
                <option value="" selected>Válassz!</option>
                <option value="0">Benzin</option>
                <option value="1">Dízel</option>
                <option value="2">Hidrid</option>
                <option value="elektromos">Elektromos</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="emission">Környezetvédelmi besorolás:</label>
              <br />
              <select id="emission" name="emission" className="form-select w-100">
                <option value="" selected>Válassz!</option>
                <option value="0">Hidrid</option>
                <option value="1">5E, 5Z</option>
                <option value="2">14-nél jobb</option>
                <option value="3">14-12</option>
                <option value="4">11-9</option>
                <option value="5">8 vagy annál rosszabb</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="year">Évjárat</label>
              <br />
              <div className="input-groups">
                <select id="year" className="form-select form-select-f">
                  <option value="" selected>Év</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select id="month" className="form-select">
                  <option value="" selected>hónap</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="kw">Teljesítmény</label>
              <div className="input-group">
                <input id="kw" name="kw" className="input" onChange={handleInputChange} />
                <div className="input-group-append">
                  <span className="">kW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 text-center">
          <h2>
            Fizetendő: <span id="result"></span> Ft
          </h2>
          <button className="mt-4" onClick={CalculateTax}>
            Kalkulál
          </button>
        </div>
      </div>
      <InformationModal
        show={modalInfo.show}
        title={modalInfo.title}
        text={modalInfo.text}
        theme={modalInfo.theme}
        onClose={handleCloseModal}
      />
    </div>
  )
}

