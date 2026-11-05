import { Dropdown } from "react-native-element-dropdown";
import { EstadoTarea } from "../interfaces/tareaResponse";
import { StyleSheet } from "react-native";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const DropdownEstadoTarea = ({ value, onChange }: Props) => {
    const DATA = [
        { label: "Pendiente", value: EstadoTarea.pendiente },
        { label: "En proceso", value: EstadoTarea.en_proceso },
        { label: "Completada", value: EstadoTarea.completado }
    ];

    return (
        <Dropdown
            placeholder="Estado de la tarea"
            data={DATA}
            labelField="label"
            valueField="value"
            value={value}
            onChange={item => onChange(item.value)}
            style={styles.dropdown}
        />
    );
}

const styles = StyleSheet.create({
    dropdown: { 
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10
    }
});
