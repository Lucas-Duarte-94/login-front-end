import { createContext, ReactNode } from "react";
import { api } from '../services/api';
import qs from 'qs';
import { useHistory } from "react-router";

interface DataTypes {
    data: {
        status: boolean;
        token?: string;
        errorMessage?: string;
    }
}

interface LoginValuesProps {
    email: string;
    password: string;
}

export interface AuthContextProps {
    handleLogin: (val: LoginValuesProps) => Promise<string|void>;
    checkToken: () => void;
    handleRegister: (val: LoginValuesProps) => void;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider(props: AuthContextProviderProps): JSX.Element {
    const history = useHistory();

    const checkToken = async () => {
        let token = localStorage.getItem('@tokenJWT');

        let response = await api.get('/get-public-infos', {
            params: {
                token
            }
        })

        console.log(response.data)

    }

    const handleRegister = async (val: LoginValuesProps) => {
        console.log(val);

        let response = await api.post('/register', qs.stringify(val));

        console.log(response);
    }

    const handleLogin = async (val: LoginValuesProps) => {    
        const loginValues = val
    
        try {
            let response: DataTypes = await api.post('/login', qs.stringify(loginValues));

            if(response.data.status && response.data.token){
                localStorage.setItem('@tokenJWT', response.data.token)
                history.push('/logged');
            }else {
                return response.data.errorMessage;
            }
        
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{handleLogin, checkToken, handleRegister}}>
            {props.children}
        </AuthContext.Provider>
    )
}