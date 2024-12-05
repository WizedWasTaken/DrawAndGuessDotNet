interface IChangelog {
  version: string;
  date: string;
  changes: string[];
}

export const changelogs: IChangelog[] = [
  {
    version: "0.1.0",
    date: "5/12/2024",
    changes: [
      "Initial release",
      "Added SignalR support",
      "Added Changelog component",
      "Added Logo component",
      "Added useSignalR hook",
      "Added SignalRProvider context",
      "Added SignalRContext context",
      "Added UseSignalR context",
      "Added Footer component",
      "Added Button component",
      "Added Github component",
    ],
  },
  {
    version: "0.2.0",
    date: "5/13/2024",
    changes: [
      "Added technical information dialog",
      "Added useSignalRListener hook",
      "Added Dialog component",
      "Added DialogTrigger component",
      "Added DialogContent component",
      "Added DialogDescription component",
      "Added DialogHeader component",
      "Added DialogTitle component",
      "Added E2E tests",
      "Added Changelog",
    ],
  },
];
