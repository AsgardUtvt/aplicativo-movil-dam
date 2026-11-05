import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
    const [images, setImages] = useState<string[]>(['', '', '', '']);

    const pickImage = async (index: number, base64Data?: string) => {
        // Caso 1: Cargar una imagen que ya existe (desde el backend)
        if (base64Data) {
            // Limpiamos el prefijo si viene con data:image/...
            const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');

            setImages(prev => {
                const newImages = [...prev];
                newImages[index] = cleanBase64;
                return newImages;
            });
            return;
        }

        // Caso 2: Seleccionar imagen nueva de la galería
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (!permissionResult.granted) {
            alert('Se necesitan permisos para acceder a la galería.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            base64: true,
        });

        if (result.canceled) return;

        if (result.assets && result.assets[0]?.base64) {
            const pureBase64 = result.assets[0].base64; // Solo el base64 puro

            setImages(prev => {
                const newImages = [...prev];
                newImages[index] = pureBase64;
                return newImages;
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => {
            const newImages = [...prev];
            newImages[index] = '';
            return newImages;
        });
    };

    const clearImages = () => setImages(['', '', '', '']);

    return { images, pickImage, removeImage, clearImages };
};
