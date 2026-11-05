import { useState, useContext } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { InputText } from '../components/InputText';
import { BtnLogin } from '../components/BtnLogin';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginParams } from '../navigator/LoginStackNavigator';
import { useUserApi } from '../hooks/useUserApi';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<LoginParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useUserApi();
    const { singIn } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        try {
            const user = await login(email.trim(), password);

            if (!user) {
                Alert.alert('Error', 'Correo o contraseña incorrectos');
                return;
            }

            // Guardamos el usuario en el Context
            singIn({
                username: user.username,
                avatar: user.image
            });

            navigation.navigate('UsuarioScreen');
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un problema al iniciar sesión');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, paddingHorizontal: 32, paddingTop: 60 }}>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: '700',
                        color: '#1A1A1A',
                        textAlign: 'center',
                        marginBottom: 48,
                        fontFamily: 'System'
                    }}>
                        Inicia sesión
                    </Text>

                    <InputText
                        textTitle='Correo electrónico'
                        placeholderProp='tu@correo.com'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        borderColor='#D1D5DB'
                        backgroundColor='#FFFFFF'
                        height={56}
                        borderRadius={12}
                        titleColor='#6B7280'
                        titleSize={14}
                        inputColor='#1A1A1A'
                        inputSize={16}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <InputText
                        textTitle='Contraseña'
                        placeholderProp='••••••••'
                        secureTextEntry={true}
                        borderColor='#D1D5DB'
                        backgroundColor='#FFFFFF'
                        height={56}
                        borderRadius={12}
                        titleColor='#6B7280'
                        titleSize={14}
                        inputColor='#1A1A1A'
                        inputSize={16}
                        showPasswordToggle={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <View style={{ alignItems: 'flex-start', marginTop: 16, marginBottom: 40 }}>
                        <BtnLogin
                            text='¿Olvidaste tu contraseña?'
                            variant='link'
                            alignSelf='flex-start'
                            textColor='#1A1A1A'
                            fontSize={14}
                            textDecorationLine='underline'
                        />
                    </View>

                    <View style={{ alignItems: 'flex-start', marginTop: -10, marginBottom: 40 }}>
                        <BtnLogin
                            text='Crear cuenta'
                            variant='link'
                            alignSelf='flex-start'
                            textColor='#1A1A1A'
                            fontSize={14}
                            textDecorationLine='underline'
                            onPress={() => navigation.navigate('GenerarCuentaScreen')}
                        />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 32 }}>
                        <BtnLogin
                            text={isLoading ? 'Verificando...' : 'Iniciar sesión'}
                            variant='primary'
                            height={56}
                            borderRadius={28}
                            backgroundColor='black'
                            textColor='white'
                            fontSize={16}
                            fontWeight='600'
                            onPress={handleLogin}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
