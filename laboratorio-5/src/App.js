import { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";
import SuccessMessage from "./components/SuccessMessage";
import "./styles.css";

export default function App() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    correo: "",
    edad: "",
    carrera: "",
    como_te_sientes: "",
  });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (enviado) {
      const timer = setTimeout(() => setEnviado(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [enviado]);

  const validar = () => {
    let nuevosErrores = {};
    if (!datosFormulario.nombre)
      nuevosErrores.nombre = "Llena nombres y apellidos";
    if (!datosFormulario.correo.includes("@"))
      nuevosErrores.correo = "Ingresa un correo valido";
    if (!datosFormulario.edad || isNaN(datosFormulario.edad))
      nuevosErrores.edad = "Ingresa una edad";
    if (!datosFormulario.carrera) nuevosErrores.carrera = "Ingresa una carrera";
    if (!datosFormulario.como_te_sientes)
      nuevosErrores.como_te_sientes = "Selecciona como te sientes hoy";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarCambio = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validar()) {
      setEnviado(true);
      console.log("Formulario enviado:", enviado);
      setDatosFormulario({
        nombre: "",
        correo: "",
        edad: "",
        carrera: "",
        como_te_sientes: "",
      });
    }
  };

  const progreso = Object.values(datosFormulario).filter(Boolean).length * 20;

  return (
    <div className="container">
      <div className="card">
        <h2>Formulario</h2>
        <ProgressBar progress={progreso} />
        <form onSubmit={manejarEnvio}>
          <div className="input-group">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre y Apellido"
              value={datosFormulario.nombre}
              onChange={manejarCambio}
              className={errores.nombre ? "error" : ""}
            />
            {errores.nombre && (
              <div className="error-text">{errores.nombre}</div>
            )}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="correo"
              placeholder="Correo Electrónico"
              value={datosFormulario.correo}
              onChange={manejarCambio}
              className={errores.correo ? "error" : ""}
            />
            {errores.correo && (
              <div className="error-text">{errores.correo}</div>
            )}
          </div>

          <div className="input-group">
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={datosFormulario.edad}
              onChange={manejarCambio}
              className={errores.edad ? "error" : ""}
            />
            {errores.edad && <div className="error-text">{errores.edad}</div>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="carrera"
              placeholder="Carrera Universitaria"
              value={datosFormulario.carrera}
              onChange={manejarCambio}
              className={errores.carrera ? "error" : ""}
            />
            {errores.carrera && (
              <div className="error-text">{errores.carrera}</div>
            )}
          </div>

          <div className="input-group">
            <p>¿Cómo te sientes hoy?</p>
            {["Con Hambre🍲", "Con Sueño🌘", "Neutral🐲", "Feliz👽"].map(
              (nivel) => (
                <label key={nivel} className="radio-label">
                  <input
                    type="radio"
                    name="como_te_sientes"
                    value={nivel}
                    checked={datosFormulario.como_te_sientes === nivel}
                    onChange={manejarCambio}
                  />
                  {nivel}
                </label>
              )
            )}
            {errores.como_te_sientes && (
              <div className="error-text">{errores.como_te_sientes}</div>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={progreso < 100}
          >
            Enviar
          </button>
        </form>
        {enviado && (
          <>
            <SuccessMessage />
          </>
        )}
      </div>
    </div>
  );
}
