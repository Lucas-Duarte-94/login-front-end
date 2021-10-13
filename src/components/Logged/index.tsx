import { useEffect } from "react";
import { useLogin } from "../../hooks/useLogin"

export function Logged() {
    const { checkToken } = useLogin();

    useEffect(() => {
        checkToken();
    }, [])

    return (
        <div className="content">
            <h1>Usuário logado</h1>
        </div>
    )
}