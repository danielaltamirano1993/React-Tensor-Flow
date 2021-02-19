export const drawRect = (detections, ctx) =>{
  // Recorre cada predicción
  detections.forEach(prediction => {

    // Extraer cajas y clases
    const [x, y, width, height] = prediction['bbox']; 
    const text = prediction['class']; 

    // Establecer estilo
    const color = Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeStyle = '#' + color
    ctx.font = '18px Arial';

    // Dibujar rectángulos y texto
    ctx.beginPath();   
    ctx.fillStyle = '#' + color
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height); 
    ctx.stroke();
  });
}
