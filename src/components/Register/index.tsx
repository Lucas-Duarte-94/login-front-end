import { FormEvent, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

export function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('');
    const { handleRegister } = useLogin();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        let formInfo = { email, password }

        if( password === verifyPassword ) {
            handleRegister(formInfo)
        }else {
            alert('As senhas não são iguais')
        }
    }

    return (
        <div className="content">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Insira seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Insira sua senha" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Digite novamente sua senha" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} />


                <button className="blue_button" type="submit">Criar cadastro</button>
            </form>
        </div>
    )
}