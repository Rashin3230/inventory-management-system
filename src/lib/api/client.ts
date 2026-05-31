import type { ApiResponse, LoginResponse, SafeUser } from "@/types";

async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });

  const data = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(data.message ?? "Request failed");
  }

  return data;
}

export async function loginRequest(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response.data) {
    throw new Error(response.message ?? "Login failed");
  }

  return response.data;
}

export async function getCurrentUserRequest(): Promise<SafeUser | null> {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  const data = (await response.json()) as ApiResponse<SafeUser>;

  if (!response.ok || !data.data) {
    throw new Error(data.message ?? "Failed to fetch user");
  }

  return data.data;
}

export async function logoutRequest(): Promise<void> {
  await apiFetch("/api/auth/logout", { method: "POST" });
}
