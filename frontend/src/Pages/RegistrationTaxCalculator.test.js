import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationTaxCalculator from './RegistrationTaxCalculator'; // Komponens importálása

describe('RegistrationTaxCalculator', () => {
  it('should calculate tax as 0 for electric or emission 1 vehicle', async () => {
    render(<RegistrationTaxCalculator />);

    // Válasszuk ki az elektromos üzemanyagot
    const fuelSelect = screen.getByLabelText(/Üzemanyag típusa:/);
    fireEvent.change(fuelSelect, { target: { value: 'elektromos' } });

    // Válasszuk ki az emisszió értékét, amely 1
    const emissionSelect = screen.getByLabelText(/Környezetvédelmi besorolás:/);
    fireEvent.change(emissionSelect, { target: { value: '1' } });

    // Adjuk meg az évjáratot és hónapot, hogy a mezők kitöltött állapotba kerüljenek
    const yearSelect = screen.getByLabelText(/Évjárat/);
    fireEvent.change(yearSelect, { target: { value: '2020' } });

    const monthSelect = screen.getByLabelText(/hónap/);
    fireEvent.change(monthSelect, { target: { value: '5' } });

    // Adjuk meg a teljesítményt
    const kwInput = screen.getByLabelText(/Teljesítmény/);
    fireEvent.change(kwInput, { target: { value: '100' } });

    // Kattintsunk a kalkulálás gombra
    const calculateButton = screen.getByText(/Kalkulál/);
    fireEvent.click(calculateButton);

    // Ellenőrizzük, hogy az eredmény 0 Ft
    await waitFor(() => {
      const result = screen.getByText(/Fizetendő:/);
      expect(result).toHaveTextContent('Fizetendő: 0 Ft');
    });
  });
});
