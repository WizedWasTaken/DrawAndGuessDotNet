import { render, screen } from "@testing-library/react";
import Home from "@/app/(frontpage)/page";
import FeatureCard from "@/components/FeatureCard";
import "@testing-library/jest-dom";
import { Brush } from "lucide-react";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock framer-motion
jest.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

describe("Home Component", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getByText("Draw & Guess")).toBeInTheDocument();
    expect(
      screen.getByText("Unleash your creativity in this multiplayer sensation!")
    ).toBeInTheDocument();
  });

  it("renders the start drawing button with correct link", () => {
    render(<Home />);
    const button = screen.getByText("Start Drawing");
    expect(button).toBeInTheDocument();
    expect(button.closest("a")).toHaveAttribute("href", "/lobbies");
  });

  it("renders all three feature cards", () => {
    render(<Home />);
    expect(screen.getByText("Intuitive Drawing Tools")).toBeInTheDocument();
    expect(screen.getByText("Real-time Multiplayer")).toBeInTheDocument();
    expect(screen.getByText("Competitive Leaderboards")).toBeInTheDocument();
  });

  it("renders all badges", () => {
    render(<Home />);
    expect(screen.getByText("Innovative Gameplay")).toBeInTheDocument();
    expect(screen.getByText("Cross-platform")).toBeInTheDocument();
    expect(screen.getByText("Regular Updates")).toBeInTheDocument();
    expect(screen.getByText("Community-driven")).toBeInTheDocument();
  });

  it("renders the testimonial section", () => {
    render(<Home />);
    expect(
      screen.getByText('"The most addictive drawing game I\'ve ever played!"')
    ).toBeInTheDocument();
    expect(screen.getByText("- Game Developer Magazine")).toBeInTheDocument();
  });
});

describe("FeatureCard Component", () => {
  const mockProps = {
    icon: <Brush className="w-12 h-12 text-primary" />,
    title: "Test Title",
    description: "Test Description",
  };

  it("renders with provided props", () => {
    render(<FeatureCard {...mockProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    const { container } = render(<FeatureCard {...mockProps} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
