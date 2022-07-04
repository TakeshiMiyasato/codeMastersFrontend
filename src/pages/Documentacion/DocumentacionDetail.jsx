import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const DocumentacionDetail = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [nombreLeccion, setNombreLeccion] = useState('')
    const [documentacion, setDocumentacion] = useState('')

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else if (id !== undefined) {
            fetchDocumento(id)
        } else {
            navigate('/')
        }
    }, [id])

    const fetchDocumento = () => {
        axios.get(`http://127.0.0.1:8000/api/documentaciones/${id}`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getSingleDocumento res', res.data)
            setNombreLeccion(res.data.nombreLeccion)
            setDocumentacion(res.data.documentacion)

        }).catch((err) => {
            console.log('Error en getSingleDocumento: ', err)
        })
    }

    const toQuizz = () => {
        navigate(`/quizz/${id}`)
    }

    return (
        <Container>
            <h2>{nombreLeccion}</h2>
            <Card style={{ marginBottom: '50px' }}>
                <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: documentacion }} ></div>
                </Card.Body>
            </Card>
            <Container align={'center'} style={{ marginBottom: '50px' }}>
                <Button onClick={toQuizz} variant='success'>Quizz</Button>
            </Container>
        </Container>

    );
}

export default DocumentacionDetail;