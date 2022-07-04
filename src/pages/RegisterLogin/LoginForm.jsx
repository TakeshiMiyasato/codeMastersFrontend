import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (localStorage.getItem('id') != null) {
            navigate('/menu')
        } else {
            return
        }
    }, [])

    const loguear = () => {
        const params = {
            username,
            password
        }
        login(params)
    }

    const login = (params) => {
        axios.post(`http://127.0.0.1:8000/api/login/`, params).then((res) => {
            console.log('postLogin res', res)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('username', username)
            axios.get(`http://127.0.0.1:8000/api/puntosPorJugadores/${res.data.id}`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('postLogin res', res)
                localStorage.setItem('puntajeAnual', res.data.puntajeAnual)
                localStorage.setItem('puntajeTotal', res.data.puntajeTotal)
                localStorage.setItem('nivel', res.data.nivel)
                navigate('/menu')
            }).catch((err) => {
                console.log('Error al iniciar sesion', err)
                window.confirm('Error al iniciar sesion, posiblemente datos erroneos')
            })
            navigate('/menu')
        }).catch((err) => {
            console.log('Error al iniciar sesion', err)
            window.confirm('Error al iniciar sesion, posiblemente datos erroneos')
        })
    }

    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Label><h5>Username</h5></Form.Label>
                    <Form.Control name='username' value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                    <Form.Label><h5>Password</h5></Form.Label>
                    <Form.Control name='password' type='password' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <div style={{ marginTop: '10px' }}><Button name='login' variant='success' onClick={loguear}>Login</Button></div>

                    <div style={{ marginTop: '10px' }}>No tienes cuenta?, crea una <Link to={`/register`}>aqui!</Link></div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default LoginForm;