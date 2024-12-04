import Header from "@/components/Header";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { headerButtons } from "@/lib/pages";

test("renders header with buttons", () => {
  render(<Header />);

  headerButtons.forEach((button) => {
    expect(screen.getByText(button.name)).toBeInTheDocument();
  });
});

test("header snapshot", () => {
  const { asFragment } = render(<Header />);
  expect(asFragment()).toMatchSnapshot();
});
