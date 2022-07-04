import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const ProgramacionList = () => {

    const [programacion, setProgramacion] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else {
            fetchProgramacionList()
        }
    }, [])

    const fetchProgramacionList = () => {
        axios.get('http://127.0.0.1:8000/api/programaciones/', {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllDocumentacion res', res.data)
            setProgramacion(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllDocumentacion: ', err)
        })
    }

    return (
        <Container>
            <h2>Ejercicios de programacion</h2>
            <p>
                Hola, si te sientes en confianza de resolver estos ejercicios para recibir
                mas puntos, sientete libre de verlos y resolverlos
            </p>
            <h3>Reglas</h3>
            <p>
                Una vez entres al ejercicio que desees resolver tendras que colocar
                tu codigo que has hecho, una vez enviado no podras volver al ejercicio hasta que
                se haya revisado y que este incorrecto, si el ejercicio que has hecho cumplio satisfactoriamente
                las especificaciones de cada ejercicio, no podras volver a enviar otro codigo del mismo ejercicio
                para evitar el farmeo
            </p>
            <Card>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Ejercicio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programacion.map(programacion =>
                                <tr key={"programacion-" + programacion.id}>
                                    <td><h4><Link to={`/programacionDetail/${programacion.id}`}>{programacion.nombreEjercicio}</Link></h4></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            
        </Container >
    );
}

export default ProgramacionList;