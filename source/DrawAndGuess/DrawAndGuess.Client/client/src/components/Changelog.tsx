import { changelogs } from "@/lib/changelog";

export default function Changelog() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Changelog</h2>
      {changelogs && changelogs.length > 0 ? (
        <article className="space-y-4 max-h-96 overflow-auto">
          <ul className="space-y-4 flex flex-col-reverse">
            {changelogs.map((changelog) => (
              <li key={changelog.version} className="py-2">
                <h3 className="text-xl font-semibold">{changelog.version}</h3>
                <p className="text-gray-500">{changelog.date}</p>
                <ul className="list-disc list-inside pl-5">
                  {changelog.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </article>
      ) : (
        <p>Ingen changelog. 😪</p>
      )}
    </section>
  );
}
