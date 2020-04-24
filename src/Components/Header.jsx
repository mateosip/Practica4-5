import React, { useState, useEffect } from "react";
import axios from "axios";
import cloneDeep from "clone-deep";
import Styles from "../Components/Styles.css";

const Header = (props) => {
  const [urlBusqueda, setUrlBusqueda] = useState({
    baseURL: `https://www.googleapis.com/youtube/v3/search`,
    maxResults: 10,
    q: "",
  });
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (urlBusqueda.q !== "") {
      axios
        .get(urlBusqueda.baseURL, {
          params: {
            key: process.env.REACT_APP_KEY,
            part: "snippet",
            maxResults: urlBusqueda.maxResults,
            q: urlBusqueda.q,
          },
        })
        .then((response) => {
          setResults(response.data.items);
        });
    } else {
      setResults(null);
    }
  }, [urlBusqueda.q]);
  const buscarVideo = () => {
    const newState = cloneDeep(urlBusqueda);
    newState.q = document.getElementById("busqueda").value;
    setUrlBusqueda(newState);
    props.setVideoSeleccionado(null);
  };
  return (
    <div>
      <img
        className="imagenYoutube"
        src="https://i.ytimg.com/vi/QveDZzMwvVQ/maxresdefault.jpg"
        alt=""
      ></img>
      <div className="busquedaBoton">
        <input
          className="busqueda"
          type="text"
          name="Busqueda"
          id="busqueda"
          placeholder="buscar"
          // onChange={() => buscarVideo()}
        ></input>
        <div className="boton" onClick={() => buscarVideo()}>
          Buscar
        </div>
      </div>

      {results
        ? (console.log(results),
          (
            <div className="videosMostrados">
              {/* {!props.videoSeleccionado?(
                
              )} */}
              {!props.videoSeleccionado
                ? results.map((elemento) => {
                    return (
                      <div
                        className="videoMostrado"
                        onClick={() =>
                          props.setVideoSeleccionado(elemento.id.videoId)
                        }
                        key={elemento.etag}
                      >
                        <div className="informacion">
                          <p className="colorDiferente">
                            {elemento.snippet.title}
                          </p>
                          {/* <p className="parrafo">
                            Descripcion:{elemento.snippet.description}
                          </p> */}
                        </div>
                        <div className="imagen">
                          <img
                            className="miniatura"
                            src={elemento.snippet.thumbnails.medium.url}
                            alt=""
                          ></img>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          ))
        : null}
    </div>
  );
};
export default Header;
