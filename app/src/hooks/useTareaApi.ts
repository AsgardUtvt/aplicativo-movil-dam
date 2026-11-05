import { useEffect, useState } from 'react';
import { Tarea } from '../interfaces/tareaResponse';
import { ModalTareaData } from "./useTareaModal";
import { tareaApi } from '../api/tareasApi';

export const useTareaApi = () => {
    const [isLoading, setLoading] = useState(false);
    const [listTareas, setListTareas] = useState<Tarea[]>([]);
    const url = "http://192.168.137.42:3000/tareas";

    const loadTarea = async () => {
        setLoading(true);
        try {
            const response = await tareaApi.get<Tarea[]>(url);
            setListTareas(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTarea();
    }, []);

    const crearTarea = async (data: ModalTareaData) => {
        if (!data.titulo) return;
        await tareaApi.post(url, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            estado: data.estado
        });
        await loadTarea();
    };

    const actualizarTarea = async (data: ModalTareaData) => {
        if (!data.titulo) return;
        await tareaApi.patch(`${url}/${data.id_tarea}`, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            estado: data.estado
        });
        await loadTarea();
    };

    const borrarTarea = async (data: ModalTareaData) => {
        await tareaApi.delete(`${url}/${data.id_tarea}`);
        await loadTarea();
    };

    return { isLoading, listTareas, loadTarea, crearTarea, actualizarTarea, borrarTarea };
}
