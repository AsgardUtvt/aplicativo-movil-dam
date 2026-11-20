import { useEffect, useState } from "react";
import { AsistenciaResponse } from "../interfaces/asistenciasApi";
import { pandoraApi } from "../api/pandoraApi";
import { BaseUrl } from "../components/BaseUrl";
import {getDeviceIPv4} from "../utils/singleton";


interface UseAsistenciaResponse {
    data: AsistenciaResponse | undefined;
    isLoading: boolean;
    loadData: () => void;
}

export const useAsistenciaResponse =  (): UseAsistenciaResponse => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<AsistenciaResponse>();
        const        ip = getDeviceIPv4();
    
        const urlApi = `http://${ip}:3000/asistencia/consultas/data`;

    const loadData = async () => {
        setIsLoading(true);
        console.log(urlApi);

        const response = await pandoraApi.get<AsistenciaResponse>(urlApi)
        setData( response.data );
        setIsLoading(false); 
    }

    useEffect(() => {
        loadData();
    },[]);

    return { isLoading, data, loadData };
}

