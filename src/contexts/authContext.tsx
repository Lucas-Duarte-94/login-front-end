import { createContext, ReactNode, useState } from "react";
import { api } from '../services/api';
import qs from 'qs';
import { useHistory } from "react-router";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

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

interface PublicInfosProps {
    firstName: string;
    lastName: string;
    avatarURL: string;
    birthDay: string;
    phone: string;
    address: string;
    state: string;
    city: string;
}

interface UpdateInfosProps {
    firstName: string;
    lastName: string;
    bday: string;
    phoneNum: string;
    address: string;
    state: string;
    city: string;
}

export interface AuthContextProps {
    handleLogin: (val: LoginValuesProps) => Promise<string|void>;
    checkToken: () => Promise<AxiosResponse<PublicInfosProps> | undefined>;
    handleRegister: (val: LoginValuesProps) => Promise<string | undefined>;
    addProfileAvatar: (fd: FormData) => Promise<any | undefined>;
    updateInfo: (dados: UpdateInfosProps) => Promise<any | undefined>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

interface ImageURL {
    data: {
        fileURL: string
    }
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider(props: AuthContextProviderProps): JSX.Element {
    const history = useHistory();

    const checkToken = async () => {
        let token = localStorage.getItem('@tokenJWT');
        try{
            let infos = await api.get('/get-public-infos', {
                params: {
                    token
                }
            })

            return infos;

        }catch(err) {
            history.push('/')
        }
    }

    const addProfileAvatar = async (fd: FormData) => {
        
        let token = localStorage.getItem('@tokenJWT');
        try {
            let dados: ImageURL = await api.post('/avatar-image', fd, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            let imageURL = dados.data.fileURL;

            return imageURL;

        }catch(err) {
            console.log('Could not upload image.')
        }
    }

    const updateInfo = async (dados: UpdateInfosProps) => {
        let token = localStorage.getItem('@tokenJWT');
        try {
            let res = await api.post('/update-info', qs.stringify(dados), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }catch(err) {

        }
    }

    const handleRegister = async (val: LoginValuesProps) => {
        let response: DataTypes = await api.post('/register', qs.stringify(val));

        console.log(response)

        if(response.data.status && response.data.token){
            localStorage.setItem('@tokenJWT', response.data.token)
            history.push('/user-info');
        }else {
            return response.data.errorMessage;
        }
    }

    const handleLogin = async (val: LoginValuesProps) => {    
        const loginValues = val
    
        try {
            let response: DataTypes = await api.post('/login', qs.stringify(loginValues));

            if(response.data.status && response.data.token){
                localStorage.setItem('@tokenJWT', response.data.token)
                history.push('/user-info');
            }else {
                return response.data.errorMessage;
            }
        
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{handleLogin, checkToken, handleRegister, addProfileAvatar, updateInfo}}>
            {props.children}
        </AuthContext.Provider>
    )
}