import { getSession } from "next-auth/react";

export type ApiResponse<T> = {
  data: T;
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
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const session = await getSession();
  const token = session?.accessToken;

  const url = `${baseUrl}${endpoint}`;
  const xhr = new XMLHttpRequest();
  xhr.open(options?.method || "GET", url, false);
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  if (options?.headers) {
    Object.keys(options.headers).forEach((key) => {
      xhr.setRequestHeader(
        key,
        (options.headers as Record<string, string>)[key]
      );
    });
  }
  xhr.send(options?.body ? JSON.stringify(options.body) : null);

  const data = JSON.parse(xhr.responseText);
  return {
    data,
    isSuccessful: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    statusText: xhr.statusText,
  };
}
