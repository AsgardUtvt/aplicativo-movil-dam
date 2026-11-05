import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginParams } from '../navigator/LoginStackNavigator';
import { useUserApi, UserRespose } from '../hooks/useUserApi';
import { useAutoApi, AutosResponse } from '../hooks/useAutoApi';
import { AuthContext, AuthState } from '../context/AuthContext';
import { useContext } from 'react';

interface Props extends StackScreenProps<LoginParams, 'UsuarioScreen'> {}

export const UsuarioScreen = ({ navigation }: Props) => {
    const [activeTab, setActiveTab] = useState<'users' | 'autos'>('users');
    const { listUser, loadUsers, isLoading: isLoadingUsers } = useUserApi();
    const { listAutos, loadAutos, isLoading: isLoadingAutos } = useAutoApi();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        loadUsers();
        loadAutos();
    }, []);

    const renderUser = ({ item }: { item: UserRespose }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('GenerarCuentaScreen', item as any)}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                paddingVertical: 16,
                paddingHorizontal: 20,
                marginBottom: 12,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                elevation: 2
            }}
        >
            <View style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#F3F4F6',
                borderWidth: 2,
                borderColor: '#D1D5DB',
                marginRight: 16,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                {item.image ? (
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                        style={{ width: '100%', height: '100%' }}
                    />
                ) : (
                    <Text style={{ fontSize: 20, color: '#9CA3AF' }}>
                        {item.username?.charAt(0).toUpperCase()}
                    </Text>
                )}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1A1A1A' }}>
                    {item.username}
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                    {item.email}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderAuto = ({ item }: { item: AutosResponse }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AutoFormScreen', item)}
            style={{
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
                padding: 16,
                marginBottom: 12,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                elevation: 2
            }}
        >
            <View style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: '#F3F4F6',
                marginRight: 16,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                {item.imagen1 ? (
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${item.imagen1}` }}
                        style={{ width: '100%', height: '100%' }}
                    />
                ) : (
                    <Text style={{ fontSize: 30 }}>🚗</Text>
                )}
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#1A1A1A' }}>
                    {item.marca} {item.modelo}
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                    Placas: {item.placas}
                </Text>
                <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                    Año: {item.ano} | KM: {item.kilometraje}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
            <View style={{
                paddingHorizontal: 32,
                paddingTop: 60,
                paddingBottom: 10,
                backgroundColor: '#FFFFFF'
            }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: '700',
                    color: '#1A1A1A',
                    textAlign: 'center',
                    marginBottom: 20
                }}>
                    Panel de Control
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        logout();
                        navigation.popToTop();
                    }}
                >
                    <Text> Cerrar Sesión</Text>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB'
                }}>
                    <TouchableOpacity
                        onPress={() => setActiveTab('users')}
                        style={{ flex: 1, paddingBottom: 12, alignItems: 'center' }}
                    >
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: activeTab === 'users' ? '#000000' : '#9CA3AF',
                            borderBottomWidth: activeTab === 'users' ? 2 : 0,
                            borderBottomColor: '#000000',
                            paddingBottom: 4
                        }}>
                            Usuarios
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveTab('autos')}
                        style={{ flex: 1, paddingBottom: 12, alignItems: 'center' }}
                    >
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: activeTab === 'autos' ? '#000000' : '#9CA3AF',
                            borderBottomWidth: activeTab === 'autos' ? 2 : 0,
                            borderBottomColor: '#000000',
                            paddingBottom: 4
                        }}>
                            Autos
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={activeTab === 'users' ? listUser : listAutos}
                keyExtractor={(item: any) =>
                    (item.id_user || item.id_propietario || Math.random()).toString()
                }
                renderItem={activeTab === 'users' ? renderUser : renderAuto}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={activeTab === 'users' ? isLoadingUsers : isLoadingAutos}
                        onRefresh={activeTab === 'users' ? loadUsers : loadAutos}
                        tintColor="#1A1A1A"
                    />
                }
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 60 }}>
                        <Text style={{ fontSize: 16, color: '#9CA3AF' }}>
                            No hay {activeTab === 'users' ? 'usuarios' : 'autos'} registrados
                        </Text>
                    </View>
                }
            />

            {activeTab === 'autos' && (
                <TouchableOpacity
                    onPress={() => navigation.navigate('AutoFormScreen')}
                    style={{
                        position: 'absolute',
                        bottom: 30,
                        right: 30,
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        backgroundColor: '#000000',
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3
                    }}
                >
                    <Text style={{ fontSize: 30, color: '#FFFFFF', marginBottom: 2 }}>+</Text>
                    <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: '600' }}>AUTO</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};
