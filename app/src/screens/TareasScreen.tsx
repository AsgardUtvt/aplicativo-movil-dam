import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTareaApi } from "../hooks/useTareaApi";
import { CardTarea } from "../components/CardTarea";
import { ModalTarea } from "../components/ModalTarea";
import { EstadoTarea, Tarea } from "../interfaces/tareaResponse";
import { ModalTareaData } from "../hooks/useTareaModal";

export const TareaScreen = () => {
    const { isLoading, listTareas, crearTarea, actualizarTarea, borrarTarea } = useTareaApi();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTarea, setEditingTarea] = useState<Tarea | null>(null);

    const handleOpenModal = (tarea?: Tarea) => {
        setEditingTarea(tarea || null);
        setIsModalOpen(true);
    };

    const handleSave = (data: ModalTareaData) => {
        if (data.id_tarea === 0) {
            crearTarea(data);
        } else {
            actualizarTarea(data);
        }
    };

    const handleDelete = (id: number) => {
        borrarTarea({ id_tarea: id } as ModalTareaData);
    };

    const pendientes = listTareas.filter(t => t.estado == EstadoTarea.pendiente);
    const enProceso = listTareas.filter(t => t.estado === EstadoTarea.en_proceso);
    const completadas = listTareas.filter(t => t.estado === EstadoTarea.completado);

    const Columna = ({ titulo, tareas }: { titulo: string; tareas: Tarea[] }) => (
        <View style={styles.column}>
            <Text style={styles.columnTitle}>{titulo} ({tareas.length})</Text>
            <ScrollView style={styles.columnContent} showsVerticalScrollIndicator={false}>
                {tareas.map(tarea => (
                    <CardTarea 
                        key={tarea.id_tarea} 
                        tarea={tarea} 
                        onPress={() => handleOpenModal(tarea)} 
                    />
                ))}
            </ScrollView>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0052cc" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.board}>
                <Columna titulo="Pendiente" tareas={pendientes} />
                <Columna titulo="En Proceso" tareas={enProceso} />
                <Columna titulo="Completada" tareas={completadas} />
            </ScrollView>
            
            <TouchableOpacity style={styles.fab} onPress={() => handleOpenModal()}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <ModalTarea 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                onDelete={handleDelete}
                initialData={editingTarea}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#f4f5f7'
    },
    center: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    board: { 
        flex: 1,
        padding: 16 
    },
    column: { 
        width: 300,
        backgroundColor: '#ebecf0',
        borderRadius: 8,
        marginRight: 16,
        padding: 12,
        maxHeight: '100%'
    },
    columnTitle: { 
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#172b4d'
    },
    columnContent: { 
        flex: 1
    },
    fab: { 
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0052cc',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    fabText: { 
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    }
});
