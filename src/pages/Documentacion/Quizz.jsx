import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Card, Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const Quizz = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [nombreLeccion, setNombreLeccion] = useState('')
    const [preguntaQuizz, setPreguntaQuizz] = useState('')
    const [respuestaValue, setRespuestaValue] = useState('0')
    const [puntaje, setPuntaje] = useState(0)

    const [respuestas, setRespuestas] = useState([])

    useEffect(() => {
        fetchUsuarioHaRespondido()
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else if (id !== undefined) {
            fetchDocumento(id)
        } else {
            navigate('/')
        }
    }, [id])

    const fetchUsuarioHaRespondido = () => {
        const params = {
            'idUser': localStorage.getItem('id'),
            'idDocumentacion': id
        }
        axios.post(`http://127.0.0.1:8000/api/documentacionHechaPorJugador/getByUserId/`, params, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('Este usuario ya ha respondido este quiz', res)
            if (res.data.length > 0) {
                window.confirm('Ya has respondido esto, no puedes volver a hacerlo')
                navigate('/')
            }
        }).catch((err) => {
            console.log('Error al adquirir esteUsuarioHaRespondido', err)
        })
    }

    const fetchDocumento = () => {
        axios.get(`http://127.0.0.1:8000/api/documentaciones/${id}`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getSingleDocumento res', res.data)
            setNombreLeccion(res.data.nombreLeccion)
            setPreguntaQuizz(res.data.preguntaQuizz)
            setPuntaje(res.data.puntaje)

            const ree = [
                { name: res.data.respuestaCorrecta, value: '1' },
                { name: res.data.respuestaIncorrecta1, value: '2' },
                { name: res.data.respuestaIncorrecta2, value: '3' },
                { name: res.data.respuestaIncorrecta3, value: '4' }
            ]

            shuffle(ree)
            setRespuestas(ree)
            console.log(ree)

        }).catch((err) => {
            console.log('Error en getSingleDocumento: ', err)
        })
    }

    const shuffle = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };

    const responder = () => {
        if (respuestaValue !== '0') {
            if (respuestaValue === '1') {
                const params = {
                    'usuarioId': localStorage.getItem('id'),
                    'documentacionId': id
                }
                axios.post(`http://127.0.0.1:8000/api/documentacionHechaPorJugador/`, params, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                    console.log('Respondido', res)
                    const params2 = {
                        'idJugador': localStorage.getItem('id'),
                        'puntosAAsignar': puntaje
                    }
                    axios.post(`http://127.0.0.1:8000/api/puntosPorJugadores/leveling/`, params2, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                        console.log('Respondido', res)
                        window.confirm('Respuesta Correcta!')
                        localStorage.setItem('puntajeAnual', res.data.puntajeAnual)
                        localStorage.setItem('puntajeTotal', res.data.puntajeTotal)
                        localStorage.setItem('nivel', res.data.nivel)
                        navigate('/')
                    }).catch((err) => {
                        console.log('Error al post esteUsuarioHaRespondido', err)
                    })

                    window.confirm('Respuesta Correcta!')
                    navigate('/')
                }).catch((err) => {
                    console.log('Error al post esteUsuarioHaRespondido', err)
                })

            } else {
                window.confirm('Respuesta Incorrecta, vuelve a estudiar')
                navigate('/')
            }
        } else {
            window.confirm('Debes seleccionar una respuesta')
        }
    }


    return (
        <Container>
            <h4>{nombreLeccion}</h4>
            <Card>
                <Card.Body>
                    <h5>{preguntaQuizz}</h5>
                    <ButtonGroup>
                        {respuestas.map((respuesta, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`respuesta-${idx}`}
                                type="radio"
                                variant={'outline-success'}
                                name="radio"
                                value={respuesta.value}
                                checked={respuestaValue === respuesta.value}
                                onChange={(e) => setRespuestaValue(e.currentTarget.value)}
                            >
                                {respuesta.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Card.Body>
            </Card>
            <Container align={'center'} style={{ marginTop: '20px' }}>
                <Button variant='success' onClick={responder}>Responder</Button>
            </Container>

        </Container>
    );
}

export default Quizz;