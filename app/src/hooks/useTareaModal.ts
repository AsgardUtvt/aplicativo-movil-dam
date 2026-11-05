import { useReducer } from "react";
import { EstadoTarea } from "../interfaces/tareaResponse";

export interface ModalTareaData {
    id_tarea: number;
    descripcion: string;
    titulo: string;
    estado: string;
}

const initialModal: ModalTareaData = {
    id_tarea: 0,
    descripcion: '',
    titulo: '',
    estado: EstadoTarea.pendiente,
};

type Action = 
    | { type: 'cuandoCambia', payload: { fieldName: keyof ModalTareaData, value: string } } 
    | { type: 'reset', payload?: ModalTareaData };

const modalReducer = (state: ModalTareaData, action: Action) => {
    switch (action.type) {
        case 'cuandoCambia':
            if (action.payload.fieldName == 'titulo' && action.payload.value.length > 20){
                return state;
            }
            return { ...state, [action.payload.fieldName]: action.payload.value };
        case 'reset':
            return action.payload || initialModal;
        default:
            return state;
    }
};

export const useTareaModal = () => {
    const [state, dispatch] = useReducer(modalReducer, initialModal);

    const cuandoCambia = (fieldName: keyof ModalTareaData, value: string ) => {
        dispatch({ type: 'cuandoCambia', payload: { fieldName, value } });
    };

    const reset = (data?: ModalTareaData) => {
        dispatch({ type: 'reset', payload: data });
    };

    return { state, cuandoCambia, reset };
};
