"use client";

import { useSession } from "next-auth/react";

export default function TestPage() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Middleware Test Page</h1>

      <p>
        This page is using a custom middleware configuration to restrict access
        to authenticated users only.
      </p>
      <p>If you can see this page, you are signed in.</p>

      <p>
        <strong>Session:</strong>
      </p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
