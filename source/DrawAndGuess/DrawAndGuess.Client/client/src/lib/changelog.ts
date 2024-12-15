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
    date: "5/12/2024",
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
  {
    version: "0.3.0",
    date: "11/12/2024",
    changes: [
      "Added security measures in the backend.",
      "Rewrote middleware system for frontend.",
      "Added Next-Auth library for Next.JS.",
      "Improved security measures in frontend.",
      "Added SignIn page.",
      "Added SignUp page.",
      "Added JWT access for certain critical endpoints.",
    ],
  },
  {
    version: "0.3.1",
    date: "15/12/2024",
    changes: [
      "Fixed a bug where the user could not log in.",
      "Added a new Password component, that adds the ability to show the password.",
      "Changed Technical Information view.",
      "Added a new Card component, used on the frontpage.",
      "Used Cards on more pages.",
      "Fixed critical backend issues.",
      "Fixed an issue with the profile page.",
      "Added a button in lobbies to vote start the game.",
      "Improved UX with the lobby function",
      "Changed color scheme, to match the purpose of the application.",
    ],
  },
];
