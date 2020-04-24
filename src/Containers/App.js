import React, { useState } from "react";
import "./App.css";
import Header from "../Components/Header.jsx";
import Content from "../Components/Content.jsx";

const App = (props) => {
  const [videoSeleccionado, setVideoSeleccionado] = useState(null);
  return (
    <div className="App">
      <Header setVideoSeleccionado={setVideoSeleccionado} videoSeleccionado = {videoSeleccionado} setVideoSeleccionado={setVideoSeleccionado}/>
      {videoSeleccionado ? (
        <Content setVideoSeleccionado={setVideoSeleccionado} videoSeleccionado={videoSeleccionado}></Content>
      ) : null}
      {/* {!videoSeleccionado ? (
        <Header setVideoSeleccionado={setVideoSeleccionado} />
      ) : (
        <Content videoSeleccionado={videoSeleccionado} />
      )} */}
    </div>
  );
};

export default App;
//AIzaSyDt1FUMUvGvScVnZQffQTkHoxdKcNK0NLs
