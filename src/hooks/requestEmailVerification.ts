import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const emailVerificationApiClient = new APIClient(
  "/user/send-email-verification-link"
);

interface EmailVerificationResponse {
  success: boolean;
  message: string;
}

export const useSendEmailVerification = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useMutation<EmailVerificationResponse, Error>(() => {
    return emailVerificationApiClient.getAll<EmailVerificationResponse>({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
};
