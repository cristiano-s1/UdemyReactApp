import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import api from '../../Services/api';

import './styles.css';
import logoImage from '../../assets/logo.svg'
import padlock from '../../assets/padlock.png'

export default function Login(){

    const[userName, setUserName] = useState('');
    const[password, setPassword] = useState('');

    const navigate = useNavigate();

    async function login(e){
        e.preventDefault(); //Para nao carregar a pagina

        const data = {
            userName,
            password
        };

        try {          
            const response = await api.post('api/auth/v1/signin', data)

            //guardar sessao
            localStorage.setItem('userName', userName);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            
            //Rota para onde vai ser redirecionado
            navigate('/books');

        } catch (error) {

            alert('Login failed! try again!');
        }
    }

    return (
        <div className="login-container">
            <session className="form">
                <img src={logoImage} alt="Logo"/>
                
                <form onSubmit={login} >
                    <h1>Access your Account </h1>
                    
                    <input placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
                    <input type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button className='button' type='submit'>Login</button>
                </form>
            </session>
            <img src={padlock} alt="Login"/>
        </div>
    )
}