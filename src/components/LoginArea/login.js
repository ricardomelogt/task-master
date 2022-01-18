import './login.css';
import { users } from '../../data/users';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export const LoginArea = () => {

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [loginOk, setLoginOk] = useState(false);

    if ( window.localStorage.getItem('@task-manager/users') === null ) {
        window.localStorage.setItem('@task-manager/users', JSON.stringify(users));
    }

    const localUsers = JSON.parse(window.localStorage.getItem('@task-manager/users'));
    
    const loginHandler = () => {

        const findUser = localUsers.find( obj => obj.email === user );

        //validação de login
        if ( findUser === undefined || findUser.password !== pwd) {
            alert('Credenciais inválidas'); // login fail
        }
        else {
            window.localStorage.setItem('@task-manager/email', JSON.stringify(user));
            setLoginOk(true);
        }

    };

    if (loginOk) {
        return <Navigate to='/list'/>
    } // se o login for autenticado, prosseguir para a lista de tarefas...

    return (
        <div className="login-wrapper">
            <form className="login-form">
                <div>
                    <label htmlFor='login-user'>Email:</label>
                    <input id='login-user' type='text' name='username' onChange={e => setUser(e.target.value)}></input>
                </div>
                <div>
                <label htmlFor='login-pwd'>Senha:</label>
                    <input id='login-pwd' type='password' name='password' onChange={e => setPwd(e.target.value)}></input>
                </div>
                <div>
                    <button type='button' onClick={loginHandler}>Entrar</button>
                    <Link to="/registro"><button type='button'>Registrar</button></Link>
                </div>
            </form>
        </div>
    )
}