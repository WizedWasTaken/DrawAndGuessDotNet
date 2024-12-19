import { changelogs } from "@/lib/Misc/changelog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Changelog() {
  return (
    <section className="flex flex-col flex-grow gap-3">
      <h2 className="text-2xl font-bold">Changelog</h2>
      {changelogs && changelogs.length > 0 ? (
        <ScrollArea className="space-y-4 h-80 py-5">
          <ul className="flex flex-col-reverse">
            {changelogs.map((changelog) => (
              <>
                <li key={changelog.version} className="py-2">
                  <h3 className="text-xl font-semibold">{changelog.version}</h3>
                  <p className="text-gray-500">{changelog.date}</p>
                  <ul className="list-disc list-inside pl-5">
                    {changelog.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                </li>
                <Separator className="my-2" />
              </>
            ))}
          </ul>
        </ScrollArea>
      ) : (
        <p>Ingen changelog. 😪</p>
      )}
    </section>
  );
}
