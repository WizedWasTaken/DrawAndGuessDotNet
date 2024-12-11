import { getSession } from "next-auth/react";

export type ApiResponse<T> = {
  data: T | null;
  isSuccessful: boolean;
  status: number;
  statusText: string;
};

const baseUrl = "https://localhost:7202/api";

export async function callApiAsync<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const session = await getSession();
  const token = session?.accessToken;

  const url = `${baseUrl}${endpoint}`;
  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${token}`,
  };

  console.log("url", url);

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();

  console.log(data);

  console.log("response", data);
  return {
    data,
    isSuccessful: response.ok,
    status: response.status,
    statusText: response.statusText,
  };
}

export async function callApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const session = await getSession();
  const token = session?.accessToken;

  const url = `${baseUrl}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Ensure the server interprets the request as JSON
    ...options.headers, // Merge custom headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    return {
      data,
      isSuccessful: response.ok, // Checks for status codes in the 200–299 range
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error("API call failed:", error);

    return {
      data: null,
      isSuccessful: false,
      status: 0,
      statusText: "Network error",
    };
  }
}

