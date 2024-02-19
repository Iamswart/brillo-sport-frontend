import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const authApiClient = new APIClient("/auth/forgot-password");

export interface ForgotPasswordInput {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordInput>(
    ["forgotPasswordUser"],
    (input: ForgotPasswordInput) =>
      authApiClient.post<ForgotPasswordInput, ForgotPasswordResponse>(input)
  );
};
