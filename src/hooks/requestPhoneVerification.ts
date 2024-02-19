import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const phoneVerificationApiClient = new APIClient(
  "/user/send-phone-verification-code"
);

interface PhoneVerificationResponse {
  success: boolean;
  message: string;
  data?: {
    otp: string;
  }; 
}

export const useSendPhoneVerification = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useMutation<PhoneVerificationResponse, Error>(() => {
    return phoneVerificationApiClient.getAll<PhoneVerificationResponse>({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
};
