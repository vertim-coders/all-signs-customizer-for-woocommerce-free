import ImageTracer from "imagetracerjs"

self.onmessage = function(e) {
    const { imageData, options } = e.data;
    
    // Traitement par ImageTracer (désormais en arrière-plan)
    const svgString = ImageTracer.imagedataToSVG(imageData, options || {});
    
    // Renvoi du résultat au thread principal
    self.postMessage(svgString);
  };