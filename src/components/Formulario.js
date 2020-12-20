import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de Citas

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //funcion que se ejecuta cada vez que el usuario llena los campos solicitados
    const actuallizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    const [error, actualizarError] = useState(false);

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //cuando el usuario agrega la cita

    const submitCita = e => {
        e.preventDefault();

        // Validar

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
        || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        // Eliminar el mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuid();
        //console.log(cita);

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actuallizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de Mascota"
                    onChange={actuallizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actuallizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actuallizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actuallizarState}
                    value={sintomas}
                />

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>

            </form>

        </Fragment>
    )
}

Formulario.prototype = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
