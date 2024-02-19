import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const updateProfileApiClient = new APIClient("/user/update-profile");

export interface UpdateProfileInput {
  gender?: "Male" | "Female" | "others";
  email?: string;
  userName?: string;
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
}

export const useUpdateProfile = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useMutation<UpdateProfileResponse, Error, UpdateProfileInput>(
    ["updateProfile"],
    (input: UpdateProfileInput) => {
      return updateProfileApiClient.patch<
      UpdateProfileInput,
      UpdateProfileResponse
      >(input, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  );
};
