import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') != null) {
            navigate('/documentacion')
        } else {
            return
        }
    }, [])

    const guardarDatos = () => {
        const params = {
            username,
            email,
            password
        }
        insertUser(params)
    }

    const insertUser = (params) => {
        axios.post(`http://127.0.0.1:8000/api/register/`, params).then((res) => {
            console.log('postCreateUser res', res)
            const params2 = {
                "idJugador": `${res.data.user.id}`
            }
            axios.post(`http://127.0.0.1:8000/api/puntosPorJugadores/`, params2, { headers: { 'Authorization': `Token ${res.data.token}` } }).then((res) => {
                console.log('postCreateUserPuntaje res', res)
            }).catch((err) => {
                console.log('Error al postCreateUserPuntaje', err)
            })
            navigate('/')
        }).catch((err) => {
            console.log('Error al postCreateUser', err)
        })
    }

    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Label><h5>Username</h5></Form.Label>
                    <Form.Control value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                    <Form.Label><h5>Email</h5></Form.Label>
                    <Form.Control value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <Form.Label><h5>Password</h5></Form.Label>
                    <Form.Control type='password' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <br />
                    <div style={{ marginTop: '10px' }}><Button variant='success' onClick={guardarDatos}>Registrarse</Button></div>
                    <div style={{ marginTop: '10px' }}>Ya tienes una cuenta?, ingresa <Link to={`/`}>aqui!</Link></div>
                </Form>
            </Card.Body>
        </Card>


    );
}

export default LoginForm;