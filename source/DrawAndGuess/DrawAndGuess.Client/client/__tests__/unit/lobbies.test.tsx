import { render, screen, waitFor, act } from "@testing-library/react";
import Home from "@/app/lobbies/page";
import { LobbiesTable } from "@/app/lobbies/Components/Lobbies";

jest.mock("@/components/dataTable/Lobbies", () => ({
  LobbiesTable: jest.fn(() => <div>Lobbies Table Mock</div>),
}));

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Home component correctly", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getByText("Lobbies Table Mock")).toBeInTheDocument();
    });
  });

  it("contains the LobbiesTable component", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(LobbiesTable).toHaveBeenCalled();
    });
  });
});
