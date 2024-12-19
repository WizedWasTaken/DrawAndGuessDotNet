import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lobby } from "@/entities/lobby";

export default function LobbiesTableTop({
  createNewLobby,
}: {
  lobbies: Lobby[];
  createNewLobby(lobby: Lobby): Promise<Lobby>;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Get data from form
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;

    // Create Lobby object
    const lobby = new Lobby();
    lobby.title = title;

    // Call method
    createNewLobby(lobby);
  }

  return (
    <div className="flex mb-5 w-full justify-start items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Opret ny lobby</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Oprettelse af ny lobby</DialogTitle>
          <DialogDescription>
            Udfyld felterne for at oprette en ny lobby.
          </DialogDescription>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="title">Titel</Label>
            <Input name="title" id="title" type="text" required />
            <DialogFooter className="pt-5">
              <DialogClose asChild>
                <Button variant="secondary">Annuller</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Opret</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
