import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const userProfileApiClient = new APIClient("/user/my-profile");

interface Interest {
  _id: string;
  name: string;
}

interface UserProfileResponse {
  _id: string;
  userName: string;
  email: string;
  phone: string;
  gender?: string;
  interests?: Interest[];
  createdAt: string;
  lastLoginAt: string;
  updatedAt: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

export const useUserProfile = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useQuery<UserProfileResponse, Error>(
    ["getUserProfile"],
    () => {
      return userProfileApiClient.getAll<UserProfileResponse>({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  );
};
