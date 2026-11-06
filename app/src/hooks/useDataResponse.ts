import { useEffect, useState } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { DataResponse } from "../interfaces/pandoraApiRest";

interface UseDataResponse{
  data: DataResponse | undefined;
  isLoading: boolean;
  loadData: () => void;
}

export const useDataResponse = (): UseDataResponse => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ data, setData ] = useState<DataResponse>();
  const urlApi = "http://192.168.232.42:3000/sensors/consultas/data";

  const loadData = async () => {
    setIsLoading(true);
    const response = await pandoraApi.get<DataResponse>( urlApi );
    setData( response.data );
    setIsLoading(false);
  }

  useEffect( () => {
    loadData();
  },[]);

  return { isLoading, data, loadData };
   
}
