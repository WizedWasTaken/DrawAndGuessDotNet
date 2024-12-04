import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/components/Footer";

jest.mock("../../src/lib/hooks/UseSignalR", () => ({
  useSignalR: jest.fn(),
}));

const { useSignalR } = require("../../src/lib/hooks/UseSignalR");

// Set a default return value for the mock
useSignalR.mockReturnValue({
  connection: null,
});

test("renders footer with static content", () => {
  render(<Footer />);

  expect(screen.getByText(/Made with ❤ by Noah Nielsen/i)).toBeInTheDocument();
});

test("renders N/A when connection information is unavailable", () => {
  useSignalR.mockReturnValue({
    connection: null,
  });

  render(<Footer />);

  // Check if 'N/A' is displayed for connectionId and state
  expect(screen.getByText(/Connection ID: N\/A/i)).toBeInTheDocument();
  expect(screen.getByText(/Connection State: N\/A/i)).toBeInTheDocument();
});

test("renders connection ID and state when available", () => {
  useSignalR.mockReturnValue({
    connection: { connectionId: "12345", state: "Connected" },
  });

  render(<Footer />);

  // Check if the connection details are rendered correctly
  expect(screen.getByText(/Connection ID: 12345/i)).toBeInTheDocument();
  expect(screen.getByText(/Connection State: Connected/i)).toBeInTheDocument();
});

test("footer layout renders correctly", () => {
  render(<Footer />);

  // Check if the absolute positioning section has the correct text in the center
  const centerText = screen.getByText(/Made with ❤ by Noah Nielsen/i);
  expect(centerText).toHaveClass("absolute");
  expect(centerText).toBeInTheDocument();
});

test("footer snapshot", () => {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});
