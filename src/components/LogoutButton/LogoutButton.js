import styles from './LogoutButton.module.scss'
import { toast } from "react-toastify"
import Axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext';
import Cookies from "js-cookie";

Axios.defaults.withCredentials = true;

function LogoutButton() {
    const { authuser, setAuthuser } = useContext(AuthContext)

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const { id: userId } = authuser;

            await logoutUser(userId);
            Cookies.remove('authToken');

            setAuthuser({
                token: null,
                firstname: null,
                id: null,
            });

            navigate('/');
        } catch (error) {
            toast.error("Erro ao deslogar: " + error.message);
            console.error('Erro ao fazer logout:', error);
        }
    };

    const logoutUser = async (userId) => {
        try {
            await Axios.post('http://localhost:8080/logout', { userId });
            toast.success("Até mais!");
        } catch (error) {
            throw new Error("Erro ao fazer logout: " + error.message);
        }
    };

    return (
        <>
            <button className={styles.button} onClick={handleLogout}>Sair</button>
        </>
    );
}

export default LogoutButton;
