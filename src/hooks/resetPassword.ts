import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const authApiClient = new APIClient("/auth/reset-password");

export interface PasswordResetInput {
  newPassword: string;
  token: string;
}

interface PasswordResetResponse {
  message: string;
}

export const usePasswordReset = () => {
  return useMutation<PasswordResetResponse, Error, PasswordResetInput>(
    ["passwordReset"],
    (input: PasswordResetInput) =>
      authApiClient.post<PasswordResetInput, PasswordResetResponse>(input)
  );
};
