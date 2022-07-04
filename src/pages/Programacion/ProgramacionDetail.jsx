import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const ProgramacionDetail = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [nombreEjercicio, setNombreEjercicio] = useState('')
    const [ejercicio, setEjercicio] = useState('')

    const [codigo, setCodigo] = useState('')


    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else if (id !== undefined) {

            fetchDocumento(id)
            fetchValidaciones()
        } else {
            navigate('/')
        }
    }, [id])

    const fetchDocumento = () => {
        axios.get(`http://127.0.0.1:8000/api/programaciones/${id}`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getSingleDocumento res', res.data)
            setNombreEjercicio(res.data.nombreEjercicio)
            setEjercicio(res.data.ejercicio)
        }).catch((err) => {
            console.log('Error en getSingleDocumento: ', err)
        })
    }

    const fetchValidaciones = () => {
        const pa = {
            'idJugador': localStorage.getItem('id'),
            'idProgramacion': id
        }
        axios.post(`http://127.0.0.1:8000/api/programacionHechaPorJugador/getVistoBueno/`, pa, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getValidaciones res', res.data)
            if (res.data.revisado === true && res.data.correcto === false) {
                window.confirm('El codigo que nos has mandado no ha cumplido con las espectativas, vuelve a intentarlo')
            } else if (res.data.revisado === true && res.data.correcto === true) {
                window.confirm('Ya has resuelto satisfactoriamente este ejercicio!')
                navigate('/')
            } else if (res.data.revisado === false && res.data.usuarioId !== null) {
                window.confirm('Tu codigo esta siendo revisado por nuestro administrador, ten paciencia')
                navigate('/')
            } else if (Object.keys(res.data).length === 0) {
                return
            }
        }).catch((err) => {
            console.log('Error en getValidaciones ', err)
        })
    }

    const enviarCodigo = () => {
        const params = new FormData()
        params.append("programacionId", id)
        params.append("codigo", codigo)
        params.append("usuarioId", localStorage.getItem('id'))

        if (window.confirm('Deseas enviar tu codigo?, (si lo envias ahora mismo, no podras volver aqui hasta que se determine si tu codigo es incorrecto)')) {
            axios.post(`http://127.0.0.1:8000/api/programacionHechaPorJugador/`, params, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('postProgramacionHechaporJugador res', res.data)
                setNombreEjercicio(res.data.nombreEjercicio)
                setEjercicio(res.data.ejercicio)
            }).catch((err) => {
                console.log('Error en postProgramacionHechaporJugador: ', err)
            })
            navigate('/')
        }
    }

    return (
        <Container>
            <h2>{nombreEjercicio}</h2>
            <p>{ejercicio}</p>
            <Card style={{ marginBottom: '50px' }}>
                <Card.Body>
                    <div>
                        <p>
                            Coloca tu codigo aqui:
                        </p>
                        <Form>
                            <Form.Control as={'textarea'} rows={15} onChange={(e) => { setCodigo(e.target.value) }}></Form.Control>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
            <Container align={'center'} style={{ marginBottom: '50px' }}>
                <Button onClick={enviarCodigo} variant='success'>Enviar Codigo</Button>
            </Container>
        </Container>

    );
}

export default ProgramacionDetail;