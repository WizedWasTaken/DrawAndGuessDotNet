import { LobbiesTable } from "@/components/dataTable/Lobbies";

export default function Home() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h1>Lobbies</h1>
      <LobbiesTable />
    </div>
  );
}
