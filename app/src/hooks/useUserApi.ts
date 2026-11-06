import { useEffect, useState } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { UserRespose } from "../interfaces/pandoraApiRest";
import { FormUserData } from "./useFormUser";

interface UseUserApi {
  isLoading: boolean;
  listUser: UserRespose[];
  loadUsers: () => void;
  createUser: (data: FormUserData) => Promise<void>;
  updateUser: (data: FormUserData) => Promise<void>;
  deleteUser: (data: FormUserData) => Promise<void>;
  login: (email: string, password: string) => Promise<UserRespose | false>;
}

export const useUserApi = (): UseUserApi => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listUser, setListUser] = useState<UserRespose[]>([]);
  const urlApi = "http://192.168.232.42:3000/users";

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await pandoraApi.get<UserRespose[]>(urlApi);
      setListUser(response.data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (data: FormUserData) => {
    try {
      const dataBody = {
        username: data.username,
        password: data.password,
        email: data.email,
        image: data.image,
        location: data.location
      };
      await pandoraApi.post(urlApi, dataBody);
    } catch (error: any) {
      console.error("ERROR 400 en createUser:", error.response?.data);
      throw error;
    }
  };

  const updateUser = async (data: FormUserData) => {
    try {
      const dataBody = data.password 
        ? {
            username: data.username,
            password: data.password,
            email: data.email,
            image: data.image,
            location: data.location
          }
        : {
            username: data.username,
            email: data.email,
            image: data.image,
            location: data.location
          };
      await pandoraApi.patch(`${urlApi}/${data.id_user}`, dataBody);
    } catch (error: any) {
      console.error("ERROR 400 en updateUser:", error.response?.data);
      throw error;
    }
  };

  const deleteUser = async (data: FormUserData) => {
    try {
      await pandoraApi.delete(`${urlApi}/${data.id_user}`);
    } catch (error: any) {
      console.error("ERROR en deleteUser:", error.response?.data);
      throw error;
    }
  };

  // ← NUEVA FUNCIÓN DE LOGIN
  const login = async (email: string, password: string): Promise<UserRespose | false> => {
    try {
      setIsLoading(true);
      const response = await pandoraApi.post(`${urlApi}/login`, {
        email,
        password
      });

      // El backend regresa el usuario o false
      if (response.data && response.data !== false) {
        return response.data;
      }
      return false;
    } catch (error: any) {
      console.error("ERROR en login:", error.response?.data || error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    listUser, 
    loadUsers, 
    createUser, 
    updateUser, 
    deleteUser,
    login 
  };
};
