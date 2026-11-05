import { AuthState } from "./AuthContext";

type Actions = 
  | { type: 'singIn'; payload?: { username: string; avatar?: string } }
  | { type: 'logout' }
  | { type: 'changeAvatar', payload: string }
  | { type: 'chageUsername', payload: string };

export const authReducer = (state: AuthState, action: Actions): AuthState => {
  switch (action.type) {
    case 'singIn':
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload?.username || 'Usuario',
        avatar: action.payload?.avatar || undefined
      };

    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        username: undefined,
        avatar: undefined
      };

    case 'chageUsername':
      return {
        ...state,
        username: action.payload
      };

    case 'changeAvatar':
      return {
        ...state,
        avatar: action.payload   // ← aquí estaba el error (antes ponía username)
      };

    default:
      return state;
  }
};
