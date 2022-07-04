import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const Ranking = () => {
    const navigate = useNavigate()

    const [ranking, setRanking] = useState([])

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else {
            fetchGetCompetitive()
        }
    }, [])

    const fetchGetCompetitive = () => {
        axios.post(`http://127.0.0.1:8000/api/puntosPorJugadores/getCompetitive/`,{} , { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('postProgramacionHechaporJugador res', res.data)
            setRanking(res.data)
        }).catch((err) => {
            console.log('Error en postProgramacionHechaporJugador: ', err)
        })
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Posicion</th>
                                <th>Username</th>
                                <th>Nivel</th>
                                <th>Puntaje Anual</th>
                                <th>Puntaje Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((programacion, idx) =>
                                <tr key={"programacion-" + programacion.id}>
                                    <td>{idx + 1}</td>
                                    <td><h4>{programacion.user_name}</h4></td>
                                    <td>{programacion.nivel}</td>
                                    <td>{programacion.puntajeAnual}</td>
                                    <td>{programacion.puntajeTotal}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default Ranking;