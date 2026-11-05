import { useReducer } from "react";
import { useAutoApi, AutosResponse } from "./useAutoApi";

interface UseAutoForm {
    state: AutosResponse;
    handleInputChange: (fieldName: keyof AutosResponse, value: string | number) => void;
    handleSubmit: () => Promise<void>;
    handleDelete: () => Promise<void>;
    resetForm: () => void;
}

export const useAutoForm = (): UseAutoForm => {
    const initialForm: AutosResponse = {
        id_propietario: 0,
        marca: '',
        modelo: '',
        ano: '',
        placas: '',
        numero_serie: '',
        color: '',
        kilometraje: '',
        fecha_revision: '',
        imagen1: '',
        imagen2: '',
        imagen3: '',
        imagen4: ''
    };

    type Action =
        | { type: 'handleInputChange'; payload: { fieldName: keyof AutosResponse; value: string | number } }
        | { type: 'reset' }
        | { type: 'load'; payload: AutosResponse };

    const formReducer = (state: AutosResponse, action: Action): AutosResponse => {
        switch (action.type) {
            case 'handleInputChange':
                return { ...state, [action.payload.fieldName]: action.payload.value };
            case 'reset':
                return { ...initialForm };
            case 'load':
                return { ...action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(formReducer, initialForm);
    const { createAuto, updateAuto, deleteAuto } = useAutoApi();

    const handleInputChange = (fieldName: keyof AutosResponse, value: string | number) => {
        dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
    };

    const resetForm = () => {
        dispatch({ type: 'reset' });
    };

    const handleSubmit = async () => {
        if (!state.marca || !state.placas) {
            console.warn("Faltan campos obligatorios (marca y placas)");
            return;
        }

        try {
            if (!state.id_propietario || state.id_propietario === 0) {
                // Creación → se envía sin id_propietario
                await createAuto(state);
            } else {
                // Actualización
                await updateAuto(state);
            }
        } catch (error) {
            console.warn("Falló la operación del auto.", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (state.id_propietario && state.id_propietario !== 0) {
                await deleteAuto(state.id_propietario);
            }
        } catch (error) {
            console.warn("Falló la eliminación del auto.");
        }
    };

    return { 
        state, 
        handleInputChange, 
        handleSubmit, 
        handleDelete, 
        resetForm 
    };
};
