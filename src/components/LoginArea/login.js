import './login.css';
import { users } from '../../data/users';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const LoginArea = () => {

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    if ( window.localStorage.getItem('@task-manager/users') === null ) {
        window.localStorage.setItem('@task-manager/users', JSON.stringify(users))
    }

    const localUsers = JSON.parse(window.localStorage.getItem('@task-manager/users'));

    const loginHandler = () => {

        const findUser = localUsers.find( obj => obj.email === user );

        //validação de login
        if ( findUser === undefined || findUser.password !== pwd) {
            alert('Credenciais inválidas') // login fail
        }
        else {
            alert('Bem vindo!') // login autorizado
        }

    }

    return (
        <div className="login-wrapper">
            <form className="login-form">
                <div>
                    <label htmlFor='username'>Email:</label>
                    <input id='form-user' type='text' name='username' onChange={e => setUser(e.target.value)}></input>
                </div>
                <div>
                <label htmlFor='password'>Senha:</label>
                    <input id='form-pwd' type='password' name='password' onChange={e => setPwd(e.target.value)}></input>
                </div>
                <div>
                    <button type='button' onClick={loginHandler}>Entrar</button>
                    <Link to="/registro"><button type='button'>Registrar</button></Link>
                </div>
            </form>
        </div>
    )
}