import { AuthState } from "./AuthContext";

type Actions = 
  | { type: 'singIn'; payload?: { username?: string; avatar?: string; ipv4?: string | null } }
  | { type: 'logout' }
  | { type: 'changeAvatar', payload: string }
  | { type: 'chageUsername', payload: string }
  | { type: 'SET_IP', payload: string | null }; // <-- Nueva acción

export const authReducer = (state: AuthState, action: Actions): AuthState => {
  switch (action.type) {
    case 'SET_IP': // <-- Nuevo caso
      return {
        ...state,
        ipv4: action.payload,
      };
    case 'singIn':
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload?.username || 'Usuario',
        avatar: action.payload?.avatar || undefined,
        ipv4: action.payload?.ipv4 ?? state.ipv4, // Mantiene la IP si ya se cargó
      };
    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        username: undefined,
        avatar: undefined,
        // No borramos la ipv4 aquí, sigue siendo la del dispositivo
      };
    case 'chageUsername':
      return { ...state, username: action.payload };
    case 'changeAvatar':
      return { ...state, avatar: action.payload };
    default:
      return state;
  }
};
