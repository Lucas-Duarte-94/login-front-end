import './style.scss';
import { useState, useEffect, FormEvent } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useHistory } from 'react-router';



export function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { handleLogin, checkToken } = useLogin();

    // const history = useHistory();

    useEffect(() => {
        checkToken();
    }, [])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const loginValues = {
            email,
            password
        }

        let response: string | void = await handleLogin(loginValues);

        console.log(response)

        if(response) {
            setErrorMsg(response);
        }else {
            setErrorMsg('');
        }
    }

    return (
        <div className="content">
            <h1>Teste de integração com o back-end</h1>
            <form onSubmit={handleSubmit} method="POST" >
                <input type="text" placeholder="Digite seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="blue_button" type="submit">Fazer login</button>
            </form>

            <div className="register_text">
                <span>Não tem cadastro? <a href="/register">Clique aqui</a> para registrar</span>
            </div>

            <span className="error_message">{errorMsg}</span>
        </div>
    )
}