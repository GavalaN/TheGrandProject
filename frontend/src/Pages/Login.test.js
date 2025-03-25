import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from './Login'; // Az importált Login komponens
import axios from 'axios';
import Cookies from 'js-cookie';

// Mocking axios
jest.mock('axios');
jest.mock('js-cookie', () => ({
  set: jest.fn(),
  get: jest.fn(),
}));

describe('Login Component', () => {
  it('should show error if username is incorrect', async () => {
    // Mock válasz a hibás felhasználónévhez
    axios.post.mockRejectedValueOnce({
      response: {
        data: 'Helytelen jelszó!',
      },
    });

    render(<Login />);

    // Felhasználónév és jelszó beírása
    const usernameInput = screen.getByPlaceholderText(/Felhasználónév begépelése/i);
    const passwordInput = screen.getByPlaceholderText(/Jelszó begépelése/i);
    const submitButton = screen.getByText(/Bejelentkezés/i);

    fireEvent.change(usernameInput, { target: { value: 'helytelen' } });
    fireEvent.change(passwordInput, { target: { value: 'rosszpassword' } });

    // Bejelentkezés gomb megnyomása
    fireEvent.click(submitButton);

    // Várjuk, hogy a modal megjelenjen a hibás bejelentkezésről
    await waitFor(() => {
      expect(screen.getByText(/Helytelen jelszó!/i)).toBeInTheDocument();
    });
  });
});
