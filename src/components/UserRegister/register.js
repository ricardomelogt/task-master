import './register.css';
import { users } from '../../data/users';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export const UserRegister = () => {

    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regName, setRegName] = useState('');
    const [regCpf, setRegCpf] = useState('');
    const [regDate, setRegDate] = useState('');
    const [registerFinished, setRegisterFinished] = useState(false);
    
    if ( window.localStorage.getItem('@task-manager/users') === null ) {
        window.localStorage.setItem('@task-manager/users', JSON.stringify(users));
    }

    const localUsers = JSON.parse( window.localStorage.getItem('@task-manager/users') );

    const handleRegister = () => {

        //validação dos campos
        if (
            regEmail.length < 11 ||
            regPassword.length < 6 || regPassword.length > 16 ||
            regName.length < 3 ||
            regCpf.length !== 11 ||
            regDate === ''
            )
            {
            alert('Existem campos inválidos');
            }
        else {
            // criação de um novo objeto de usuário
            let newUser = {
                email: regEmail,
                password: regPassword,
                name: regName,
                cpf: regCpf,
                birth: regDate,
                tasks: []
            };

            // validação da lista de usuários
            let [checkEmail, checkCpf] = [localUsers.find( obj => obj.email === newUser.email ), localUsers.find( obj => obj.cpf === newUser.cpf )];

            if(checkEmail !== undefined || checkCpf !== undefined){
                alert('Email ou CPF já cadastrados.');
            } else {
                localUsers.push(newUser);
                window.localStorage.setItem('@task-manager/users', JSON.stringify(localUsers));
                alert('Usuário cadastrado com sucesso!');
                setRegisterFinished(true);
            }
        }
    };

    if (registerFinished) {
        return <Navigate to='/'/>
    }

    return (
        <div className='register-wrapper'>
            <form className='register-form'>
                <div>
                    <label htmlFor='form-email'>Email:</label>
                    <input className='input-register' id="form-email" type='text' name='email' maxLength='25' onChange={e => setRegEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='form-pwd'>Senha:</label>
                    <input className='input-register' id="form-pwd" type='password' name='pwd' maxLength='20' placeholder='no minímo 6 caracteres...' onChange={e => setRegPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='form-name'>Nome:</label>
                    <input className='input-register' id='form-name' type='text' name='name' maxLength='25' onChange={e => setRegName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='form-cpf'>CPF:</label>
                    <input className='input-register' id='form-cpf' type='number' name='cpf'  maxLength='11' onChange={e => setRegCpf(e.target.value)}></input>
                </div>
                <div>
                    <label className='register-date-label' htmlFor='form-birth'>Data de Nascimento</label>
                    <input className='input-register' id='form-birth' type='date' name='birth'  onChange={e => setRegDate(e.target.value)}></input>
                </div>
                <div>
                    <button type="button" onClick={handleRegister}>Registrar</button>
                    <button type="button"><Link className="back-home" to='/'>Voltar</Link></button>
                </div>
            </form>
        </div>
    )
}