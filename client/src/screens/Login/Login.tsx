import { useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import s from './Login.module.css';
import { AuthContext } from '../../contexts/auth/auth';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [fetchAPI, loading] = useFetch();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        const response = await fetchAPI({url: 'https://localhost:8000/auth', method: form.method, body: JSON.stringify(formJson) });

        if (!response.ok) return console.error("Adresse mail ou mot de passe incorrect");

        const data = await response.json();
    
        auth.login(data.token);

        if (auth.authState.isAuth) return navigate('/home');
    }

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" placeholder="Email" />
                <input type="password" name="password" id="password" placeholder="Mot de passe" />
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    )
}

export default Login;