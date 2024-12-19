"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { callApiAsync } from "@/lib/Api/Helper/callApi";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);

  // Fetch all users from the API
  const fetchUsers = async () => {
    console.log("Fetching users... notUseEffect");
    const response = await callApiAsync("/Player/");
    console.log("response", response);
    const users: any[] = response.data as any[];
    setUsers(users);
  };

  useEffect(() => {
    console.log("Fetching users... useEffect");
    fetchUsers();
  }, []);

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
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>List of all users</h1>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => <li key={user.id}>{user.userName}</li>)
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}
