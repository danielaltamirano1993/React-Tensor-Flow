// Daniel Altamirano

// Importar dependencias
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // main()
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Modelo Handpose cargado.");
    //  Bucles y Deteccion de manos
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Verificacion de que los datos estén disponibles
    if (
        // Verificacion de que los datos estén disponibles
      typeof webcamRef.current !== "undefined"  && 
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Obtener las propiedades de video
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Establecer el ancho de video
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Establecer la altura y el ancho del canvas
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Hacer detecciones
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
