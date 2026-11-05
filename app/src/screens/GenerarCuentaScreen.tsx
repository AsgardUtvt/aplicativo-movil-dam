import { useEffect, useContext } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BtnTouch } from '../components/BtnTouch';
import { Fab } from '../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginParams } from '../navigator/LoginStackNavigator';
import { useFormUser } from '../hooks/useFormUser';
import { useImagePicker } from '../hooks/useImagePicker';
import { useLocation } from '../hooks/useLocation';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<LoginParams, 'GenerarCuentaScreen'> {}

export const GenerarCuentaScreen = ({ navigation, route }: Props) => {
    const { state, handleInputChange, handleSubmit, handleDelete } = useFormUser();
    const { images, pickImage, removeImage } = useImagePicker();
    const { location } = useLocation();
    const { singIn } = useContext(AuthContext);

    // Cargar datos cuando se edita un usuario
    useEffect(() => {
        const user = route.params as {
            id_user: number;
            username: string;
            email: string;
            image: string;
            location?: string;
        } | undefined;

        if (!user || user.id_user === 0) return;

        handleInputChange("id_user", user.id_user);
        handleInputChange("username", user.username || '');
        handleInputChange("email", user.email || '');

        if (user.image) {
            pickImage(0, user.image);
        }

        const safeLocation = user.location && user.location.length >= 5 
            ? user.location 
            : "0.00000,0.00000";
            
        handleInputChange("location", safeLocation);
    }, []);

    // Sincronizar imagen seleccionada con el formulario
    useEffect(() => {
        if (images[0]) {
            handleInputChange('image', images[0]);
        }
    }, [images]);

    // Ubicación GPS (solo al crear)
    useEffect(() => {
        if (state.id_user === 0 && location?.coords) {
            const gpsLocation = `${location.coords.latitude},${location.coords.longitude}`;
            if (gpsLocation.length >= 5) {
                handleInputChange("location", gpsLocation);
            }
        }
    }, [location]);

    // Función para guardar y actualizar el Context
    const handleSave = async () => {
        try {
            await handleSubmit();

            // Actualizamos el Context con los datos actuales del formulario
            singIn({
                username: state.username,
                avatar: state.image || images[0] || undefined
            });

            navigation.navigate('UsuarioScreen');
        } catch (error) {
            console.warn("Error al guardar el usuario");
        }
    };

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 32, paddingTop: 60, paddingBottom: 32 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={{
                        fontSize: 32,
                        fontWeight: '700',
                        color: '#1A1A1A',
                        textAlign: 'center',
                        marginBottom: 32,
                        fontFamily: 'System'
                    }}>
                        {state.id_user === 0 ? 'Crear cuenta' : 'Editar usuario'}
                    </Text>

                    <Text style={labelStyle}>Nombre del usuario</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='Nombre del usuario'
                        placeholderTextColor="#9CA3AF"
                        value={state.username}
                        onChangeText={(text) => handleInputChange('username', text)}
                    />

                    <Text style={labelStyle}>Correo del usuario</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='Correo del usuario'
                        placeholderTextColor="#9CA3AF"
                        value={state.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />

                    <Text style={labelStyle}>Contraseña del usuario</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder='Contraseña del usuario'
                        placeholderTextColor="#9CA3AF"
                        value={state.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                        secureTextEntry={true}
                    />

                    {/* Sección de imagen */}
                    <View style={{ marginTop: 24, alignItems: 'center' }}>
                        <BtnTouch
                            title={images[0] ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                            onPress={() => pickImage(0)}
                            color='#D1D5DB'
                            textColor='#1A1A1A'
                            height={56}
                            borderRadius={28}
                            fontSize={16}
                            fontWeight='600'
                        />
                    </View>

                    {images[0] ? (
                        <View style={{ alignItems: 'center', marginTop: 16 }}>
                            <Image
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 60,
                                    borderColor: '#D1D5DB',
                                    borderWidth: 2,
                                }}
                                source={{ uri: `data:image/jpeg;base64,${images[0]}` }}
                            />
                            <BtnTouch
                                title='Quitar imagen'
                                onPress={() => {
                                    removeImage(0);
                                    handleInputChange('image', '');
                                }}
                                color='#EF4444'
                                textColor='white'
                                height={40}
                                borderRadius={20}
                                fontSize={14}
                                fontWeight='500'
                                style={{ marginTop: 12 }}
                            />
                        </View>
                    ) : null}

                    <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 40 }}>
                        {state.id_user !== 0 && (
                            <View style={{ marginBottom: 16 }}>
                                <BtnTouch
                                    title='Eliminar usuario'
                                    color='#EF4444'
                                    textColor='white'
                                    height={56}
                                    borderRadius={28}
                                    fontSize={16}
                                    fontWeight='600'
                                    onPress={() => {
                                        handleDelete();
                                        navigation.popToTop();
                                    }}
                                />
                            </View>
                        )}

                        <BtnTouch
                            title={state.id_user === 0 ? 'Crear usuario' : 'Actualizar usuario'}
                            onPress={handleSave}   // ← Aquí se actualiza el Context
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
                action={() => navigation.popToTop()}
            />
        </SafeAreaView>
    );
};
