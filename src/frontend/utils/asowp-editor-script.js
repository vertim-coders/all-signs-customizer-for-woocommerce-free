var FontFaceObserver = require("fontfaceobserver");
import opentype from 'opentype.js'
import { load } from 'opentype.js'
import { generateGlobalContour } from "./canvasUtils/contour"
import { generateQRCodeObject } from "./canvasUtils/qrCodeInFabric"
import { genSvgPath } from "./canvasUtils/util-contour"
import {removeBackground}  from "@imgly/background-removal"



var fixingUrl = "";
var borderUrl = "";

if (asowp_data.page == "configurator" || asowp_data.page == "admin") {
  fixingUrl = asowp_configurator_data.fixing_methods_url;
  borderUrl = asowp_configurator_data.borders_url;
}

var canvas = null;
var canvasBackground = "";
var backCanvas = null;
var activeCanvas = canvas;
var doubleFace = false;
var defaultShadow = new fabric.Shadow({
  color: "black",
  offsetX: 3,
  offsetY: 3,
  blur: 30,
  isActive: true,
});
function handleGetCanvas(canvas1, canvas2, statut) {
  // console.log('canvas getted', statut)
  canvas = canvas1;
  backCanvas = canvas2;
  if (statut === "double") {
    doubleFace = true;
  } else {
    doubleFace = false;
  }
  activeCanvas = canvas;
}
var activeSignFace = "front";
function handleCheckActiveSignFace(face) {
  activeSignFace = face;
  // console.log(activeSignFace)
  if (face == "front") {
    activeCanvas = canvas;
  } else {
    activeCanvas = backCanvas;
  }
}

var isTemplate = false;
function handleCheckTemplate(statut) {
  isTemplate = statut;
}

let widthVisibility = false
let heightVisibility = false
function handleGetMeasurementVibility(width, height){
  widthVisibility = width
  heightVisibility = height
}

// function handleCloneCanvas(canvas1, canvas2){
//     console.log("handledqsdqsd")
//     setTimeout(function() {
//         var objects = canvas1.getObjects();
//         var serializedObjects = objects.map(obj => obj.toObject(['id', 'name', 'selectable', 'evented']));
//         var jsonData = canvas1.toJSON();

//         var canvas1State = {
//             jsonData: jsonData,
//             objects: serializedObjects
//         };

//         canvas2.discardActiveObject();
//         var currentObjects = canvas2.getObjects();
//         // currentObjects.forEach(obj => {
//         //     if (!canvas1State.objects.some(prevObj => prevObj.id === obj.id)) {
//         //       // console.log(obj.id, 'undo - borderA');
//         //       canvas2.remove(obj);
//         //     }
//         // });

//         var verifiedId = [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]

//         canvas1State.objects.forEach(prevObj => {
//             const currentObj = currentObjects.find(obj => obj.id === prevObj.id);

//             fabric.util.enlivenObjects([prevObj], objects => {
//                 const newObj = objects[0];
//                 if (verifiedId.includes(newObj.id)){
//                     canvas2.insertAt(newObj, currentObjects.indexOf(currentObj));
//                     canvas2.remove(currentObj);
//                 }
//             });
//         });

//         canvas2.renderAll();

//     },100)
//     // console.log(backCanvas)
// }
function handleCloneCanvas() {
  var jsonData = canvas.toJSON([
    "fill",
    "name",
    "id",
    "selectable",
    "canvasName",
    "priceId",
    "uniScaleTransform",
    "centeredScaling",
    "lockScalingFlip",
    "lockMoving",
    "lockScale",
    "lockRotate",
    "lockEdition",
    "fixingRatio",
    "fixingScale",
    "ratioScale",
    "objectType",
    "imageUrl",
    "fontFamilyUrl",
    "neonColor",
    "glowRadius",
    "secondStrokeWidth",
    "secondStroke",
    "activeSide",
    "sideColor",
    "zIndex",
    "prevWidth",
    "prevHeight",
    "fromData",
    "color",
    "shapeType",
  ]);
  var canvasAsJson = JSON.stringify(jsonData);

  // function recreateState(canva, stateJson){
  // }
  const currentState = JSON.parse(canvasAsJson);
  backCanvas.clear();
  currentState.objects.forEach(function (obj) {
    fabric.util.enlivenObjects([obj], function (prevObject) {
      backCanvas.add(...prevObject);
      backCanvas.renderAll();
    });
  });
}

var currentUnit = "";
var defaultFontSize = 0;
function handleGetCurrentUnit( unit, fontSize, minFontSize, maxFontSize, textFontFam, textFontFamUrl) {
  currentUnit = unit;
  defaultFontSize = fontSize;

  minTextSize = minFontSize;
  maxTextSize = maxFontSize;

  currenTextFontFam = textFontFam;
  currenTextFontFamUrl = textFontFamUrl;

  // console.log(currenTextFontFam, "currenTextFontFam")
}

var visualizerText = {};
function handleGetDefaultText(object) {
  visualizerText = object;
}
var textType = "normal"
function handleGetTextType(type){
  textType = type;
}

var defaultShadow = new fabric.Shadow({
  color: "black",
  offsetX: 3,
  offsetY: 3,
  blur: 30,
  isActive: true,
});

function handleCheckObjects() {
  var objects = canvas.getObjects();

  return objects;
}

function addUniqueObject(arr, obj, key) {
  const index = arr.findIndex((item) => item[key] === obj[key]);
  if (index !== -1) {
    arr[index] = obj;
  } else {
    arr.push(obj);
  }
}

//Fonction de sauvegarde de l'état du canvas et des actions undo et redo
let myjson;
var state = [];
var mods = 0;

let currentStateIndex = 0;

var currentConfig = {
  canvasState: [],
  canvasObjects: [],
  currentStateIndex: -1,
  undoStatus: false,
  redoStatus: false,
  undoFinishedStatus: 1,
  redoFinishedStatus: 1,
};
function updateModifications(good, position) {
  // console.log(position)
  if (currentConfig.undoStatus == false && currentConfig.redoStatus == false) {
    canvas.getObjects().forEach((obj, index) => {
      obj.zIndex = index;
    });

    backCanvas.getObjects().forEach((obj, index) => {
      obj.zIndex = index;
    });
    var objects = {
      texts: [...addedTexts],
      images: [...addedImages],
      qrCodes: [...addedQRCodes],
      maxChars: maxTextCharForSize,
      fixScale: fixScale,
      sizeRatio: sizeRatio,
      shape: selectedShape,
      fixingMethode: activeFixingMethode,
      border: {
        face1: {
          type: activeBorder,
          color: activeBorderColor,
        },
        face2: {
          type: activeBorder2,
          color: activeBorderColor2,
        },
      },
    };
    var frontJsonData = canvas.toJSON([
      "type",
      "fill",
      "name",
      "id",
      "selectable",
      "canvasName",
      "priceId",
      "price",
      "uniScaleTransform",
      "centeredScaling",
      "lockScalingFlip",
      "lockMoving",
      "lockScale",
      "lockRotate",
      "lockEdition",
      "fixingRatio",
      "fixingScale",
      "ratioScale",
      "objectType",
      "imageUrl",
      "fontFamilyUrl",
      "neonColor",
      "glowRadius",
      "secondStrokeWidth",
      "secondStroke",
      "activeSide",
      "sideColor",
      "zIndex",
      "prevWidth",
      "prevHeight",
      "fromData",
      "color",
      "shapeType",
    ]);
    var backJsonData = backCanvas.toJSON([
      "fill",
      "name",
      "id",
      "selectable",
      "canvasName",
      "priceId",
      "price",
      "uniScaleTransform",
      "centeredScaling",
      "lockScalingFlip",
      "lockMoving",
      "lockScale",
      "lockRotate",
      "lockEdition",
      "fixingRatio",
      "fixingScale",
      "ratioScale",
      "objectType",
      "imageUrl",
      "fontFamilyUrl",
      "neonColor",
      "glowRadius",
      "secondStrokeWidth",
      "secondStroke",
      "activeSide",
      "sideColor",
      "zIndex",
      "prevWidth",
      "prevHeight",
      "fromData",
      "color",
      "shapeType",
    ]);

    // var jsonData = handleGetObjectByName('safeObject', canvas).toObject(['name', 'id', 'selectable']);z
    // console.log(frontJsonData.objects, "qsdqsd");
    // console.log(backJsonData.objects, "qsdqsd");

    var canvasAsJson = JSON.stringify(frontJsonData);
    var backCanvasAsJson = JSON.stringify(backJsonData);

    // console.log(frontJsonData)

    if ( currentConfig.currentStateIndex < currentConfig.canvasState.length - 1 ) {
      var indexToBeInserted = currentConfig.currentStateIndex + 1;
      currentConfig.canvasState[indexToBeInserted] = {
        front: canvasAsJson,
        back: backCanvasAsJson,
      };
      currentConfig.canvasObjects[indexToBeInserted] = objects;
      var numberOfElementsToRetain = indexToBeInserted + 1;
      currentConfig.canvasState = currentConfig.canvasState.splice(
        0,
        numberOfElementsToRetain
      );
    } else {
      currentConfig.canvasState.push({
        front: canvasAsJson,
        back: backCanvasAsJson,
      });
      currentConfig.canvasObjects.push(objects);
    }
    currentConfig.currentStateIndex = currentConfig.canvasState.length - 1;
    if ( currentConfig.currentStateIndex == currentConfig.canvasState.length - 1 && currentConfig.currentStateIndex != -1 ) {
      // currentConfig.redoButton.disabled= "disabled";
    }
  }
  // console.log(currentConfig.canvasState.length, "canvasState JS");
  // console.log(currentConfig.canvasObjects, "canvasObjects JS");
}

function handleUndo() {
  readyToSave = false;

  if (currentConfig.undoFinishedStatus) {
    if (currentConfig.currentStateIndex == -1) {
      currentConfig.undoStatus = false;
    } else {
      if (currentConfig.canvasState.length >= 1) {
        currentConfig.undoFinishedStatus = 0;
        if (currentConfig.currentStateIndex != 0) {
          // currentConfig.undoStatus = true;
          // canvas.loadFromJSON(currentConfig.canvasState[currentConfig.currentStateIndex-1],function(){
          //     var jsonData = JSON.parse(currentConfig.canvasState[currentConfig.currentStateIndex-1]);
          //     canvas.renderAll();
          //     currentConfig.undoStatus = false;
          //     currentConfig.currentStateIndex -= 1;
          //     // currentConfig.undoButton.removeAttribute("disabled");
          //     if(currentConfig.currentStateIndex !== currentConfig.canvasState.length-1){
          //         // currentConfig.redoButton.removeAttribute('disabled');
          //     }
          //     currentConfig.undoFinishedStatus = 1;
          // });
          function recreateState(canva, stateJson) {
            const currentState = JSON.parse(stateJson);
            canva.clear();
            currentState.objects.forEach(function (obj) {
              fabric.util.enlivenObjects([obj], function (prevObject) {
                if (prevObject[0].name === "safeObject") {
                  if (typeof prevObject[0].fill !== "string") {
                    prevObject[0].fill = "transparent";
                  }
                }
                if (prevObject[0].name === "asowp-SignText" || prevObject[0].type === "neon-Text") {
                  prevObject[0].on("editing:entered", () => {
                    handleGetAddedTextValues(prevObject[0]);
                  });
                  prevObject[0].on("editing:exited", () => {
                    handleGetAddedTextValues(prevObject[0]);
                    resizeText(prevObject[0]);
                  });
                  prevObject[0].on("selected", () => {
                    handleGetAddedTextValues(prevObject[0]);
                  });
                  prevObject[0].on("mousedown", function () {
                    handleGetAddedTextValues(prevObject[0]);
                    reScaleText(prevObject[0]);
                  });
                  prevObject[0].on("mouseup", function () {
                    handleGetAddedTextValues(prevObject[0]);
                    reScaleText(prevObject[0]);
                  });
                  prevObject[0].name = "asowp-SignText"
                  prevObject[0].canvasName = canva.name
                  prevObject[0].clipPath = null
                  prevObject[0].uniScaleTransform = true,
                  prevObject[0].centeredScaling = true,
                  prevObject[0].lockScalingFlip = true,
                  prevObject[0].evented = true,
                  prevObject[0].originX = "center",
                  prevObject[0].originY = "center",

                  prevObject[0].setControlsVisibility({
                    mt: false, // Middle top
                    mb: false, // Middle bottom
                    ml: false, // Middle left
                    mr: false, // Middle right
                    bl: true, // Bottom left
                    br: true, // Bottom right
                    tl: true, // Top left
                    tr: true, // Top right
                  });

                  console.log(prevObject[0], "asowp-SignText")

                }
                if (prevObject[0].name === "asowp-SignImage") {
                  prevObject[0].on("mousedown", function () {
                    handleGetAddedImageValues(prevObject[0]);
                  });
                  prevObject[0].on("mouseup", function () {
                    handleGetAddedImageValues(prevObject[0]);
                  });
                  prevObject[0].setControlsVisibility({
                    mt: false, // Middle top
                    mb: false, // Middle bottom
                    ml: false, // Middle left
                    mr: false, // Middle right
                    bl: true, // Bottom left
                    br: true, // Bottom right
                    tl: true, // Top left
                    tr: true, // Top right
                  });
                }
                canva.add(...prevObject);
                canva.renderAll();
              });
            });
          }

          recreateState( canvas, currentConfig.canvasState[currentConfig.currentStateIndex - 1].front );
          recreateState( backCanvas, currentConfig.canvasState[currentConfig.currentStateIndex - 1].back );

          selectedShape = currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].shape

          if (activeSignFace === "front") {
            handleSelectBorder( currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].border.face1.type );
            handlechangeBorderColor( currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].border.face1.color );
          } else {
            handleSelectBorder( currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].border.face2.type );
            handlechangeBorderColor( currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].border.face2.color );
          }

          addedTexts = [];
          canvas.getObjects().forEach(function (obj) {
            if (obj.name === "asowp-SignText") {
              // console.log(obj);
              addedTexts.push(obj);
            }
          });
          backCanvas.getObjects().forEach(function (obj) {
            if (obj.name === "asowp-SignText") {
              // console.log(obj);
              addedTexts.push(obj);
            }
          });

          // addedTexts = [...currentConfig.canvasObjects[currentConfig.currentStateIndex-1].texts]
          maxTextCharForSize = currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].maxChars;
          addedImages = currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].images;
          addedQRCodes = currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].qrCodes;


          fixScale = currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].fixScale;
          sizeRatio = currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].sizeRatio;

          activeFixingMethode = currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].fixingMethode

          handleSelectFixingMethode(currentConfig.canvasObjects[currentConfig.currentStateIndex - 1].fixingMethode)

          currentConfig.undoStatus = false;
          currentConfig.currentStateIndex -= 1;
          // currentConfig.undoButton.removeAttribute("disabled");
          if (
            currentConfig.currentStateIndex !==
            currentConfig.canvasState.length - 1
          ) {
            // currentConfig.redoButton.removeAttribute('disabled');
          }
          currentConfig.undoFinishedStatus = 1;
        } else if (currentConfig.currentStateIndex == 0) {
          canvas.clear();
          backCanvas.clear();

          // if(activeSignFace === 'front'){
          //     handleSelectBorder(currentConfig.canvasObjects[0].border.face1.type)
          //     handlechangeBorderColor(currentConfig.canvasObjects[0].border.face1.color)
          // }else{
          //     handleSelectBorder(currentConfig.canvasObjects[0].border.face2.type)
          //     handlechangeBorderColor(currentConfig.canvasObjects[0].border.face2.color)
          // }

          addedTexts = [...currentConfig.canvasObjects[0].texts];
          maxTextCharForSize = currentConfig.canvasObjects[0].maxChar;
          addedImages = currentConfig.canvasObjects[0].images;
          addedQRCodes = currentConfig.canvasObjects[0].qrCodes;

          fixScale = currentConfig.canvasObjects[0].fixScale;
          sizeRatio = currentConfig.canvasObjects[0].sizeRatio;

          currentConfig.undoFinishedStatus = 1;
          // currentConfig.undoButton.disabled= "disabled";
          // currentConfig.redoButton.removeAttribute('disabled');
          currentConfig.currentStateIndex -= 1;
        }
      }
    }
  }
  FtextObjects = handleGetTextObjects1("asowp-SignText");
  BtextObjects = handleGetTextObjects2("asowp-SignText");
  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;

  centerSign(canvas);
  centerSign(backCanvas);

  readyToSave = true;
  return {
    texts: addedTexts,
    images: addedImages,
    qrCodes: addedQRCodes,
  };
}

function handleRedo() {
  readyToSave = false;

  if (currentConfig.redoFinishedStatus) {
    if (
      currentConfig.currentStateIndex == currentConfig.canvasState.length - 1 &&
      currentConfig.currentStateIndex != -1
    ) {
      // currentConfig.redoButton.disabled= "disabled";
    } else {
      if (
        currentConfig.canvasState.length > currentConfig.currentStateIndex &&
        currentConfig.canvasState.length != 0
      ) {
        currentConfig.redoFinishedStatus = 0;
        currentConfig.redoStatus = true;
        // canvas.loadFromJSON(currentConfig.canvasState[currentConfig.currentStateIndex+1].front,function(){
        //     var jsonData = JSON.parse(currentConfig.canvasState[currentConfig.currentStateIndex+1].front);
        //     console.log(jsonData);
        //     canvas.renderAll();
        //     }
        // );

        function recreateState(canva, stateJson) {
          const currentState = JSON.parse(stateJson);
          canva.clear();
          currentState.objects.forEach(function (obj) {
            fabric.util.enlivenObjects([obj], function (prevObject) {
              if (prevObject[0].name === "safeObject") {
                if (typeof prevObject[0].fill !== "string") {
                  prevObject[0].fill = "transparent";
                }
              }
              if (prevObject[0].name === "asowp-SignText" || prevObject[0].type === "neon-Text") {
                prevObject[0].on("editing:entered", () => {
                  handleGetAddedTextValues(prevObject[0]);
                });
                prevObject[0].on("editing:exited", () => {
                  handleGetAddedTextValues(prevObject[0]);
                  resizeText(prevObject[0]);
                });
                prevObject[0].on("selected", () => {
                  handleGetAddedTextValues(prevObject[0]);
                });
                prevObject[0].on("mousedown", function () {
                  handleGetAddedTextValues(prevObject[0]);
                  reScaleText(prevObject[0]);
                });
                prevObject[0].on("mouseup", function () {
                  handleGetAddedTextValues(prevObject[0]);
                  reScaleText(prevObject[0]);
                });
                prevObject[0].name = "asowp-SignText"
                prevObject[0].canvasName = canva.name
                prevObject[0].clipPath = null
                prevObject[0].uniScaleTransform = true,
                prevObject[0].centeredScaling = true,
                prevObject[0].lockScalingFlip = true,
                prevObject[0].evented = true,
                prevObject[0].originX = "center",
                prevObject[0].originY = "center",

                prevObject[0].setControlsVisibility({
                  mt: false, // Middle top
                  mb: false, // Middle bottom
                  ml: false, // Middle left
                  mr: false, // Middle right
                  bl: true, // Bottom left
                  br: true, // Bottom right
                  tl: true, // Top left
                  tr: true, // Top right
                });
              }
              if (prevObject[0].name === "asowp-SignImage") {
                prevObject[0].on("mousedown", function () {
                  handleGetAddedImageValues(prevObject[0]);
                });
                prevObject[0].on("mouseup", function () {
                  handleGetAddedImageValues(prevObject[0]);
                });
                prevObject[0].setControlsVisibility({
                  mt: false, // Middle top
                  mb: false, // Middle bottom
                  ml: false, // Middle left
                  mr: false, // Middle right
                  bl: true, // Bottom left
                  br: true, // Bottom right
                  tl: true, // Top left
                  tr: true, // Top right
                });
              }
              canva.add(...prevObject);
              canva.renderAll();
            });
          });
        }

        recreateState(
          canvas,
          currentConfig.canvasState[currentConfig.currentStateIndex + 1].front
        );
        recreateState(
          backCanvas,
          currentConfig.canvasState[currentConfig.currentStateIndex + 1].back
        );

        selectedShape = currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].shape

        if (activeSignFace === "front") {
          handleSelectBorder( currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].border.face1.type );
          handlechangeBorderColor( currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].border.face1.color );
        } else {
          handleSelectBorder( currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].border.face2.type );
          handlechangeBorderColor( currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].border.face2.color );
        }

        addedTexts = [];
        canvas.getObjects().forEach(function (obj) {
          if (obj.name === "asowp-SignText") {
            // console.log(obj);
            addedTexts.push(obj);
          }
        });
        backCanvas.getObjects().forEach(function (obj) {
          if (obj.name === "asowp-SignText") {
            // console.log(obj);
            addedTexts.push(obj);
          }
        });

        // addedTexts = currentConfig.canvasObjects[currentConfig.currentStateIndex+1].texts
        maxTextCharForSize = currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].maxChars;
        addedImages = currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].images;
        addedQRCodes = currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].qrCodes;


        fixScale = currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].fixScale;
        sizeRatio = currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].sizeRatio;

        activeFixingMethode = currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].fixingMethode

        handleSelectFixingMethode(currentConfig.canvasObjects[currentConfig.currentStateIndex + 1].fixingMethode)

        currentConfig.redoStatus = false;
        currentConfig.currentStateIndex += 1;
        if (currentConfig.currentStateIndex != -1) {
          // currentConfig.undoButton.removeAttribute('disabled');
        }
        currentConfig.redoFinishedStatus = 1;
        if (
          currentConfig.currentStateIndex ==
          currentConfig.canvasState.length - 1 &&
          currentConfig.currentStateIndex != -1
        ) {
          //   currentConfig.redoButton.disabled= "disabled";
        }
      }
    }
  }
  FtextObjects = handleGetTextObjects1("asowp-SignText");
  BtextObjects = handleGetTextObjects2("asowp-SignText");
  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;

  // console.log(currentConfig.canvasObjects, "Redo");
  centerSign(canvas);
  centerSign(backCanvas);

  readyToSave = true;

  return {
    texts: addedTexts,
    images: addedImages,
    qrCodes: addedQRCodes,
  };
}

function handleClearAll() {
  currentConfig.undoStatus = true;

  function recreateState(canva, stateJson) {
    const currentState = JSON.parse(stateJson);
    canva.clear();
    currentState.objects.forEach(function (obj) {
      fabric.util.enlivenObjects([obj], function (prevObject) {
        // if(prevObject[0].name === 'asowp-SignText'){
        //     prevObject[0].on('editing:entered', () => {
        //         handleGetAddedTextValues(prevObject[0]);
        //     });
        //     prevObject[0].on('editing:exited', () => {
        //         handleGetAddedTextValues(prevObject[0]);
        //         resizeText(prevObject[0]);
        //     });
        //     prevObject[0].on('selected', () => {
        //         handleGetAddedTextValues(prevObject[0]);
        //     });
        //     prevObject[0].on('mousedown', function() {
        //         handleGetAddedTextValues(prevObject[0]);
        //     });
        //     prevObject[0].on('mouseup', function() {
        //         handleGetAddedTextValues(prevObject[0]);
        //     });
        // }
        // if(prevObject[0].name === 'asowp-SignImage'){
        //     prevObject[0].on('mousedown', function() {
        //         handleGetAddedImageValues(prevObject[0]);
        //     });
        //     prevObject[0].on('mouseup', function() {
        //         handleGetAddedImageValues(prevObject[0]);
        //     });
        // }
        canva.add(...prevObject);
        canva.renderAll();
      });
    });
  }
  if (currentConfig.canvasState.length > 0) {
    recreateState(canvas, currentConfig.canvasState[0].front);
    recreateState(backCanvas, currentConfig.canvasState[0].back);
  }

  currentConfig.undoStatus = false;
  // currentConfig.undoButton.removeAttribute("disabled");
  if (
    currentConfig.currentStateIndex !==
    currentConfig.canvasState.length - 1
  ) {
    // currentConfig.redoButton.removeAttribute('disabled');
  }
  currentConfig.undoFinishedStatus = 1;

  currentConfig.canvasState = [];
  currentConfig.canvasObjects = [];
  currentConfig.currentStateIndex -= 1;
  currentConfig.undoFinishedStatus = 1;

  addedImages = [];
  addedTexts = [];
}

var readyToSave = false;
var firstSave = false;
function handleReadyToSaveState(statut, start) {
  if (statut === true) {
    if (start) {
      updateModifications(true, "readyToSave");
      // firstSave = true;
    }
    readyToSave = true;
  } else {
    readyToSave = false;
  }
}

// function centerSign(canva) {
//   var sign = handleGetObjectByName("safeObject", canva);
//   var canvasCenter = getCanvasCenter();
//   const allObjects = canva.getObjects();

//   if (allObjects.length > 0) {
//     const group = new fabric.Group(allObjects);
//     canva.discardActiveObject();

//     // Centrer le groupe
//     group.set("left", canvasCenter.x - sign.width / 2);
//     group.set("top", canvasCenter.y - sign.height / 2);

//     group.setCoords();

//     // currentSizeValues.value.left = canvasCenter.x - sign.width/2
//     // currentSizeValues.value.top = canvasCenter.y - sign.height/2
//     handleGetNewPosition(
//       canvasCenter.x - sign.width / 2,
//       canvasCenter.y - sign.height / 2
//     );

//     // Dégrouper les objets
//     group._restoreObjectsState();
//     canva.remove(group);
//     canva.getObjects().forEach((obj) => {
//       if (obj.name === "asowp-signText") {
//         if (obj.isEditing) {
//           obj.exitEditing();
//         }
//         obj.clipPath = handleClipAddedObject(canva);
//       }
//       if (obj.name === "asowp-SignImage") {
//         obj.clipPath = handleClipAddedObject(canva);
//       }
//       obj.setCoords();
//     });
//   }
//   canva.renderAll();
// }
function centerSign(canva) {
  // 1. Désactiver temporairement le rendu
  canva.renderOnAddRemove = false;
  
  let targetZoom = canva.getZoom()
  let newWidth = canva.getWidth()
  let newHeight = canva.getHeight()
  
  // 2. Trouver l'objet de référence
  const safeObject = handleGetObjectByName("safeObject", canva);
  if (!safeObject) return;

  canva.setWidth(newWidth);
  canva.setHeight(newHeight);

  // 3. Calculer le décalage nécessaire
  const objectCenter = safeObject.getCenterPoint();
  const canvasCenter = {
    x: newWidth / 2,
    y: newHeight / 2
  };
  const offset = {
    x: canvasCenter.x - objectCenter.x,
    y: canvasCenter.y - objectCenter.y
  };

  // 4. Réinitialiser le viewport (essential pour éviter l'accumulation d'erreurs)
  canva.setViewportTransform([1, 0, 0, 1, 0, 0]);
  
  // 5. Appliquer le zoom au centre exact
  canva.zoomToPoint( { x: canvasCenter.x, y: canvasCenter.y }, targetZoom );

  // 6. Déplacer TOUS les objets simultanément
  canva.getObjects().forEach(obj => {
    obj.set({
      left: obj.left + offset.x,
      top: obj.top + offset.y
    }).setCoords();
    if (obj.name === "asowp-signText") {
      if (obj.isEditing) {
        obj.exitEditing();
      }
      obj.clipPath = handleClipAddedObject(canva);
    }
    if (obj.name === "asowp-SignImage") {
      obj.clipPath = handleClipAddedObject(canva);
    }
  });

  // 7. Réactiver le rendu et forcer le refresh
  canva.renderOnAddRemove = true;
  canva.calcOffset();
  canva.renderAll();

  // Vérification visuelle (debug)
  const finalPos = safeObject.getCenterPoint();
  console.log("Centrage réussi:", 
      Math.round(finalPos.x) === Math.round(canvasCenter.x) && 
      Math.round(finalPos.y) === Math.round(canvasCenter.y),
      `Objet: (${Math.round(finalPos.x)},${Math.round(finalPos.y)}) | Canvas: (${Math.round(canvasCenter.x)},${Math.round(canvasCenter.y)})`
  );

  handleGetNewPosition(safeObject.left, safeObject.top)
}

function convertToPx(dimension, unit) {
  var dimensions = dimension;
  var unit = unit;
  if (typeof unit != "undefined" && typeof dimensions != "undefined") {
    switch (unit) {
      case "cm":
        dimensions = dimensions * 120;
        break;
      case "mm":
        dimensions = dimensions * 12;
        break;
      case "in":
        dimensions = dimensions * 300;
        break;
      case "pt":
        dimensions = dimensions / 0.75;
        break;
      case "Px":
        dimensions = dimensions;
      default:
        break;
    }
    return dimensions;
  }
}
function convertFromPx(dimension, unit) {
  var dimensions = dimension;
  var unit = unit;
  if (typeof unit != "undefined" && typeof dimensions != "undefined") {
    switch (unit) {
      case "cm":
        dimensions = dimensions / 120;
        break;
      case "mm":
        dimensions = dimensions / 12;
        break;
      case "in":
        dimensions = dimensions / 300;
        break;
      case "pt":
        dimensions = dimensions * 0.75;
        break;
      case "Px":
        dimensions = dimensions;
      default:
        break;
    }
    return dimensions;
  }
}

var fixScale = 0;
var sizeRatio = "";
var ratioScale = 0;


function handleMiseAEchelle(rW, rH) {
  const maxWidth = 1000;
  const maxHeight = 370;

  // Convertir les dimensions réelles en pixels
  const signWPx = convertToPx(rW, currentUnit);
  const signHPx = convertToPx(rH, currentUnit);

  // Déterminer le scale de base
  fixScale = (signWPx > 10000 || signHPx > 10000) ? 0.25 : 0.35;
  sizeRatio = (signHPx >= signWPx / 2) ? "big" : "small";

  // Calculer le ratio principal
  let ratio, scaledWidth, scaledHeight;
  
  if (signWPx > signHPx) {
    ratio = maxWidth / signWPx;
    scaledWidth = maxWidth;
    scaledHeight = signHPx * ratio;
  } else {
    ratio = maxHeight / signHPx;
    scaledHeight = maxHeight;
    scaledWidth = signWPx * ratio;
  }

  // Vérifier si un ajustement supplémentaire est nécessaire
  if (scaledWidth > maxWidth || scaledHeight > maxHeight) {
    const secondRatio = scaledWidth > maxWidth 
      ? maxWidth / scaledWidth 
      : maxHeight / scaledHeight;
    
    scaledWidth *= secondRatio;
    scaledHeight *= secondRatio;
    ratio *= secondRatio;
  }

  // Stocker les ratios pour la conversion inverse
  activeCanvas.fixingScale = fixScale;
  activeCanvas.fixingRatio = sizeRatio;
  activeCanvas.ratioScale = ratio;
  ratioScale = ratio;

  return {
    width: scaledWidth,
    height: scaledHeight,
    fixScale,
    sizeRatio,
    ratioScale: ratio
  };
}
function handleReverseMiseAEchelle(canvaSign) {
  // // 1. Récupérer les paramètres stockés lors de la mise à l'échelle
  // const { fixingScale, ratioScale } = canvas;

  //controle
  let canvasW, canvasH
  if(canvaSign.type != 'path'){
    canvasW = canvaSign.width
    canvasH = canvaSign.height
  }else{
    let scaleX = canvaSign.scaleX * canvaSign.group.scaleX
    let scaleY = canvaSign.scaleY * canvaSign.group.scaleX
    canvasW = (canvaSign.width + strokeSize) * scaleX
    canvasH = (canvaSign.height + strokeSize) * scaleY
  }
  
  // 2. Annuler le ratio final (signRatio)
  const intermediateW = canvasW ;
  const intermediateH = canvasH ;
  // const intermediateW = canvasW / ratioScale;
  // const intermediateH = canvasH / ratioScale;
  
  // 3. Annuler le scale de base
  const realWidthPx = intermediateW;
  const realHeightPx = intermediateH;
  
  // 4. Convertir en unité réelle
  const realWidth = parseInt(convertFromPx(realWidthPx, currentUnit));
  const realHeight = parseInt(convertFromPx(realHeightPx, currentUnit));
  
  return {
    realWidth,
    realHeight,
    realWidthPx,
    realHeightPx,
    usedScale: ratioScale // Le scale total appliqué
  };
}

function setMeasurmentValue(canvas, mainObject) {
  var Objects = canvas.getObjects();
  Objects.forEach((object) => {
    if (object.name == "heightLine") {
      object.visible = heightVisibility
      object.set({
        x1: mainObject.left + mainObject.width + 30,
        y1: mainObject.top,
        x2: mainObject.left + mainObject.width + 30,
        y2: mainObject.top + mainObject.height,
      });
    }
    if (object.name == "widthLine") {
      object.visible = widthVisibility
      object.set({
        x1: mainObject.left,
        y1: mainObject.top + mainObject.height + 28.5,
        x2: mainObject.left + mainObject.width + 10,
        y2: mainObject.top + mainObject.height + 28.5,
      });
    }
    if (object.name == "height-value") {
      object.visible = heightVisibility
      object.text = String(currentSize.height + " " + currentUnit);
      object.top = mainObject.top + mainObject.height / 2;
      object.left = mainObject.left + mainObject.width + 55;
    }
    if (object.name == "width-value") {
      object.visible = widthVisibility
      object.text = String(currentSize.width + " " + currentUnit);
      object.left = mainObject.left + mainObject.width / 2 - object.width / 2;
      object.top = mainObject.top + (mainObject.height + 35);
    }
    if (object.name == "thickness-value") {
      object.left = mainObject.left + mainObject.width / 2 - object.width / 2;
      object.top = mainObject.top + (mainObject.height + 65);
      object.text = String(
        "Thickness" + ": " + currentThickness + " " + currentUnit
      );
    }
  });
  canvas.renderAll();
}
function setOutlineMeasurmentValue(sign, width, height) {
  var Objects = activeCanvas.getObjects();
  Objects.forEach((object) => {
    if (object.name == "heightLine" || object.name == "widthLine" || object.name == "height-value" || object.name == "width-value" || object.name == "thickness-value") {
      object.set("visible", false);
    }
    // if (object.name == "thickness-value") {
    //   object.left = newRectLeft + newSignWidth / 2 - object.width / 2;
    //   object.top = newRectTop + (newSignHeight + 65);
    //   object.text = String(
    //     "Thickness" + ": " + currentThickness + " " + currentUnit
    //   );
    // }
  });
  activeCanvas.renderAll();

  var outlineWidth = document.getElementById("outline-width");
  var outlineHeight = document.getElementById("outline-height");
  var inputWidth = document.getElementById("outlineSizeWidth");
  var inputHeight = document.getElementById("outlineSizeHeight");

  if(widthVisibility === true && outlineWidth != null){
    outlineWidth.textContent = width
    if(inputWidth){
      inputWidth.value = parseInt(width)
    }
  }
  if(heightVisibility === true && outlineHeight != null){
    outlineHeight.textContent = height
    if(inputHeight){
      inputHeight.value = height
    }
  }
}

function handleGetObjectByName(name, canva) {
  var objects;
  if (canva) {
    objects = canva.getObjects();
  } else {
    objects = activeCanvas.getObjects();
  }
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].name === name) {
      return objects[i];
    }
  }
  return null;
}
function handleGetObjectByNameId(id, name, canva) {
  var objects;
  if (canva) {
    objects = canva.getObjects();
  } else {
    objects = activeCanvas.getObjects();
  }
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].id === id && objects[i].name === name) {
      return objects[i];
    }
  }
  return null;
}

var FtextObjects = [{ text: "" }];
var BtextObjects = [{ text: "" }];
function handleGetTextObjects1(name) {
  var array = [];
  FtextObjects = [];
  var objects;
  objects = canvas.getObjects();
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].name === name) {
      function addUniqueObject(arr, obj, key) {
        const exists = arr.some((item) => item[key] === obj[key]);
        if (!exists) {
          obj.set("canvas", canvas);
          arr.push(obj);
        }
      }
      addUniqueObject(FtextObjects, objects[i], "id");
    }
  }
  return FtextObjects;
}
function handleGetTextObjects2(name) {
  var array = [];
  BtextObjects = [];
  var objects;
  // if(canva){
  // }
  objects = backCanvas.getObjects();
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].name === name) {
      function addUniqueObject(arr, obj, key) {
        const exists = arr.some((item) => item[key] === obj[key]);
        if (!exists) {
          arr.push(obj);
        }
      }
      addUniqueObject(BtextObjects, objects[i], "id");
    }
  }
  return BtextObjects;
}

var currentWidth = 0;
var currentHeight = 0;
var currentTop = 0;
var currentLeft = 0;
var currentSizeName = "";
var currentSize = {};

var preWidth = 0;
var preHeight = 0;
var firstWidth = 0;
var firstHeight = 0;

var maxTextCharForSize = 0;

var firstLoad = false;
// function checkCharsLenght(){
//     FtextObjects = handleGetTextObjects1('asowp-SignText')
//     BtextObjects = handleGetTextObjects2('asowp-SignText')

//     frontTextCharLength = sumOptionsPrice(FtextObjects, 'text').length
//     backTextCharLength = sumOptionsPrice(BtextObjects, 'text').length

//     console.log(frontTextCharLength, backTextCharLength, "asowp-SignText")

// }
function getCanvasCenter() {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const viewportTransform = canvas.viewportTransform;

  // Coordonnées du centre du canvas avant la transformation de viewport
  const untransformedCenter = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
  };

  // Appliquer la transformation de viewport inverse aux coordonnées du centre
  const invertedTransform = fabric.util.invertTransform(viewportTransform);
  const transformedCenter = fabric.util.transformPoint(
    untransformedCenter,
    invertedTransform
  );

  return transformedCenter;
}
var signLeft = 0;
var signTop = 0;
function handleGetNewPosition(left, top) {
  // console.log(left + " cwxcwxcwxc " + top )
  signLeft = left;
  signTop = top;
}
function handleChangeSize(width, height, name, maxChar) {
  maxTextCharForSize = maxChar;

  currentSizeName = name;
  currentSize = { width: width, height: height, label: name };

  let scaleValues = handleMiseAEchelle(width, height)

  sizeRatio = scaleValues.sizeRatio;
  fixScale = scaleValues.fixScale;

  currentWidth = scaleValues.width;
  currentHeight = scaleValues.height;

  var newSignWidth = scaleValues.width;
  var newSignHeight = scaleValues.height;

  var stop = false;
  if (firstLoad) {
    if (maxChar != -1) {
      FtextObjects = handleGetTextObjects1("asowp-SignText");
      BtextObjects = handleGetTextObjects2("asowp-SignText");

      function adjustTextCharacters(textObjects, maxCharacters, canva) {
        let totalCharacters = 0;

        // Calculer le nombre total de caractères dans les objets "text"
        textObjects.forEach((obj) => {
          totalCharacters += obj.text.length;
        });

        // Si le total est inférieur ou égal au maximum, on ne fait rien
        if (totalCharacters <= maxCharacters) {
          return;
        }

        // Sinon, on commence par supprimer des caractères du dernier objet
        let charsToRemove = totalCharacters - maxCharacters;
        for (let i = textObjects.length - 1; i >= 0; i--) {
          const obj = textObjects[i];
          // obj.set('canvas', activeCanvas);
          if (obj.text.length > charsToRemove) {
            canva.discardActiveObject();
            canva.remove(obj);
            // Supprimer les caractères en trop de cet objet
            obj.text = obj.text.slice(0, obj.text.length - charsToRemove);
            obj.set("text", obj.text);

            if(textType === "3D"){
              var textLayer = null
              var objects = activeCanvas.getObjects();
              objects.forEach(function(object) {
                if(object.id == obj.id && object.name == "asowp-SignTextLayer"){
                  textLayer = object
                }
              })
        
              activeCanvas.remove(textLayer)
              
              textLayer.text = textLayer.text.slice( 0, obj.text.length - charsToRemove);
              textLayer.set("text", obj.text);
        
              activeCanvas.add(textLayer)
            } 

            canva.add(obj);
            obj.set("scaleX", obj.scaleX + 0.001);
            obj.set("scaleY", obj.scaleY + 0.001);

            charsToRemove = 0;
            break;
          } else {
            // Supprimer complètement cet objet
            charsToRemove -= obj.text.length;
            textObjects.splice(i, 1);

            canva.getObjects().forEach(function (obj) {
              if (obj.name === "asowp-SignText") {
                function syncTextObjectsByFace( bigArray, textObjects, targetFace ) {
                  // Parcourir les objets du grand tableau qui ont la face cible
                  bigArray.forEach((bigObj, index) => {
                    // console.log(bigObj.canvasName,"can")
                    if (bigObj.canvasName === targetFace) {
                      // Trouver l'objet correspondant dans le petit tableau
                      const smallObj = textObjects.find(
                        (obj) => obj.id === bigObj.id
                      );

                      if (smallObj) {
                        console.log(bigObj.canvasName, "array", index);
                        // L'objet existe dans le petit tableau, on le remplace
                        bigArray[index] = smallObj;
                      } else {
                        // L'objet n'existe pas dans le petit tableau, on le supprime
                        bigArray.splice(index, 1);
                        index--;
                      }
                    }
                  });

                  return bigArray;
                }
                addedTexts = syncTextObjectsByFace( addedTexts, textObjects, canva.name );
                // console.log(addedTexts, "1969089151")
              }
            });

            canva.remove(obj);
          }

          // Si on a supprimé tous les caractères en trop, on peut arrêter
          if (charsToRemove <= 0) {
            break;
          }
        }

        canva.renderAll();
      }
      adjustTextCharacters(FtextObjects, maxChar, canvas);
      adjustTextCharacters(BtextObjects, maxChar, backCanvas);
    }
    FtextObjects = handleGetTextObjects1("asowp-SignText");
    BtextObjects = handleGetTextObjects2("asowp-SignText");
  }

  handleSelectShape( selectedShape, newSignWidth, newSignHeight, maxTextCharForSize );

  handleCalcTextPrice();

  firstLoad = true;
  return {
    width: currentWidth,
    height: currentHeight,
    top: currentTop,
    left: currentLeft,
    texts: addedTexts,
    maxChars: maxChar,
  };
}

function handleGetSignPosition() {
  var sign = handleGetObjectByName("safeObject");
  var width = signData.width;
  var height = signData.height;
  currentSize = { width: width, height: height, label: currentSizeName };

  let scaleValues = handleMiseAEchelle(width, height)

  sizeRatio = scaleValues.sizeRatio;
  fixScale = scaleValues.fixScale;
  ratioScale = scaleValues.ratioScale;

  currentWidth = scaleValues.width;
  currentHeight = scaleValues.height;

  return {
    width: (sign.type == "path" || sign.type == "group") ? sign.prevWidth : sign.width,
    height: (sign.type == "path" || sign.type == "group") ? sign.prevHeight : sign.height,
    top: (sign.type == "path" || sign.type == "group") ? sign.prevLeft : sign.top,
    left: (sign.type == "path" || sign.type == "group") ? sign.prevTop : sign.left,
    maxChar: maxTextCharForSize,
    sizeName: currentSizeName,

    texts: addedTexts,
  };
}

var currentThickness = 0;
function handleChangeThickness(active, thick) {
  currentThickness = thick;

  function showThicknessObject(canva, active) {
    canva.getObjects().forEach(function (obj) {
      if (obj.name === "thickness-value") {
        obj.set("visible", active === true ? true : false);
        obj.text = String(
          "Thickness" + ": " + currentThickness + " " + currentUnit
        );
      }
    });

    canva.renderAll();
  }

  showThicknessObject(canvas, active);
  showThicknessObject(backCanvas, active);
}

// function lockToCanvas(activeObj){
//     var Objects = canvas.getObjects();
//     Objects.forEach(function(object){
//         if(object.type != 'line'){
//             if(object.name == 'safeObject'){

//                 activeObj.on('moving', function() {
//                     if (!object.containsPoint(activeObj.getCenterPoint())) {
//                         // Si le centre du rectangle est en dehors de la zone clipée, annuler le déplacement
//                         activeObj.set({
//                             left: activeObj._originalLeft,
//                             top: activeObj._originalTop
//                         });
//                     } else {
//                         // Si le déplacement est autorisé, enregistrer la nouvelle position comme originale
//                         activeObj._originalLeft = activeObj.left;
//                         activeObj._originalTop = activeObj.top;
//                     }
//                 });
//             }
//         }
//     })
// }
function lockToCanvas(activeObj) {
  var objects = activeCanvas.getObjects();
  objects.forEach(function (object) {
    if (object.type != "line") {
      if (object.name == "safeObject") {
        activeObj.on("moving", function () {
          if (!object.containsPoint(activeObj.getCenterPoint())) {
            activeObj.set({
              left: activeObj._originalLeft,
              top: activeObj._originalTop,
            });
          } else {
            activeObj._originalLeft = activeObj.left;
            activeObj._originalTop = activeObj.top;
          }
        });
      }
    }
  });
}
function removeTextById(id, table, canvas) {
  // console.log(id, table, canvas);
  const index = table.findIndex((item) => item.id === id);
  if (index !== -1) {
    table.splice(index, 1);
  }
}
function handleDeleteObject(object) {
  var target = object;
  var canvas = target.canvas;
  canvas.discardActiveObject();
  if(textType == "3D"){
    var objects = canvas.getObjects();
    objects.forEach((obj)=>{
      if(obj.name === "asowp-SignTextLayer" && obj.id === object.id){
        canvas.remove(obj);
      }
    })
  }
  canvas.remove(target);
  canvas.requestRenderAll();

  if (target.type == "i-text" || target.type == "neon-Text") {
    removeTextById(target.id, addedTexts);
    removeTextById(
      object.id,
      handleGetTextObjects1("asowp-SignText"),
      canvas.name
    );
    removeTextById(
      object.id,
      handleGetTextObjects2("asowp-SignText"),
      canvas.name
    );

    // calcul des prix en fonctions des caractères restants
    FtextObjects = handleGetTextObjects1("asowp-SignText");
    BtextObjects = handleGetTextObjects2("asowp-SignText");
    frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
    backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;

    handleCalcTextPrice("delete text");

    if (readyToSave) {
      updateModifications(true, "selection de fixing");
    }

    return addedTexts;
  }
  if (target.name == "asowp-SignImage") {
    removeTextById(target.id, addedImages);

    console.log(addedImages, "added images");

    if (readyToSave) {
      updateModifications(true, "selection de fixing");
    }

    return addedImages;
  }
  if (target.name == "asowp-QRCode") {
    removeTextById(target.id, addedQRCodes);

    console.log(addedQRCodes, "added images");

    if (readyToSave) {
      updateModifications(true, "selection de fixing");
    }

    return addedQRCodes;
  }
}
function handleCloneObject(object, imageId) {
  var target = object;
  var canvas = target.canvas;
  target.clone(function (cloned) {
    cloned.clipPath = null
    cloned.left += 10;
    cloned.top += 10;
    if (cloned.type == "i-text" || cloned.type == "neon-Text") {
      var customAttribut = {
        fontFamilyUrl: object.fontFamilyUrl,
        neonColor: object.neonColor,
        secondStrokeWidth: object.secondStrokeWidth,
        secondStroke: object.secondStroke,
        activeSide: object.activeSide,
        sideColor: object.sideColor,
      }
      cloned.set("canvas", canvas);
      // console.log(cloned.canvas, "cloned canvas");
      if(textType == "3D"){
        var objects = canvas.getObjects();
        objects.forEach((obj)=>{
          if(obj.name === "asowp-SignTextLayer" && obj.id === object.id){
            obj.clone((layerClone)=>{
              layerClone.left += 10;
              layerClone.top += 10;
              handleAddTextToSign(customAttribut, cloned, layerClone);
            })
          }
        })
      }else{
        handleAddTextToSign(customAttribut, cloned);
      }
    }
    if (
      cloned.type == "image" ||
      cloned.type == "path" ||
      cloned.type == "group"
    ) {
      cloned.uniScaleTransform = true;
      cloned.centeredScaling = true;
      cloned.lockScalingFlip = true;
      cloned.originX = "center";
      cloned.originY = "center";
      cloned.canvasName = object.canvasName;
      cloned.price = object.price;
      cloned.lockMoving = {
        x: object.lockMoving.x,
        y: object.lockMoving.y,
      };
      cloned.lockScale = object.lockScale;
      cloned.id = newId += 1;
      cloned.objectType = object.objectType === "svg" ? "svg" : "no-svg";
      cloned.imageUrl =
        object.objectType === "svg" ? object.imageUrl : cloned.getSrc();
      cloned.set("name", "asowp-SignImage");
      cloned.on("mousedown", function () {
        handleGetAddedImageValues(cloned);
      });
      cloned.on("mouseup", function () {
        handleGetAddedImageValues(cloned);
      });
      cloned.setControlsVisibility({
        mt: false, // Middle top
        mb: false, // Middle bottom
        ml: false, // Middle left
        mr: false, // Middle right
        bl: true, // Bottom left
        br: true, // Bottom right
        tl: true, // Top left
        tr: true, // Top right
      });

      addedImages.push({
        id: cloned.id,
        url: object.objectType === "svg" ? object.imageUrl : cloned.getSrc(),
        object: cloned,
      });
      canvas.add(cloned);
    }
  });
  if (object.name === "asowp-SignImage") {
    return addedImages;
  }
}
function handleCenterVertically(object) {
  var target = object;
  target.setCoords();
  var canvas = target.canvas;
  var newCoord = target.getCoords();
  var Objects = canvas.getObjects();
  Objects.forEach(function (objct) {
    if (objct.name == "safeObject") {
      var containerCoords = objct.getCenterPoint();
      var targetHeight = newCoord[3].y - newCoord[0].y;
      // var targetHeight = target.height
      // var newTop = object.top + (object.height /2) - (targetHeight /2)
      var newTop = containerCoords.y;
      target.top = newTop;

      if(textType == "3D"){
        var objets = activeCanvas.getObjects();
        objets.forEach((obj)=>{
          if(obj.name === "asowp-SignTextLayer" && obj.id === object.id){
            obj.top = newTop;
          }
        })
      }
    }
  });
  canvas.renderAll();
}
function handleCenterHorizontally(object) {
  var target = object;
  target.setCoords();
  var canvas = target.canvas;
  var newCoord = target.getCoords();
  var Objects = canvas.getObjects();
  Objects.forEach(function (objct) {
    if (objct.name == "safeObject") {
      var containerCoords = objct.getCenterPoint();

      // var targetWidth = (newCoord[1].x - newCoord[0].x)
      var targetWidth = target.width;
      // var newLeft = object.left + (object.width /2) - (targetWidth /2)
      var newLeft = containerCoords.x;
      target.left = newLeft;

      if(textType == "3D"){
        var objects = activeCanvas.getObjects();
        objects.forEach((obj)=>{
          if(obj.name === "asowp-SignTextLayer" && obj.id === object.id){
            obj.left = newLeft;
          }
        })
      }
    }
  });
  canvas.renderAll();
}

function handleLockMoving(object, axe) {
  if (axe == "x") {
    if (object.lockMoving.x === true) {
      object.lockMoving.x = false;
    } else {
      object.lockMoving.x = true;
    }
  }
  if (axe == "y") {
    if (object.lockMoving.y === true) {
      object.lockMoving.y = false;
    } else {
      object.lockMoving.y = true;
    }
  }

  console.log(object.lockMoving);
  return object.lockMoving;
}
function handleLockScaling(object, axe) {
  if (object.lockScale === true) {
    object.lockScale = false;
  } else {
    object.lockScale = true;
  }

  return object.lockScale;
}
function handleLockRotating(object, axe) {
  if (object.lockRotate === true) {
    object.lockRotate = false;
  } else {
    object.lockRotate = true;
  }

  return object.lockRotate;
}
function handleLockEdition(object, axe) {
  if (object.lockEdition === true) {
    object.lockEdition = false;
  } else {
    object.lockEdition = true;
  }

  return object.lockEdition;
}

//function pour afficher les borders
var activeBorder = "";
var activeBorderColor = "";
var activeBorder2 = "";
var activeBorderColor2 = "";
var firstBorderCheck = true;
function removeBorder(canva) {
  var Objects = canva.getObjects();
  Objects.forEach(function (object) {
    if (
      object.name == "old-world-border" ||
      object.name == "rounded-corners-border"
    ) {
      canva.remove(object);
    } else if (object.name == "normal-border") {
      canva.remove(object);
      // console.log(canvas, "normal-border")
    }
  });
  canva.renderAll();
}
var restartBorderSet = false;
function handleGetBorderRestart(restart) {
  restartBorderSet = restart;
}

function handleGetBorderData(face, data) {
  if (face === "front-face") {
    activeBorder = data.border;
    activeBorderColor = data.color;
  } else {
    activeBorder2 = data.border;
    activeBorderColor2 = data.color;
  }
}

var signData = {};
function getSignInfos(data) {
  signData = data;
}
function setNormalBorber(canva, size, color) {
  var sign;
  if (firstLoad) {
    sign = handleGetObjectByName("safeObject", canva);
  } else {
    // console.log(signData, "signData");

    var newSignWidth = handleMiseAEchelle(
      signData.width,
      signData.height
    ).width;
    var newSignHeight = handleMiseAEchelle(
      signData.width,
      signData.height
    ).height;
    var canvasCenter = getCanvasCenter();
    var newRectLeft = canvasCenter.x - newSignWidth / 2;
    var newRectTop = canvasCenter.y - newSignHeight / 2;

    sign = {
      width: newSignWidth,
      height: newSignHeight,
      left: newRectLeft,
      top: newRectTop,
      fill: color,
    };
  }
  var border;
  switch (selectedShape) {
    case "square":
      border = new fabric.Rect({
        height: sign.height + size * 2,
        width: sign.width + size * 2,
        top: sign.top - size,
        left: sign.left - size,
        name: "normal-border",
        fill: color,
        selectable: false,
        shadow: defaultShadow,
      });
      break;

    case "rounded-square":
      border = new fabric.Rect({
        height: sign.height + size * 2,
        width: sign.width + size * 2,
        top: sign.top - size,
        left: sign.left - size,
        name: "normal-border",
        fill: color,
        rx: 35,
        ry: 35,
        selectable: false,
        shadow: defaultShadow,
      });
      break;

    case "oval":
      border = new fabric.Ellipse({
        ry: (sign.height + size * 2) / 2,
        rx: (sign.width + size * 2) / 2,
        top: sign.top - size,
        left: sign.left - size,
        name: "normal-border",
        fill: color,
        selectable: false,
        shadow: defaultShadow,
      });
      break;

    case "triangle":
      border = new fabric.Triangle({
        height: sign.height + size * 2,
        width: sign.width + size * 2,
        top: sign.top - size * 1.5,
        left: sign.left - size,
        name: "normal-border",
        fill: color,
        selectable: false,
        shadow: defaultShadow,
      });
      break;

    case "rotated-square":
      border = new fabric.Polygon(
        [
          { x: (sign.width + size * 2) / 2, y: 0 },
          { x: sign.width + size * 2, y: (sign.height + size * 2) / 2 },
          { x: (sign.width + size * 2) / 2, y: sign.height + size * 2 },
          { x: 0, y: (sign.height + size * 2) / 2 },
        ],
        {
          top: sign.top - size,
          left: sign.left - size,
          name: "normal-border",
          fill: color,
          selectable: false,
          shadow: defaultShadow,
        }
      );
      break;

    case "turn-left":
      border = new fabric.Polygon(
        [
          { x: 0, y: (sign.height + size * 2) / 2 },
          { x: (sign.width + size * 2) / 2, y: 0 },
          { x: sign.width + size * 2, y: 0 },
          { x: sign.width + size * 2, y: sign.height + size * 2 },
          { x: (sign.width + size * 2) / 2, y: sign.height + size * 2 },
        ],
        {
          top: sign.top - size,
          left: sign.left - size * 1.2,
          name: "normal-border",
          fill: color,
          selectable: false,
          shadow: defaultShadow,
        }
      );
      break;

    case "turn-right":
      border = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: (sign.width + size * 2) / 2, y: 0 },
          { x: sign.width + size * 2, y: (sign.height + size * 2) / 2 },
          { x: (sign.width + size * 2) / 2, y: sign.height + size * 2 },
          { x: 0, y: sign.height + size * 2 },
        ],
        {
          top: sign.top - size,
          left: sign.left - size / 1.5,
          name: "normal-border",
          fill: color,
          selectable: false,
          shadow: defaultShadow,
        }
      );
      break;

    case "arrow-right":
      border = new fabric.Polyline(
        [
          { x: 0, y: ((sign.height + size * 2) / 5) * 4 },
          {
            x: (sign.width + size * 2) / 2 / 1.05,
            y: ((sign.height + size * 2) / 5) * 4,
          },
          { x: (sign.width + size * 2) / 2 / 1.05, y: sign.height + size * 2 },
          { x: sign.width + size * 2, y: (sign.height + size * 2) / 2 },
          { x: (sign.width + size * 2) / 2 / 1.05, y: 0 },
          {
            x: (sign.width + size * 2) / 2 / 1.05,
            y: (sign.height + size * 2) / 5,
          },
          { x: 0, y: (sign.height + size * 2) / 5 },
        ],
        {
          top: sign.top - size,
          left: sign.left - size / 1.5,
          name: "normal-border",
          fill: color,
          selectable: false,
          shadow: defaultShadow,
        }
      );
      break;

    case "arrow-left":
      border = new fabric.Polygon(
        [
          { x: 0, y: (sign.height + size * 2) / 2 },
          { x: ((sign.width + size * 2) / 2) * 1.05, y: 0 },
          {
            x: ((sign.width + size * 2) / 2) * 1.05,
            y: (sign.height + size * 2) / 5,
          },
          { x: sign.width + size * 2, y: (sign.height + size * 2) / 5 },
          { x: sign.width + size * 2, y: ((sign.height + size * 2) / 5) * 4 },
          {
            x: ((sign.width + size * 2) / 2) * 1.05,
            y: ((sign.height + size * 2) / 5) * 4,
          },
          {
            x: ((sign.width + size * 2) / 2) * 1.05,
            y: sign.height + size * 2,
          },
        ],
        {
          top: sign.top - size,
          left: sign.left - size * 1.2,
          name: "normal-border",
          fill: color,
          selectable: false,
          shadow: defaultShadow,
        }
      );
      break;

    case "stop":
      border = new fabric.Polygon(
        [
          { x: 0, y: ((sign.height + size * 2) / 3) * 2 },
          { x: (sign.width + size * 2) / 3, y: sign.height + size * 2 },
          { x: ((sign.width + size * 2) / 3) * 2, y: sign.height + size * 2 },
          { x: sign.width + size * 2, y: ((sign.height + size * 2) / 3) * 2 },
          { x: sign.width + size * 2, y: (sign.height + size * 2) / 3 },
          { x: ((sign.width + size * 2) / 3) * 2, y: 0 },
          { x: (sign.width + size * 2) / 3, y: 0 },
          { x: 0, y: (sign.height + size * 2) / 3 },
        ],
        {
          top: sign.top - size,
          left: sign.left - size,
          name: "normal-border",
          fill: color,
          selectable: false,
          shadow: defaultShadow,
        }
      );
      break;

    case "rounded-top":
      border = new fabric.Rect({
        height: sign.height + size * 2,
        width: sign.width + size * 2,
        top: sign.top - size,
        left: sign.left - size,
        rx: sign.width + size * 2,
        ry: 10,
        name: "normal-border",
        fill: color,
        selectable: false,
        shadow: defaultShadow,
      });
      break;

    case "rounded-sides":
      border = new fabric.Rect({
        height: sign.height + size * 2,
        width: sign.width + size * 2,
        top: sign.top - size,
        left: sign.left - size,
        rx: 10,
        ry: sign.height + size * 2,
        name: "normal-border",
        fill: color,
        selectable: false,
        shadow: defaultShadow,
      });
      break;
  }

  border.set({
    shadow: selectedCutline != "2x" ? defaultShadow : null,
    stroke: selectedCutline != "none" ? cutlinesData.first.color : "black",
    strokeWidth: selectedCutline != "none" ? cutlinesData.first.borderSize : 0,
  })

  return border;
}

async function handleSelectBorder(border, color) {
  // console.log("handleSelectBorder", border, color);
  let exCutline1 = handleGetObjectByName("aswop-cutline1", activeCanvas)
  let exCutline2 = handleGetObjectByName("aswop-cutline2", activeCanvas)
  if(exCutline1){
    activeCanvas.remove(exCutline1)
  }
  if(exCutline2){
    activeCanvas.remove(exCutline2)
  }

  if (!firstLoad || restartBorderSet) {
    activeBorder = border;
    activeBorder2 = border;
    if (color) {
      activeBorderColor = color;
      activeBorderColor2 = color;
    }
    if(selectedShape != "cut-to-shape"){
      setBorder(canvas, activeBorder, activeBorderColor);
      setBorder(backCanvas, activeBorder2, activeBorderColor2);
    }else{
      await handleShowCutline(activeCanvas)
    }
  } else {
    if (activeSignFace === "front") {
      activeBorder = border;
      if (color) {
        activeBorderColor = color;
      }
      if(selectedShape != "cut-to-shape"){
        setBorder(canvas, activeBorder, activeBorderColor);
        setBorder(backCanvas, activeBorder2, activeBorderColor2);
      }else{
        await handleShowCutline(canvas)
      }
    }
    if (activeSignFace === "back") {
      activeBorder2 = border;
      if (color) {
        activeBorderColor2 = color;
      }
      if(selectedShape != "cut-to-shape"){
        setBorder(canvas, activeBorder, activeBorderColor);
        setBorder(backCanvas, activeBorder2, activeBorderColor2);
      }else{
        await handleShowCutline(canvas)
      }
    }
  }
  async function setBorder(canva, currBorder, activeColor) {
    // console.log(currBorder, activeColor, "setBorder")
    removeBorder(canva);
    var Objects = canva.getObjects();
    Objects.forEach(async function (object, index) {
      if (object.type !== "line") {
        if (object.name === "safeObject") {
          if (currBorder === "none") {
            removeBorder(canva);
            object.shadow = defaultShadow;
          }
          if (currBorder === "normal") {
            removeBorder(canva);
            var border = setNormalBorber(canva, 10, activeColor);
            canva.add(border);
            border.sendToBack();
            if(selectedCutline != "none"){
              border.set({
                left: border.left - (cutlinesData.first.borderSize/2),
                top: border.top - (cutlinesData.first.borderSize/2),
              })
              // let cutline1 = handleGetObjectByName("asowp-cutline1", canva)
              // let cutline2 = handleGetObjectByName("asowp-cutline2", canva)
              // if(cutline1 != null){
              //   cutline1.sendToBack()
              // }
              // if(cutline2 != null){
              //   cutline2.sendToBack()
              // }
            }

            object.shadow = null;
          }
          if (currBorder === "old-world") {
            object.shadow = defaultShadow;
            removeBorder(canva);
            if (
              selectedShape === "square" ||
              selectedShape === "rounded-square"
            ) {
              if (object.width == object.height) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_old_world.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("fill", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX;
                    svgGroup.scaleY = scaleY;
                    (svgGroup.name = "old-world-border"),
                      (svgGroup.selectable = false),
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                  }
                );
              } else if (object.width >= 2 * object.height) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_old_world_longW.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    // console.log(object.scaleX, object.scaleY, scaleX, scaleY, "scale")

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("fill", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);

                    svgGroup.scaleX = scaleX;
                    svgGroup.scaleY = scaleY;

                    (svgGroup.name = "old-world-border"),
                      (svgGroup.selectable = false),
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                    // console.log("svg", svgGroup, object);
                  }
                );
              } else if (
                object.width > object.height &&
                object.width < 2 * object.height
              ) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_old_world_mediumW.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("fill", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX;
                    svgGroup.scaleY = scaleY;

                    (svgGroup.name = "old-world-border"),
                      (svgGroup.selectable = false),
                      // console.log("svg", svgGroup);
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                  }
                );
              } else if (object.height >= 2 * object.width) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_old_world_longH.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    // console.log(object.scaleX, object.scaleY, scaleX, scaleY, "scale")

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("fill", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);

                    svgGroup.scaleX = scaleX;
                    svgGroup.scaleY = scaleY;

                    (svgGroup.name = "old-world-border"),
                      (svgGroup.selectable = false),
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                    // console.log("svg", svgGroup, object);
                  }
                );
              } else if (
                object.height > object.width &&
                object.height < 2 * object.width
              ) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_old_world_mediumH.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("fill", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX;
                    svgGroup.scaleY = scaleY;

                    (svgGroup.name = "old-world-border"),
                      (svgGroup.selectable = false),
                      // console.log("svg", svgGroup);
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                  }
                );
              }
            }
          }
          if (currBorder === "rounded-corners") {
            object.shadow = defaultShadow;
            removeBorder(canva);
            if (
              selectedShape === "square" ||
              selectedShape === "rounded-square"
            ) {
              if (object.width == object.height) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_rounded_corners.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("stroke", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX - 0.009;
                    svgGroup.scaleY = scaleY - 0.01;
                    (svgGroup.name = "rounded-corners-border"),
                      (svgGroup.selectable = false),
                      // console.log("svg", svgGroup);
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                  }
                );
              } else if (object.width >= 2 * object.height) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_rounded_corners_longW.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    // console.log(object.scaleX, object.scaleY, scaleX, scaleY, "scale")

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("stroke", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);

                    svgGroup.scaleX = scaleX - 0.009;
                    svgGroup.scaleY = scaleY - 0.01;

                    (svgGroup.name = "rounded-corners-border"),
                      (svgGroup.selectable = false),
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                    // console.log("svg", svgGroup, object);
                  }
                );
              } else if (
                object.width > object.height &&
                object.width < 2 * object.height
              ) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_rounded_corners_mediumW.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("stroke", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX - 0.009;
                    svgGroup.scaleY = scaleY - 0.01;

                    (svgGroup.name = "rounded-corners-border"),
                      (svgGroup.selectable = false),
                      // console.log("svg", svgGroup);
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                  }
                );
              } else if (object.height >= 2 * object.width) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_rounded_corners_longH.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    // console.log(object.scaleX, object.scaleY, scaleX, scaleY, "scale")

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("stroke", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);

                    svgGroup.scaleX = scaleX - 0.009;
                    svgGroup.scaleY = scaleY - 0.005;

                    (svgGroup.name = "rounded-corners-border"),
                      (svgGroup.selectable = false),
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                    // console.log("svg", svgGroup, object);
                  }
                );
              } else if (
                object.height > object.width &&
                object.height < 2 * object.width
              ) {
                fabric.loadSVGFromURL(
                  borderUrl + "/im_rounded_corners_mediumH.svg",
                  (objects, options) => {
                    var scaleX = object.width / objects[0].width;
                    var scaleY = object.height / objects[0].height;

                    const svgGroup = fabric.util.groupSVGElements(objects);
                    svgGroup.set("stroke", activeColor);
                    svgGroup.set("left", object.left);
                    svgGroup.set("top", object.top);
                    svgGroup.scaleX = scaleX - 0.009;
                    svgGroup.scaleY = scaleY - 0.008;

                    (svgGroup.name = "rounded-corners-border"),
                      (svgGroup.selectable = false),
                      // console.log("svg", svgGroup);
                      canva.add(svgGroup);
                    canva.moveTo(svgGroup, index + 1);
                    canva.renderAll();
                  }
                );
              }
            } else {
              object.set("strokeWidth", 0);
              object.set("stroke", "transparent");
            }
          }
        }
      }
    });
    // console.log(canva.getObjects())
    canva.renderAll();

    await handleShowCutline(canva)
  }
  firstBorderCheck = false;

  // if(readyToSave){
  //     updateModifications(true, 'selection de border')
  // }

  return { type: border, color: color };
}
function handlechangeBorderColor(color, position) {
  if (!firstLoad) {
    activeBorderColor = color;
    activeBorderColor2 = color;

    setBorderColor(activeBorder, activeBorderColor, canvas);
    setBorderColor(activeBorder, activeBorderColor, backCanvas);
  } else {
    if (activeSignFace === "front") {
      activeBorderColor = color;
      setBorderColor(activeBorder, activeBorderColor, canvas);
    }
    if (activeSignFace === "back") {
      activeBorderColor2 = color;
      setBorderColor(activeBorder2, activeBorderColor2, backCanvas);
    }
  }

  function setBorderColor(border, color, canva) {
    var Objects = canva.getObjects();
    Objects.forEach(function (object) {
      if (border === "normal") {
        if (object.name == "normal-border") {
          canva.remove(object);

          var borderNormal = setNormalBorber(canva, 10, color);
          canva.add(borderNormal);
          borderNormal.sendToBack();
          if(selectedCutline != "none"){
            borderNormal.set({
              left: borderNormal.left - (cutlinesData.first.borderSize/2),
              top: borderNormal.top - (cutlinesData.first.borderSize/2),
            })
            let cutline1 = handleGetObjectByName("asowp-cutline1", canva)
            let cutline2 = handleGetObjectByName("asowp-cutline2", canva)
            if(cutline1 != null){
              cutline1.sendToBack()
            }
            if(cutline2 != null){
              cutline2.sendToBack()
            }
          }
          
        }
      }
      if (border === "old-world") {
        if (object.name === "old-world-border") {
          object.set("fill", color);
          console.log(object, "old-world-border");
          canva.renderAll();
        }
        canva.renderAll();
      }
      if (border === "rounded-corners") {
        if (object.name === "rounded-corners-border") {
          object.set("stroke", color);
        }
        canva.renderAll();
      }
    });
  }

  if (readyToSave) {
    updateModifications(true, "selection de border color");
  }
}

var currentSignColor = "";
var currentSignTextColor = "";
var firstColorSet = true;
var signBackground1 = "color";
var signBackground2 = "color";
var patternUrl1 = "";
var patternUrl2 = "";
function handleChangeSignColor( name, pattern, textColor, defTextColor, restart ) {
  console.log();
  currentSignColor = name;
  var stop = true;
  function setSignColor(canva) {
    var Objects = canva.getObjects();
    Objects.forEach(function (object) {
      if (object.type !== "line") {
        if (object.name == "safeObject") {
          if (pattern.active) {
            if (canva.name == "front-face") {
              signBackground1 = "pattern";
              patternUrl1 = pattern.url;
            } else {
              signBackground2 = "pattern";
              patternUrl2 = pattern.url;
            }
            setPattern(canva, pattern.url);
          } else {
            if (canva.name == "front-face") {
              signBackground1 = "color";
            } else {
              signBackground2 = "color";
            }
            if(selectedShape != "cut-to-shape"){
              object.set("fill", pattern.codeHex);
            }else{
              let pathObjects = object._objects

              if(pathObjects){
                pathObjects.forEach(path => {
                  const d = path.d;
                  if (path.name == "outline") {
                    path.set({
                      fill: pattern.codeHex,
                      // stroke: pattern.codeHex,
                    })
                  }
                });
              }else{
                object.set("fill", pattern.codeHex);
              }
            }
          }
        }
        if (textColor.active) {
          currentSignTextColor = textColor.codeHex;
          if (object.name == "asowp-SignText") {
            object.set("fill", textColor.codeHex);
          }
          if (textColor.sameForBorder && stop) {
            // handlechangeBorderColor(textColor.codeHex, "white")
            // console.log("change")
            stop = false;
          }
        } else {
          currentSignTextColor = defTextColor;
          // if (object.name == "asowp-SignText") {
          //   if (defTextColor) {
          //     object.set("fill", defTextColor);
          //   }
          // }
        }
      }
    });
    canva.renderAll();
  }

  if (firstColorSet || restart) {
    setSignColor(canvas);
    setSignColor(backCanvas);
  } else {
    setSignColor(activeCanvas);
  }

  if (readyToSave) {
    // updateModifications(true, 'changer sign color')
  }
  firstColorSet = false;

  return name;
}
function setPattern(canva, image) {
  // const imgElement = new Image();
  // imgElement.crossOrigin = "anonymous";
  // imgElement.src = image;
  // console.log(image, "setPattern")
  // var object = handleGetObjectByName('safeObject', canvas)
  canva.getObjects().forEach((object, index) => {
    if (object.name === "safeObject") {
      if(selectedShape != "cut-to-shape"){
        handleConvertImageToDataURI(image, function (dataURI) {
          fabric.util.loadImage( dataURI, function (img) {
              var scaleX = object.width / img.width;
              var scaleY = object.height / img.height;
              var pattern = new fabric.Pattern({
                source: img,
                repeat: "no-repeat",
                patternTransform: [scaleX, 0, 0, scaleY, 0, 0],
              });
  
              // console.log(pattern)
  
              object.set("fill", pattern);
              // canvas.add(pattern);
              canva.renderAll();
            },
            { crossOrigin: "anonymous" }
          );
        });
      }else{
        let pathObjects = object._objects

        pathObjects.forEach(path => {
          if (path.name == "outline") {
            handleConvertImageToDataURI(image, function (dataURI) {
              fabric.util.loadImage( dataURI, function (img) {
                  var scaleX = path.width / img.width;
                  var scaleY = path.height / img.height;
                  var pattern = new fabric.Pattern({
                    source: img,
                    repeat: "no-repeat",
                    patternTransform: [scaleX, 0, 0, scaleY, 0, 0],
                  });
            
                  path.set("fill", pattern);
                  canva.renderAll();
                },
                { crossOrigin: "anonymous" }
              );
            });
          }
        });
      }
    }
  });
}
function handleSetImageToSignBackground(image) {
  setPattern(canvas, image);
  setPattern(backCanvas, image);
  // updateModifications(true, 'changer sign color')
}





function sortByOffset(arr) {
  return arr.sort((a, b) => {
    if (a.offsetX !== b.offsetX) {
      return a.left - b.left;
    }
  });
}

async function createPreciseContourPath(size) {
  // 1. Filtrer les objets dans la zone avec précision
  const objectsInZone = canvas.getObjects().filter(obj => obj.name == "asowp-SignText" || obj.name == "asowp-SignImage" || obj.name == "asowp-QRCode");

  if (objectsInZone.length === 0) return null;

  objectsInZone.forEach(object =>{
    object.clipPath = null
    activeCanvas.renderAll()
  })

  // 2. Extraire les points de contour précis
  // console.log(size, "2222", objectsInZone)
  let allPoints = await extractExactPaths(objectsInZone);
  let sortedPaths = sortByOffset(allPoints)
  

  let canvaSize = {
    width: activeCanvas.getWidth(),
    height: activeCanvas.getHeight()
  }
  let currentZoom = activeCanvas.getZoom()

  let mergedPath = await generateGlobalContour(sortedPaths, canvaSize, currentZoom, size)


  return mergedPath
}

function cloneObjectForOutline(object){
  return new Promise(async (resolve, reject) => {
    
    var target = object;
    var canvas = target.canvas;
    let activeFilters = target.name == 'asowp-SignImage' ? target.filters : []
    if(target.name == 'asowp-SignImage'){
      target.filters = []
    }
    target.clone(function (cloned) {
      // console.log("333", cloned)
      cloned.clipPath = null
      if (cloned.type == "i-text" || cloned.type == "neon-Text") {
        if(textType == "3D"){
          var objects = canvas.getObjects();
          objects.forEach((obj)=>{
            if(obj.name === "asowp-SignTextLayer" && obj.id === object.id){
              obj.clone((layerClone)=>{
                layerClone.left += 5;
                layerClone.top += 5;

                resolve({
                  textType: "3D",
                  text: cloned,
                  side: layerClone
                })
              })
  
            }
          })
        }else{
          resolve(cloned)
        }
      }
      if ( cloned.type == "image" || cloned.type == "path" || cloned.type == "group" ) {
        cloned.originX = "center";
        cloned.originY = "center";

        resolve(cloned)
      }
    });
    if(target.name == 'asowp-SignImage'){
      target.filters = activeFilters
    }
  })
}

async function extractExactPaths(objects) {
  return Promise.all(objects.map(obj => {
    return new Promise(async (resolve, reject) => {
      if(obj.name === "asowp-SignText"){
        let clone = await cloneObjectForOutline(obj)
        resolve(clone)
      }
      if(obj.name === "asowp-SignImage"){
        let clone = await cloneObjectForOutline(obj)
        clone.filters = []
        resolve(clone)
      }
      if(obj.name === "asowp-QRCode"){
        let clone = await cloneObjectForOutline(obj)
        resolve(clone)
      }
    });
  }));
}

async function setBlankSvg(){
  return new Promise(async (resolve, reject) => {
    let blankSign = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect x="50" y="50" width="100" height="100" fill="transparent" />
      </svg>
      `
    fabric.loadSVGFromString(blankSign, function (image) {
      const img = fabric.util.groupSVGElements(image);
      resolve(img)
    })
  });
}


var selectedShape = "";
function handleGetShape(shape, fixing) {
  selectedShape = shape;
  if (fixing) {
    activeFixingMethode = fixing;
  }
}
async function handleSelectShape(shape, nwidth = 100, nheight = 100, shapeSizes) {
  selectedShape = shape;
  if(shapeSizes && shapeSizes != null){
    shapeSize = shapeSizes
  }

  async function setShape(canvas) {
    resetFixing(canvas);
    var Objects = canvas.getObjects();
    // for(const [index, object] in Objects.entries()) {

    let safeObject = handleGetObjectByName("safeObject")
    var width = nwidth;
    var height = nheight;
    var objectfill;
    
    let newObject
    if(safeObject != null){
      if (typeof safeObject.fill !== "string") {
        objectfill = "transparent";
      } else {
        objectfill = safeObject.fill;
      }
      var objectId = safeObject.id;
  
      safeObject.setCoords();

      await resetCutline(canvas)
      await resetCutline(canvas)

      switch (shape) {
        case "square":
          newObject = new fabric.Rect({
            height: height,
            width: width,
            fill: objectfill,
            selectable: false,
            name: "safeObject",
            shadow: defaultShadow,
            id: objectId,
          });
          break;

        case "rounded-square":
          newObject = new fabric.Rect({
            height: height,
            width: width,
            rx: 35,
            ry: 35,
            fill: objectfill,
            selectable: false,
            name: "safeObject",
            shadow: defaultShadow,
            id: objectId,
          });
          break;

        case "oval":
          newObject = new fabric.Ellipse({
            ry: height / 2,
            rx: width / 2,
            fill: objectfill,
            selectable: false,
            name: "safeObject",
            shadow: defaultShadow,
            id: objectId,
          });
          break;

        case "triangle":
          newObject = new fabric.Triangle({
            height: height,
            width: width,
            fill: objectfill,
            selectable: false,
            name: "safeObject",
            shadow: defaultShadow,
            id: objectId,
          });
          break;

        case "rotated-square":
          newObject = new fabric.Polygon(
            [
              { x: width / 2, y: 0 },
              { x: width, y: height / 2 },
              { x: width / 2, y: height },
              { x: 0, y: height / 2 },
            ],
            {
              fill: objectfill,
              selectable: false,
              name: "safeObject",
              shadow: defaultShadow,
              id: objectId,
            }
          );
          break;

        case "turn-left":
          newObject = new fabric.Polygon(
            [
              { x: 0, y: height / 2 },
              { x: width / 2, y: 0 },
              { x: width, y: 0 },
              { x: width, y: height },
              { x: width / 2, y: height },
            ],
            {
              fill: objectfill,
              selectable: false,
              name: "safeObject",
              shadow: defaultShadow,
              id: objectId,
            }
          );
          break;

        case "turn-right":
          newObject = new fabric.Polygon(
            [
              { x: 0, y: 0 },
              { x: width / 2, y: 0 },
              { x: width, y: height / 2 },
              { x: width / 2, y: height },
              { x: 0, y: height },
            ],
            {
              fill: objectfill,
              selectable: false,
              name: "safeObject",
              shadow: defaultShadow,
              id: objectId,
            }
          );
          break;

        case "arrow-right":
          newObject = new fabric.Polyline(
            [
              { x: 0, y: (height / 5) * 4 },
              { x: width / 2, y: (height / 5) * 4 },
              { x: width / 2, y: height },
              { x: width, y: height / 2 },
              { x: width / 2, y: 0 },
              { x: width / 2, y: height / 5 },
              { x: 0, y: height / 5 },
            ],
            {
              fill: objectfill,
              selectable: false,
              name: "safeObject",
              shadow: defaultShadow,
              id: objectId,
            }
          );
          break;

        case "arrow-left":
          newObject = new fabric.Polygon(
            [
              { x: 0, y: height / 2 },
              { x: width / 2, y: 0 },
              { x: width / 2, y: height / 5 },
              { x: width, y: height / 5 },
              { x: width, y: (height / 5) * 4 },
              { x: width / 2, y: (height / 5) * 4 },
              { x: width / 2, y: height },
            ],
            {
              fill: objectfill,
              selectable: false,
              name: "safeObject",
              shadow: defaultShadow,
              id: objectId,
            }
          );
          break;

        case "stop":
          newObject = new fabric.Polygon(
            [
              { x: 0, y: (height / 3) * 2 },
              { x: width / 3, y: height },
              { x: (width / 3) * 2, y: height },
              { x: width, y: (height / 3) * 2 },
              { x: width, y: height / 3 },
              { x: (width / 3) * 2, y: 0 },
              { x: width / 3, y: 0 },
              { x: 0, y: height / 3 },
            ],
            {
              fill: objectfill,
              selectable: false,
              name: "safeObject",
              shadow: defaultShadow,
              id: objectId,
            }
          );
          break;

        case "rounded-top":
          newObject = new fabric.Rect({
            height: height,
            width: width,
            rx: width,
            ry: 10,
            fill: objectfill,
            selectable: false,
            name: "safeObject",
            shadow: defaultShadow,
            id: objectId,
          });
          break;

        case "rounded-sides":
          newObject = new fabric.Rect({
            height: height,
            width: width,
            rx: 10,
            ry: height,
            fill: objectfill,
            selectable: false,
            name: "safeObject",
            shadow: defaultShadow,
            id: objectId,
          });
          break;
        
        case "cut-to-shape":
          let safeObjet = {
            height: height,
            width: width,
          }
          newObject = await createPreciseContourPath(strokeSize)

          if(newObject != null){
            let pathObjects = newObject._objects
            const target = ` L ${canvas.getWidth()} ${canvas.getHeight()} `;
  
            pathObjects.forEach(path => {
              const d = path.d;
              if (d && !d.includes(target)) {
                path.set({
                  fill: objectfill,
                  strokeLineJoin: 'round',
                  strokeLineCap: 'round',
                  name: "outline",
                })
              }
            });
  
            newObject.set({
              fill: objectfill,
              stroke: objectfill,
              name: "safeObject",
              shadow: selectedCutline != "2x" ? defaultShadow : null,
              id: objectId,
              width: canvas.getWidth(true),
              height: canvas.getHeight(true),
              strokeLineJoin: 'round',
              strokeLineCap: 'round',
              selectable: false,
              prevWidth: width,
              prevHeight: height,
            })
          }else{
            newObject = await setBlankSvg()
            newObject.set({
              fill: objectfill,
              // stroke: objectfill,
              name: "safeObject",
              shadow: selectedCutline != "2x" ? defaultShadow : null,
              id: objectId,
              width: canvas.getWidth(true),
              height: canvas.getHeight(true),
              strokeLineJoin: 'round',
              strokeLineCap: 'round',
              selectable: false,
              prevWidth: width,
              prevHeight: height,
              opacity: 0,
            })
          }
          break;
      }
      
      canvas.remove(safeObject);
      canvas.add(newObject);
      newObject.sendToBack();
      newObject.set({
        shapeType: shape
      });
      if(shape == "cut-to-shape"){
        console.log(newObject._objects, shape, newObject.type)

        const bounds = newObject.getBoundingRect(false);
        const scaleX = (canvas.getWidth()) / (bounds.width);
        const scaleY = (canvas.getHeight()) / (bounds.height);
        newObject.set({
          left: 0,
          top: 0,
          scaleX: scaleX,
          scaleY: scaleY,
          originX: "center",
          originY: "center",
        });
        activeCanvas.centerObject(newObject)

        const target = ` L ${canvas.getWidth()} ${canvas.getHeight()} `;
        let sign = newObject._objects?.filter(path => path.d && !path.d.includes(target))
        console.log(newObject, "fazfeaize", sign)

        if(sign != undefined){
          let realValues = handleReverseMiseAEchelle(sign[0])

          currentSize.width = realValues.realWidth
          currentSize.height = realValues.realHeight
          currentSize.label = 'sticker'
        }else{
          setOutlineMeasurmentValue({}, 0, 0)
  
          currentSize.width = 0
          currentSize.height = 0
          currentSize.label = 'sticker'

        }
      }else{
        activeCanvas.centerObject(newObject)
        // setMeasurmentValue(canvas, newObject)
      }

      
      // function setMeasurmentValue(canvas, mainObject) {
      //   var Objects = canvas.getObjects();
      //   Objects.forEach((object) => {
      //     if (object.name == "heightLine") {
      //       object.visible = heightVisibility
      //       object.set({
      //         x1: mainObject.left + mainObject.width + 30,
      //         y1: mainObject.top,
      //         x2: mainObject.left + mainObject.width + 30,
      //         y2: mainObject.top + mainObject.height,
      //       });
      //     }
      //     if (object.name == "widthLine") {
      //       object.visible = widthVisibility
      //       object.set({
      //         x1: mainObject.left,
      //         y1: mainObject.top + mainObject.height + 28.5,
      //         x2: mainObject.left + mainObject.width + 10,
      //         y2: mainObject.top + mainObject.height + 28.5,
      //       });
      //     }
      //     if (object.name == "height-value") {
      //       object.visible = heightVisibility
      //       object.text = String(currentSize.height + " " + currentUnit);
      //       object.top = mainObject.top + mainObject.height / 2;
      //       object.left = mainObject.left + mainObject.width + 55;
      //     }
      //     if (object.name == "width-value") {
      //       object.visible = widthVisibility
      //       object.text = String(currentSize.width + " " + currentUnit);
      //       object.left = mainObject.left + mainObject.width / 2 - object.width / 2;
      //       object.top = mainObject.top + (mainObject.height + 35);
      //     }
      //     if (object.name == "thickness-value") {
      //       object.left = mainObject.left + mainObject.width / 2 - object.width / 2;
      //       object.top = mainObject.top + (mainObject.height + 65);
      //       object.text = String(
      //         "Thickness" + ": " + currentThickness + " " + currentUnit
      //       );
      //     }
      //   });
      //   canvas.renderAll();
      // }
  
    }

    canvas.renderAll();


  }

  let realValues = await setShape(canvas);
  if(doubleFace){
    await setShape(backCanvas);
  }
  if (signBackground1 === "pattern") {
    setPattern(canvas, patternUrl1);
  }
  if (signBackground2 === "pattern") {
    setPattern(backCanvas, patternUrl2);
  }

  if (!firstLoad && !isTemplate) {
    removeBorder(canvas);
    handleSelectBorder(activeBorder, activeBorderColor);
  }
  if (firstLoad) {
    if (activeSignFace === "front") {
      removeBorder(canvas);
      handleSelectBorder(activeBorder, activeBorderColor);
    }
    if (activeSignFace === "back") {
      removeBorder(backCanvas);
      handleSelectBorder(activeBorder2, activeBorderColor2);
    }
  }

  // await handleShowCutline(canvas)
  handleSelectFixingMethode(activeFixingMethode);

  return currentSize
}

async function showLoader(statut){
  let loader = document.getElementById("asowp-loader")
  if(loader){
    if(statut == true){
      loader.style.display = "flex"
    }else{
      loader.style.display = "none"
    }
  }
}

let strokeSize = 20
let shapeSize = {
  small: 10,
  medium: 20,
  large: 30,
}
async function handleChangeOutlineSize(size, sizeData){
  if(sizeData){
    shapeSize = sizeData
  }
  if(size == "small"){
    strokeSize = shapeSize.small
    await handleSelectShape(selectedShape)
  }else if(size == "medium"){
    strokeSize = shapeSize.medium
    await handleSelectShape(selectedShape)
  }else if(size == "large"){
    strokeSize = shapeSize.large
    await handleSelectShape(selectedShape)
  }
}
let selectedCutline = "none"
let cutlinesData = {
  first: {
    borderSize: 10,
    color: 'green'
  },
  second: { 
    color:'white',
    size: 30,
    borderColor: 'red',
    borderSize: 10,
  },
}
function handleGetCutlineData(cutline, cutlineDatas){
  selectedCutline = cutline
  cutlinesData = cutlineDatas
}
function handleSetCutline(size){
  let safeObject = handleGetObjectByName("safeObject")
  let outline = null
  let pathObjects = safeObject._objects
  pathObjects.forEach(path => {
    if (path.name == "outline") {
      outline = path
    }
  });

  let cutline1 = handleGetObjectByName("asowp-cutline1")
  let cutline2 = handleGetObjectByName("asowp-cutline2")
  let sign = handleGetObjectByName("safeObject")
  if(size == "1x"){
    cutline1.visible = false
    cutline2.visible = false

    cutline1.shadow = null
    cutline2.shadow = null


    sign.shadow = defaultShadow
    outline.set({
      stroke: cutlinesData.first.color,
      strokeWidth: cutlinesData.first.borderSize,
    })

  }else if(size == "2x"){
    cutline1.visible = true
    cutline2.visible = true

    cutline2.shadow = defaultShadow
    sign.shadow = null

    let cutStroke1 = cutlinesData.second.size + cutlinesData.first.borderSize
    let cutStroke2 = cutlinesData.second.size + cutlinesData.second.borderSize

    cutline1.set({
      stroke: cutlinesData.second.color,
      strokeWidth: cutStroke1,
    })
    cutline2.set({
      stroke: cutlinesData.second.borderColor,
      strokeWidth: cutStroke2,
    })
  }else{
    cutline1.visible = false
    cutline2.visible = false
    
    cutline1.shadow = null
    cutline2.shadow = null
    sign.shadow = defaultShadow
  }

  activeCanvas.renderAll()
}
function cloneOutline(object){
  return new Promise(async (resolve, reject) => {
    var target = object;
    if(target != null){
      target.clone(function (cloned) {
        resolve(cloned)
      }); 
    }
  })
}

async function resetCutline(canva){
  return new Promise((resolve, reject)=>{
    if(selectedShape != "cut-to-shape"){
      let exCutline1 = handleGetObjectByName("asowp-cutline1", canva)
      let exCutline2 = handleGetObjectByName("asowp-cutline2", canva)
      if(exCutline1){
        canva.remove(exCutline1)
      }
      if(exCutline2){
        canva.remove(exCutline2)
      }
      let safeObject = handleGetObjectByName("safeObject", canva)
      safeObject.set({
        stroke: "black",
        strokeWidth: 0
      })
    }else{
      let exCutline1 = handleGetObjectByName("asowp-cutline1", canva)
      let exCutline2 = handleGetObjectByName("asowp-cutline2", canva)
      if(exCutline1){
        canva.remove(exCutline1)
      }
      if(exCutline2){
        canva.remove(exCutline2)
      }
    }
    resolve(true)
  })
}
async function handleShowCutline(canva){
  await resetCutline(canvas)

  let safeObject = handleGetObjectByName("safeObject", canva)
  let cutline1 = null
  let cutline2 = null
  if(selectedShape != "cut-to-shape"){
    
    if(activeBorder == "normal"){
      let borderObject = handleGetObjectByName("normal-border", canva)
      cutline1 = await cloneOutline(borderObject)
      cutline2 = await cloneOutline(borderObject)
      let signStroke = safeObject.strokeWidth
      safeObject.set({
        stroke: "black",
        strokeWidth: 0,
        shadow: null,
      })
      // canva.centerObject(safeObject)
      borderObject.set({
        stroke: selectedCutline != "none" ? cutlinesData.first.color : "black",
        strokeWidth: selectedCutline != "none" ? cutlinesData.first.borderSize : 0,
        left: selectedCutline != 'none' ? borderObject.left - (cutlinesData.first.borderSize/2) : borderObject.left,
        top: selectedCutline != 'none' ? borderObject.top - (cutlinesData.first.borderSize/2) : borderObject.top,
        shadow: selectedCutline != "2x" ? defaultShadow : null,
      })

      let cutStroke2 = borderObject.strokeWidth + cutlinesData.second.size + cutlinesData.second.borderSize + cutlinesData.first.borderSize
      cutline2.set({
        stroke: cutlinesData.second.borderColor,
        strokeWidth: cutStroke2,
        left: cutline2.left - (cutStroke2/2),
        top: cutline2.top - (cutStroke2/2),
        shadow: selectedCutline == "2x" ? defaultShadow : null,
        selectable: false,
        name: "asowp-cutline2",
        visible: selectedCutline == "2x" ? true : false
      })

      let cutStroke1 = borderObject.strokeWidth + cutlinesData.second.size + cutlinesData.first.borderSize
      cutline1.set({
        stroke: cutlinesData.second.color,
        strokeWidth: cutStroke1,
        left: cutline1.left - (cutStroke1/2),
        top: cutline1.top - (cutStroke1/2),
        selectable: false,
        name: "asowp-cutline1",
        visible: selectedCutline == "2x" ? true : false,
      })
    
      if(selectedCutline != "2x"){
        setMeasurmentValue(canva, safeObject)
      }else{
        let positionData = {
          left: cutline2.left + (cutline2.strokeWidth),
          top: cutline2.top + (cutline2.strokeWidth),
          width: cutline2.width,
          height: cutline2.height
        }
        // setMeasurmentValue(canva, cutline2)
        setMeasurmentValue(canva, positionData)
      }

      canva.add(cutline1, cutline2)

    }else{
      cutline1 = await cloneOutline(safeObject)
      cutline2 = await cloneOutline(safeObject)
      
      safeObject.set({
        stroke: selectedCutline != "none" ? cutlinesData.first.color : "black",
        strokeWidth: selectedCutline != "none" ? cutlinesData.first.borderSize : 0,
        left: selectedCutline != 'none' ? safeObject.left - (cutlinesData.first.borderSize/2) : safeObject.left,
        top: selectedCutline != 'none' ? safeObject.top - (cutlinesData.first.borderSize/2) : safeObject.top,
        shadow: selectedCutline != "2x" ? defaultShadow : null,
      })

      let cutStroke2 = safeObject.strokeWidth + cutlinesData.second.size + cutlinesData.second.borderSize + cutlinesData.first.borderSize
      cutline2.set({
        stroke: cutlinesData.second.borderColor,
        strokeWidth: cutStroke2,
        left: cutline2.left - (cutStroke2/2),
        top: cutline2.top - (cutStroke2/2),
        shadow: selectedCutline == "2x" ? defaultShadow : null,
        selectable: false,
        name: "asowp-cutline2",
        visible: selectedCutline == "2x" ? true : false
      })

      let cutStroke1 = safeObject.strokeWidth + cutlinesData.second.size + cutlinesData.first.borderSize
      cutline1.set({
        stroke: cutlinesData.second.color,
        strokeWidth: cutStroke1,
        left: cutline1.left - (cutStroke1/2),
        top: cutline1.top - (cutStroke1/2),
        selectable: false,
        name: "asowp-cutline1",
        visible: selectedCutline == "2x" ? true : false,
      })
    
      if(selectedCutline != "2x"){
        setMeasurmentValue(canva, safeObject)
      }else{
        let positionData = {
          left: cutline2.left + (cutline2.strokeWidth),
          top: cutline2.top + (cutline2.strokeWidth),
          width: cutline2.width,
          height: cutline2.height
        }
        // setMeasurmentValue(canva, cutline2)
        setMeasurmentValue(canva, positionData)
      }

      canva.add(cutline1, cutline2)
    }

  }else{
    cutline1 = await cloneOutline(safeObject)
    cutline2 = await cloneOutline(safeObject)

    const target = ` L ${canvas.getWidth()} ${canvas.getHeight()} `;
    let sign = safeObject._objects?.filter(path => path.d && !path.d.includes(target))
    let signCut1 = cutline1._objects?.filter(path => path.fill == sign[0].fill)
    let signCut2 = cutline2._objects?.filter(path => path.fill == sign[0].fill)

    // console.log(sign, "****")

    if(sign != undefined &&  sign[0] && selectedCutline != "none"){
      let pathObjects = safeObject._objects
  
      pathObjects.forEach(path => {
        if (path.name == "outline") {
          path.set({
            stroke: selectedCutline != "none" ? cutlinesData.first.color : "black",
            strokeWidth: selectedCutline != "none" ? cutlinesData.first.borderSize : 0,
            left: path.left - (cutlinesData.first.borderSize/2),
            top: path.top - (cutlinesData.first.borderSize/2),
          })
        }
      });
    }
  
    if(sign != undefined){
      cutline2.set({
        shadow: selectedCutline == "2x" ? defaultShadow : null,
        selectable: false,
        name: "asowp-cutline2",
        visible: selectedCutline == "2x" ? true : false
      })
      cutline1.set({
        selectable: false,
        name: "asowp-cutline1",
        visible: selectedCutline == "2x" ? true : false,
      })
    
      let cutStroke1 = cutlinesData.second.size + cutlinesData.first.borderSize
      signCut1[0].set({
        stroke: cutlinesData.second.color,
        strokeWidth: cutStroke1,
        left: signCut1[0].left - (cutStroke1/2),
        top: signCut1[0].top - (cutStroke1/2),
      })
      let cutStroke2 = cutlinesData.first.borderSize + cutlinesData.second.size + cutlinesData.second.borderSize
      signCut2[0].set({
        stroke: cutlinesData.second.borderColor,
        strokeWidth: cutStroke2,
        left: signCut2[0].left - (cutStroke2/2),
        top: signCut2[0].top - (cutStroke2/2),
      })
    
      canva.add(cutline1, cutline2)
  
      let realValues = handleReverseMiseAEchelle(sign[0])
      setOutlineMeasurmentValue(sign[0], realValues.realWidth, realValues.realHeight)
    }else{
      setOutlineMeasurmentValue({}, 0, 0)
    }
  }
  cutline1.sendToBack()
  cutline2.sendToBack()
}

//fonctions concernant les fixings methode
function resetFixing(canva) {
  // console.log("resetFixing")
  function reset(canvas) {
    var Objects = canvas.getObjects();
    Objects.forEach(function (object) {
      if (object.type != "line") {
        if (
          object.name == "screw1" ||
          object.name == "screw2" ||
          object.name == "screw3" ||
          object.name == "screw4" ||
          object.name == "screw-cap1" ||
          object.name == "screw-cap2" ||
          object.name == "screw-cap3" ||
          object.name == "screw-cap4" ||
          object.name == "suction-cup1" ||
          object.name == "suction-cup2" ||
          object.name == "suction-cup3" ||
          object.name == "suction-cup4" ||
          object.name == "standoff1" ||
          object.name == "standoff2" ||
          object.name == "standoff3" ||
          object.name == "standoff4" ||
          object.name == "flag" ||
          object.name == "flag1" ||
          object.name == "flag2" ||
          object.name == "table-stand" ||
          object.name == "ceiling1" ||
          object.name == "ceiling2" ||
          object.name == "hanging-hole" ||
          object.name == "hanging-hole1" ||
          object.name == "hanging-hole2" ||
          object.name == "pole" ||
          object.name == "cable-hole1" ||
          object.name == "cable-hole2" ||
          object.name == "cable-hole3" ||
          object.name == "cable-hole4" ||
          object.name == "eyelet1" ||
          object.name == "eyelet2" ||
          object.name == "eyelet3" ||
          object.name == "eyelet4" ||
          object.name == "table-clamp1" ||
          object.name == "table-clamp2" ||
          object.name == "base-support1" ||
          object.name == "base-support2" ||
          object.name == "keyring-hole" ||
          object.name == "keyring" ||
          object.name == "s-hook-hole" ||
          object.name == "s-hook" ||
          object.name == "roll-up-top" ||
          object.name == "roll-up-bottom" ||
          object.name == "sign-holder-top" ||
          object.name == "sign-holder-bottom"
        ) {
          canvas.remove(object);
          canvas.renderAll();
        }
      }
    });
  }
  reset(canva);
}
function handleGetActiveFixing(type) {
  activeFixingMethode = type;
}
var activeFixingMethode = "";
function handleSelectFixingMethode(methode) {
  // console.logf("qsqs")
  // console.log(methode, "Fixing methode")
  activeFixingMethode = methode;

  function setFixing(canva) {
    resetFixing(canva);

    canva.getObjects().forEach(function (object) {
      if (object.type !== "line") {
        if (methode == "none") {
          resetFixing(canva);
        }

        if (object.name == "safeObject") {
          if (methode == "screw") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left;
                      img.set("name", "screw1");
                      img.id = 7;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "screw2");
                      img.id = 8;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
              if (sizeRatio == "big") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top;
                      img.left = object.left;
                      img.set("name", "screw1");
                      img.id = 7;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top;
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "screw2");
                      img.id = 8;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top + (object.height - newHeight);
                      img.left = object.left;
                      img.set("name", "screw3");
                      img.id = 9;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top + (object.height - newHeight);
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "screw4");
                      img.id = 10;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
            }
            if (selectedShape == "triangle") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + newHeight / 2;
                    img.left = object.left + (object.width / 2 - newWidth / 2);
                    img.set("name", "screw1");
                    img.id = 7;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "screw2");
                    img.id = 8;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "screw3");
                    img.id = 9;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "oval" || selectedShape == "rotated-square") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    // img.scaleToWidth(object.width);
                    // img.scaleToHeight(object.height);
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "screw1");
                    img.id = 7;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "screw2");
                    img.id = 8;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "turn-left" || selectedShape == "arrow-left") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    // img.scaleToWidth(object.width);
                    // img.scaleToHeight(object.height);
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "screw1");
                    img.id = 7;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw2");
                    img.id = 8;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (
              selectedShape == "turn-right" ||
              selectedShape == "arrow-right"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "screw1");
                    img.id = 7;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "screw2");
                    img.id = 8;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "stop") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "screw1");
                    img.id = 7;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw2");
                    img.id = 8;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
          }
          if (methode == "screw-cap") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw-cap.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      // img.scaleToWidth(object.width);
                      // img.scaleToHeight(object.height);
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left;
                      img.set("name", "screw-cap1");
                      img.id = 11;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw-cap.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "screw-cap2");
                      img.id = 12;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
              if (sizeRatio == "big") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw-cap.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top;
                      img.left = object.left;
                      img.set("name", "screw-cap1");
                      img.id = 11;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw-cap.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top;
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "screw-cap2");
                      img.id = 12;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw-cap.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top + (object.height - newHeight);
                      img.left = object.left;
                      img.set("name", "screw-cap3");
                      img.id = 13;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_screw-cap.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top + (object.height - newHeight);
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "screw-cap4");
                      img.id = 14;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
            }
            if (selectedShape == "triangle") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + newHeight / 2;
                    img.left = object.left + (object.width / 2 - newWidth / 2);
                    img.set("name", "screw-cap1");
                    img.id = 11;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "screw-cap2");
                    img.id = 12;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "screw-cap3");
                    img.id = 13;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "oval" || selectedShape == "rotated-square") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    // img.scaleToWidth(object.width);
                    // img.scaleToHeight(object.height);
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "screw-cap1");
                    img.id = 11;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "screw-cap2");
                    img.id = 12;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "turn-left" || selectedShape == "arrow-left") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    // img.scaleToWidth(object.width);
                    // img.scaleToHeight(object.height);
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "screw-cap1");
                    img.id = 11;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw-cap2");
                    img.id = 12;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (
              selectedShape == "turn-right" ||
              selectedShape == "arrow-right"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "screw-cap1");
                    img.id = 11;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "screw-cap2");
                    img.id = 12;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "stop") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "screw-cap1");
                    img.id = 11;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_screw-cap.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "screw-cap2");
                    img.id = 12;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
          }
          if (methode == "suction-cup") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_suction-cup.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left;
                      img.set("name", "suction-cup1");
                      img.id = 15;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_suction-cup.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "suction-cup2");
                      img.id = 16;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
              if (sizeRatio == "big") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_suction-cup.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top;
                      img.left = object.left;
                      img.set("name", "suction-cup1");
                      img.id = 15;
                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_suction-cup.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top;
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "suction-cup2");
                      img.id = 16;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_suction-cup.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top + (object.height - newHeight);
                      img.left = object.left;
                      img.set("name", "suction-cup3");
                      img.id = 17;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_suction-cup.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top + (object.height - newHeight);
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "suction-cup4");
                      img.id = 18;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
            }
            if (selectedShape == "triangle") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + newHeight / 2;
                    img.left = object.left + (object.width / 2 - newWidth / 2);
                    img.set("name", "suction-cup1");
                    img.id = 15;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "suction-cup2");
                    img.id = 16;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "suction-cup3");
                    img.id = 17;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "oval" || selectedShape == "rotated-square") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    // img.scaleToWidth(object.width);
                    // img.scaleToHeight(object.height);
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "suction-cup1");
                    img.id = 15;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "suction-cup2");
                    img.id = 16;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "turn-left" || selectedShape == "arrow-left") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    // img.scaleToWidth(object.width);
                    // img.scaleToHeight(object.height);
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "suction-cup1");
                    img.id = 15;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "suction-cup2");
                    img.id = 16;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (
              selectedShape == "turn-right" ||
              selectedShape == "arrow-right"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "suction-cup1");
                    img.id = 15;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "suction-cup2");
                    img.id = 16;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "stop") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "suction-cup1");
                    img.id = 15;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_suction-cup.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "suction-cup2");
                    img.id = 16;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
          }
          if (methode == "standoff") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_standoff.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left;
                      img.set("name", "standoff1");
                      img.id = 19;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_standoff.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "standoff2");
                      img.id = 20;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
              if (sizeRatio == "big") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_standoff.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top;
                      img.left = object.left;
                      img.set("name", "standoff1");
                      img.id = 19;
                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_standoff.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top;
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "standoff2");
                      img.id = 20;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_standoff.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top + (object.height - newHeight);
                      img.left = object.left;
                      img.set("name", "standoff3");
                      img.id = 21;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_standoff.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top + (object.height - newHeight);
                      img.left = object.left + (object.width - newWidth);
                      img.set("name", "standoff4");
                      img.id = 22;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
            }
            if (selectedShape == "triangle") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + newHeight / 2;
                    img.left = object.left + (object.width / 2 - newWidth / 2);
                    img.set("name", "standoff1");
                    img.id = 19;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "standoff2");
                    img.id = 20;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height - newHeight);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "standoff3");
                    img.id = 21;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "oval" || selectedShape == "rotated-square") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    // img.scaleToWidth(object.width);
                    // img.scaleToHeight(object.height);
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "standoff1");
                    img.id = 19;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "standoff2");
                    img.id = 20;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "turn-left" || selectedShape == "arrow-left") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    // img.scaleToWidth(object.width);
                    // img.scaleToHeight(object.height);
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + newWidth / 2;
                    img.set("name", "standoff1");
                    img.id = 19;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "standoff2");
                    img.id = 20;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (
              selectedShape == "turn-right" ||
              selectedShape == "arrow-right"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "standoff1");
                    img.id = 19;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left =
                      object.left + (object.width - newWidth) - newWidth / 2;
                    img.set("name", "standoff2");
                    img.id = 20;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "stop") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left;
                    img.set("name", "standoff1");
                    img.id = 19;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_standoff.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left + (object.width - newWidth);
                    img.set("name", "standoff2");
                    img.id = 20;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
          }
          if (methode == "flag") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides" ||
              selectedShape == "turn-right" ||
              selectedShape == "turn-left"
            ) {
              if (sizeRatio == "small") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_flag.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left - newWidth / 2;
                      img.set("name", "flag1");
                      img.id = 23;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                      img.bringToFront();
                    });
                  }
                );
              }
              if (sizeRatio == "big") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_flag.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 4 - newHeight / 2);
                      img.left = object.left - newWidth / 2;
                      img.set("name", "flag1");
                      img.id = 23;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_flag.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + ((object.height / 4) * 3 - newHeight / 2);
                      img.left = object.left - newWidth / 2;
                      img.set("name", "flag2");
                      img.id = 24;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
            }
            if (selectedShape == "oval" || selectedShape == "stop") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_flag.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + (object.height / 2 - newHeight / 2);
                    img.left = object.left - newWidth / 2;
                    img.set("name", "flag1");
                    img.id = 23;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                    img.bringToFront();
                  });
                }
              );
            }
            if (selectedShape == "turn-left") {
              if (sizeRatio == "small") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_flag-left.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 2 - newHeight / 2);
                      img.left = object.left + object.width - newWidth / 2;
                      img.set("name", "flag");
                      img.id = 23;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                      img.bringToFront();
                    });
                  }
                );
              }
              if (sizeRatio == "big") {
                handleConvertImageToDataURI(
                  fixingUrl + "/im_flag-left.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + (object.height / 4 - newHeight / 2);
                      img.left = object.left + object.width - newWidth / 2;
                      img.set("name", "flag1");
                      img.id = 23;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );

                handleConvertImageToDataURI(
                  fixingUrl + "/im_flag-left.png",
                  function (dataURI) {
                    fabric.Image.fromURL(dataURI, function (img) {
                      img.scale(fixScale);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top =
                        object.top + ((object.height / 4) * 3 - newHeight / 2);
                      img.left = object.left + object.width - newWidth / 2;
                      img.set("name", "flag2");
                      img.id = 24;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    });
                  }
                );
              }
            }
          }
          if (methode == "table-stand") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square"
            ) {
              var points = [
                { x: 0, y: 0 },
                { x: -10, y: object.height / 10 },
                { x: object.width + 10, y: object.height / 10 },
                { x: object.width, y: 0 },
              ];
              var tableStand = new fabric.Polygon(points, {
                id: 25,
                left: object.left - 10,
                top: object.top + object.height,
                fill: "grey",
                name: "table-stand",
                selectable: false,
              });
              // tableStand.setGradient('fill', {
              //     x1: 0,
              //     y1: 0,
              //     x2: 0,
              //     y2: 0,
              //     colorStops:{
              //         0: 'red',
              //         0.2: 'green',
              //         0.6: 'purple',
              //         0.8: 'yellow',
              //         1: 'blue'
              //     }
              // });
              canva.add(tableStand);
              tableStand.sendToBack();
            }
          }
          if (methode == "ceiling") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_ceiling.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 2;
                    img.left = object.left + object.width / 5 - newWidth;
                    img.set("name", "ceiling1");
                    img.id = 26;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_ceiling.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 2;
                    img.left = object.left + (object.width / 5) * 4;
                    img.set("name", "ceiling2");
                    img.id = 27;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "oval" || selectedShape == "stop") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_ceiling.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 2;
                    img.left = object.left + object.width / 2 - newWidth / 2;
                    img.set("name", "ceiling1");
                    img.id = 26;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "turn-left") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_ceiling.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 2;
                    img.left =
                      object.left + (object.width / 5) * 3.5 - newWidth;
                    img.set("name", "ceiling1");
                    img.id = 26;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_ceiling.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 2;
                    img.left = object.left + (object.width / 5) * 4;
                    img.set("name", "ceiling2");
                    img.id = 27;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
            if (selectedShape == "turn-right") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_ceiling.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 2;
                    img.left = object.left + object.width / 5 - newWidth;
                    img.set("name", "ceiling1");
                    img.id = 26;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_ceiling.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 2;
                    img.left = object.left + (object.width / 5) * 1.5;
                    img.set("name", "ceiling2");
                    img.id = 27;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
          }
          if (methode == "hanging") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              if (sizeRatio == "small") {
                var hangingHole = new fabric.Circle({
                  id: 28,
                  radius: object.height * 0.06,
                  fill: "#f5f5f5",
                  left: object.left + object.width / 2 - 15,
                  top: object.top + 15,
                  name: "hanging-hole",
                  strokeWidth: 2,
                  stroke: "grey",
                  selectable: false,
                });
                canva.add(hangingHole);
              }
              if (sizeRatio == "big") {
                var hangingHole1 = new fabric.Circle({
                  id: 28,
                  radius: object.height * 0.03,
                  fill: "#f5f5f5",
                  left: object.left + object.width / 8 - 15,
                  top: object.top + 15,
                  name: "hanging-hole1",
                  strokeWidth: 2,
                  stroke: "grey",
                  selectable: false,
                });
                var hangingHole2 = new fabric.Circle({
                  id: 29,
                  radius: object.height * 0.03,
                  fill: "#f5f5f5",
                  left: object.left + (object.width / 8) * 7 - 15,
                  top: object.top + 15,
                  name: "hanging-hole2",
                  strokeWidth: 2,
                  stroke: "grey",
                  selectable: false,
                });
                canva.add(hangingHole1, hangingHole2);
              }
            }
            if (
              selectedShape == "oval" ||
              selectedShape == "stop" ||
              selectedShape == "triangle" ||
              selectedShape == "rotated-square"
            ) {
              var hangingHole = new fabric.Circle({
                id: 28,
                radius: object.height * 0.04,
                fill: "#f5f5f5",
                left: object.left + object.width / 2 - object.height * 0.04,
                top: object.top + 20,
                name: "hanging-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(hangingHole);
            }
          }
          if (methode == "pole-attachment") {
            resetFixing(canva);
            var pole = new fabric.Rect({
              id: 30,
              width: object.width / 4,
              height: object.height * 2,
              top: object.top - object.height / 2,
              left: object.left + object.width / 2 - object.width / 4 / 2,
              fill: "grey",
              strokeWidth: 2,
              stroke: "grey",
              name: "pole",
              selectable: false,
            });
            canva.add(pole);
            pole.sendToBack();
          }
          if (methode == "cable-labeling") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              var cableHole1 = new fabric.Rect({
                id: 31,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top: object.top + object.height / 6 - object.height * 0.05,
                left: object.left + object.width / 7 - object.width * 0.05,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole1",

                selectable: false,
              });
              var cableHole2 = new fabric.Rect({
                id: 32,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top: object.top + object.height / 6 - object.height * 0.05,
                left: object.left + (object.width / 7) * 6,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole2",
                selectable: false,
              });
              var cableHole3 = new fabric.Rect({
                id: 33,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top:
                  object.top + (object.height / 6) * 5 - object.height * 0.05,
                left: object.left + object.width / 7 - object.width * 0.05,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole3",
                selectable: false,
              });
              var cableHole4 = new fabric.Rect({
                id: 34,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top:
                  object.top + (object.height / 6) * 5 - object.height * 0.05,
                left: object.left + (object.width / 7) * 6,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole4",
                selectable: false,
              });
              canva.add(cableHole1, cableHole2, cableHole3, cableHole4);
            }
            if (selectedShape == "oval" || selectedShape == "stop") {
              var cableHole1 = new fabric.Rect({
                id: 31,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top: object.top + object.height / 2,
                left: object.left + object.width / 7 - object.width * 0.05,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole1",

                selectable: false,
              });
              var cableHole2 = new fabric.Rect({
                id: 32,
                width: object.width * 0.07,
                height: object.height * 0.05,
                top: object.top + object.height / 2,
                left: object.left + (object.width / 7) * 6,
                fill: "#f5f5f5",
                strokeWidth: 2,
                stroke: "grey",
                name: "cable-hole2",
                selectable: false,
              });
              canva.add(cableHole1, cableHole2);
            }
          }
          if (methode == "table-clamp") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_table-clamp.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + object.height - newHeight / 2;
                    img.left = object.left + object.width / 5 - newWidth;
                    img.set("name", "table-clamp1");
                    img.id = 35;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_table-clamp.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + object.height - newHeight / 2;
                    img.left = object.left + (object.width / 5) * 4;
                    img.set("name", "table-clamp2");
                    img.id = 36;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
          }
          if (methode == "base-support") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_base-support-left.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + object.height - newHeight + 5;
                    img.left = object.left + object.width / 5 - newWidth;
                    img.set("name", "base-support1");
                    img.id = 37;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                    // img.sendToBack()
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_base-support-right.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(fixScale);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + object.height - newHeight + 5;
                    img.left = object.left + (object.width / 5) * 4;
                    img.set("name", "base-support2");
                    img.id = 38;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                    // img.sendToBack()
                  });
                }
              );
            }
          }
          if (methode == "eyelets") {
            resetFixing(canva);
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_eyelets.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(0.15);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left;
                    img.flipX = true;
                    img.set("name", "eyelet1");
                    img.id = 39;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_eyelets.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(0.15);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top;
                    img.left = object.left + object.width - newWidth;
                    img.set("name", "eyelet2");
                    img.id = 40;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_eyelets.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(0.15);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + object.height - newHeight;
                    img.left = object.left;
                    img.flipX = true;
                    img.flipY = true;
                    img.set("name", "eyelet3");
                    img.id = 41;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_eyelets.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(0.15);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + object.height - newHeight;
                    img.left = object.left + object.width - newWidth;
                    img.flipY = true;
                    img.set("name", "eyelet4");
                    img.id = 42;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
          }
          if (methode == "keyring") {
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_keyring.png",
                function (dataURI) {
                  fabric.Image.fromURL(
                    dataURI,
                    function (img) {
                      img.scale(0.25);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top - newHeight / 1.4;
                      (img.left = object.left - newWidth / 2.5),
                        // img.flipX = true
                        img.set("name", "keyring");
                      img.id = 44;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    },
                    { crossOrigin: "anonymous" }
                  );
                }
              );

              var keyringHole = new fabric.Circle({
                id: 43,
                radius: object.height * 0.05,
                fill: "#f5f5f5",
                top: object.top + 13,
                left: object.left + 13,
                name: "keyring-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "oval" || selectedShape == "stop") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_keyring_oval.png",
                function (dataURI) {
                  fabric.Image.fromURL(
                    fixingUrl + "/im_keyring_oval.png",
                    function (img) {
                      img.scale(0.25);

                      img.setCoords();
                      var newWidth = img.width * img.scaleX;
                      var newHeight = img.height * img.scaleY;

                      img.top = object.top - newHeight / 1.4;
                      (img.left =
                        object.left + object.width / 2 - newWidth / 2),
                        // img.flipX = true
                        img.set("name", "keyring");
                      img.id = 44;

                      img.selectable = false;
                      img.objectType = "asowp-fixingMethods";
                      canva.add(img);
                    }
                  );
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 43,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + 15,
                left: object.left + object.width / 2 - newRadius,
                name: "keyring-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "rotated-square") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_keyring_losange.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(0.25);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 1.4;
                    (img.left = object.left + object.width / 2 - newWidth / 2),
                      // img.flipX = true
                      img.set("name", "keyring");
                    img.id = 44;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 43,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + 15,
                left: object.left + object.width / 2 - newRadius,
                name: "keyring-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "triangle") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_keyring_triangle.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(0.25);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + object.height / 10 - newHeight / 1.2;
                    (img.left = object.left + object.width / 2 - newWidth / 2),
                      // img.flipX = true
                      img.set("name", "keyring");
                    img.id = 44;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 43,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + object.height / 10,
                left: object.left + object.width / 2 - newRadius,
                name: "keyring-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
          }
          if (methode == "s-hook") {
            if (
              selectedShape == "square" ||
              selectedShape == "rounded-square" ||
              selectedShape == "rounded-top" ||
              selectedShape == "rounded-sides" ||
              selectedShape == "oval" ||
              selectedShape == "stop"
            ) {
              handleConvertImageToDataURI(
                fixingUrl + "/im_s-hook.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(0.6);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 1.4;
                    (img.left = object.left + object.width / 2 - newWidth / 2),
                      // img.flipX = true
                      img.set("name", "s-hook");
                    img.id = 45;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 46,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + object.height / 25,
                left: object.left + object.width / 2 - newRadius,
                name: "s-hook-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "rotated-square") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_s-hook_losange.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(0.6);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 1.5;
                    (img.left =
                      object.left + object.width / 2 - newWidth / 1.9),
                      // img.flipX = true
                      img.set("name", "s-hook");
                    img.id = 45;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 46,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + object.height / 15,
                left: object.left + object.width / 2 - newRadius,
                name: "s-hook-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
            if (selectedShape == "triangle") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_s-hook_triangle.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    img.scale(0.6);

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight / 1.6;
                    (img.left =
                      object.left + object.width / 2 - newWidth / 1.9),
                      // img.flipX = true
                      img.set("name", "s-hook");
                    img.id = 45;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              var newRadius = object.height * 0.05;
              var keyringHole = new fabric.Circle({
                id: 46,
                radius: newRadius,
                fill: "#f5f5f5",
                top: object.top + object.height / 10,
                left: object.left + object.width / 2 - newRadius,
                name: "s-hook-hole",
                strokeWidth: 2,
                stroke: "grey",
                selectable: false,
              });
              canva.add(keyringHole);
            }
          }
          if (methode == "roll-up") {
            if (selectedShape == "square") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_roll-up_top.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    var scaleX = object.width / img.width;
                    img.scaleX = scaleX;

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight;
                    img.left = object.left;
                    img.set("name", "roll-up-top");
                    img.id = 47;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_roll-up_bottom.jpg",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    var scaleX = object.width / img.width;
                    img.scaleX = scaleX;

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + object.height;
                    img.left = object.left;
                    img.set("name", "roll-up-bottom");
                    img.id = 48;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
          }
          if (methode == "sign-holder") {
            if (selectedShape == "square") {
              handleConvertImageToDataURI(
                fixingUrl + "/im_sign-holder.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    var scaleX = object.width / img.width;
                    img.scaleX = scaleX;

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top - newHeight + newHeight / 2;
                    img.left = object.left;
                    img.set("name", "sign-holder-top");
                    img.id = 47;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );

              handleConvertImageToDataURI(
                fixingUrl + "/im_sign-holder.png",
                function (dataURI) {
                  fabric.Image.fromURL(dataURI, function (img) {
                    var scaleX = object.width / img.width;
                    img.scaleX = scaleX;

                    img.setCoords();
                    var newWidth = img.width * img.scaleX;
                    var newHeight = img.height * img.scaleY;

                    img.top = object.top + object.height - newHeight / 2;
                    img.left = object.left;
                    img.flipY = true;
                    img.set("name", "sign-holder-bottom");
                    img.id = 48;

                    img.selectable = false;
                    img.objectType = "asowp-fixingMethods";
                    canva.add(img);
                  });
                }
              );
            }
          }
        }
      }
      if (object.type === "line") {
        object.bringToFront();
      }
    });
    canva.renderAll();
  }

  if(selectedShape != "cut-to-shape"){
    setFixing(canvas);
    setFixing(backCanvas);
  }
  // if(firstLoad){
  // }

  // setTimeout(function() {
  //     // Comptez le nombre d'objets sur le canvas
  //     var nombreObjets = canvas.getObjects().filter(objet => objet.name === 'standoff1');

  //     // console.log("Nombre d'objets après ajout :", nombreObjets);
  // }, 100);
  if (readyToSave) {
    updateModifications(true, "selection de fixing");
  }
}

// fonctions concernant l'ajout de text à la sign
function getObjectValueToUnit(container, obj, objWidth, objHeight, objLeft, objTop) {
 // 1. Récupérer les paramètres stockés lors de la mise à l'échelle
  // const { fixingScale, signRatio } = canvas;
    
  // 2. Annuler le ratio final (signRatio)
  let intermediateW , intermediateH, intermediateLeft, intermediateTop
  
  // 3. Annuler le scale de base (fixingScale)
  let realWidthPx , realHeightPx

  // 3.5
  let intermediateSignW, intermediateSignH , realSignWidth , realSignHeight
  let scaleX, scaleY
  if(container.type != 'path'){
    intermediateSignW = container.width / ratioScale;
    intermediateSignH = container.height / ratioScale;
    realSignWidth = convertFromPx(intermediateSignW, currentUnit);
    realSignHeight = convertFromPx(intermediateSignH, currentUnit);

      // 2. Annuler le ratio final (signRatio)
    intermediateW = objWidth / ratioScale;
    intermediateH = objHeight / ratioScale;
    intermediateLeft = objLeft / ratioScale;
    intermediateTop = objTop / ratioScale;
    
    realWidthPx = intermediateW 
    realHeightPx = intermediateH 
  }else{
    realWidthPx = objWidth 
    realHeightPx = objHeight 



    scaleX = container.scaleX * container.group.scaleX
    scaleY = container.scaleY * container.group.scaleX
    intermediateSignW = ((container.width + strokeSize) * scaleX);
    intermediateSignH = ((container.height + strokeSize) * scaleY);
    // intermediateSignW = ((container.width + strokeSize) * scaleX) / ratioScale;
    // intermediateSignH = ((container.height + strokeSize) * scaleY) / ratioScale;
    realSignWidth = convertFromPx(intermediateSignW, currentUnit);
    realSignHeight = convertFromPx(intermediateSignH, currentUnit);
  }
  // console.log(realSignWidth, realSignHeight, "787878", container)
  
  // 4. Convertir en unité réelle
  const realWidth = convertFromPx(realWidthPx, currentUnit);
  const realHeight = convertFromPx(realHeightPx, currentUnit);
  const realLeft = convertFromPx(intermediateLeft, currentUnit);
  const realTop = convertFromPx(intermediateTop, currentUnit);
  const realRight = realSignWidth - (realWidth + realLeft);
  const realBottom = realSignHeight - (realHeight + realTop);
    
    // 8. Mise à jour UI
    updateDimensionUI({
      width: realWidth,
      height: realHeight,
      left: realLeft,
      right: realRight,
      top: realTop,
      bottom: realBottom,
      angle: obj.angle
    });
    
    return {
        width: Math.round(realWidth * 10) / 10, // 1 décimale
        height: Math.round(realHeight * 10) / 10,
        left: Math.round(realLeft * 10) / 10,
        right: Math.round(realRight * 10) / 10,
        top: Math.round(realTop * 10) / 10,
        bottom: Math.round(realBottom * 10) / 10,
        angle: Math.round(obj.angle)
    };
}

// Fonction utilitaire pour mettre à jour l'UI
function updateDimensionUI(values) {
  let ids 
  if(selectedShape != "cut-to-shape"){ 
   ids = ['width', 'height', 'left', 'right', 'top', 'bottom', 'angle'];
  }else{
    ids = ['width', 'height','angle'];
  }

  ids.forEach(id => {
    const element = document.getElementById(`text-${id}`);
    if (element) element.textContent = Math.round(values[id]);
  });

  // Gestion spéciale pour les images
  const activeObj = canvas.getActiveObject();
  if (activeObj && ['image', 'path', 'group'].includes(activeObj.type)) {
    const imgWidth = document.getElementById('image-width');
    const imgHeight = document.getElementById('image-height');
    if (imgWidth) imgWidth.textContent = Math.round(values.width);
    if (imgHeight) imgHeight.textContent = Math.round(values.height);
  }
}


//function for get added text value
var selectedText = {
  object: {},
  color: "",
  width: "",
  height: "",
  left: "",
  right: "",
  top: "",
  bottom: "",
  value: "",
  align: "",
  font: "",
  size: "",
  weight: "normal",
  style: "",
  underline: false,
  linethrough: false,
  overline: false,
};

function handleGetAddedTextValues(transform) {
  var sign = handleGetObjectByName("safeObject");
  let container
  if(sign.type != "path" && sign.type != "group"){
    container = sign
  }else{
    let pathObjects = sign._objects
    const target = ` L ${activeCanvas.getWidth()} ${activeCanvas.getHeight()} `;
    
    pathObjects.forEach(path => {
      const d = path.d;
      if (path.name == "outline") {
        container = path
      }
    });
  }

  let values

  if (transform.type == "i-text" || transform.type == "neon-Text") {
    var obj = transform;
    obj.setCoords();
    var objWidht = obj.width * obj.scaleX;
    var objHeight = obj.height * obj.scaleY;

    // Calculer les limites de l'objet
    var objBounds = obj.getBoundingRect();

    // Récupérer les coins de l'objet
    var objLeft = objBounds.left;
    var objTop = objBounds.top;

    // Calculer par rapport aux dimensions du container
    let objLeftInContainer, objRightInContainer, objTopInContainer, objBottomInContainer
    if(container.type != "path" && container.type != "group"){
      objLeftInContainer = obj.left - objWidht / 2 - container.left;
      objRightInContainer = container.width - (objLeftInContainer + objWidht);
      objTopInContainer = obj.top - objHeight / 2 - container.top;
      objBottomInContainer = container.height - (objTopInContainer + objHeight);
    }else{
      const centerPoint = container.getCenterPoint();
      const objectGlobal = fabric.util.transformPoint(
        centerPoint,
        sign.calcTransformMatrix()
      );
      let scaleX = sign.scaleX * container.scaleX
      let scaleY = sign.scaleY * container.scaleX
  
      objLeftInContainer = obj.left - objWidht / 2 - objectGlobal.x;
      objRightInContainer = (container.width * scaleX) - (objLeftInContainer + objWidht);
      objTopInContainer = obj.top - objHeight / 2 - objectGlobal.y;
      objBottomInContainer = (container.height * scaleY) - (objTopInContainer + objHeight);
    }

    selectedText.object = obj;
    selectedText.value = obj.text;
    selectedText.align = obj.textAlign;
    selectedText.font = obj.fontFamily;
    selectedText.size = obj.scaleX;
    selectedText.weight = obj.fontWeight;
    selectedText.style = obj.fontStyle;
    selectedText.underline = obj.underline;
    selectedText.linethrough = obj.linethrough;
    selectedText.overline = obj.overline;

    var textEditor = document.getElementById("asowp-text-editor");
    textEditor.value = selectedText.value;
    var sizeEditor = document.getElementById("asowp-text-size");
    sizeEditor.value = parseInt(selectedText.size * 12);

    values = getObjectValueToUnit( container, obj, objWidht, objHeight, objLeftInContainer, objTopInContainer );

    handleCalcTextPrice();
  } else {
    var obj = transform.target;
    var newCoord = obj.getCoords();

    var objWidht = obj.width * obj.scaleX;
    var objHeight = obj.height * obj.scaleY;

    var objBounds = obj.getBoundingRect();

    var objLeft = objBounds.left;
    var objTop = objBounds.top;

    obj.setCoords();
    // obj.set('left', container.left)
    // canvas.renderAll()

    let objLeftInContainer, objRightInContainer, objTopInContainer, objBottomInContainer
    if(container.type != "path" && container.type != "group"){
      objLeftInContainer = obj.left - objWidht / 2 - container.left;
      objRightInContainer = container.width - (objLeftInContainer + objWidht);
      objTopInContainer = obj.top - objHeight / 2 - container.top;
      objBottomInContainer = container.height - (objTopInContainer + objHeight);
    }else{
      const centerPoint = container.getCenterPoint();
      const objectGlobal = fabric.util.transformPoint(
        centerPoint,
        sign.calcTransformMatrix()
      );
      let scaleX = sign.scaleX * container.scaleX
      let scaleY = sign.scaleY * container.scaleX
  
      objLeftInContainer = obj.left - objWidht / 2 - objectGlobal.x;
      objRightInContainer = (container.width * scaleX) - (objLeftInContainer + objWidht);
      objTopInContainer = obj.top - objHeight / 2 - objectGlobal.y;
      objBottomInContainer = (container.height * scaleY) - (objTopInContainer + objHeight);
    }

    if (obj.type == "i-text" || obj.type == "neon-Text") {
      selectedText.object = obj;
      selectedText.value = obj.text;
      selectedText.align = obj.textAlign;
      selectedText.font = obj.fontFamily;
      selectedText.size = obj.scaleX;
      selectedText.weight = obj.fontWeight;
      selectedText.style = obj.fontStyle;
      selectedText.underline = obj.underline;
      selectedText.linethrough = obj.linethrough;
      selectedText.overline = obj.overline;

      values = getObjectValueToUnit( container, obj, objWidht, objHeight, objLeftInContainer, objTopInContainer );
    }
    handleCalcTextPrice();

    var textEditor = document.getElementById("asowp-text-editor");
    textEditor.value = selectedText.value;
    var sizeEditor = document.getElementById("asowp-text-size");
    sizeEditor.value = parseInt(selectedText.size + 12);
  }
  
  return values;
}
fabric.NeonText = fabric.util.createClass(fabric.Text, {
  type: 'neon-Text',

  initialize: function(text, options) {
    options = options || {};
    this.neonColor = options.neonColor || 'white';
    this.glowRadius = options.glowRadius || 20;
    this.id = options.id;
    this.name = options.name;
    this.lockMoving = options.lockMoving;
    this.fontFamilyUrl = options.fontFamilyUrl;
    this.canvasName = options.canvasName;

    // Assurez-vous que `text` est une chaîne de caractères
    this.text = typeof text === 'string' ? text : '';

    this.callSuper('initialize', this.text, options);
  },

  _render: function(ctx) {
    this.callSuper('_render', ctx);
    ctx.save();

    const lines = this.text.split('\n');
    const lineHeight = this.fontSize * this.lineHeight;

    const originX = -this.width / 2;
    let originY = -this.height / 2 + this.fontSize / 2 + (this.fontSize * 0.38);

    lines.forEach((line, lineIndex) => {
      const lineWidth = this.__lineWidths[lineIndex];
      const lineHeight = this.__lineHeights[lineIndex];

      const lineY = originY + lineIndex * lineHeight;

      let lineX = originX;
      const newLineOrigin = (this.width / 2 - lineWidth / 2);
      if (this.textAlign === 'center') {
        lineX += newLineOrigin;
      } else if (this.textAlign === 'right') {
        lineX += newLineOrigin * 2;
      }

      for (let i = this.glowRadius; i > 0; i -= 5) {
        ctx.shadowColor = this.neonColor;
        ctx.shadowBlur = i;
        ctx.fillStyle = this.neonColor;
        ctx.fillText(line, lineX, lineY);
      }

      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
    });

    this.callSuper('_render', ctx);
    ctx.restore();
  },

  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      neonColor: this.neonColor,
      glowRadius: this.glowRadius,
      id: this.id,
      name: this.name,
      lockMoving: this.lockMoving,
      fontFamilyUrl: this.fontFamilyUrl,
      canvasName: this.canvasName,
    });
  }
});

fabric.NeonText.fromObject = function (object, callback) {
  // Assurez-vous que `object.text` est une chaîne de caractères
  object.text = typeof object.text === 'string' ? object.text : '';
  return callback(new fabric.NeonText(object.text, object));
};


function loadFont(fontName, fontUrl) {
  return new Promise((resolve, reject) => {
    const font = new FontFace(fontName, `url(${fontUrl})`);
    font.load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
let newId = 49;

var addedTexts = [];
var faceTextCharCount = 0;
var backTextCharCount = 0;
function resizeText(textObject) {
  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;

  var totalCharacters = 0;

  if ( maxTextCharForSize !== -1 && ((activeSignFace === "back" && backTextCharLength > maxTextCharForSize) || (activeSignFace === "front" && maxTextCharForSize < frontTextCharLength)) ) {
    if (activeSignFace === "front") {
      totalCharacters = frontTextCharLength;
    }
    if (activeSignFace === "back") {
      totalCharacters = backTextCharLength;
    }

    let charsToRemove = totalCharacters - maxTextCharForSize;

    activeCanvas.discardActiveObject();
    activeCanvas.remove(textObject);

    var textLayer = null

    
    // Supprimer les caractères en trop de cet objet
    textObject.text = textObject.text.slice( 0, textObject.text.length - charsToRemove );
    textObject.set("text", textObject.text);

    console.log("resize text")
    if(textType === "3D"){
      var objects = activeCanvas.getObjects();
      objects.forEach(function(object) {
        if(object.id == textObject.id && object.name == "asowp-SignTextLayer"){
          textLayer = object
        }
      })

      activeCanvas.remove(textLayer)
      
      textLayer.text = textLayer.text.slice( 0, textObject.text.length - charsToRemove );
      textLayer.set("text", textObject.text);

      activeCanvas.add(textLayer)
    } 

    activeCanvas.add(textObject);

    charsToRemove = 0;
    activeCanvas.renderAll();
    textObject.set("scaleX", textObject.scaleX + 0.001);
    textObject.set("scaleY", textObject.scaleY + 0.001);
    activeCanvas.renderAll();
    handleGetAddedTextValues(textObject);
    // break;
  }
}
function reScaleText(textObject) {
  if ( textObject.scaleX * 12 > maxTextSize || textObject.scaleY * 12 > maxTextSize ) {
    textObject.scaleX = maxTextSize / 12;
    textObject.scaleY = maxTextSize / 12;
  }
  if ( textObject.scaleX * 12 < minTextSize || textObject.scaleX * 12 < minTextSize ) {
    textObject.scaleX = minTextSize / 12;
    textObject.scaleY = minTextSize / 12;
  }
  if(textType === "3D"){
    var objects = activeCanvas.getObjects();
    objects.forEach(function(object) {
      if(object.id == textObject.id && object.name == "asowp-SignTextLayer"){
        if ( object.scaleX * 12 > maxTextSize || object.scaleY * 12 > maxTextSize ) {
          object.scaleX = maxTextSize / 12;
          object.scaleY = maxTextSize / 12;
        }
        if ( object.scaleX * 12 < minTextSize || object.scaleX * 12 < minTextSize ) {
          object.scaleX = minTextSize / 12;
          object.scaleY = minTextSize / 12;
        }
      }
    })
  } 
  activeCanvas.renderAll();
}
async function handleAddTextToSign(custom, clone, layerClone) {
  // console.log("handleAddTextToSign", newId, layerClone)


  var newTextId = newId += 1
  if (
    maxTextCharForSize === -1 ||
    (activeSignFace === "back" && backTextCharLength < maxTextCharForSize) ||
    (activeSignFace === "front" && maxTextCharForSize > frontTextCharLength)
  ) {
    if (clone) {
      var cloneCanvas = clone.canvas;

      var text1JSON = clone.toJSON(["fontFamilyUrl", "neonColor", "secondStrokeWidth", "secondStroke", "activeSide", "sideColor"]);
      // console.log(text1JSON);
      delete text1JSON.evented;
      if(layerClone){
        var text1LayerJSON = layerClone.toJSON(["fontFamilyUrl"]);
        // console.log(text1JSON);
        delete text1LayerJSON.evented;
      }

      var text2 = new fabric.IText(text1JSON.text, {
        id: newTextId,
        name: "asowp-SignText",
        canvasName: activeCanvas.name,
        evented: true,
        editable: true,
        scaleX: text1JSON.scaleX,
        scaleY: text1JSON.scaleY,
        top: text1JSON.top,
        left: text1JSON.left,
        // fontSize: text1JSON.fontSize,
        underline: text1JSON.underline,
        linethrough: text1JSON.linethrough,
        overline: text1JSON.overline,
        fill: text1JSON.fill,
        textAlign: text1JSON.textAlign,
        fontFamily: text1JSON.fontFamily,
        fontFamilyUrl: custom.fontFamilyUrl,
        fontWeight: text1JSON.fontWeight,
        fontStyle: text1JSON.fontStyle,
        uniScaleTransform: true,
        centeredScaling: true,
        lockScalingFlip: true,
        originX: "center",
        originY: "center",
        // clipPath: handleClipAddedObject(activeCanvas),
        // mouseUpHandler: handleGetAddedTextValues,

        stroke: text1JSON.stroke,
        strokeWidth: text1JSON.strokeWidth,
        strokeLineJoin: text1JSON.strokeLineJoin,
        paintFirst: text1JSON.paintFirst,

        secondStrokeWidth: custom.secondStrokeWidth,
        secondStroke: custom.secondStroke,
        activeSide: custom.activeSide,
        sideColor: custom.sideColor,
      });

      if(textType == "3D"){
        var text2Layer = new fabric.IText(text1LayerJSON.text, {
          id: newTextId,
          name: "asowp-SignTextLayer",
          canvasName: activeCanvas.name,
          evented: true,
          editable: false,
          selectable: false,
          scaleX: text1LayerJSON.scaleX,
          scaleY: text1LayerJSON.scaleY,
          top: text1LayerJSON.top,
          left: text1LayerJSON.left,
          // fontSize: text1JSON.fontSize,
          underline: text1LayerJSON.underline,
          linethrough: text1LayerJSON.linethrough,
          overline: text1LayerJSON.overline,
          fill: text1LayerJSON.fill,
          textAlign: text1LayerJSON.textAlign,
          fontFamily: text1LayerJSON.fontFamily,
          fontFamilyUrl: custom.fontFamilyUrl,
          fontWeight: text1LayerJSON.fontWeight,
          fontStyle: text1LayerJSON.fontStyle,
          uniScaleTransform: true,
          centeredScaling: true,
          lockScalingFlip: true,
          originX: "center",
          originY: "center",

          stroke: text1LayerJSON.stroke,
          strokeWidth: text1LayerJSON.strokeWidth,
          strokeLineJoin: text1LayerJSON.strokeLineJoin,
          paintFirst: text1LayerJSON.paintFirst,
          shadow: text1LayerJSON.shadow,

          // clipPath: handleClipAddedObject(activeCanvas),
          // mouseUpHandler: handleGetAddedTextValues,
        });
      }
      
      if(textType == "neon"){
        var neonText2 = new fabric.NeonText(text1JSON.text, {
          id: newTextId,
          name: "asowp-SignText",
          canvasName: activeCanvas.name,
          evented: true,
          editable: true,
          scaleX: text1JSON.scaleX,
          scaleY: text1JSON.scaleY,
          top: text1JSON.top,
          left: text1JSON.left,
          // fontSize: text1JSON.fontSize,
          underline: text1JSON.underline,
          linethrough: text1JSON.linethrough,
          overline: text1JSON.overline,
          textAlign: text1JSON.textAlign,
          fontFamily: text1JSON.fontFamily,
          fontFamilyUrl: text1JSON.fontFamilyUrl,
          fontWeight: text1JSON.fontWeight,
          fontStyle: text1JSON.fontStyle,
          uniScaleTransform: true,
          centeredScaling: true,
          lockScalingFlip: true,
          evented: true,
          originX: "center",
          originY: "center",
  
          // fontSize: 50,
          fill: text1JSON.fill,
          neonColor: text1JSON.neonColor,
          glowRadius: 25,
        });
      }



      text2.lockMoving = {
        x: false,
        y: false,
      };
      text2.lockScale = false;
      text2.setControlsVisibility({
        mt: false, // Middle top
        mb: false, // Middle bottom
        ml: false, // Middle left
        mr: false, // Middle right
        bl: true, // Bottom left
        br: true, // Bottom right
        tl: true, // Top left
        tr: true, // Top right
      });
      text2.set("canvas", cloneCanvas);
      text2.on("editing:entered", () => {
        handleGetAddedTextValues(text2);
        if(textType == "3D"){
          text2.exitEditing()
        }
      });
      text2.on("editing:exited", () => {
        handleGetAddedTextValues(text2);
        resizeText(text2);
      });
      text2.on("selected", () => {
        handleGetAddedTextValues(text2);
      });
      text2.on("mousedown", function () {
        handleGetAddedTextValues(text2);
        reScaleText(text2);
      });
      text2.on("mouseup", function () {
        handleGetAddedTextValues(text2);
        reScaleText(text2);
      });

      if(textType == "neon"){
        neonText2.lockMoving = {
          x: false,
          y: false,
        };
        neonText2.lockScale = false;
        neonText2.setControlsVisibility({
          mt: false, // Middle top
          mb: false, // Middle bottom
          ml: false, // Middle left
          mr: false, // Middle right
          bl: true, // Bottom left
          br: true, // Bottom right
          tl: true, // Top left
          tr: true, // Top right
        });
        neonText2.on("editing:entered", () => {
          handleGetAddedTextValues(neonText2);
        });
        neonText2.on("editing:exited", () => {
          handleGetAddedTextValues(neonText2);
          resizeText(neonText2);
        });
        neonText2.on("selected", () => {
          handleGetAddedTextValues(neonText2);
        });
        neonText2.on("mousedown", function () {
          handleGetAddedTextValues(neonText2);
          reScaleText(neonText2);
        });
        neonText2.on("mouseup", function () {
          handleGetAddedTextValues(neonText2);
          reScaleText(neonText2);
        });
      }

      // activeCanvas.add(text2);
      if(textType == "normal"){
        activeCanvas.add(text2);
      }else if(textType == "3D"){
        activeCanvas.add(text2Layer, text2);
      }else if(textType == "neon"){
        activeCanvas.add(neonText2);
      }


      // addedTexts.push(text2);
      if(textType != "neon"){
        addedTexts.push(text2);
      }else if(textType == "neon"){
        addedTexts.push(neonText2);
      }
      
      if(textType != "neon"){
        activeCanvas.setActiveObject(text2);
      }else if(textType == "neon"){
        activeCanvas.setActiveObject(neonText2);
      }
      // lockToCanvas(text2)
    } else {
      await loadFont(currenTextFontFam.replaceAll(/\s+/g, '-'), currenTextFontFamUrl)

      var sign = handleGetObjectByName("safeObject");
      var solidSide = new fabric.Shadow({
        color: "#000000",
        offsetX: 2,
        offsetY: 2,
        blur: 0,
        isActive: true,
        affectStroke: true,
      });

      var newText = new fabric.IText((textType == 'normal' ? "" : "new text"), {
        id: newTextId,
        name: "asowp-SignText",
        canvasName: activeCanvas.name,
        // editable: (textType == "normal" ? true : false),
        selectOnEdit: false,
        top: sign.top + sign.height / 3,
        left: sign.left + sign.width / 3,
        fill: currentSignTextColor,
        fontFamily: currenTextFontFam.replaceAll(/\s+/g, '-'),
        fontFamilyUrl: currenTextFontFamUrl,
        // fontSize: defaultFontSize,
        scaleX: defaultFontSize / 12,
        scaleY: defaultFontSize / 12,
        uniScaleTransform: true,
        centeredScaling: true,
        lockScalingFlip: true,
        evented: true,
        // editable: false,
        showITextBorder: true,
        // clipPath: handleClipAddedObject(activeCanvas),

        originX: "center",
        originY: "center",

        stroke: '#000000',
        strokeWidth: ( textType == '3D' ? 1 : 0),
        strokeLineJoin: 'round',
        paintFirst: 'stroke',
        strokeUniform: true,

        secondStrokeWidth: textType == "3D" ? 5 : 0,
        secondStroke: textType == "3D" ? "#c4271d" : 0,
        activeSide: textType == "3D" ? true : false,
        sideColor: textType == "3D" ? "#000000" : "transparent",

        renderControls: false,

      });
      if(textType === "3D"){
        var newTextLayer = new fabric.IText((textType == 'normal' ? "" : "new text"), {
          id: newTextId,
          name: "asowp-SignTextLayer",
          canvasName: activeCanvas.name,
          selectable: false,
          selectOnEdit: false,
          top: sign.top + sign.height / 3,
          left: sign.left + sign.width / 3,
  
          fill: currentSignTextColor,
          fontFamily: currenTextFontFam.replaceAll(/\s+/g, '-'),
          fontFamilyUrl: currenTextFontFamUrl,
          scaleX: defaultFontSize / 12,
          scaleY: defaultFontSize / 12,
          uniScaleTransform: true,
          centeredScaling: true,
          lockScalingFlip: true,
          evented: true,
          showITextBorder: true,
  
          originX: "center",
          originY: "center",
  
          renderControls: false,
  
          layerType: 'text-layer',
          stroke: '#c4271d',
          strokeWidth: 5,
          strokeLineJoin: 'round',
          paintFirst: 'stroke',
          // strokeUniform: true,
          strokeDashOffset: 1,
          shadow: solidSide,
        });
      }
      if(textType == "neon"){
        var neonText = new fabric.NeonText('new text', {
          id: newTextId,
          name: "asowp-SignText",
          canvasName: activeCanvas.name,
          // editable: (textType == "normal" ? true : false),
          selectOnEdit: false,
          top: sign.top + sign.height / 3,
          left: sign.left + sign.width / 3,
          fill: currentSignTextColor,
          fontFamily: currenTextFontFam.replaceAll(/\s+/g, '-'),
          fontFamilyUrl: currenTextFontFamUrl,
          // fontSize: defaultFontSize,
          scaleX: defaultFontSize / 12,
          scaleY: defaultFontSize / 12,
          uniScaleTransform: true,
          centeredScaling: true,
          lockScalingFlip: true,
          evented: true,
          originX: "center",
          originY: "center",
  
          // fontSize: 50,
          fill: 'white', // Couleur intérieure du texte
          neonColor: 'orange',
          glowRadius: 25,
        });
      }

      newText.lockMoving = {
        x: false,
        y: false,
      };
      newText.lockScale = false;

      if(textType == "neon"){
        neonText.lockMoving = {
          x: false,
          y: false,
        };
        neonText.lockScale = false;
      }

      newText.setControlsVisibility({
        mt: false, // Middle top
        mb: false, // Middle bottom
        ml: false, // Middle left
        mr: false, // Middle right
        bl: true, // Bottom left
        br: true, // Bottom right
        tl: true, // Top left
        tr: true, // Top right
      });
      newText.on("editing:entered", () => {
        handleGetAddedTextValues(newText);
        if(textType == "3D"){
          newText.exitEditing()
        }
      });
      newText.on("editing:exited", () => {
        handleGetAddedTextValues(newText);
        resizeText(newText);
      });
      newText.on("selected", () => {
        handleGetAddedTextValues(newText);
        // console.log("selected", newText.path);
      });
      newText.on("mousedown", function () {
        handleGetAddedTextValues(newText);
        reScaleText(newText);
      });
      newText.on("mouseup", function () {
        handleGetAddedTextValues(newText);
        reScaleText(newText);
      });

      if(textType == "neon"){
        neonText.setControlsVisibility({
          mt: false, // Middle top
          mb: false, // Middle bottom
          ml: false, // Middle left
          mr: false, // Middle right
          bl: true, // Bottom left
          br: true, // Bottom right
          tl: true, // Top left
          tr: true, // Top right
        });
        neonText.on("editing:entered", () => {
          handleGetAddedTextValues(neonText);
        });
        neonText.on("editing:exited", () => {
          handleGetAddedTextValues(neonText);
          resizeText(neonText);
        });
        neonText.on("selected", () => {
          handleGetAddedTextValues(neonText);
        });
        neonText.on("mousedown", function () {
          handleGetAddedTextValues(neonText);
          reScaleText(neonText);
        });
        neonText.on("mouseup", function () {
          handleGetAddedTextValues(neonText);
          reScaleText(neonText);
        });
      }

      if(textType == "normal"){
        activeCanvas.add(newText);
      }else if(textType == "3D"){
        activeCanvas.add(newTextLayer, newText);
      }else if(textType == "neon"){
        activeCanvas.add(neonText);
      }

      if(textType == 'normal'){
        newText.enterEditing();
      }

      if(textType == 'normal' ||textType == '3D'){
        handleCenterHorizontally(newText);
        handleCenterVertically(newText);
      }
      if(textType == '3D'){
        handleCenterHorizontally(newTextLayer);
        handleCenterVertically(newTextLayer);
      }else if(textType == "neon"){
        handleCenterHorizontally(neonText);
        handleCenterVertically(neonText);
      }

      if(textType != "neon"){
        addedTexts.push(newText);
      }
      if(textType == "neon"){
        addedTexts.push(neonText);
      }
      // handleChangeTextFontFam( currenTextFontFam.replaceAll(/\s+/g, "-"), currenTextFontFamUrl );
      // lockToCanvas(newText)
    }
    activeCanvas.renderAll();
    updateModifications(true, "==ajout de text==");
    // console.log(activeCanvas.getObjects(), "==ajout de text==");
  }

  FtextObjects = handleGetTextObjects1("asowp-SignText");
  BtextObjects = handleGetTextObjects2("asowp-SignText");

  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;
  // if(backTextCharLength === undefined){
  //     backTextCharLength = 0
  // }

  handleCalcTextPrice();

  return addedTexts;
}

var frontTextCharLength = 0;
var backTextCharLength = 0;
function sumOptionsPrice(arr, key) {
  return arr.reduce((sum, obj) => sum + obj[key], "");
}
function handleChangeTextValue(event) {
  var editor = document.getElementById("asowp-text-editor");
  // console.log(maxTextCharForSize, "current max character", frontTextCharLength);

  var currentText = selectedText.object;
  if (
    maxTextCharForSize === -1 ||
    (activeSignFace === "back" && backTextCharLength < maxTextCharForSize) ||
    (activeSignFace === "front" && maxTextCharForSize > frontTextCharLength)
  ) {
    selectedText.value = event.target.value;
    currentText.set("text", String(selectedText.value));
    if(textType === "3D"){
      var objects = activeCanvas.getObjects();
      objects.forEach(function(object) {
        if(object.id == currentText.id && object.name == "asowp-SignTextLayer"){
          object.set("text", String(selectedText.value));
        }
      })
    }

    activeCanvas.requestRenderAll();
    handleGetAddedTextValues(currentText);

    // currentText.exitEditing();
  } else {
    if (event.inputType === "insertText") {
      event.target.value = selectedText.value;
      event.preventDefault();
    } else if (event.inputType === "deleteContentBackward") {
      // editor.disabled = false;
      selectedText.value = event.target.value;
      currentText.set("text", String(selectedText.value));

      if(textType === "3D"){
        console.log('azerty')
        var objects = activeCanvas.getObjects();
        objects.forEach(function(object) {
          if(currentText.id == object.id && object.name == "asowp-SignTextLayer" || object.name == "asowp-SignTextLight"){
            object.set("text", String(selectedText.value));
          }
        })
      }


      activeCanvas.requestRenderAll();
      handleGetAddedTextValues(currentText);

      // currentText.exitEditing();
    }
  }
  // FtextObjects = handleGetTextObjects1('asowp-SignText')
  // BtextObjects = handleGetTextObjects2('asowp-SignText')

  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;
}
function handleChangeTextAlign(align) {
  var currentText = selectedText.object;
  currentText.set("textAlign", align);
  if(textType == "3D"){
    var objects = activeCanvas.getObjects();
    objects.forEach(function(object) {
      if(currentText.id == object.id && object.name == "asowp-SignTextLayer" || object.name == "asowp-SignTextLight"){
        object.set("textAlign", align);
      }
    })
  }


  activeCanvas.requestRenderAll();
  selectedText.align = currentText.textAlign;
  handleGetAddedTextValues(currentText);

  return selectedText.align;
}
function handleChangeTextWeight() {
  var currentText = selectedText.object;
  if (selectedText.weight == "normal") {
    currentText.set("fontWeight", "bold");
    if(textType == "3D"){
      var objects = activeCanvas.getObjects();
      objects.forEach(function(object) {
          if(currentText.id == object.id && object.name == "asowp-SignTextLayer" || object.name == "asowp-SignTextLight"){
            object.set("fontWeight", "bold");
          }
      })
    }
  } else if (selectedText.weight == "bold") {
    currentText.set("fontWeight", "normal");
    if(textType == "3D"){
      var objects = activeCanvas.getObjects();
      objects.forEach(function(object) {
          if(currentText.id == object.id && object.name == "asowp-SignTextLayer" || object.name == "asowp-SignTextLight"){
            object.set("fontWeight", "normal");
          }
      })
    }
  }
  // console.log("current");
  activeCanvas.renderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.weight;
}
function handleChangeTextStyle() {
  var currentText = selectedText.object;
  if (selectedText.style == "normal") {
    currentText.set("fontStyle", "italic");

    if("3D"){
      var objects = activeCanvas.getObjects();
      objects.forEach(function(object) {
          if(currentText.id == object.id && object.name == "asowp-SignTextLayer" || object.name == "asowp-SignTextLight"){
            object.set("fontStyle", "italic");
          }
      })
    }
  } else if (selectedText.style == "italic") {
    currentText.set("fontStyle", "normal");

    if("3D"){
      var objects = canvas.getObjects();
      objects.forEach(function(object) {
          if(currentText.id == object.id && object.name == "asowp-SignTextLayer" || object.name == "asowp-SignTextLight"){
            object.set("fontStyle", "normal");
          }
      })
    }
  }
  activeCanvas.requestRenderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.style;
}
var minTextSize = 0;
var maxTextSize = 0;
function handleChangeTextSize(size, minSize, maxSize) {
  if (size < maxSize || size > minSize) {
    selectedText.size = size;

    var currentText = selectedText.object;
    currentText.set("scaleX", selectedText.size / 12);
    currentText.set("scaleY", selectedText.size / 12);

    if(textType == "3D"){
      var objects = activeCanvas.getObjects();
      objects.forEach(function(object) {
        if(object.name == "asowp-SignTextLayer" && object.id == currentText.id){
          object.set("scaleX", selectedText.size / 12);
          object.set("scaleY", selectedText.size / 12);
        }
      })
    }
    activeCanvas.renderAll();
    handleGetAddedTextValues(currentText);
  }
}
var currenTextFontFam = "";
var currenTextFontFamUrl = "";

async function handleChangeTextFontFam(font, url) {
  try {
    // console.log(selectedText, "selected")
    var currentText = selectedText.object;
    const myfont = new FontFaceObserver(font);
    await myfont.load();

    currentText.set("fontFamily", font);
    currentText.set("fontFamilyUrl", url);
    
    if(textType == "3D"){
      var objects = activeCanvas.getObjects();
      objects.forEach(function(object) {
        if(currentText.id == object.id && object.name == "asowp-SignTextLayer" || object.name == "asowp-SignTextLight"){
          object.set("fontFamily", font);
          object.set("fontFamilyUrl", url);
        }
      })
    }
    
    activeCanvas.renderAll();
    handleGetAddedTextValues(currentText);
  } catch (e) {
    console.log(e);
    alert("font loading failed " + font);
  }
}
function handleChangeTextColor(color) {
  var currentText = selectedText.object;
  selectedText.color = color;
  currentText.set("fill", color);
  activeCanvas.renderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.color;
}
function handleUnderlineText(color) {
  var currentText = selectedText.object;
  if (selectedText.underline == false) {
    currentText.set("underline", true);
  } else if (selectedText.underline == true) {
    currentText.set("underline", false);
  }
  activeCanvas.requestRenderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.underline;
}
function handleCrossText(color) {
  var currentText = selectedText.object;
  if (selectedText.linethrough == false) {
    currentText.set("linethrough", true);
  } else if (selectedText.linethrough == true) {
    currentText.set("linethrough", false);
  }
  activeCanvas.requestRenderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.linethrough;
}
function handleOverlineText(color) {
  var currentText = selectedText.object;
  if (selectedText.overline == false) {
    currentText.set("overline", true);
  } else if (selectedText.overline == true) {
    currentText.set("overline", false);
  }
  activeCanvas.requestRenderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.overline;
}

function handleChangeTextBorder(layer, value){
  var currentText = selectedText.object;

  if(layer){
    currentText.set("strokeWidth", value);
  }else{
    currentText.set("secondStrokeWidth", value);
    var objects = activeCanvas.getObjects();
    objects.forEach(function(object) {
        if(object.name == "asowp-SignTextLayer" && object.id == currentText.id){
            object.set("strokeWidth", value);
        }
    })
  }


  activeCanvas.renderAll();
}
function handleChangeTextBorderColor(layer, color){
  var currentText = selectedText.object;

  // if (color.endsWith('.jpg') || color.endsWith('.png') || color.endsWith('.webp') || color.endsWith('.svg') || color.startsWith('data:image')) {
  //   handleConvertImageToDataURI(color, function (dataURI) {
  //     fabric.util.loadImage( dataURI, function (img) {
  //         // var scaleX = object.width / img.width;
  //         // var scaleY = object.height / img.height;
  //         var pattern = new fabric.Pattern({
  //           source: img,
  //           repeat: "repeat",
  //           patternTransform: [0.1, 0, 0, 0.1, 0, 0],
  //         });

  //         // console.log(pattern)

  //         if(layer){
  //           var objects = canvas.getObjects();
  //           objects.forEach(function(object) {
  //               if(object.name == "asowp-SignTextLayer" && object.id == currentText.id){
  //                   object.set("stroke", pattern);
  //               }
  //           })
  //         }else{
  //           currentText.set("stroke", pattern);
  //         }
  //       },
  //       { crossOrigin: "anonymous" }
  //     );
  //   });
  // }else{
  // }
  if(layer){
    currentText.set("stroke", color);
  }else{
    currentText.set("secondStroke", color);

    var objects = activeCanvas.getObjects();
    objects.forEach(function(object) {
        if(object.name == "asowp-SignTextLayer" && object.id == currentText.id){
            object.set("stroke", color);
        }
    })
  }


  activeCanvas.renderAll();
}
function handleShow3dSide(state){
  var currentText = selectedText.object;
  /////////////
  var objects = activeCanvas.getObjects();
  objects.forEach(function(object) {
    if(object.id == currentText.id && object.name === "asowp-SignTextLayer"){
        if(state){
          currentText.set("activeSide", true)
          object.shadow.offsetX = 2
          object.shadow.offsetY = 2
        }else{
          currentText.set("activeSide", false)
          object.shadow.offsetX = 0
          object.shadow.offsetY = 0
        }
      }
  })

  activeCanvas.renderAll();
}
function handleChange3dSideColor(color){
  var currentText = selectedText.object;
  currentText.set("sideColor", color);
/////////////
  var objects = activeCanvas.getObjects();
  objects.forEach(function(object) {
      if(object.name == "asowp-SignTextLayer" && object.id == currentText.id){
        object.shadow.color = color
      }
  })
  activeCanvas.renderAll();
}

function handleChangeTextLightColor(color) {
  var currentText = selectedText.object;
  selectedText.color = color;
  currentText.set("neonColor", "black");
  currentText.set("neonColor", color);
  simulateCanvasClick()
  activeCanvas.renderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.color;
}

let addedQRCodes = []
async function handleAddQRCode(data, clone){
  var newCodeId = newId += 1
  let object = clone ? await generateQRCodeObject(data, clone.color) : await generateQRCodeObject(data)

  object.set({
    id: newCodeId,
    name: "asowp-QRCode",
    canvasName: activeCanvas.name
  })
  object.on("mousedown", function () {
    handleGetAddedImageValues(object);
  });
  object.on("mouseup", function () {
    handleGetAddedImageValues(object);
  });
  
  activeCanvas.add(object)
  if(clone){
    object.set({
      left: clone.left + 10,
      top: clone.top + 10,
      canvasName: clone.canvasName,
      scaleX: clone.scaleX,
      scaleY: clone.scaleY,
      angle: clone.angle,
    })
  }else{
    activeCanvas.centerObject(object)
  }
  activeCanvas.setActiveObject(object);

  // addedQRCodes.push(object)
  addedQRCodes.push({id: newCodeId, text: object.fromData, url:object.imgUrl, object: object})

  updateModifications(true, "==ajout de QRCode==");
  return {
    codes: addedQRCodes,
    activeCode: object
  }
}
async function handleEditQRCode(code, value, color){

  let activeObject = activeCanvas.getActiveObject()
  if(activeObject && activeObject.id == code.id){
    activeCanvas.remove(activeObject)
  }

  let object = await generateQRCodeObject(value, color)

  object.set({
    id: code.id,
    name: "asowp-QRCode",
    left: code.left,
    top: code.top,
    canvasName: code.canvasName,
    scaleX: code.scaleX,
    scaleY: code.scaleY,
    angle: code.angle,
  })
  object.on("mousedown", function () {
    handleGetAddedImageValues(object);
  });
  object.on("mouseup", function () {
    handleGetAddedImageValues(object);
  });
  
  activeCanvas.add(object)
  activeCanvas.setActiveObject(object);

  let objectData = {id: object.id, text: object.fromData, url:object.imgUrl, object: object}
  addedQRCodes = addedQRCodes.map(obj => obj.id === code.id ? objectData : obj)

  return addedQRCodes
}
async function handleChangeQRCodeColor(code, color){

  let activeObject = activeCanvas.getActiveObject()
  if(activeObject && activeObject.id == code.id){
    activeCanvas.remove(activeObject)
  }

  let object = await generateQRCodeObject(code.fromData, color)

  object.set({
    id: code.id,
    name: "asowp-QRCode",
    left: code.left,
    top: code.top,
    canvasName: code.canvasName,
    scaleX: code.scaleX,
    scaleY: code.scaleY,
    angle: code.angle,
  })
  object.on("mousedown", function () {
    handleGetAddedImageValues(object);
  });
  object.on("mouseup", function () {
    handleGetAddedImageValues(object);
  });
  
  activeCanvas.add(object)
  activeCanvas.setActiveObject(object);

  let objectData = {id: object.id, text: object.fromData, url:object.imgUrl, object: object}
  addedQRCodes = addedQRCodes.map(obj => obj.id === code.id ? objectData : obj)

  return addedQRCodes
}


var defaultRadius = 25
function handleTurnLightOnOff(state){
  var radius = (state == true ? defaultRadius : 0)
  var currentText = selectedText.object;
  let alignment = currentText.textAlign


  currentText.set("textAlign", "")
  currentText.set("textAlign", alignment)

  currentText.set("glowRadius", radius)

  simulateCanvasClick()
  activeCanvas.renderAll();
  handleGetAddedTextValues(currentText);

  return selectedText.color;
}
function simulateCanvasClick(){
  activeCanvas.fire('mouse:down', {
      e: new MouseEvent('click', { clientX: 100, clientY: 100 }), // Coordonnées du clic
      pointer: { x: 100, y: 100 }, // Position du clic
  });
}

// fonctions concernant l'ajout d'image sur le canvas
var selectedImage = {
  object: {},
  width: "",
  height: "",
  left: "",
  right: "",
  top: "",
  bottom: "",
  angle: 0,
  filters: [],
};
var imageSettings = {};
function handleGetImageSettings(settings) {
  imageSettings = settings;
}
function handleGetAddedImageValues(object) {
  var sign = handleGetObjectByName("safeObject");
  let container
  if(sign.type != "path" && sign.type != "group"){
    container = sign
  }else{
    let pathObjects = sign._objects
    
    pathObjects.forEach(path => {
      const d = path.d;
      if (path.name == "outline") {
        container = path
      }
    });
  }

  object.setCoords();
  var objWidht = object.width * object.scaleX;
  var objHeight = object.height * object.scaleY;

  var objBounds = object.getBoundingRect();

  // Récupérer les coins de l'objet
  var objLeft = objBounds.left;
  var objTop = objBounds.top;

  // Calculer par rapport aux dimensions du container
  let objLeftInContainer, objRightInContainer, objTopInContainer, objBottomInContainer
  if(container.type != "path" && container.type != "group"){
    objLeftInContainer = object.left - objWidht / 2 - container.left;
    objRightInContainer = container.width - (objLeftInContainer + objWidht);
    objTopInContainer = object.top - objHeight / 2 - container.top;
    objBottomInContainer = container.height - (objTopInContainer + objHeight);
  }else{
    const outlineCenterPoint = container.getCenterPoint();
    const outlineGlobal = fabric.util.transformPoint( outlineCenterPoint, sign.calcTransformMatrix() );
    let scaleX = sign.scaleX * container.scaleX
    let scaleY = sign.scaleY * container.scaleX

    let objCenter = object.getCenterPoint()
    let objPoint = fabric.util.transformPoint( objCenter, object.calcTransformMatrix() );

    objLeftInContainer = objPoint.x - (outlineGlobal.x - (strokeSize));
    objRightInContainer = ((container.width + strokeSize) * scaleX) - (objLeftInContainer + objWidht);
    objTopInContainer = objPoint.y - (outlineGlobal.y - (strokeSize));
    objBottomInContainer = ((container.height + strokeSize) * scaleY) - (objTopInContainer + objHeight);
    // console.log(objPoint, "898989", outlineGlobal)  
  }

  selectedImage.width = parseInt(objWidht);
  selectedImage.height = parseInt(objHeight);
  selectedImage.left = parseInt(objLeftInContainer);
  selectedImage.right = objRightInContainer;
  selectedImage.top = parseInt(objTopInContainer);
  selectedImage.bottom = parseInt(objBottomInContainer);
  selectedImage.angle = parseInt(object.angle);

  // let values = getObjectValueToUnit( container, objWidht, objHeight, objLeftInContainer, objTopInContainer, object.angle );
  let values = getObjectValueToUnit( container, object, objWidht, objHeight, objLeftInContainer, objTopInContainer );

  return values;
}
var addedImages = [];
function handleConvertImageToDataURI(imageUrl, callback) {
  var img = new Image();
  img.crossOrigin = "Anonymous"; // Nécessaire pour les images hébergées sur des domaines différents

  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Convertir l'image en Data URI
    var dataURI = canvas.toDataURL("image/png"); // Vous pouvez changer le type MIME si nécessaire
    callback(dataURI);
  };

  img.onerror = function () {
    console.error("Failed to load image at " + imageUrl);
  };

  img.src = imageUrl;
}
function hasFontFaceInSVG(svgString) {
  const fontFaceRegex = /@font-face\s*{[^}]+}/g;
  return fontFaceRegex.test(svgString);
}
async function getSvgStringFromUrl(url){
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.text())
    .then(svgString => {
      resolve(svgString)
    });
  })
}

async function sanitizeSVG(svgString) {
  // 1️⃣ Parser le SVG en DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  // 2️⃣ Supprimer les @font-face dans les balises <style>
  const styles = doc.querySelectorAll('style');
  let fontsToLoad = new Set();

  styles.forEach((style) => {
    let newCSS = style.textContent.replace(/@font-face\s*{[^}]+}/g, ''); // Supprime les @font-face
    style.textContent = newCSS;

    // 3️⃣ Extraire les polices utilisées dans font-family
    const matches = newCSS.match(/font-family:\s*['"]?([\w\s-]+)['"]?/g);
    if (matches) {
      matches.forEach((match) => {
        let fontName = match.replace(/font-family:\s*['"]?|['"]?/g, '').trim();
        fontsToLoad.add(fontName);
      });
    }
  });

  // 4️⃣ Charger les polices avant d'afficher le SVG
  await Promise.all(
    [...fontsToLoad].map((font) =>
      new FontFace(font, `url('${font}.woff2')`).load().then((loadedFont) => {
        document.fonts.add(loadedFont);
      }).catch(() => console.warn(`Impossible de charger la police: ${font}`))
    )
  );

  // 5️⃣ Convertir le SVG modifié en string
  return new XMLSerializer().serializeToString(doc);
}

function handleAddImageToSign(image, imageId, price) {
  function isSVGImage(image) {
    var src = image;
    return src.endsWith(".svg") || src.startsWith("data:image/svg+xml");
  }
  async function useImage(imgUrl, imgId, price) {
    if (isSVGImage(imgUrl)) {
      let svgString = await getSvgStringFromUrl(imgUrl)
      if(hasFontFaceInSVG(svgString)){
        svgString = await sanitizeSVG(svgString)
      }

      fabric.loadSVGFromString(svgString, function (image) {
        const img = fabric.util.groupSVGElements(image);
        let sign = handleGetObjectByName("safeObject", activeCanvas)
        if(img.width > img.height){
          img.scaleToWidth(sign.width/2)
        }else{
          img.scaleToHeight(sign.height/2)
        }

        img.setCoords();
        var newWidth = img.width * img.scaleX;
        var newHeight = img.height * img.scaleY;

        img.top = sign.top + sign.height / 2;
        img.left = sign.left + sign.width / 2;
        // img.flipX = true
        img.uniScaleTransform = true;
        img.centeredScaling = true;
        (img.lockScalingFlip = true), (img.originX = "center");
        img.originY = "center";

        img.id = newId += 1;
        img.name = "asowp-SignImage";
        img.canvasName = activeCanvas.name;
        img.priceId = imgId ? imgId : 0;
        img.price = price ? price : null;
        img.objectType = "svg";
        img.imageUrl = imgUrl;
        // img.clipPath = handleClipAddedObject(activeCanvas);

        img.lockMoving = {
          x: false,
          y: false,
        };
        img.lockScale = false;
        img.lockRotate = false;
        img.setControlsVisibility({
          mt: false, // Middle top
          mb: false, // Middle bottom
          ml: false, // Middle left
          mr: false, // Middle right
          bl: true, // Bottom left
          br: true, // Bottom right
          tl: true, // Top left
          tr: true, // Top right
        });

        img.on("mousedown", function () {
          handleGetAddedImageValues(img);
          // updateModifications(true, "deposer l'image ")
        });
        img.on("mouseup", function () {
          handleGetAddedImageValues(img);
          // updateModifications(true, "deposer l'image ")
        });

        activeCanvas.add(img);
        img.bringToFront();
        activeCanvas.setActiveObject(img);
        // lockToCanvas(img)

        handleCenterHorizontally(img);
        handleCenterVertically(img);

        addedImages.push({ id: img.id, url: imgUrl, object: img });

        updateModifications(true, "==ajout d'image ==");
        // console.log(img.getSrc(), "image source")
      });
    } else {
      handleConvertImageToDataURI(imgUrl, function (dataURI) {
        // console.log(dataURI); // Utiliser le Data URI ici
        fabric.Image.fromURL(
          dataURI,
          function (img) {
            let sign = handleGetObjectByName("safeObject");
            if(img.width > img.height){
              img.scaleToWidth(sign.width/2)
            }else{
              img.scaleToHeight(sign.height/2)
            }

            img.setCoords();
            var newWidth = img.width * img.scaleX;
            var newHeight = img.height * img.scaleY;

            img.top = sign.top + sign.height / 2;
            img.left = sign.left + sign.width / 2;
            // img.flipX = true
            img.uniScaleTransform = true;
            img.centeredScaling = true;
            (img.lockScalingFlip = true), (img.originX = "center");
            img.originY = "center";

            img.id = newId += 1;
            img.name = "asowp-SignImage";
            img.canvasName = activeCanvas.name;
            img.priceId = imgId ? imgId : 0;
            img.price = price ? price : null;
            img.objectType = "no-svg";
            img.imageUrl = imgUrl;
            // img.clipPath = handleClipAddedObject(activeCanvas);

            img.lockMoving = {
              x: false,
              y: false,
            };
            img.lockScale = false;
            img.lockRotate = false;
            img.setControlsVisibility({
              mt: false, // Middle top
              mb: false, // Middle bottom
              ml: false, // Middle left
              mr: false, // Middle right
              bl: true, // Bottom left
              br: true, // Bottom right
              tl: true, // Top left
              tr: true, // Top right
            });

            img.on("mousedown", function () {
              handleGetAddedImageValues(img);
              // updateModifications(true, "deposer l'image ")
            });
            img.on("mouseup", function () {
              handleGetAddedImageValues(img);
              // updateModifications(true, "deposer l'image ")
            });

            activeCanvas.add(img);
            img.bringToFront();
            activeCanvas.setActiveObject(img);
            // lockToCanvas(img)

            handleCenterHorizontally(img);
            handleCenterVertically(img);

            addedImages.push({ id: img.id, url: imgUrl, object: img });

            updateModifications(true, "==ajout d'image ==");
            // console.log(img.getSrc(), "image source")
          },
          { crossOrigin: "anonymous" }
        );
      });
    }
  }

  var sign = handleGetObjectByName("safeObject");
  var itsDone = false;
  var imageError = "";

  var imageInput = document.getElementById("asowp-iamge-input");

  function checkImageSize(file, maxWidth, minWidth) {
    return new Promise((resolve, reject) => {
      // Crée une nouvelle image
      const img = new Image();

      // Charge l'image à partir du fichier
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // Vérifie si l'image respecte les conditions de taille
        if (width > maxWidth || width < minWidth) {
          reject(`L'image doit avoir une taille comprise entre ${imageSettings.fileUploadScript.uploadMinWidth}px et ${imageSettings.fileUploadScript.uploadMaxWidth}px de largeur`);
        } else {
          resolve(file);
        }
      };

      img.onerror = () => {
        reject(console.log("Impossible de charger l'image"));
      };
    });
  }

  return new Promise(async (resolve, reject) => {
    if (image) {
      await useImage(image, imageId, price);
      resolve({ images: addedImages, error: "" });
    } else {
      imageInput.addEventListener("change", function (e) {
        const imgFile = imageInput.files[0];

        // console.log(imgFile, imageSettings.fileUploadScript, "upload verif", imageSettings.fileUploadScript.customWithGraphical)


        // if (imageSettings.fileUploadScript.customWithGraphical) {
        // } 
        checkImageSize( imgFile, imageSettings.fileUploadScript.uploadMaxWidth, imageSettings.fileUploadScript.uploadMinWidth )
          .then((validFile) => {
            const reader = new FileReader();
            reader.onload = async () => {
              const imgBase64 = reader.result;
              if (!itsDone) {
                await useImage(imgBase64);
                itsDone = true;
                resolve({ images: addedImages, error: "" });
              }
            };
            reader.readAsDataURL(validFile);
          })
          .catch((error) => {
            console.log(error);
            imageError = error;
            resolve({ images: addedImages, error: error });
            // reject({ images: addedImages, error: error });
          });
        // else {
        //   // Création d'un objet FileReader
        //   const reader = new FileReader();
        //   // Lecture du fichier image lorsqu'il est chargé
        //   reader.onload = async () => {
        //     // Stockage de l'image en base64 dans une variable
        //     const imgBase64 = reader.result;
        //     // Utilisation de l'image
        //     if (!itsDone) {
        //       await useImage(imgBase64);
        //       itsDone = true;
        //     }
        //   };
        //   // Lancement de la lecture comme URL
        //   reader.readAsDataURL(imgFile);

        //   resolve({ images: addedImages, error: "" });
        // }
      });
    }
  });
}
function handleChangeImageWidth(scale) {
  var currentImage = activeCanvas.getActiveObject();
  if (
    currentImage.type === "image" ||
    currentImage.type === "path" ||
    currentImage.type === "group"
  ) {
    currentImage.scaleX = scale;
    currentImage.scaleY = scale;
    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}
function handleChangeImageHeight(scaleY) {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    currentImage.scaleY = scaleY;
    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}

function handleSetImageBorder(border) {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}
function handleTurnImageLeft() {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    if (currentImage.angle == 0) {
      currentImage.set("angle", 360);
    }
    var newAngle = currentImage.angle - 45;
    currentImage.set("angle", newAngle);

    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}
function handleTurnRightImage() {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    var newAngle = currentImage.angle + 45;
    currentImage.set("angle", newAngle);
    if (currentImage.angle >= 360) {
      currentImage.set("angle", 0);
    }

    activeCanvas.requestRenderAll();
    handleGetAddedImageValues(currentImage);
  }
}
function handleFlipImage() {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.flipX == false) {
    currentImage.set("flipX", true);
  } else if (currentImage.flipX == true) {
    currentImage.set("flipX", false);
  }
  activeCanvas.requestRenderAll();
  handleGetAddedImageValues(currentImage);
}

async function handleRemoveBgImage(imgObject){
  // console.log(imgObject, "333")
  async function replaceImg(newImage){
    fabric.Image.fromURL(newImage, (img) => {
      img.top = imgObject.top;
      img.left = imgObject.left;
      img.width = imgObject.width;
      img.height = imgObject.height;
      // img.flipX = true
      img.uniScaleTransform = imgObject.uniScaleTransform;
      img.centeredScaling = imgObject.centeredScaling;
      img.lockScalingFlip = imgObject.lockScalingFlip; 
      img.originX = imgObject.originX;
      img.originY = imgObject.originY;
  
      img.id = imgObject.id;
      img.name = "asowp-SignImage";
      img.canvasName = imgObject.canvasName;
      img.priceId = imgObject.priceId;
      img.price = imgObject.price;
      img.objectType = imgObject.objectType;
      img.imageUrl = imgObject.imageUrl;
      img.imageNoBgUrl = newImage;
      // img.clipPath = handleClipAddedObject(activeCanvas);
  
      img.lockMoving = imgObject.lockMoving;
      img.lockScale = imgObject.lockScale;
      img.lockRotate = imgObject.lockRotate;
      img.setControlsVisibility({
        mt: false, // Middle top
        mb: false, // Middle bottom
        ml: false, // Middle left
        mr: false, // Middle right
        bl: true, // Bottom left
        br: true, // Bottom right
        tl: true, // Top left
        tr: true, // Top right
      });
  
      img.on("mousedown", function () {
        handleGetAddedImageValues(img);
      });
      img.on("mouseup", function () {
        handleGetAddedImageValues(img);
      });
  
      addUniqueObject(addedImages, { id: imgObject.id, url: imgObject.imageUrl, object: img }, "id" )
      activeCanvas.remove(imgObject)
      activeCanvas.add(img);
  
      return addedImages
    },{ crossOrigin: "anonymous" });
  }
  async function restoreImg(imgUrl){
    fabric.Image.fromURL(imgUrl, (img) => {
      img.top = imgObject.top;
      img.left = imgObject.left;
      img.width = imgObject.width;
      img.height = imgObject.height;
      // img.flipX = true
      img.uniScaleTransform = imgObject.uniScaleTransform;
      img.centeredScaling = imgObject.centeredScaling;
      img.lockScalingFlip = imgObject.lockScalingFlip; 
      img.originX = imgObject.originX;
      img.originY = imgObject.originY;
  
      img.id = imgObject.id;
      img.name = "asowp-SignImage";
      img.canvasName = imgObject.canvasName;
      img.priceId = imgObject.priceId;
      img.price = imgObject.price;
      img.objectType = imgObject.objectType;
      img.imageUrl = imgObject.imageUrl;
      img.imageNoBgUrl = "";
      // img.clipPath = handleClipAddedObject(activeCanvas);
  
      img.lockMoving = imgObject.lockMoving;
      img.lockScale = imgObject.lockScale;
      img.lockRotate = imgObject.lockRotate;
      img.setControlsVisibility({
        mt: false, // Middle top
        mb: false, // Middle bottom
        ml: false, // Middle left
        mr: false, // Middle right
        bl: true, // Bottom left
        br: true, // Bottom right
        tl: true, // Top left
        tr: true, // Top right
      });
  
      img.on("mousedown", function () {
        handleGetAddedImageValues(img);
      });
      img.on("mouseup", function () {
        handleGetAddedImageValues(img);
      });
  
      addUniqueObject(addedImages, { id: imgObject.id, url: imgObject.imageUrl, object: img }, "id" )
      activeCanvas.remove(imgObject)
      activeCanvas.add(img);
  
      return addedImages
    },{ crossOrigin: "anonymous" });
  }

  return new Promise(async (resolve, reject) => {
    if (!imgObject.imageNoBgUrl || imgObject.imageNoBgUrl == "") {
      let newImage = await removeBackgroundFromURL(imgObject.imageUrl)

      await replaceImg(newImage);
      resolve({ images: addedImages, error: "" });
      updateModifications(true, "==retrait du background image==");

    }else{
      await restoreImg(imgObject.imageUrl);
      resolve({ images: addedImages, error: "" });
      updateModifications(true, "==restauration du background image==");

    }
});
}
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // important si image externe
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // result est une data URI
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
async function removeBackgroundFromURL(imageSrc) {
  const resultBlob = await removeBackground(imageSrc);
  console.log(resultBlob, "444")


  // Convertit le Blob en URL pour affichage ou insertion dans une balise <img>
  // const transparentImageUrl = URL.createObjectURL(resultBlob);
  const transparentImageUrl = await blobToDataURL(resultBlob);

  return transparentImageUrl;
}


// custom filters
//greenify
fabric.Image.filters.Greenify = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
  type: 'Greenify',
  
  fragmentSource: `
      precision highp float;
      uniform sampler2D uTexture;
      varying vec2 vTexCoord;
      void main() {
          vec4 color = texture2D(uTexture, vTexCoord);
          color.r = 0.0;
          color.b = 0.0;
          gl_FragColor = color;
      }
  `,
  
  isNeutralState: function() { return false; },
  toObject: function() { return { type: this.type }; }
});
fabric.Image.filters.Greenify.fromObject = function(object) {
  return new fabric.Image.filters.Greenify(object);
};
//blueify
fabric.Image.filters.Blueify = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
  type: 'Blueify',
  
  fragmentSource: `
      precision highp float;
      uniform sampler2D uTexture;
      varying vec2 vTexCoord;
      void main() {
          vec4 color = texture2D(uTexture, vTexCoord);
          color.r = 0.0;
          color.g *= 0.5;
          color.b *= 0.8;
          gl_FragColor = color;
      }
  `,
  
  isNeutralState: function() { return false; },
  toObject: function() { return { type: this.type }; }
});
fabric.Image.filters.Blueify.fromObject = function(object) {
  return new fabric.Image.filters.Blueify(object);
};
//pinkify
fabric.Image.filters.Pinkify = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
  type: 'Pinkify',
  fragmentSource: `
      precision highp float;
      uniform sampler2D uTexture;
      varying vec2 vTexCoord;
      void main() {
          vec4 color = texture2D(uTexture, vTexCoord);
          color.g *= 0.3;  // Réduit le vert (ajustez entre 0.0 et 0.5)
          color.b *= 0.8;  // Garde un peu de bleu (ajustez entre 0.7 et 1.0)
          gl_FragColor = color;
      }
  `,
  toObject: function() { return { type: this.type }; }
});
fabric.Image.filters.Pinkify.fromObject = function(object) {
  return new fabric.Image.filters.Pinkify(object);
};
//Orangeify 
fabric.Image.filters.Orangeify = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
  type: 'Orangeify',
  fragmentSource: `
      precision highp float;
      uniform sampler2D uTexture;
      varying vec2 vTexCoord;
      void main() {
          vec4 color = texture2D(uTexture, vTexCoord);
          color.r = min(1.0, color.r * 1.2);  // Boost le rouge (1.0 à 1.5)
          color.g = min(1.0, color.g * 0.9);  // Légère réduction du vert (0.7 à 1.0)
          color.b *= 0.2;                     // Réduit fortement le bleu (0.0 à 0.3)
          gl_FragColor = color;
      }
  `,
  toObject: function() { return { type: this.type }; }
});
fabric.Image.filters.Orangeify.fromObject = function(object) {
  return new fabric.Image.filters.Orangeify(object);
};


function handleSelectFilter(filter) {
  var currentImage = activeCanvas.getActiveObject();
  if (currentImage.type === "image") {
    if (!currentImage.filters.length > 0) {
      switch (filter) {
        case "Sepia":
          /* Sepia effect */
          var sp = new fabric.Image.filters.Sepia({
            name: "sepia",
          });
          currentImage.filters.push(sp);
          break;

        case "Embross":
          /* Emboss */
          var emb = new fabric.Image.filters.Convolute({
            matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
            name: "embross",
          });
          currentImage.filters.push(emb);
          break;

        case "Greyscale":
          /* Greyscale */
          var gs = new fabric.Image.filters.Grayscale({
            name: "greyscale",
          });
          currentImage.filters.push(gs);
          break;

        case "Sharpen":
          /* Sharpen */
          var sharpen = new fabric.Image.filters.Convolute({
            matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            name: "sharpen",
          });
          currentImage.filters.push(sharpen);
          break;

        case "Blur":
          /* Blur */
          var blr = new fabric.Image.filters.Blur({
            name: "blur",
          });
          currentImage.filters.push(blr);
          break;

        case "Greenify":
          let greenify = new fabric.Image.filters.Greenify({ name: "greenify", });
          currentImage.filters.push(greenify);
          break;

        case "Pinkify":
          let pinkify = new fabric.Image.filters.Pinkify({ name: "pinkify", });
          currentImage.filters.push(pinkify);
          break;

        case "Orangeify":
          let orangeify = new fabric.Image.filters.Orangeify({ name: "orangeify", });
          currentImage.filters.push(orangeify);
          break;

        case "Blueify":
          let blueify = new fabric.Image.filters.Blueify({ name: "blueify", });
          currentImage.filters.push(blueify);
          break;
      }
    } else {
      var filtersTab = currentImage.filters;
      function addUniqueFilter(array, object, key) {
        const index = array.findIndex((item) => item[key] === object[key]);

        if (index === -1) {
          array.push(object);
        } else {
          array.splice(index, 1);
        }
      }
      switch (filter) {
        case "Sepia":
          var sp = new fabric.Image.filters.Sepia({
            name: "sepia",
          });
          addUniqueFilter(currentImage.filters, sp, "name");
          break;

        case "Embross":
          var emb = new fabric.Image.filters.Convolute({
            matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
            name: "embross",
          });
          addUniqueFilter(currentImage.filters, emb, "name");
          break;

        case "Greyscale":
          var gs = new fabric.Image.filters.Grayscale({
            name: "greyscale",
          });
          addUniqueFilter(currentImage.filters, gs, "name");
          break;

        case "Sharpen":
          var sharpen = new fabric.Image.filters.Convolute({
            matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            name: "sharpen",
          });
          addUniqueFilter(currentImage.filters, sharpen, "name");
          break;

        case "Blur":
          var blr = new fabric.Image.filters.Blur({
            name: "blur",
          });
          addUniqueFilter(currentImage.filters, blr, "name");
          break;

        case "Greenify":
          let Greenify = new fabric.Image.filters.Greenify({ name: "greenify", });
          addUniqueFilter(currentImage.filters, Greenify, "name");
          break;
          
        case "Pinkify":
          let pinkify = new fabric.Image.filters.Pinkify({ name: "pinkify", });
          addUniqueFilter(currentImage.filters, pinkify, "name");
          break;

        case "Orangeify":
          let orangeify = new fabric.Image.filters.Orangeify({ name: "orangeify", });
          addUniqueFilter(currentImage.filters, orangeify, "name");
          break;

        case "Blueify":
          let blueify = new fabric.Image.filters.Blueify({ name: "blueify", });
          addUniqueFilter(currentImage.filters, blueify, "name");
          break;
      }
    }
    currentImage.applyFilters();
    activeCanvas.renderAll();

    selectedImage.filters = currentImage.filters;

    return selectedImage.filters;
  }
}
async function getImageDataFromUrl(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // nécessaire si image externe
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      resolve(imageData);
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}

function handleChangeAddedSvgColor(color) {
  var currentImage = activeCanvas.getActiveObject();

  if (currentImage.objectType == "svg") {
    activeCanvas.getObjects().forEach((objet) => {
      if (objet.name === "asowp-SignImage" && objet === currentImage) {
        // console.log(objet)
        if (objet._objects && objet._objects.length > 0) {
          objet.getObjects().forEach((path) => {
            path.set("fill", color);
          });
        } else {
          objet.set("fill", color);
        }
      }
    });

    activeCanvas.renderAll();
  }

  return color;
}

var totalCharPrice = 0;
var charPrice = 0;
var startPriceAtChar = 0;
function handleGetCharPrice(price, startAt, maxChar) {
  // console.log(startAt, "charPrice")
  if(maxChar){
    maxTextCharForSize = maxChar
  }
  charPrice = price;
  startPriceAtChar = startAt;
}
var textsPrice = 0;
function removeDeletedTextPrice(priceTable, textObjects) {
  // Parcourir les objets du grand tableau qui ont la face cible
  priceTable.forEach((priceObj, index) => {
    // Trouver l'objet correspondant dans le petit tableau
    const smallObj = textObjects.find((obj) => obj.id === priceObj.id);

    if (!smallObj) {
      // L'objet n'existe pas dans le petit tableau, on le supprime
      priceTable.splice(index, 1);
      index--;
    }
    // console.log(textsPrice, "table de prix de text")
  });

  return priceTable;
}
function handleCalcTextPrice(position) {
  var avalaibleFaceChars = 0;
  var avalaibleBackChars = 0;

  if (
    (activeSignFace === "front" && startPriceAtChar < frontTextCharLength) ||
    (activeSignFace === "back" && backTextCharLength > startPriceAtChar)
  ) {
    if (frontTextCharLength > startPriceAtChar) {
      avalaibleFaceChars =
        sumOptionsPrice(FtextObjects, "text").length - startPriceAtChar;
      if (avalaibleFaceChars < 0) {
        avalaibleFaceChars = 0;
      }
    }
    if (backTextCharLength > startPriceAtChar) {
      avalaibleBackChars =
        sumOptionsPrice(BtextObjects, "text").length - startPriceAtChar;
      if (avalaibleBackChars < 0) {
        avalaibleBackChars = 0;
      }
    }
  } else {
    textsPrice = 0;
  }

  textsPrice = (avalaibleFaceChars + avalaibleBackChars) * charPrice;
  let finalTextPrice = textsPrice

  return finalTextPrice
}
function handleSetPrice() {
  return handleCalcTextPrice();
}

function handleClipAddedObject(canva) {
  var sign;
  var clipPath;
  canva.getObjects().forEach(function (object) {
    if (object.name === "safeObject") {
      sign = object;
    }
  });

  switch (selectedShape) {
    case "square":
      clipPath = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        selectable: false,
      });
      break;

    case "rounded-square":
      clipPath = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        rx: 35,
        ry: 35,
        selectable: false,
      });
      break;

    case "oval":
      clipPath = new fabric.Ellipse({
        ry: sign.height / 2,
        rx: sign.width / 2,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        selectable: false,
      });
      break;

    case "triangle":
      clipPath = new fabric.Triangle({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        selectable: false,
      });
      break;

    case "rotated-square":
      clipPath = new fabric.Polygon(
        [
          { x: sign.width / 2, y: 0 },
          { x: sign.width, y: sign.height / 2 },
          { x: sign.width / 2, y: sign.height },
          { x: 0, y: sign.height / 2 },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "turn-left":
      clipPath = new fabric.Polygon(
        [
          { x: 0, y: sign.height / 2 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width, y: 0 },
          { x: sign.width, y: sign.height },
          { x: sign.width / 2, y: sign.height },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "turn-right":
      clipPath = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width, y: sign.height / 2 },
          { x: sign.width / 2, y: sign.height },
          { x: 0, y: sign.height },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "arrow-right":
      clipPath = new fabric.Polyline(
        [
          { x: 0, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: sign.height },
          { x: sign.width, y: sign.height / 2 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width / 2, y: sign.height / 5 },
          { x: 0, y: sign.height / 5 },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "arrow-left":
      clipPath = new fabric.Polygon(
        [
          { x: 0, y: sign.height / 2 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width / 2, y: sign.height / 5 },
          { x: sign.width, y: sign.height / 5 },
          { x: sign.width, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: sign.height },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "stop":
      clipPath = new fabric.Polygon(
        [
          { x: 0, y: (sign.height / 3) * 2 },
          { x: sign.width / 3, y: sign.height },
          { x: (sign.width / 3) * 2, y: sign.height },
          { x: sign.width, y: (sign.height / 3) * 2 },
          { x: sign.width, y: sign.height / 3 },
          { x: (sign.width / 3) * 2, y: 0 },
          { x: sign.width / 3, y: 0 },
          { x: 0, y: sign.height / 3 },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
        }
      );
      break;

    case "rounded-top":
      clipPath = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        rx: sign.width,
        ry: 10,
        selectable: false,
      });
      break;

    case "rounded-sides":
      clipPath = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        rx: 10,
        ry: sign.height,
        selectable: false,
      });
      break;
  
    case "cut-to-shape":
      clipPath = null
      break;
  }

  return clipPath;
}
function handleSetShadow(canva) {
  var sign;
  var shadowObject;
  canva.getObjects().forEach(function (object) {
    if (object.name === "safeObject") {
      sign = object;
    }
  });

  switch (selectedShape) {
    case "square":
      shadowObject = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        selectable: false,
        fill: "#313131",
        name: "asowp-signPattern",
        shadow: defaultShadow,
      });
      break;

    case "rounded-square":
      shadowObject = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        rx: 35,
        ry: 35,
        selectable: false,
        fill: "#313131",
        name: "asowp-signPattern",
        shadow: defaultShadow,
      });
      break;

    case "oval":
      shadowObject = new fabric.Ellipse({
        ry: sign.height / 2,
        rx: sign.width / 2,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        selectable: false,
        fill: "#313131",
        name: "asowp-signPattern",
        shadow: defaultShadow,
      });
      break;

    case "triangle":
      shadowObject = new fabric.Triangle({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        selectable: false,
        fill: "#313131",
        name: "asowp-signPattern",
        shadow: defaultShadow,
      });
      break;

    case "rotated-square":
      shadowObject = new fabric.Polygon(
        [
          { x: sign.width / 2, y: 0 },
          { x: sign.width, y: sign.height / 2 },
          { x: sign.width / 2, y: sign.height },
          { x: 0, y: sign.height / 2 },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
          fill: "#313131",
          name: "asowp-signPattern",
          shadow: defaultShadow,
        }
      );
      break;

    case "turn-left":
      shadowObject = new fabric.Polygon(
        [
          { x: 0, y: sign.height / 2 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width, y: 0 },
          { x: sign.width, y: sign.height },
          { x: sign.width / 2, y: sign.height },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
          fill: "#313131",
          name: "asowp-signPattern",
          shadow: defaultShadow,
        }
      );
      break;

    case "turn-right":
      shadowObject = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width, y: sign.height / 2 },
          { x: sign.width / 2, y: sign.height },
          { x: 0, y: sign.height },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
          fill: "#313131",
          name: "asowp-signPattern",
          shadow: defaultShadow,
        }
      );
      break;

    case "arrow-right":
      shadowObject = new fabric.Polyline(
        [
          { x: 0, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: sign.height },
          { x: sign.width, y: sign.height / 2 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width / 2, y: sign.height / 5 },
          { x: 0, y: sign.height / 5 },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
          fill: "#313131",
          name: "asowp-signPattern",
          shadow: defaultShadow,
        }
      );
      break;

    case "arrow-left":
      shadowObject = new fabric.Polygon(
        [
          { x: 0, y: sign.height / 2 },
          { x: sign.width / 2, y: 0 },
          { x: sign.width / 2, y: sign.height / 5 },
          { x: sign.width, y: sign.height / 5 },
          { x: sign.width, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: (sign.height / 5) * 4 },
          { x: sign.width / 2, y: sign.height },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
          fill: "#313131",
          name: "asowp-signPattern",
          shadow: defaultShadow,
        }
      );
      break;

    case "stop":
      shadowObject = new fabric.Polygon(
        [
          { x: 0, y: (sign.height / 3) * 2 },
          { x: sign.width / 3, y: sign.height },
          { x: (sign.width / 3) * 2, y: sign.height },
          { x: sign.width, y: (sign.height / 3) * 2 },
          { x: sign.width, y: sign.height / 3 },
          { x: (sign.width / 3) * 2, y: 0 },
          { x: sign.width / 3, y: 0 },
          { x: 0, y: sign.height / 3 },
        ],
        {
          top: sign.top,
          left: sign.left,
          absolutePositioned: true,
          selectable: false,
          fill: "#313131",
          name: "asowp-signPattern",
          shadow: defaultShadow,
        }
      );
      break;

    case "rounded-top":
      shadowObject = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        rx: sign.width,
        ry: 10,
        selectable: false,
        fill: "#313131",
        name: "asowp-signPattern",
        shadow: defaultShadow,
      });
      break;

    case "rounded-sides":
      shadowObject = new fabric.Rect({
        height: sign.height,
        width: sign.width,
        top: sign.top,
        left: sign.left,
        absolutePositioned: true,
        rx: 10,
        ry: sign.height,
        selectable: false,
        fill: "#313131",
        name: "asowp-signPattern",
        shadow: defaultShadow,
      });
      break;
  }

  return shadowObject;
}

function handleMoveobject(to) {
  var object = activeCanvas.getActiveObject();
  const index = activeCanvas.getObjects().indexOf(object);

  const objects = activeCanvas.getObjects();
  const lastIndex = objects.length - 1;
  if (to === "up") {
    object.moveTo(index + 1);
  }
  if (to === "down") {
    object.moveTo(index - 1);
  }

  activeCanvas.renderAll();
  simulateCanvasClick()
  // console.log('Index de l\'image:', index, "last index", lastIndex);
}
function findMaxId(tableau) {
  if (!Array.isArray(tableau) || tableau.length === 0) {
      // throw new Error("Le paramètre doit être un tableau non vide d'objets.");
    return -1
  }

  // Utilisation de la méthode reduce pour trouver l'id maximum
  const maxId = tableau.reduce((max, objet) => {
      if (typeof objet.id !== 'number') {
          throw new Error("Tous les objets doivent avoir un attribut 'id' de type nombre.");
      }
      return objet.id > max ? objet.id : max;
  }, -Infinity);

  return maxId;
}

async function handleLoadTemplateData(canvas1Json, canvas2Json, templateData, statut, defaultTextColor) {
  var signData = templateData;

  currentSignTextColor = defaultTextColor

  function addUniqueObject(arr, obj, key) {
    const index = arr.findIndex((item) => item[key] === obj[key]);
    if (index !== -1) {
      arr[index] = obj;
    } else {
      arr.push(obj);
    }
  }

  async function loadFromJSON(canva, canvasJson) {
    let rect;
    
    for(const object of canvasJson.objects){
      if (object.name === "asowp-SignText") {
        // console.log(object, "asowp-SignText")
        await loadFont(object.fontFamily, object.fontFamilyUrl)
      }
    }
    canva.clear();
    // canvasJson.objects.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    // canvasJson.objects.forEach(function (obj, index) {

    const objectsToLoad = canvasJson.objects.map(obj => ({...obj}));
    const loadedObjects = await Promise.all(
      objectsToLoad.map(obj => 
        new Promise(resolve => {
          fabric.util.enlivenObjects([obj], async function (templateObject) {
            if (templateObject[0].name === "asowp-SignText") {
              // await loadFont(templateObject[0].fontFamily, templateObject[0].fontFamilyUrl)
              // templateObject[0].set('fontFamily', templateObject[0].fontFamily)
              // console.log('fontFamily', templateObject[0])
    
              // templateObject[0].dirty = true
              // templateObject[0].set('noScaleCache', false);
              templateObject[0].setControlsVisibility({
                mt: false, // Middle top
                mb: false, // Middle bottom
                ml: false, // Middle left
                mr: false, // Middle right
                bl: true, // Bottom left
                br: true, // Bottom right
                tl: true, // Top left
                tr: true, // Top right
              });
              if (statut !== "making") {
                if (templateObject[0].lockMoving.x === true) {
                  templateObject[0].lockMovementX = true;
                }
                if (templateObject[0].lockMoving.y === true) {
                  templateObject[0].lockMovementY = true;
                }
                if (templateObject[0].lockScale === true) {
                  templateObject[0].lockScalingX = true;
                  templateObject[0].lockScalingY = true;
                }
                if (templateObject[0].lockRotate === true) {
                  templateObject[0].lockRotation = true;
                }
                if (templateObject[0].lockEdition === true) {
                  templateObject[0].editable = false;
                }
              }
    
              templateObject[0].clipPath = null;
    
              templateObject[0].uniScaleTransform = true,
              templateObject[0].centeredScaling = true,
              templateObject[0].lockScalingFlip = true,
    
              templateObject[0].on("editing:entered", () => {
                handleGetAddedTextValues(templateObject[0]);
                if(textType == "3D"){
                  templateObject[0].exitEditing()
                }
              });
              templateObject[0].on("editing:exited", () => {
                handleGetAddedTextValues(templateObject[0]);
                resizeText(templateObject[0]);
              });
              templateObject[0].on("selected", () => {
                handleGetAddedTextValues(templateObject[0]);
              });
              templateObject[0].on("mousedown", function () {
                handleGetAddedTextValues(templateObject[0]);
                reScaleText(templateObject[0]);
              });
              templateObject[0].on("mouseup", function () {
                handleGetAddedTextValues(templateObject[0]);
                reScaleText(templateObject[0]);
              });
    
              // if(templateObject[0].type == "neon-Text"){
              //   templateObject[0].glowRadius = 25
              // }
    
              addUniqueObject(addedTexts, templateObject[0], "id");
            }
    
            if (templateObject[0].name === "safeObject") {
              rect = await templateObject[0];
              if (typeof templateObject[0].fill !== "string") {
                templateObject[0].fill = "transparent";
                // console.log('WARNING:')
                var image;
                if (canva.name === "front-face") {
                  signBackground1 = "pattern";
                  patternUrl1 = templateData.color.face1.codeHex;
                  image = templateData.color.face1.codeHex;
                }
                if (canva.name === "back-face") {
                  signBackground2 = "pattern";
                  patternUrl2 = templateData.color.face2.codeHex;
                  image = templateData.color.face2.codeHex;
                }
                fabric.util.loadImage(
                  image,
                  function (img) {
                    var scaleX = templateObject[0].width / img.width;
                    var scaleY = templateObject[0].height / img.height;
                    var pattern = new fabric.Pattern({
                      source: img,
                      repeat: "no-repeat",
                      patternTransform: [scaleX, 0, 0, scaleY, 0, 0],
                    });
                    templateObject[0].set("fill", pattern);
                    // canvas.add(pattern);
                    canva.renderAll();
                  }
                  // { crossOrigin: "anonymous" }
                );
              }
            }
    
            if (templateObject[0].name === "asowp-SignImage") {
              templateObject[0].setControlsVisibility({
                mt: false, // Middle top
                mb: false, // Middle bottom
                ml: false, // Middle left
                mr: false, // Middle right
                bl: true, // Bottom left
                br: true, // Bottom right
                tl: true, // Top left
                tr: true, // Top right
              });
              if (statut !== "making") {
                if (templateObject[0].lockMoving.x === true) {
                  templateObject[0].lockMovementX = true;
                }
                if (templateObject[0].lockMoving.y === true) {
                  templateObject[0].lockMovementY = true;
                }
                if (templateObject[0].lockScale === true) {
                  templateObject[0].lockScalingX = true;
                  templateObject[0].lockScalingY = true;
                }
                if (templateObject[0].lockRotate === true) {
                  templateObject[0].lockRotation = true;
                }
              }
    
              templateObject[0].clipPath = null;
    
              templateObject[0].on("mousedown", function () {
                handleGetAddedImageValues(templateObject[0]);
              });
              templateObject[0].on("mouseup", function () {
                handleGetAddedImageValues(templateObject[0]);
              });
    
              let objectUrl = templateObject[0].objectType == "svg" ? templateObject[0].imageUrl : await templateObject[0].getSrc();
              addUniqueObject( addedImages, 
                {
                  id: templateObject[0].id,
                  url: objectUrl,
                  object: templateObject[0],
                }, "id"
              );
            }

            if (templateObject[0].name === "asowp-QRCode") {
              templateObject[0].setControlsVisibility({
                mt: false, // Middle top
                mb: false, // Middle bottom
                ml: false, // Middle left
                mr: false, // Middle right
                bl: true, // Bottom left
                br: true, // Bottom right
                tl: true, // Top left
                tr: true, // Top right
              });
    
              templateObject[0].clipPath = null;
    
              templateObject[0].on("mousedown", function () {
                handleGetAddedImageValues(templateObject[0]);
              });
              templateObject[0].on("mouseup", function () {
                handleGetAddedImageValues(templateObject[0]);
              });
    
              // let objectUrl = templateObject[0].objectType == "svg" ? templateObject[0].imageUrl : await templateObject[0].getSrc();
              let objectUrl = await templateObject[0].getSrc();
              addUniqueObject( addedQRCodes, 
                // templateObject[0], 
                {
                  id: templateObject[0].id,
                  text: templateObject[0].fromData,
                  url: objectUrl,
                  object: templateObject[0],
                }, 
                "id"
              );
            }
    
            // if (templateData && templateData.material.type == "simple") {
            //   if (signData.fixingMethod.type == "screw") {
            //     if (
            //       signData.shape == "square" ||
            //       signData.shape == "rounded-square" ||
            //       signData.shape == "rounded-top" ||
            //       signData.shape == "rounded-sides"
            //     ) {
            //       if (signData.fixingMethod.ratio == "small") {
            //         if (templateObject[0].name === "screw1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //         if (templateObject[0].name === "screw2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //       }
            //       if (signData.fixingMethod.ratio == "big") {
            //         if (templateObject[0].name === "screw1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top = rect.top;
            //         }
            //         if (templateObject[0].name === "screw2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top = rect.top;
            //         }
            //         if (templateObject[0].name === "screw3") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top = rect.top + (rect.height - newHeight);
            //         }
            //         if (templateObject[0].name === "screw4") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top = rect.top + (rect.height - newHeight);
            //         }
            //       }
            //     }
            //     if (signData.shape == "triangle") {
            //       if (templateObject[0].name === "screw1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width / 2 - newWidth / 2);
            //         templateObject[0].top = rect.top + newHeight / 2;
            //       }
            //       if (templateObject[0].name === "screw2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top = rect.top + (rect.height - newHeight);
            //       }
            //       if (templateObject[0].name === "screw3") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top = rect.top + (rect.height - newHeight);
            //       }
            //     }
            //     if (
            //       signData.shape == "oval" ||
            //       signData.shape == "rotated-square"
            //     ) {
            //       if (templateObject[0].name === "screw1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "screw2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (
            //       signData.shape == "turn-left" ||
            //       signData.shape == "arrow-left"
            //     ) {
            //       if (templateObject[0].name === "screw1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "screw2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width - newWidth);
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (
            //       signData.shape == "turn-right" ||
            //       signData.shape == "arrow-right"
            //     ) {
            //       if (templateObject[0].name === "screw1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "screw2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (signData.shape == "stop") {
            //       if (templateObject[0].name === "screw1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "screw2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width - newWidth);
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "screw-cap") {
            //     if (
            //       signData.shape == "square" ||
            //       signData.shape == "rounded-square" ||
            //       signData.shape == "rounded-top" ||
            //       signData.shape == "rounded-sides"
            //     ) {
            //       if (signData.fixingMethod.ratio == "small") {
            //         if (templateObject[0].name === "screw-cap1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //         if (templateObject[0].name === "screw-cap2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //       }
            //       if (signData.fixingMethod.ratio == "big") {
            //         if (templateObject[0].name === "screw-cap1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top = rect.top;
            //         }
            //         if (templateObject[0].name === "screw-cap2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top = rect.top;
            //         }
            //         if (templateObject[0].name === "screw-cap3") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top = rect.top + (rect.height - newHeight);
            //         }
            //         if (templateObject[0].name === "screw-cap4") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top = rect.top + (rect.height - newHeight);
            //         }
            //       }
            //     }
            //     if (signData.shape == "triangle") {
            //       if (templateObject[0].name === "screw-cap1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width / 2 - newWidth / 2);
            //         templateObject[0].top = rect.top + newHeight / 2;
            //       }
            //       if (templateObject[0].name === "screw-cap2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top = rect.top + (rect.height - newHeight);
            //       }
            //       if (templateObject[0].name === "screw-cap3") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top = rect.top + (rect.height - newHeight);
            //       }
            //     }
            //     if (
            //       signData.shape == "oval" ||
            //       signData.shape == "rotated-square"
            //     ) {
            //       if (templateObject[0].name === "screw-cap1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "screw-cap2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (
            //       signData.shape == "turn-left" ||
            //       signData.shape == "arrow-left"
            //     ) {
            //       if (templateObject[0].name === "screw-cap1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "screw-cap2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width - newWidth);
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (
            //       signData.shape == "turn-right" ||
            //       signData.shape == "arrow-right"
            //     ) {
            //       if (templateObject[0].name === "screw-cap1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "screw-cap2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (signData.shape == "stop") {
            //       if (templateObject[0].name === "screw-cap1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "screw-cap2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width - newWidth);
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "suction-cup") {
            //     if (
            //       signData.shape == "square" ||
            //       signData.shape == "rounded-square" ||
            //       signData.shape == "rounded-top" ||
            //       signData.shape == "rounded-sides"
            //     ) {
            //       if (signData.fixingMethod.ratio == "small") {
            //         if (templateObject[0].name === "suction-cup1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //         if (templateObject[0].name === "suction-cup2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //       }
            //       if (signData.fixingMethod.ratio == "big") {
            //         if (templateObject[0].name === "suction-cup1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top = rect.top;
            //         }
            //         if (templateObject[0].name === "suction-cup2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top = rect.top;
            //         }
            //         if (templateObject[0].name === "suction-cup3") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top = rect.top + (rect.height - newHeight);
            //         }
            //         if (templateObject[0].name === "suction-cup4") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top = rect.top + (rect.height - newHeight);
            //         }
            //       }
            //     }
            //     if (signData.shape == "triangle") {
            //       if (templateObject[0].name === "suction-cup1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width / 2 - newWidth / 2);
            //         templateObject[0].top = rect.top + newHeight / 2;
            //       }
            //       if (templateObject[0].name === "suction-cup2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top = rect.top + (rect.height - newHeight);
            //       }
            //       if (templateObject[0].name === "suction-cup3") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top = rect.top + (rect.height - newHeight);
            //       }
            //     }
            //     if (
            //       signData.shape == "oval" ||
            //       signData.shape == "rotated-square"
            //     ) {
            //       if (templateObject[0].name === "suction-cup1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "suction-cup2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (
            //       signData.shape == "turn-left" ||
            //       signData.shape == "arrow-left"
            //     ) {
            //       if (templateObject[0].name === "suction-cup1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "suction-cup2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width - newWidth);
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (
            //       signData.shape == "turn-right" ||
            //       signData.shape == "arrow-right"
            //     ) {
            //       if (templateObject[0].name === "suction-cup1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "suction-cup2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (signData.shape == "stop") {
            //       if (templateObject[0].name === "suction-cup1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "suction-cup2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width - newWidth);
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "standoff") {
            //     if (
            //       signData.shape == "square" ||
            //       signData.shape == "rounded-square" ||
            //       signData.shape == "rounded-top" ||
            //       signData.shape == "rounded-sides"
            //     ) {
            //       if (signData.fixingMethod.ratio == "small") {
            //         if (templateObject[0].name === "standoff1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //         if (templateObject[0].name === "standoff2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //       }
            //       if (signData.fixingMethod.ratio == "big") {
            //         if (templateObject[0].name === "standoff1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top = rect.top;
            //         }
            //         if (templateObject[0].name === "standoff2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top = rect.top;
            //         }
            //         if (templateObject[0].name === "standoff3") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           templateObject[0].left = rect.left;
            //           templateObject[0].top = rect.top + (rect.height - newHeight);
            //         }
            //         if (templateObject[0].name === "standoff4") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left + rect.width - newWidth;
            //           templateObject[0].top = rect.top + (rect.height - newHeight);
            //         }
            //       }
            //     }
            //     if (signData.shape == "triangle") {
            //       if (templateObject[0].name === "standoff1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width / 2 - newWidth / 2);
            //         templateObject[0].top = rect.top + newHeight / 2;
            //       }
            //       if (templateObject[0].name === "standoff2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top = rect.top + (rect.height - newHeight);
            //       }
            //       if (templateObject[0].name === "standoff3") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top = rect.top + (rect.height - newHeight);
            //       }
            //     }
            //     if (
            //       signData.shape == "oval" ||
            //       signData.shape == "rotated-square"
            //     ) {
            //       if (templateObject[0].name === "standoff1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "standoff2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (
            //       signData.shape == "turn-left" ||
            //       signData.shape == "arrow-left"
            //     ) {
            //       if (templateObject[0].name === "standoff1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "standoff2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width - newWidth);
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (
            //       signData.shape == "turn-right" ||
            //       signData.shape == "arrow-right"
            //     ) {
            //       if (templateObject[0].name === "standoff1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "standoff2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width - newWidth) - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //     if (signData.shape == "stop") {
            //       if (templateObject[0].name === "standoff1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //       if (templateObject[0].name === "standoff2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width - newWidth);
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "flag") {
            //     if (
            //       signData.shape == "square" ||
            //       signData.shape == "rounded-square" ||
            //       signData.shape == "rounded-top" ||
            //       signData.shape == "rounded-sides" ||
            //       signData.shape == "turn-right" ||
            //       signData.shape == "turn-left"
            //     ) {
            //       if (signData.fixingMethod.ratio == "small") {
            //         if (templateObject[0].name === "flag1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left - newWidth / 2;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //       }
            //       if (signData.fixingMethod.ratio == "big") {
            //         if (templateObject[0].name === "flag1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left - newWidth / 2;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 4 - newHeight / 2);
            //         }
            //         if (templateObject[0].name === "flag2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left = rect.left - newWidth / 2;
            //           templateObject[0].top =
            //             rect.top + ((rect.height / 4) * 3 - newHeight / 2);
            //         }
            //       }
            //     }
            //     if (signData.shape == "turn-left") {
            //       if (signData.fixingMethod.ratio == "small") {
            //         if (templateObject[0].name === "flag1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left =
            //             rect.left + rect.width - newWidth / 2;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 2 - newHeight / 2);
            //         }
            //       }
            //       if (signData.fixingMethod.ratio == "big") {
            //         if (templateObject[0].name === "flag1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left =
            //             rect.left + rect.width - newWidth / 2;
            //           templateObject[0].top =
            //             rect.top + (rect.height / 4 - newHeight / 2);
            //         }
            //         if (templateObject[0].name === "flag2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
            //           var newWidth =
            //             templateObject[0].width * templateObject[0].scaleX;
    
            //           templateObject[0].left =
            //             rect.left + rect.width - newWidth / 2;
            //           templateObject[0].top =
            //             rect.top + ((rect.height / 4) * 3 - newHeight / 2);
            //         }
            //       }
            //     }
            //     if (signData.shape == "oval" || signData.shape == "stop") {
            //       if (templateObject[0].name === "flag1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + (rect.height / 2 - newHeight / 2);
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "table-stand") {
            //     if (
            //       selectedShape == "square" ||
            //       selectedShape == "rounded-square"
            //     ) {
            //       if (templateObject[0].name === "table-stand") {
            //         templateObject[0].left = rect.left - 10;
            //         templateObject[0].top = rect.top + rect.height;
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "ceiling") {
            //     if (
            //       selectedShape == "square" ||
            //       selectedShape == "rounded-square" ||
            //       selectedShape == "rounded-top" ||
            //       selectedShape == "rounded-sides"
            //     ) {
            //       if (templateObject[0].name === "ceiling1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + rect.width / 5 - newWidth;
            //         templateObject[0].top = rect.top - newHeight / 2;
            //       }
            //       if (templateObject[0].name === "ceiling2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width / 5) * 4;
            //         templateObject[0].top = rect.top - newHeight / 2;
            //       }
            //     }
            //     if (selectedShape == "turn-left") {
            //       if (templateObject[0].name === "ceiling1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left =
            //           rect.left + (rect.width / 5) * 3.5 - newWidth;
            //         templateObject[0].top = rect.top - newHeight / 2;
            //       }
            //       if (templateObject[0].name === "ceiling2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width / 5) * 4;
            //         templateObject[0].top = rect.top - newHeight / 2;
            //       }
            //     }
            //     if (selectedShape == "turn-right") {
            //       if (templateObject[0].name === "ceiling1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + rect.width / 5 - newWidth;
            //         templateObject[0].top = rect.top - newHeight / 2;
            //       }
            //       if (templateObject[0].name === "ceiling2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + (rect.width / 5) * 1.5;
            //         templateObject[0].top = rect.top - newHeight / 2;
            //       }
            //     }
            //     if (selectedShape == "oval" || selectedShape == "stop") {
            //       if (templateObject[0].name === "ceiling1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left =
            //           rect.left + rect.width / 2 - newWidth / 2;
            //         templateObject[0].top = rect.top - newHeight / 2;
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "hanging") {
            //     if (
            //       signData.shape == "square" ||
            //       signData.shape == "rounded-square" ||
            //       signData.shape == "rounded-top" ||
            //       signData.shape == "rounded-sides"
            //     ) {
            //       if (signData.fixingMethod.ratio == "small") {
            //         if (templateObject[0].name === "hanging-hole") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           (templateObject[0].left = rect.left + rect.width / 2 - 15),
            //             (templateObject[0].top = rect.top + 15);
            //         }
            //       }
            //       if (signData.fixingMethod.ratio == "big") {
            //         if (templateObject[0].name === "hanging-hole1") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           (templateObject[0].left = rect.left + rect.width / 8 - 15),
            //             (templateObject[0].top = rect.top + 15);
            //         }
            //         if (templateObject[0].name === "hanging-hole2") {
            //           var newHeight =
            //             templateObject[0].height * templateObject[0].scaleY;
    
            //           (templateObject[0].left =
            //             rect.left + (rect.width / 8) * 7 - 15),
            //             (templateObject[0].top = rect.top + 15);
            //         }
            //       }
            //     }
            //     if (
            //       selectedShape == "oval" ||
            //       selectedShape == "stop" ||
            //       selectedShape == "triangle" ||
            //       selectedShape == "rotated-square"
            //     ) {
            //       if (templateObject[0].name === "hanging-hole") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         (templateObject[0].left =
            //           rect.left + rect.width / 2 - rect.height * 0.04),
            //           (templateObject[0].top = rect.top + 20);
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "pole-attachment") {
            //     if (templateObject[0].name === "pole") {
            //       var newHeight =
            //         templateObject[0].height * templateObject[0].scaleY;
    
            //       (templateObject[0].left =
            //         rect.left + rect.width / 2 - rect.width / 4 / 2),
            //         (templateObject[0].top = rect.top - rect.height / 2);
            //     }
            //   }
            //   if (signData.fixingMethod.type == "table-clamp") {
            //     if (
            //       signData.shape == "square" ||
            //       signData.shape == "rounded-square" ||
            //       signData.shape == "rounded-top" ||
            //       signData.shape == "rounded-sides"
            //     ) {
            //       if (templateObject[0].name === "table-clamp1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + rect.width / 5 - newWidth;
            //         templateObject[0].top = rect.top + rect.height - newHeight / 2;
            //       }
            //       if (templateObject[0].name === "table-clamp2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + (rect.width / 5) * 4;
            //         templateObject[0].top = rect.top + rect.height - newHeight / 2;
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "base-support") {
            //     if (
            //       signData.shape == "square" ||
            //       signData.shape == "rounded-square" ||
            //       signData.shape == "rounded-top" ||
            //       signData.shape == "rounded-sides"
            //     ) {
            //       if (templateObject[0].name === "base-support1") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + rect.width / 5 - newWidth;
            //         templateObject[0].top = rect.top + rect.height - newHeight + 5;
            //       }
            //       if (templateObject[0].name === "base-support2") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left + (rect.width / 5) * 4;
            //         templateObject[0].top = rect.top + rect.height - newHeight + 5;
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "sign-holder") {
            //     if (signData.shape == "square") {
            //       if (templateObject[0].name === "sign-holder-top") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top = rect.top - newHeight + newHeight / 2;
            //       }
            //       if (templateObject[0].name === "sign-holder-bottom") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top = rect.top + rect.height - newHeight / 2;
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "roll-up") {
            //     if (signData.shape == "square") {
            //       if (templateObject[0].name === "sign-holder-top") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top = rect.top - newHeight;
            //       }
            //       if (templateObject[0].name === "sign-holder-bottom") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
    
            //         templateObject[0].left = rect.left;
            //         templateObject[0].top = rect.top + rect.height;
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "eyelets") {
            //   }
            //   if (signData.fixingMethod.type == "keyring") {
            //     if (
            //       signData.shape == "square" ||
            //       selectedShape == "rounded-square" ||
            //       selectedShape == "rounded-top" ||
            //       selectedShape == "rounded-sides"
            //     ) {
            //       if (templateObject[0].name === "keyring") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left - newWidth / 2.5;
            //         templateObject[0].top = rect.top - newHeight / 1.4;
            //       }
            //       if (templateObject[0].name === "keyring-hole") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left = rect.left + 13;
            //         templateObject[0].top = rect.top + 13;
            //       }
            //     }
            //     if (signData.shape == "oval" || selectedShape == "stop") {
            //       if (templateObject[0].name === "keyring") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + rect.width / 2 - newWidth / 2;
            //         templateObject[0].top = rect.top - newHeight / 1.4;
            //       }
            //       if (templateObject[0].name === "keyring-hole") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
            //         var newRadius = rect.height * 0.05;
    
            //         templateObject[0].left = rect.left + rect.width / 2 - newRadius;
    
            //         templateObject[0].top = rect.top + 15;
            //       }
            //     }
            //     if (signData.shape == "rotated-square") {
            //       if (templateObject[0].name === "keyring") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + rect.width / 2 - newWidth / 2;
            //         templateObject[0].top = rect.top - newHeight / 1.4;
            //       }
            //       if (templateObject[0].name === "keyring-hole") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
            //         var newRadius = rect.height * 0.05;
    
            //         templateObject[0].left = rect.left + rect.width / 2 - newRadius;
            //         templateObject[0].top = rect.top + 15;
            //       }
            //     }
            //     if (signData.shape == "triangle") {
            //       if (templateObject[0].name === "keyring") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
    
            //         templateObject[0].left =
            //           rect.left + rect.width / 2 - newWidth / 2;
            //         templateObject[0].top =
            //           rect.top + rect.height / 10 - newHeight / 1.2;
            //       }
            //       if (templateObject[0].name === "keyring-hole") {
            //         var newHeight =
            //           templateObject[0].height * templateObject[0].scaleY;
            //         var newWidth =
            //           templateObject[0].width * templateObject[0].scaleX;
            //         var newRadius = rect.height * 0.05;
    
            //         templateObject[0].left = rect.left + rect.width / 2 - newRadius;
            //         templateObject[0].top = rect.top + rect.height / 10;
            //       }
            //     }
            //   }
            //   if (signData.fixingMethod.type == "s-hook") {
            //   }
            // }
    
            let maxTemplateId = Math.max(findMaxId(addedTexts), findMaxId(addedImages))
            if(maxTemplateId > newId){
              newId = maxTemplateId
            }
    
            // canva.add(...templateObject);
            resolve(templateObject[0]);
          });
        })
      )
    );

    loadedObjects.forEach((obj, index) => {      
      canva.add(obj);
      canva.moveTo(obj, index); // Force la position z-index
    });
  }

  addedTexts = []
  addedImages = []

  await loadFromJSON(canvas, canvas1Json);
  activeBorder = signData.border.face1.type;
  activeBorderColor = signData.border.face1.codeHex;
  if (templateData.doubleFace) {
    await loadFromJSON(backCanvas, canvas2Json);
    activeBorder2 = signData.border.face2.type;
    activeBorderColor2 = signData.border.face2.codeHex;
  }

  var currentSizeValues = handleGetSignPosition()
  maxTextCharForSize = signData.size.maxChars

  handleGetShape(templateData.shape);
  // console.log(currentSizeValues)
  // resetFixing(canvas);
  handleSelectFixingMethode(templateData.fixingMethod.type);
  sizeRatio = templateData.fixingMethod.ratio;
  fixScale = templateData.fixingMethod.scale;
  ratioScale = templateData.size.ratioScale;
  activeFixingMethode = templateData.fixingMethod.type

  var sign = handleGetObjectByName("safeObject");
  function setMeasurmentValue(canvas) {
    var Objects = canvas.getObjects();
    Objects.forEach((object) => {
      if (object.name == "heightLine") {
        object.set({
          x1: sign.left + sign.width + 30,
          y1: sign.top,
          x2: sign.left + sign.width + 30,
          y2: sign.top + sign.height,
        });
      }
      if (object.name == "widthLine") {
        object.set({
          x1: sign.left,
          y1: sign.top + sign.height + 28.5,
          x2: sign.left + sign.width + 10,
          y2: sign.top + sign.height + 28.5,
        });
      }
      if (object.name == "height-value") {
        object.text = String(signData.size.height + " " + currentUnit);
        object.top = sign.top + sign.height / 2;
        object.left = sign.left + sign.width + 55;
      }
      if (object.name == "width-value") {
        object.text = String(signData.size.width + " " + currentUnit);
        object.left = sign.left + sign.width / 2 - object.width / 2;
        object.top = sign.top + (sign.height + 35);
      }
      if (object.name == "thickness-value") {
        object.left = sign.left + sign.width / 2 - object.width / 2;
        object.top = sign.top + (sign.height + 65);
        object.text = String(
          "Thickness" + ": " + currentThickness + " " + currentUnit
        );
      }
      if (selectedShape == "square") {
        if (object.name == "old-world-border") {
          var scaleX = sign.width / object.width;
          var scaleY = sign.height / object.height;
          object.left = sign.left;
          object.top = sign.top;
          object.scaleX = scaleX;
          object.scaleY = scaleY;
        }
      }
    });
    canvas.renderAll();
  }
  if(templateData.shape != "cut-to-shape"){
    setMeasurmentValue(canvas);
    setMeasurmentValue(backCanvas);
  }else{
    setOutlineMeasurmentValue(sign[0], signData.size.width, signData.size.height)
  }

  if (templateData.size.maxChars != -1) {
    FtextObjects = handleGetTextObjects1("asowp-SignText");
    BtextObjects = handleGetTextObjects2("asowp-SignText");

    function adjustTextCharacters(textObjects, maxCharacters, canva) {
      let totalCharacters = 0;

      // Calculer le nombre total de caractères dans les objets "text"
      textObjects.forEach((obj) => {
        totalCharacters += obj.text.length;
      });

      // Si le total est inférieur ou égal au maximum, on ne fait rien
      if (totalCharacters <= maxCharacters) {
        return;
      }

      // Sinon, on commence par supprimer des caractères du dernier objet
      let charsToRemove = totalCharacters - maxCharacters;
      for (let i = textObjects.length - 1; i >= 0; i--) {
        const obj = textObjects[i];
        // obj.set('canvas', activeCanvas);
        if (obj.text.length > charsToRemove) {
          canva.discardActiveObject();
          canva.remove(obj);
          // Supprimer les caractères en trop de cet objet
          obj.text = obj.text.slice(0, obj.text.length - charsToRemove);
          obj.set("text", obj.text);

          if(textType === "3D"){
            var textLayer = null
            var objects = activeCanvas.getObjects();
            objects.forEach(function(object) {
              if(object.id == obj.id && object.name == "asowp-SignTextLayer"){
                textLayer = object
              }
            })
      
            activeCanvas.remove(textLayer)
            
            textLayer.text = textLayer.text.slice( 0, obj.text.length - charsToRemove);
            textLayer.set("text", obj.text);
      
            activeCanvas.add(textLayer)
          } 

          canva.add(obj);
          obj.set("scaleX", obj.scaleX + 0.001);
          obj.set("scaleY", obj.scaleY + 0.001);

          charsToRemove = 0;
          break;
        } else {
          // Supprimer complètement cet objet
          charsToRemove -= obj.text.length;
          textObjects.splice(i, 1);

          canva.getObjects().forEach(function (obj) {
            if (obj.name === "asowp-SignText") {
              function syncTextObjectsByFace( bigArray, textObjects, targetFace ) {
                // Parcourir les objets du grand tableau qui ont la face cible
                bigArray.forEach((bigObj, index) => {
                  // console.log(bigObj.canvasName,"can")
                  if (bigObj.canvasName === targetFace) {
                    // Trouver l'objet correspondant dans le petit tableau
                    const smallObj = textObjects.find(
                      (obj) => obj.id === bigObj.id
                    );

                    if (smallObj) {
                      console.log(bigObj.canvasName, "array", index);
                      // L'objet existe dans le petit tableau, on le remplace
                      bigArray[index] = smallObj;
                    } else {
                      // L'objet n'existe pas dans le petit tableau, on le supprime
                      bigArray.splice(index, 1);
                      index--;
                    }
                  }
                });

                return bigArray;
              }
              addedTexts = syncTextObjectsByFace( addedTexts, textObjects, canva.name );
              // console.log(addedTexts, "1969089151")
            }
          });

          canva.remove(obj);
        }

        // Si on a supprimé tous les caractères en trop, on peut arrêter
        if (charsToRemove <= 0) {
          break;
        }
      }

      canva.renderAll();
    }
    adjustTextCharacters(FtextObjects, maxChar, canvas);
    adjustTextCharacters(BtextObjects, maxChar, backCanvas);
  }else{
    FtextObjects = handleGetTextObjects1("asowp-SignText");
    BtextObjects = handleGetTextObjects2("asowp-SignText");
  }
  frontTextCharLength = sumOptionsPrice(FtextObjects, "text").length;
  backTextCharLength = sumOptionsPrice(BtextObjects, "text").length;
  handleSetPrice()

  if(textType == "3D"){
    replace3DLayer(canvas)
    replace3DLayer(backCanvas)
  }

  firstLoad = true;
  return {
    size: currentSizeValues,
    texts: addedTexts,
    images: addedImages,
    qrCodes: addedQRCodes,
  };
}

function replace3DLayer(canva){
}



async function handleGenSvgDesignImg(canva, width, height) {
  const imageData = canva.getContext().getImageData(0, 0, width, height)

  let svgPaths = await genSvgPath(imageData)

  console.log(svgPaths)
  return svgPaths
}



function handleFinishConfiguration(textsTable, imagesTable, qrCodesTable) {
  var textsValues = [];
  var imagesValues = [];
  var qrCodesValues = [];
  function formatValues(value) {
    var object = {
      width: {
        label: visualizerText.width,
        value: value.width,
      },
      height: {
        label: visualizerText.height,
        value: value.height,
      },
      left: {
        label: visualizerText.left,
        value: value.left,
      },
      top: {
        label: visualizerText.top,
        value: value.top,
      },
      right: {
        label: visualizerText.right,
        value: value.right,
      },
      bottom: {
        label: visualizerText.bottom,
        value: value.bottom,
      },
    };

    return object;
  }
  if (textsTable.length > 0) {
    textsTable.forEach((text) => {
      function addTextValues(arr, obj, key) {
        const exists = arr.some((item) => item[key] === obj[key]);
        if (!exists) {
          arr.push(obj);
        }
      }
      addTextValues(
        textsValues,
        {
          id: text.id,
          type: textType,
          values: formatValues(handleGetAddedTextValues(text)),
          textContent: text.text,
          bold: text.fontWeight,
          italic: text.fontStyle,
          fontFamily: text.fontFamily,
          color: text.fill,
          neonColor: textType == "neon" ? text.neonColor : null,
          firstBorder: textType == "3D" ? {size: text.strokeWidth, color: text.stroke} : null,
          secondBorder: textType == "3D" ? {size: text.secondStrokeWidth, color: text.secondStroke} : null,
          side: textType == "3D" ? text.activeSide : null,
          sideColor: textType == "3D" ? text.sideColor : null,
          underlined: text.underline,
          crossed: text.linethrough,
          overlined: text.overline,
          alignment: text.textAlign,
          object: text,
        },
        "id"
      );
    });
  }
  if (imagesTable.length > 0) {
    imagesTable.forEach((image) => {
      function addTextValues(arr, obj, key) {
        const exists = arr.some((item) => item[key] === obj[key]);
        if (!exists) {
          arr.push(obj);
        }
      }
      addTextValues(
        imagesValues,
        {
          id: image.id,
          url: image.objectType === "svg" ? image.imageUrl : image.getSrc(),
          values: formatValues(handleGetAddedImageValues(image)),
        },
        "id"
      );
    });
  }
  if (qrCodesTable.length > 0) {
    qrCodesTable.forEach((code) => {
      function addTextValues(arr, obj, key) {
        const exists = arr.some((item) => item[key] === obj[key]);
        if (!exists) {
          arr.push(obj);
        }
      }
      addTextValues(
        qrCodesValues,
        {
          id: code.id,
          text: code.fromData,
          // url: code.objectType === "svg" ? code.imageUrl : code.getSrc(),
          url: code.getSrc(),
          values: formatValues(handleGetAddedImageValues(code)),
        },
        "id"
      );
    });
  }
  return {
    texts: textsValues,
    images: imagesValues,
    qrCodes: qrCodesValues,
  };
}

export {
  getSignInfos,
  handleCheckTemplate,
  handleReadyToSaveState,
  handleGetMeasurementVibility,
  setOutlineMeasurmentValue,
  handleMiseAEchelle,
  handleGetCanvas,
  handleGetCurrentUnit,
  handleGetDefaultText,
  handleGetTextType,
  handleUndo,
  handleRedo,
  handleClearAll,
  handleGetObjectByName,
  handleGetSignPosition,
  handleChangeSize,
  handleChangeThickness,
  handleDeleteObject,
  handleCloneObject,
  handleCenterVertically,
  handleCenterHorizontally,
  handlechangeBorderColor,
  handleGetBorderData,
  handleSelectBorder,
  handleGetBorderRestart,
  handleChangeSignColor,
  handleGetShape,
  handleSelectShape,
  handleGetActiveFixing,
  handleSelectFixingMethode,
  handleGetAddedTextValues,
  handleAddTextToSign,
  handleChangeTextValue,
  handleChangeTextAlign,
  handleChangeTextWeight,
  handleChangeTextStyle,
  handleChangeTextSize,
  handleChangeTextFontFam,
  handleChangeTextColor,
  handleUnderlineText,
  handleCrossText,
  handleOverlineText,
  handleChangeTextBorder,
  handleChangeTextBorderColor,
  handleShow3dSide,
  handleChange3dSideColor,
  handleChangeTextLightColor,
  handleTurnLightOnOff,
  handleGetImageSettings,
  handleGetAddedImageValues,
  handleAddImageToSign,
  handleTurnImageLeft,
  handleTurnRightImage,
  handleChangeImageWidth,
  handleChangeImageHeight,
  handleFlipImage,
  handleSelectFilter,
  handleCheckActiveSignFace,
  handleCloneCanvas,
  setPattern,
  handleSetImageToSignBackground,
  handleFinishConfiguration,
  handleGetCharPrice,
  handleSetPrice,
  handleClipAddedObject,
  handleGetNewPosition,
  handleLockMoving,
  handleLockScaling,
  handleLockRotating,
  handleLockEdition,
  handleLoadTemplateData,
  handleMoveobject,
  handleChangeAddedSvgColor,
  handleSetShadow,
  handleConvertImageToDataURI,
  handleRemoveBgImage,
  handleAddQRCode,
  handleEditQRCode,
  handleChangeQRCodeColor,
  handleChangeOutlineSize,
  handleGenSvgDesignImg,
  showLoader,
  handleGetCutlineData
};
