import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const authApiClient = new APIClient("/auth/register");

export interface RegisterInput {
  userName: string;
  email: string;
  phone: string;
  password: string;
};

interface RegisterResponse  {
  user: {
    id: string;
    userName: string;
    phone: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

export const useRegister = () => {
    return useMutation<RegisterResponse, Error, RegisterInput>(
      ['registerUser'], 
      (input: RegisterInput) => authApiClient.post<RegisterInput, RegisterResponse>(input)
    );
  };
  
  
  
  
  
