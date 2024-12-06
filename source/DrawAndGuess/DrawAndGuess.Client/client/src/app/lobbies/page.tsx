import { LobbiesTable } from "@/components/dataTable/Lobbies";

export default function Home() {
  return (
    <div className="flex flex-grow flex-col justify-center">
      <LobbiesTable />
    </div>
  );
}
