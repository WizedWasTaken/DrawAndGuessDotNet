import { LobbiesTable } from "@/components/dataTable/Lobbies";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
        <CardFooter>
          <h2 className="text-xl w-full font-bold text-center">Lobbies</h2>
        </CardFooter>
      </Card>
    </div>
  );
}
