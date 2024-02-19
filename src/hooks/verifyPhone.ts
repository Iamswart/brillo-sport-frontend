import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const verifyPhoneApiClient = new APIClient("/user/verify-phone");

export interface PhoneVerificationInput {
  token: string;
}

interface PhoneVerificationResponse {
  success: boolean;
  message: string;
}

export const useVerifyPhone = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useMutation<PhoneVerificationResponse, Error, PhoneVerificationInput>(
    ["verifyPhone"],
    (input: PhoneVerificationInput) => {
      return verifyPhoneApiClient.post<PhoneVerificationInput, PhoneVerificationResponse>(
        input,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
  );
};
