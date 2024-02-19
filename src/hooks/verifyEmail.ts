import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const verifyEmailApiClient = new APIClient("/user/verify-email");


interface VerificationResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      userName: string;
      email: string;
    };
  };
}

export const useVerifyEmail = (token: string) => {
  return useQuery<VerificationResponse, Error>(
    ["verifyEmail", token],
    () => verifyEmailApiClient.getWithQuery<VerificationResponse>(`token=${encodeURIComponent(token)}`)
  );
};