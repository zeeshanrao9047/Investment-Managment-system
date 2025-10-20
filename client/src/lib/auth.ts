import { apiRequest } from "./queryClient";
import { LoginCredentials, RegisterCredentials, ResetPasswordRequest } from "@/types/auth";

export async function login(credentials: LoginCredentials) {
  return apiRequest("POST", "/api/auth/login", credentials);
}

export async function register(userData: RegisterCredentials) {
  return apiRequest("POST", "/api/auth/register", userData);
}

export async function forgotPassword(email: ResetPasswordRequest) {
  return apiRequest("POST", "/api/auth/forgot-password", email);
}

export async function logout() {
  return apiRequest("POST", "/api/auth/logout", {});
}
