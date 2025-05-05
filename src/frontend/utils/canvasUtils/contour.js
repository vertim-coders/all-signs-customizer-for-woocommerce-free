// import { fabric } from "fabric"
import contourPath from "./util-contour"

function thresholdImageData(imageData) {
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3]
    const isOpaque = alpha > 0
    const val = isOpaque ? 0 : 255 // noir si visible, blanc sinon
    data[i] = data[i + 1] = data[i + 2] = val
    data[i + 3] = 255 // rendre complètement opaque
  }
  return imageData
}

function prepareForPotrace(imageData) {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // 1. Détection du "fond" (seuil adaptable)
    const isBackground = data[i + 3] < 128; // Alpha < 128 → fond blanc
    
    // 2. Conversion noir/blanc
    data[i] = data[i + 1] = data[i + 2] = isBackground ? 255 : 0;
    
    // 3. Gestion de l'opacité
    data[i + 3] = 255; // Potrace nécessite une image opaque
  }
  
  return imageData;
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


// 🧠 Fonction principale
export async function generateGlobalContour(objectPaths, canvasSize, zoom) {
  const width = canvasSize.width
  const height = canvasSize.height

  // Canvas transparent
  const canvasEl = document.createElement("canvas")
  canvasEl.width = width
  canvasEl.height = height
  const ctx = canvasEl.getContext("2d")
  ctx.clearRect(0, 0, width, height)

  const canvas = new fabric.StaticCanvas(canvasEl, {
    stateful: false,
    renderOnAddRemove: false,
    enableRetinaScaling: false,
  })

  const centerX = width / 2
  const centerY = height / 2

  // Ajouter tous les objets
  objectPaths.forEach(obj => {
    if(obj.textType && obj.textType == "3D"){
      canvas.add(obj.side)
      canvas.add(obj.text)
    }else{
      canvas.add(obj)
    }
  })

  // Zoom automatique
  canvas.zoomToPoint(new fabric.Point(centerX, centerY), zoom)
  canvas.getObjects().forEach(obj => obj.setCoords())
  canvas.renderAll()

  // Extraire ImageData
  const imageData = canvas.getContext().getImageData(0, 0, width, height)
    
  // Convertir en binaire (noir/blanc)
  const binarized = prepareForPotrace(imageData)
  // const binarized = thresholdImageData(imageData)

  // await downloadImageData(binarized)

  // ImageTracer
  const pathString = await contourPath(binarized, 1)
  // const pathString = await contourPath(imageData, 1)


  // Fabric.Path
  let contour
  await fabric.loadSVGFromString(pathString.svg, function (image) {
    const img = fabric.util.groupSVGElements(image);
    contour = img
  })

  // const contour = new fabric.Path(pathString.path.join(" "), {
  //   selectable: false,
  //   uniScaleTransform: true,
  //   centeredScaling: true,
  //   stroke: 1,
  // })

  // // Ajustement échelle
  // const rawWidth = contour.width || 1
  // const rawHeight = contour.height || 1
  // const widthMm = Calc.pxToMm(rawWidth)
  // const heightMm = Calc.pxToMm(rawHeight)

  // const minW = safeObject.fullData?.min_size?.w || widthMm
  // const minH = safeObject.fullData?.min_size?.h || heightMm

  // let scaleX = minW / widthMm
  // let scaleY = minH / heightMm
  // if (widthMm >= minW) scaleX = 1
  // if (heightMm >= minH) scaleY = 1

  // contour.scaleX = scaleX
  // contour.scaleY = scaleY

  // contour._contourMeta = {
  //   path: pathString,
  //   widthMm,
  //   heightMm,
  //   finalWidthMm: widthMm * scaleX,
  //   finalHeightMm: heightMm * scaleY,
  //   scaleX,
  //   scaleY,
  // }

  return contour
}