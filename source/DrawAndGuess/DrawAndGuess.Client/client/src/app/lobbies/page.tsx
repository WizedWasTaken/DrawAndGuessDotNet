// Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LobbiesTable } from "@/components/dataTable/Lobbies";

export default function Home() {
  return (
    <div className="flex flex-grow flex-col justify-center container mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-center">Lobbies</h2>
        </CardHeader>
        <CardContent>
          <LobbiesTable />
        </CardContent>
      </Card>
    </div>
  );
}
