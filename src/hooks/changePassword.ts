

import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const changePasswordApiClient = new APIClient("/auth/change-password");

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
    status: string;
    message: string;
}

export const useChangePassword = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useMutation<ChangePasswordResponse, Error, ChangePasswordInput>(
    ["changePassword"],
    (input: ChangePasswordInput) => {
      return changePasswordApiClient.post<ChangePasswordInput, ChangePasswordResponse>(
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
