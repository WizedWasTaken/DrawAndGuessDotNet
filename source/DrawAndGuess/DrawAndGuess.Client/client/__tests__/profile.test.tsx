import { render, screen, waitFor, act } from "@testing-library/react";
import { useSession } from "next-auth/react";
import ProfilePage from "@/app/profile/page";
import { Player } from "@/entities/player";
import { Statistic } from "@/entities/statistic";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/lib/callApi", () => ({
  callApiAsync: jest.fn(),
}));

describe("TestPage", () => {
  const mockSession = {
    user: { name: "Test User", email: "test@example.com" },
    expires: "2024-01-01",
  };

  const mockUsers: Player[] = [
    {
      playerId: 1,
      userName: "User1",
      name: "User1",
      password: "",
      email: "",
      statistic: {} as Statistic,
    },
    {
      playerId: 2,
      userName: "User2",
      name: "User2",
      password: "",
      email: "",
      statistic: {} as Statistic,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
    (require("@/lib/callApi").callApiAsync as jest.Mock).mockResolvedValue({
      data: mockUsers,
    });
  });

  it("renders and fetches data correctly", async () => {
    await act(async () => {
      render(<ProfilePage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Test User/)).toBeInTheDocument();
      expect(screen.getByText("User1")).toBeInTheDocument();
      expect(screen.getByText("User2")).toBeInTheDocument();
    });
  });

  it("handles empty user list", async () => {
    (require("@/lib/callApi").callApiAsync as jest.Mock).mockResolvedValue({
      data: [],
    });

    await act(async () => {
      render(<ProfilePage />);
    });

    await waitFor(() => {
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });
  });

  it("makes API call on mount", async () => {
    await act(async () => {
      render(<ProfilePage />);
    });

    expect(require("@/lib/callApi").callApiAsync).toHaveBeenCalledWith(
      "/Player/"
    );
  });
});
