import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const updateSportApiClient = new APIClient("/user/update-user-sports-interest");

export interface UpdateSportInput {
  sportIds: string[];
}

interface UpdateSportResponse {
  success: boolean;
  message: string;
  data: any;
}

export const useUpdateSport = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useMutation<UpdateSportResponse, Error, UpdateSportInput>(
    ["updateSport"],
    (input: UpdateSportInput) => {
      return updateSportApiClient.patch<
      UpdateSportInput,
      UpdateSportResponse
      >(input, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  );
};
