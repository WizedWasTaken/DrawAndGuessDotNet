import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

const setTheme = jest.fn();
(useTheme as jest.Mock).mockReturnValue({ setTheme });

test("renders theme toggle button", () => {
  render(<ThemeToggle />);
  expect(screen.getByText("Toggle theme")).toBeInTheDocument();
});

test("calls setTheme when theme is toggled", () => {
  render(<ThemeToggle />);

  // Click to open the dropdown
  fireEvent.click(screen.getByRole("button"));

  const lightButton = screen.getByText("Light");
  const darkButton = screen.getByText("Dark");
  const systemButton = screen.getByText("System");

  // Simulate clicking "Light"
  fireEvent.click(lightButton);
  expect(setTheme).toHaveBeenCalledWith("light");

  // Simulate clicking "Dark"
  fireEvent.click(darkButton);
  expect(setTheme).toHaveBeenCalledWith("dark");

  // Simulate clicking "System"
  fireEvent.click(systemButton);
  expect(setTheme).toHaveBeenCalledWith("system");
});
