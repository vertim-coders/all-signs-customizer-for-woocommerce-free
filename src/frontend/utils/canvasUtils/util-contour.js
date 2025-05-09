import concaveman from "concaveman"
import * as StackBlur from "stackblur-canvas"
import Potrace from "./protace"
import ImageTracer from "imagetracerjs"

function floodFill(x, y, pixels, color) {
  const pixelStack = [{ x, y }]
  let linearCoords = (y * pixels.width + x) * 4

  const originalColor = {
    r: pixels.data[linearCoords],
    g: pixels.data[linearCoords + 1],
    b: pixels.data[linearCoords + 2],
    a: pixels.data[linearCoords + 3],
  }

  while (pixelStack.length > 0) {
    const newPixel = pixelStack.shift()
    if (!newPixel) return pixels

    x = newPixel.x
    y = newPixel.y
    linearCoords = (y * pixels.width + x) * 4

    while (
      y-- >= 0 &&
      pixels.data[linearCoords] === originalColor.r &&
      pixels.data[linearCoords + 1] === originalColor.g &&
      pixels.data[linearCoords + 2] === originalColor.b &&
      pixels.data[linearCoords + 3] === originalColor.a
    ) {
      linearCoords -= pixels.width * 4
    }

    linearCoords += pixels.width * 4
    y++

    let reachedLeft = false
    let reachedRight = false

    while (
      y++ < pixels.height &&
      pixels.data[linearCoords] === originalColor.r &&
      pixels.data[linearCoords + 1] === originalColor.g &&
      pixels.data[linearCoords + 2] === originalColor.b &&
      pixels.data[linearCoords + 3] === originalColor.a
    ) {
      pixels.data[linearCoords] = color.r
      pixels.data[linearCoords + 1] = color.g
      pixels.data[linearCoords + 2] = color.b
      pixels.data[linearCoords + 3] = color.a

      if (x > 0) {
        const offset = linearCoords - 4
        if (
          pixels.data[offset] === originalColor.r &&
          pixels.data[offset + 1] === originalColor.g &&
          pixels.data[offset + 2] === originalColor.b &&
          pixels.data[offset + 3] === originalColor.a
        ) {
          if (!reachedLeft) {
            pixelStack.push({ x: x - 1, y })
            reachedLeft = true
          }
        } else if (reachedLeft) {
          reachedLeft = false
        }
      }

      if (x < pixels.width - 1) {
        const offset = linearCoords + 4
        if (
          pixels.data[offset] === originalColor.r &&
          pixels.data[offset + 1] === originalColor.g &&
          pixels.data[offset + 2] === originalColor.b &&
          pixels.data[offset + 3] === originalColor.a
        ) {
          if (!reachedRight) {
            pixelStack.push({ x: x + 1, y })
            reachedRight = true
          }
        } else if (reachedRight) {
          reachedRight = false
        }
      }

      linearCoords += pixels.width * 4
    }
  }

  return pixels
}

function threshold(pixels) {
  const pxData = pixels.data
  const max = pxData.length
  for (let i = 0; i < max; i += 4) {
    const isTransparent = pxData[i + 3] === 0
    pxData[i] = pxData[i + 1] = pxData[i + 2] = isTransparent ? 255 : 0
    pxData[i + 3] = 255
  }
  return pixels
}

// function threshold(pixels) {
//   const pxData = pixels.data;
//   for (let i = 0; i < pxData.length; i += 4) {
//     // Seuil adaptatif : considère comme "transparent" tout alpha < 128
//     const isTransparent = pxData[i + 3] < 128;
//     // Noir pour les zones visibles, blanc pour le fond
//     pxData[i] = pxData[i + 1] = pxData[i + 2] = isTransparent ? 255 : 0;
//     // Force l'opacité pour Potrace
//     pxData[i + 3] = 255;
//   }
//   return pixels;
// }

function opaquePoints(pixels) {
  // Validation de l'entrée
  if (!pixels?.data || !pixels.width) {
    console.error("Invalid ImageData format", pixels);
    return [];
  }

  const data = pixels.data;
  const width = pixels.width;
  const points = [];

  // Parcours avec vérification des limites
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);

    // Vérification des coordonnées
    if (x >= 0 && x < width && y >= 0 && y < pixels.height) {
      // Seuil de transparence (ajustable)
      if (data[i + 3] > 10) { // Au lieu de !== 0 pour inclure les semi-opaques
        points.push([x, y]);
      }
    }
  }

  return points;
}

function contourCanvas(imageData, concavity, strokeSize) {
  const c = document.createElement("canvas")
  const ctx = c.getContext("2d")

  if (!ctx) throw new Error("Unable to construct canvas")

  const points = opaquePoints(imageData)
  // console.log(points, "concavePoint")
  c.width = imageData.width
  c.height = imageData.height

  if (points.length === 0) points.push([0, 0])

  const polygon = concaveman(points, concavity, 0)
  const start = polygon.shift()

  if (!start || start.length < 2 || start[0] == null || start[1] == null) {
    throw new Error("Canvas contour points are empty")
  }

  ctx.strokeStyle = "black"
  if(strokeSize){
    ctx.lineWidth = strokeSize
  }
  ctx.fillStyle = "black"
  ctx.lineJoin = "round"
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(start[0], start[1])

  for (const point of polygon) {
    ctx.lineTo(point[0], point[1])
  }

  ctx.closePath()
  ctx.stroke()
  ctx.fill()

  return ctx.getImageData(0, 0, c.width, c.height)
}

function downloadImageData(imageData, filename = 'image.png') {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url); // Libère la mémoire
  }, 'image/png');
}
function extractPathsFromSVGString(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  // const paths = doc.querySelectorAll("path");
  const paths = Array.from(doc.querySelectorAll("path")); // ou [...svg.querySelectorAll("path")]
  const dList = paths.map(p => p.getAttribute("d"));

  // return Array.from(paths).map(path => path.getAttribute("d"));
  return dList;
}
function removeBorderPathBySize(svgString, width, height) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");

  const paths = doc.querySelectorAll("path");
  // const target = `L ${height} ${width}`;
  const target = ` L ${width} ${height} `;

  // paths.forEach(path => {
  //   const d = path.getAttribute("d");
  //   if (d && d.includes(target)) {
  //     path.remove(); // supprime le path de contour
  //   }
  // });

  return new XMLSerializer().serializeToString(doc);
}


// const tracerWorker = new Worker(new URL('./image-tracer-worker.js', import.meta.url), {
//   type: 'module'
// });
// // const tracerWorker = new Worker('./image-tracer-worker.js');
// function convertImageToSVG(imageData, userOptions = {}) {
//   return new Promise((resolve) => {
//     // Écoute des résultats
    
//     tracerWorker.onmessage = (e) => resolve(e.data);
    
//     // Envoi des données au Worker
//     tracerWorker.postMessage({ imageData, userOptions });
//     console.log(tracerWorker, "77777")
//   });
// }


async function contourPath(source, blur, strokeSize) {
  const sourceWidth = source.width
  const sourceHeight = source.height
  let imageData = source


  imageData = floodFill(0, 0, imageData, { r: 0, g: 0, b: 0, a: 0 })
  imageData = contourCanvas(imageData, 0.5)
  
  
  StackBlur.imageDataRGBA(imageData, 0, 0, imageData.width, imageData.height, Math.round(blur))
  imageData = contourCanvas(imageData, 1, strokeSize)
  // imageData = threshold(imageData)
  // await downloadImageData(imageData)

  const c = document.createElement("canvas")
  const ctx = c.getContext("2d")
  if (!ctx) throw new Error("Unable to construct canvas")

  c.width = sourceWidth
  c.height = sourceHeight
  ctx.putImageData(imageData, 0, 0)

  // const pathList = Potrace.fromImage(c)

  let options = {
    blurradius: 1,         // pas de blur
    pathomit: 1,           // ignore les petits détails
    colorsampling: 1,      // évite de détecter trop de couleurs
    numberofcolors: 2,     // limite les couleurs détectées
    strokewidth: 0,        // pas de bordures
    linefilter: true,      // évite de choper du bruit de contour
    ltres: 1,           // simplification des lignes
    qtres: 1,           // simplification des courbes
    scale: 1,            // (l'image est déjà réduite)
    viewbox: true        // Évite les transformations inutiles

  }

  //methode utilisant un web worker pour limiter l'incidence sur l'interface 
  // let pathList = await convertImageToSVG(imageData, options);

  let pathList = await ImageTracer.imagedataToSVG(imageData, options);
  let cleanedSVG = removeBorderPathBySize(pathList, sourceWidth, sourceHeight)



  return {
    path: pathList,
    width: sourceWidth,
    height: sourceHeight,
    svg: cleanedSVG,
  }
}

export default contourPath
