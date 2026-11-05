import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Tarea } from "../interfaces/tareaResponse";

interface Props {
    tarea: Tarea;
    onPress: () => void;
}

export const CardTarea = ({ tarea, onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{tarea.titulo}</Text>
            <Text style={styles.descripcion} numberOfLines={2}>{tarea.descripcion}</Text>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{tarea.estado}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { 
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 } 
    },
    title: { 
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#172b4d'
    },
    descripcion: { 
        fontSize: 14,
        color: '#555',
        marginBottom: 8
    },
    statusContainer: { 
        alignSelf: 'flex-start',
        backgroundColor: '#e0e7ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4 
    },
    statusText: { 
        fontSize: 12,
        color: '#3730a3',
        fontWeight: '600',
        textTransform: 'capitalize'
    }
});
