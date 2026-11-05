import { useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginParams } from '../navigator/LoginStackNavigator';
import { useAutoForm } from '../hooks/useAutoForm';
import { useImagePicker } from '../hooks/useImagePicker';
import { BtnTouch } from '../components/BtnTouch';
import { Fab } from '../components/Fab';

const { width } = Dimensions.get('window');
const imageSlotSize = (width - 104) / 2;

interface Props extends StackScreenProps<LoginParams, 'AutoFormScreen'> {}

export const AutoFormScreen = ({ navigation, route }: Props) => {
    const { state, handleInputChange, handleSubmit, handleDelete, resetForm } = useAutoForm();
    const { images, pickImage, removeImage, clearImages } = useImagePicker();

    // Este useEffect se ejecuta cada vez que cambian los params
    useEffect(() => {
        const auto = route.params;

        // Limpiamos todo primero
        resetForm();
        clearImages();

        // Si no hay params → es creación
        if (!auto || !auto.id_propietario) {
            return;
        }


        handleInputChange("id_propietario", auto.id_propietario);
        handleInputChange("marca", auto.marca || '');
        handleInputChange("modelo", auto.modelo || '');
        handleInputChange("ano", auto.ano || '');
        handleInputChange("placas", auto.placas || '');
        handleInputChange("numero_serie", auto.numero_serie || '');
        handleInputChange("color", auto.color || '');
        handleInputChange("kilometraje", auto.kilometraje || '');
        handleInputChange("fecha_revision", auto.fecha_revision || '');

    
        if (auto.imagen1) pickImage(0, auto.imagen1);
        if (auto.imagen2) pickImage(1, auto.imagen2);
        if (auto.imagen3) pickImage(2, auto.imagen3);
        if (auto.imagen4) pickImage(3, auto.imagen4);

    }, [route.params]);


    useEffect(() => {
        handleInputChange('imagen1', images[0] || '');
        handleInputChange('imagen2', images[1] || '');
        handleInputChange('imagen3', images[2] || '');
        handleInputChange('imagen4', images[3] || '');
    }, [images]);

    const labelStyle = {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500' as const,
        marginBottom: 8,
        marginTop: 16,
        fontFamily: 'System'
    };

    const inputStyle = {
        borderColor: '#D1D5DB',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        height: 56,
        borderRadius: 12,
        color: '#1A1A1A',
        fontSize: 16,
        paddingHorizontal: 16,
        fontFamily: 'System'
    };

    const renderImageSlot = (index: number, label: string) => (
        <View key={index} style={{ width: imageSlotSize, marginBottom: 16 }}>
            <Text style={{ ...labelStyle, marginBottom: 8 }}>{label}</Text>
            <TouchableOpacity
                onPress={() => pickImage(index)}
                style={{
                    width: imageSlotSize,
                    height: imageSlotSize,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: images[index] ? '#10B981' : '#D1D5DB',
                    borderStyle: images[index] ? 'solid' : 'dashed',
                    backgroundColor: images[index] ? '#F0FDF4' : '#F9FAFB',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                {images[index] ? (
                    <>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${images[index]}` }}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            resizeMode="cover"
                        />
                        <Text>
                            console.log("Este es el id propietario: " + id_propietario, '');
                            
                        </Text>
                        <TouchableOpacity
                            onPress={() => removeImage(index)}
                            style={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                backgroundColor: '#EF4444',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>×</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 40, color: '#9CA3AF' }}>📷</Text>
                        <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
                            Tocar para subir
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 32,
                        paddingTop: 60,
                        paddingBottom: 32
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={{
                        fontSize: 28,
                        fontWeight: '700',
                        color: '#1A1A1A',
                        textAlign: 'center',
                        marginBottom: 24,
                        fontFamily: 'System'
                    }}>
                        {state.id_propietario !== 0 ? 'Editar Auto' : 'Publicar Auto'}
                    </Text>

                    <Text style={{
                        ...labelStyle,
                        marginTop: 0,
                        fontSize: 16,
                        fontWeight: '600'
                    }}>
                        Fotografías del vehículo
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}>
                        {renderImageSlot(0, 'Imagen 1 (Principal)')}
                        {renderImageSlot(1, 'Imagen 2')}
                        {renderImageSlot(2, 'Imagen 3')}
                        {renderImageSlot(3, 'Imagen 4')}
                    </View>

                    <Text style={labelStyle}>Marca</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='Ej: Toyota'
                        placeholderTextColor="#9CA3AF"
                        value={state.marca}
                        onChangeText={(text) => handleInputChange('marca', text)}
                    />

                    <Text style={labelStyle}>Modelo</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='Ej: Corolla'
                        placeholderTextColor="#9CA3AF"
                        value={state.modelo}
                        onChangeText={(text) => handleInputChange('modelo', text)}
                    />

                    <Text style={labelStyle}>Año</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='Ej: 2023'
                        placeholderTextColor="#9CA3AF"
                        value={state.ano}
                        onChangeText={(text) => handleInputChange('ano', text)}
                        keyboardType='numeric'
                    />

                    <Text style={labelStyle}>Placas</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='Ej: ABC-123'
                        placeholderTextColor="#9CA3AF"
                        value={state.placas}
                        onChangeText={(text) => handleInputChange('placas', text)}
                        autoCapitalize='characters'
                    />

                    <Text style={labelStyle}>Número de Serie (VIN)</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='17 caracteres'
                        placeholderTextColor="#9CA3AF"
                        value={state.numero_serie}
                        onChangeText={(text) => handleInputChange('numero_serie', text)}
                        autoCapitalize='characters'
                    />

                    <Text style={labelStyle}>Color</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='Ej: Rojo'
                        placeholderTextColor="#9CA3AF"
                        value={state.color}
                        onChangeText={(text) => handleInputChange('color', text)}
                    />

                    <Text style={labelStyle}>Kilometraje</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='Ej: 50000'
                        placeholderTextColor="#9CA3AF"
                        value={state.kilometraje}
                        onChangeText={(text) => handleInputChange('kilometraje', text)}
                        keyboardType='numeric'
                    />

                    <Text style={labelStyle}>Fecha de Revisión</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='YYYY-MM-DD'
                        placeholderTextColor="#9CA3AF"
                        value={state.fecha_revision}
                        onChangeText={(text) => handleInputChange('fecha_revision', text)}
                    />

                    <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 32 }}>
                        {state.id_propietario !== 0 && (
                            <View style={{ marginBottom: 16 }}>
                                <BtnTouch
                                    title='Eliminar auto'
                                    color='#EF4444'
                                    textColor='white'
                                    height={56}
                                    borderRadius={28}
                                    fontSize={16}
                                    fontWeight='600'
                                    onPress={async () => {
                                        await handleDelete();
                                        navigation.goBack();
                                    }}
                                />
                            </View>
                        )}

                        <BtnTouch
                            title={state.id_propietario != 0 ? 'Actualizar auto' : 'Publicar auto'}
                            onPress={async () => {
                                await handleSubmit();
                                navigation.goBack();
                            }}
                            color='black'
                            textColor='white'
                            height={56}
                            borderRadius={28}
                            fontSize={16}
                            fontWeight='600'
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <Fab
                title='<-'
                position='left'
                color='black'
                action={() => navigation.goBack()}
            />
        </SafeAreaView>
    );
};
