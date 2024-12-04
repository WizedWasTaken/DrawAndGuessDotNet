import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/ui/button";

test("Renders the button with correct label", () => {
  render(<Button onClick={() => {}}>Click Me</Button>);

  expect(screen.getByText("Click Me")).toBeInTheDocument();
});

test("Calls onClick when button is clicked", () => {
  const onClickMock = jest.fn();
  render(<Button onClick={onClickMock}>Click Me</Button>);

  fireEvent.click(screen.getByText("Click Me"));

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test("Button is disabled when disabled prop is true", () => {
  render(
    <Button onClick={() => {}} disabled>
      Click Me
    </Button>
  );

  expect(screen.getByText("Click Me")).toBeDisabled();
});
