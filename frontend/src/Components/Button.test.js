import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("megjeleníti a gomb címkéjét", () => {
    render(<Button label="Kattints ide" onClick={() => { }} />);
    const button = screen.getByText(/kattints/i);

    expect(button).toBeInTheDocument();
});

test("lefut az onClick függvény kattintáskor", () => {
    const handleClick = jest.fn(); // mock függvény
    render(<Button label="Katt" onClick={handleClick} />);
    const button = screen.getByText(/katt/i);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
});

describe('Button', () => {
    it('should handle double click', () => {
        // Mock funkció, amit a gombhoz rendelünk
        const handleClick = jest.fn();

        // A gomb renderelése
        const { getByText } = render(<Button onClick={handleClick} label="Click me" />);
        
        // Két kattintás
        fireEvent.click(getByText("Click me"));
        fireEvent.click(getByText("Click me"));

        // Ellenőrizzük, hogy a handleClick kétszer lett meghívva
        expect(handleClick).toHaveBeenCalledTimes(2);
    });
});