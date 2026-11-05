import { useEffect, useState } from "react";
import { pandoraApi } from "../api/pandoraApi";

export interface AutosResponse {
    id_propietario: number;
    marca: string;
    modelo: string;
    ano: string;
    placas: string;
    numero_serie: string;
    color: string;
    kilometraje: string;
    fecha_revision: string;
    imagen1?: string;
    imagen2?: string;
    imagen3?: string;
    imagen4?: string;
}

interface UseAutoApi {
    isLoading: boolean;
    listAutos: AutosResponse[];
    loadAutos: () => void;
    createAuto: (data: AutosResponse) => Promise<void>;
    updateAuto: (data: AutosResponse) => Promise<void>;
    deleteAuto: (id_propietario: number) => Promise<void>;
}

export const useAutoApi = (): UseAutoApi => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listAutos, setListAutos] = useState<AutosResponse[]>([]);
    const urlApi = "http://192.168.137.42:3000/autos";

    const loadAutos = async () => {
        setIsLoading(true);
        try {
            const response = await pandoraApi.get<AutosResponse[]>(urlApi);
            setListAutos(response.data);
        } catch (error) {
            console.error("Error cargando autos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAutos();
    }, []);

    const createAuto = async (data: AutosResponse) => {
        try {
            await pandoraApi.post(urlApi, data);
            loadAutos();
        } catch (error: any) {
            console.error("ERROR en createAuto:", error.response?.data);
            throw error;
        }
    };

    const updateAuto = async (data: AutosResponse) => {
        try {
            // Usamos id_propietario porque es la Primary Key
            await pandoraApi.patch(`${urlApi}/${data.id_propietario}`, data);
            loadAutos();
        } catch (error: any) {
            console.error("ERROR en updateAuto:", error.response?.data);
            throw error;
        }
    };

    const deleteAuto = async (id_propietario: number) => {
        try {
            await pandoraApi.delete(`${urlApi}/${id_propietario}`);
            loadAutos();
        } catch (error: any) {
            console.error("ERROR en deleteAuto:", error.response?.data);
            throw error;
        }
    };

    return { isLoading, listAutos, loadAutos, createAuto, updateAuto, deleteAuto };
};
