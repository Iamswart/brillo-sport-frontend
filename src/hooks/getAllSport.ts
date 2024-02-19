import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const getSportsApiClient = new APIClient("/sport/all-sports");



interface getAllSportsResponse {
  _id: string;
  name: string;
}

export const getAllSports = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useQuery<getAllSportsResponse[], Error>(
    ["sports"], 
    () => {
      return getSportsApiClient.getAll<getAllSportsResponse[]>({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  );
};

