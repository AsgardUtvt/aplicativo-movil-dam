import { Modal, TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useTareaModal, ModalTareaData } from "../hooks/useTareaModal";
import { DropdownEstadoTarea } from "./DropdownEstadoTarae";
import { Tarea } from "../interfaces/tareaResponse";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ModalTareaData) => void;
    onDelete: (id: number) => void;
    initialData?: Tarea | null;
}

export const ModalTarea = ({ isOpen, onClose, onSave, onDelete, initialData }: Props) => {
    const { state, cuandoCambia, reset } = useTareaModal();

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    id_tarea: initialData.id_tarea,
                    titulo: initialData.titulo,
                    descripcion: initialData.descripcion,
                    estado: initialData.estado,
                });
            } else {
                reset();
            }
        }
    }, [isOpen, initialData]);

    return (
        <Modal visible={isOpen} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                        placeholder="Título"
                        value={state.titulo}
                        onChangeText={text => cuandoCambia('titulo', text)}
                        style={styles.input}
                        maxLength={20}
                    />
                    <TextInput
                        placeholder="Descripción"
                        value={state.descripcion }
                        onChangeText={text => cuandoCambia('descripcion', text)}
                        style={[styles.input, styles.textArea]}
                        multiline
                    />
                    <DropdownEstadoTarea
                        value={state.estado}
                        onChange={value => cuandoCambia('estado', value)}
                    />
                    <View style={styles.buttonRow}>
                        {state.id_tarea > 0 && (
                            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => { onDelete(state.id_tarea); onClose(); }}>
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                    )}
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={() => { onSave(state); onClose(); }}>
                        <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);
}

const styles = StyleSheet.create({
    modalContainer: { flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: { 
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    input: { borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10 
    },
    textArea: { 
        height: 80,
        textAlignVertical: 'top'
    },
    buttonRow: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10 
    },
    button: { flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5
    },
    deleteButton: { 
        backgroundColor: '#cc0000'
    },
    cancelButton: { 
        backgroundColor: '#ccc' 
    },
    saveButton: { 
        backgroundColor: '#0052cc' 
    },
    buttonText: { 
        color: 'white', 
        fontWeight: 'bold' 
    }
});
