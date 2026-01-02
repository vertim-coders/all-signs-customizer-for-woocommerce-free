<template></template>

<script setup>
    import { ref, onMounted, defineProps, onBeforeUnmount } from 'vue';
    import {getSignInfos, handleCheckTemplate, handleReadyToSaveState, 
        handleGetCanvas, handleGetCurrentUnit,
        handleGetMeasurementVibility,
        handleMiseAEchelle,
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
    } from '@/frontend/utils/asowp-editor-script.js';
    import { add_to_cart, formatPrice, setScrollColor } from '@/frontend/utils/functions.js'
    import { useRoute } from "vue-router";
    import toastMessage from '@/admin/utils/functions';
    import api from "@/admin/Api/api";
    import { jsPDF } from 'jspdf';

    import opentype from 'opentype.js'
    import { load } from 'opentype.js'

    var FontFaceObserver = require('fontfaceobserver');

    import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";
const route = useRoute();
    const template_config_id = route.params.configId;
    const template_id = route.params.templateId;
    const template = ref({});

    const props = defineProps({
        config:Object,
        manage:Object,
        currency:String,
        template:Object
    });
    var configColors = ref({})
    configColors.value = props.config.data.settings.themeColors.colors


    var configSettings = ref({})
    var configDoublePart = ref({})
    var configTextSettings = ref({})

    var configTextType = ref('normal')

    var configTextFontSettings = ref({})
    var configImageSettings = ref({})
    var configImagesFormat = ref("")
    var configImageSettingsClipart = ref({})
    var configImageSettingsFilters = ref({})
    var configUnit = ref("")
    var configSectionIcons = ref({})
    var configOutputSettings = ref({})
    var configAdditionnalOptions = ref([])
    var configVisualiserTexts = ref({})

    // console.log(props.config.data)

    var isLoaded = ref(true)
    function setIsLoadedToFalse() {
        setTimeout(() => {
            isLoaded.value = false;
        }, 1000);
    };

    var div = document.getElementById('canvas-container')


    var showOption = ref(false);
    var step = ref('');
    function closeOption(){
        showOption.value = false;
        step.value = '';
        textSideHelp.value = false;
    }

    const handleDocumentClick = (e) => {
        var optionss = document.querySelector('#asowp-options-container')
        var optionButton = document.querySelector('#asowp-optionsButtons-container')
        var editButton = document.querySelector('#asowp-editObject')
        var templateButton = document.querySelector('#asowp-templateObjects-button')
        var templateOptions = document.querySelector('#asowp-templateObjects-options')

        if(window.innerWidth > 688){
            if(!optionss.contains(e.target) && !optionButton.contains(e.target) && !editButton.contains(e.target)) {
                closeOption()
                selectText.value = false;
                editImage.value = false;
            }
            // if(route.name == 'template-maker' && !templateButton.contains(e.target) && !templateOptions.contains(e.target) ){
            //     showTempSettings.value = false;
            // }
        }
    }

    async function hideCanvasForWaiting(staut) {
        if (staut == true) {
            canvas.getElement().style.opacity = "0"
        } else {
            canvas.getElement().style.opacity = "1"
        }
    }

    let validFilter = ref([
        {name: "Blur", value: "blur", image: ""},
        {name: "Greyscale", value: "greyscale", image: "../../../../../assets/images/filters/im_greyscale_filter.png"},
        {name: "Sepia", value: "sepia", image: "../../../../../assets/images/filters/im_sepia_filter.png"},
        {name: "Embross", value: "embross", image: "../../../../../assets/images/filters/im_emboss_filter.png"},
        {name: "Sharpen", value: "sharpen", image: "../../../../../assets/images/filters/im_sharpen_filter.png"},
        {name: "Greenify", value: "greenify", image: "../../../../../assets/images/filters/im_greenify_filter.png"},
        {name: "Pinkify", value: "pinkify", image: "../../../../../assets/images/filters/im_pinkify_filter.png"},
        {name: "Orangeify", value: "orangeify", image: "../../../../../assets/images/filters/im_orangeify_filter.png"},
        {name: "Blueify", value: "blueify", image: "../../../../../assets/images/filters/im_blueify_filter.png"},
    ])

    var selectText = ref(false);
    var editImage = ref(false);

    var advancedComponent = ref({})
    var advancedComponentId = ref(0)
    var addComponentValue = ref({})
    var addComponentId = ref(0)
    function showOptions(option, stepValue, id){
        textSideHelp.value = false

        switch (option) {
            case 'fixing-methode':
                if(fixinggs.value.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case 'material':
                if(props.config.data.materials.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "size":
                if(sizees.value.length > 0 || customSizeActive){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "shape":
                if(shapees.value.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
                
            break;

            case "border":
                if(borderrs.value.allBorders.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "color":
                // if(colorrs.value.allColors.length >= 0){
                // }
                step.value = option;
                showOption.value = true;
            break;

            case "text":
                // if(currentMaterialTextImages.value.enableText){
                // }
                // if((materialType == 'simple' && currentMaterialTextImages.enableText && sizees.length > 0 ) || materialType == 'advance'){
                // }
                step.value = option;
                showOption.value = true;
            break;

            case "image":
                // if(currentMaterialTextImages.value.enableImage){
                // }
                step.value = option;
                showOption.value = true;
            break;

            case "add-components":
                // if(currentMaterialTextImages.value.enableImage){
                // }
                addComponentId.value = id
                addComponentValue.value = stepValue;
                step.value = option;
                showOption.value = true;
            break;

            case "add-options":
                step.value = option;
                showOption.value = true;
            break;

            case "component":
                if(stepValue && materialType.value == 'advance'){
                    advancedComponentId.value = id
                    advancedComponent.value = stepValue;
                    step.value = option;
                    showOption.value = true;
                }
            break;
        
            case "qr-code":
                // if(currentMaterialTextImages.value.enableImage){
                // }
                step.value = option;
                showOption.value = true;
            break;
            default:
                break;
        }

        if(stepValue && materialType.value == 'advance'){
            advancedComponent.value = stepValue;
        }

    }

    var showHelpSection = ref(false);
    var showTempSettings = ref(false)

    var showScrollButton = ref(false)
    function verifierScrollabilite() {
        const monDiv = document.getElementById('asowp-options-buttons');
        if(monDiv){
            if (monDiv.scrollHeight > monDiv.clientHeight) {
                showScrollButton.value = true;
                // monDiv.classList.remove("asowp-justify-center");
                // monDiv.classList.add("asowp-justify-start");
            } else {
                showScrollButton.value = false;
                // monDiv.classList.remove("asowp-justify-start");
                // monDiv.classList.add("asowp-justify-center");
            }
        }
    }
    function ScrollLeft(id){
        var div = document.getElementById(id)
        if(isBelowLimit.value === true){
            div.scrollLeft -= 150 
        }else{
            div.scrollTop -= 150 
        }
    }
    function ScrollRight(id){
        var div = document.getElementById(id)
        if(isBelowLimit.value === true){
            div.scrollLeft += 150 
        }else{
            div.scrollTop += 150 
        }
    }
    setInterval(verifierScrollabilite, 500);

    var isBelowLimit = ref(false)
    function checkScreenView() {
        if(window.innerWidth < 1024){
            // isBelowLimits.value = window.innerWidth < 1024;
            isBelowLimit.value = true;
            if(window.innerWidth < 688){
                showOptions('material')
            }
        }else{
            isBelowLimit.value = false
            // firstResize((currentResizeSetting.value), 'desktop'); 
        }
    }

    var showFont = ref(false)
    function dropFontToggle(){
        showFont.value = !showFont.value;
    }

    var showSize = ref(false)
    function dropSizeToggle(){
        // console.log('drop')
        showSize.value = !showSize.value;
    }

    var showThick = ref(false)
    function dropThicknessToggle(){
        showThick.value = !showThick.value;
    }

    var showStateButtons = ref(false)

    var pickedColor = ref("aa")
    var simpleColor = ref("#000000");

    var fabric = window.fabric;

    var canvasFace1Ref = ref(null);
    var canvasFace2Ref = ref(null);
    var canvas = null
    var canvasBack = null
    var activeCanvas = null

    var defaultShadow = ref(new fabric.Shadow({
        color: 'black',
        offsetX: 3,
        offsetY: 3,
        blur: 30,
        isActive: true
    }))

    function getCanvas(canvas1, canvas2, statut){
        handleGetCanvas(canvas1, canvas2, statut)
    }

    function hideCanvasElements(){
        var objects = canvas.getObjects()
        objects.forEach(object =>{
            object.visible = false
        })
        canvas.renderAll();
    }

    function zoomCanvas(to){
        var canvasCenter = getCanvasCenter(activeCanvas)
        if (to == 'up') { // Vérifier si la touche Ctrl est enfoncée
            var delta = -111.11111405455044;
            var zoom = activeCanvas.getZoom();
            zoom *= 0.9999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            activeCanvas.zoomToPoint({ x: activeCanvas.getWidth()/2, y: activeCanvas.getHeight()/2 }, zoom);
        }
        if (to == 'down') { // Vérifier si la touche Ctrl est enfoncée
            var delta = 111.11111405455044;
            var zoom = activeCanvas.getZoom();
            zoom *= 0.9999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            activeCanvas.zoomToPoint({ x: activeCanvas.getWidth()/2, y: activeCanvas.getHeight()/2 }, zoom);
        }
    }

    var isTemplate = ref(false)
    let templateDatas = ref({})
    let templateStatut = ref("none")
    async function selectTemplate(data, statut){
        templateDatas.value = data
        templateStatut.value = statut ? statut : "none"

        // console.log(data)
        firstSetLoad.value = false
        handleReadyToSaveState(false);

        // console.log(data);
        //chargement du prix du template
        optionsPrices.value = data.price ? data.price.array : []
        var templatePrice = {
            name: 'none',
            price: 0
        }
        getOptionPrice(templatePrice)
        // console.log(optionsPrices.value)

        //chargement des additionnalOptions
        customAdditionalValues.value = data.additionalOptions

        function isColorOrImage(str) {
            const colorCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (colorCodeRegex.test(str)) {
                return 'color';
            }
            const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/;
            if (imageUrlRegex.test(str)) {
                return 'image';
            }
            return 'other';
        }
        var sign = data.sign

        //selection du matériel
        var templateMaterialId = allMaterials.value.findIndex((item, index) => item.name === sign.material.name)
        currentMaterialId.value = sign.material.id
        selectMaterial(props.config.data.materials[sign.material.id], sign.material.id)
        getSignInfos({name: 'Template', width: parseFloat(sign.size.width), height: parseFloat(sign.size.height)})

        if(sign.material.type == 'advance'){
            advancedComponent.value = sign.material.advanceComponent.component
        }

        var defTextColor = (configTextSettings.value.colors.length > 0 ? configTextSettings.value.colors[0].codeHex : "#000000")
        signTextColor1.value = sign.color.face1.textColor

        let configTextColor = ""

        if(sign.color.face1.textColor.active){
            configTextColor = sign.color.face1.textColor.codeHex
        }else{
            configTextColor = defTextColor
        }

        if(sign.color.face1.textColor.sameForBorder){
            colorForBorder1.value = false
        }else{
            colorForBorder1.value = true
        }
        if(sign.color.face2.textColor.sameForBorder){
            colorForBorder2.value = false
        }else{
            colorForBorder2.value = true
        }

        var loadedTemplate = await handleLoadTemplateData(data.template.face1, data.template.face2, sign, statut, configTextColor)
        //selection de border
        if(sign.material.type === 'simple'){
            if(borderrs.value.allBorders.length > 0){
                borderrs.value.allBorders.forEach((borderr, id) => {
                    allBorders.value.forEach((border, index) => {
                        if(borderr.manageBorderId == index){
                            matchingBorders.value.push({border, borderr})
                        }
                    })
                })
            }
            var currentBorder1Id = matchingBorders.value.findIndex((item, index) => item.border.value === sign.border.face1.type)            
            var currentBorder = matchingBorders.value[currentBorder1Id]

            if(currentBorder != undefined){
                border1ExcludeShapes.value = currentBorder.borderr.excludeShapes
                border1ExcludeSizes.value = currentBorder.borderr.excludeSizes
        
                borderColors1.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
                customBorderColor1.value = borderrs.value.settings.enableBorderColor
    
                // selectBorder(currentBorder.border.value, currentBorder.borderr.settings, currentBorder.borderr.additionalPrice, currentBorder.borderr.excludeShapes, currentBorder.borderr.excludeSizes, currentBorder1Id)
                handleSelectBorder(sign.border.face1.type, sign.border.face1.codeHex)
    
                activeFace1Border.value = sign.border.face1.type;
                borderColorName1.value = sign.border.face1.color;
                activeFace1BorderColor.value = sign.border.face1.codeHex
                if(sign.border.face1.type !== 'none' && sign.border.face1.codeHex !== ('' || null)){
                    colorForBorder1.value = true
                }
                handleGetBorderData('front-face', {border: sign.border.face1.type, color: sign.border.face1.codeHex})
            }

            //verification pour la seconde face si existante
            if(sign.doubleFace === true){
                var currentBorder2Id = matchingBorders.value.findIndex((item, index) => item.border.value === sign.border.face2.type)
                var currentBorder2 = matchingBorders.value[currentBorder2Id]
                
                if(currentBorder2 != undefined){
                    border2ExcludeShapes.value = matchingBorders.value[currentBorder2Id].borderr.excludeShapes
                    border2ExcludeSizes.value = matchingBorders.value[currentBorder2Id].borderr.excludeSizes
        
                    borderColors2.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
                    customBorderColor2.value = borderrs.value.settings.enableBorderColor
        
                    activeFace2Border.value = sign.border.face2.type;
                    borderColorName2.value = sign.border.face2.color
                    activeFace2BorderColor.value = sign.border.face2.codeHex
    
                    borderColors2.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
    
                    if(sign.border.face2.type !== 'none' && sign.border.face2.codeHex !== ('' || null)){
                        colorForBorder2.value = true
                    }
                    handleGetBorderData('back-face', {border: sign.border.face2.type, color: sign.border.face2.codeHex})
                }
    
            } 
        }

        //selection de fixing methode
        if(fixinggs.value.length > 0){
            fixinggs.value.forEach((fixingg, id) => {
                allFixings.value.forEach((fixing, index) => {
                    if(fixingg.fixingMethodId == index && !fixingg.excludeSizes.includes(currentSizeId) && !fixingg.excludeShapes.includes(currentShapeId)){
                        matchingFixings.value.push({fixing, fixingg})
                    }
                })
            })
        }
        var currentFixingId = matchingFixings.value.findIndex((item, index) => item.fixing.type === sign.fixingMethod.type)
        activeFixingMethode.value = sign.fixingMethod.type
        if(sign.material.type === 'simple'){
            if(currentFixingId != -1){
                fixingExcludeSizes.value = matchingFixings.value[currentFixingId].fixingg.excludeSizes
                fixingExcludeShapes.value = matchingFixings.value[currentFixingId].fixingg.excludeShapes
                activeFixingId.value = currentFixingId
            }
        }

        
        //selection de shape
        selectedShape.value = sign.shape

        //selection des couleur de sign
        if(isColorOrImage(sign.color.face1.codeHex) === 'color'){
            activeSignColor.value = sign.color.face1.name
            activeSignColoriD.value = sign.color.face1.id
            patternActive1.value = false
            activeSignColorCode1.value = sign.color.face1.codeHex
            var pattern = {
                active: false,
                codeHex: sign.color.face1.codeHex,
                url: "",
            }
            // setSignColor(canvas, pattern, sign.color.face1.textColor, 'black')
        }else{
            activeSignColor.value = sign.color.face1.name
            activeSignColoriD.value = sign.color.face1.id
            patternActive1.value = true
            activeSignColorCode1.value = sign.color.face1.codeHex
            var pattern = {
                active: true,
                codeHex: '',
                url: sign.color.face1.codeHex,
            }
            // setSignColor(canvas, pattern, sign.color.face1.textColor, 'black')
        }
        if(sign.color.face1.textColor.active){
            signTextColor1.value = true
            colorTextColorName1.value = sign.color.face1.textColor.name
            colorTextCodeHex1.value = sign.color.face1.textColor.codeHex
        }

        if(sign.doubleFace === true){
            signTextColor2.value = sign.color.face2.textColor
            if(isColorOrImage(sign.color.face2.codeHex) === 'color'){
                activeSignFace2Color.value = sign.color.face2.name;
                activeSignFace2ColoriD.value = sign.color.face2.id;
                patternActive2.value = false
                activeSignColorCode2.value = sign.color.face2.codeHex
                var pattern = {
                    active: false,
                    codeHex: sign.color.face2.codeHex,
                    url: "",
                }
                // setSignColor(canvasBack, pattern, sign.color.face2.textColor, 'black')
            }else{
                activeSignFace2Color.value = sign.color.face2.name;
                activeSignFace2ColoriD.value = sign.color.face2.id;
                patternActive2.value = true
                activeSignColorCode2.value = sign.color.face2.codeHex
                var pattern = {
                    active: false,
                    codeHex: '',
                    url: sign.color.face2.codeHex,
                }
                // setSignColor(canvasBack, pattern, sign.color.face2.textColor, 'black')
            }

            if(sign.color.face2.textColor.active){
                signTextColor2.value = true
                colorTextColorName2.value = sign.color.face2.textColor.name
                colorTextCodeHex2.value = sign.color.face2.textColor.codeHex
            }
        }

        //selection du la size
        currentSizeName.value = String(sign.size.width + "x" + sign.size.height)
        var templateSize = {
            name: 'Template',
            width: sign.size.width,
            height: sign.size.height,
            maxChars: sign.size.maxChars
        }
        currentSizeData.value = templateSize
        currentSizeValues.value = loadedTemplate.size
        maxTextCharForSize.value = sign.size.maxChars
        //selection du thickness
        if(sign.size.thickness.active){
            currentSizeThickness.value = true
            var thick = sign.size.thickness.value
            currentThickValue.value = thick
        }else{
            currentSizeThickness.value = false
            currentThickValue.value = 0
        }

        if(sign.size.setting){
            currentSizeSetting.value = sign.size.setting
            handleGetCharPrice(sign.size.setting.charPrice, sign.size.setting.startPriceAtChar, templateSize.maxChars)
        }

        if(sign.material.type == 'advance'){
            activeSignModel.value = sign.material.advanceComponent.option.data
            activeSignModelName.value = sign.material.advanceComponent.option.data.name
            activeSignModelId.value = sign.material.advanceComponent.option.id

            fixinggs.value = sign.material.advanceComponent.option.data.fixingMethods
            handleSelectFixingMethode(sign.fixingMethod.type)
        }

        //recupération des texts du template
        addedTexts.value = loadedTemplate.texts

        //recupération des images du template
        usedImages.value = loadedTemplate.images
        // console.log(loadedTemplate.images, "loadedTemplate.images")

        textsPrices.value = handleSetPrice()
        getOptionPrice()
        
        if(!firstSetLoad.value){
            saveStep("select of first values")
        }
        handleReadyToSaveState(true, true)
        firstSetLoad.value = true

        // simulateCanvasClick()
    }

    var matchingFixings = ref([])
    var matchingBorders = ref([])
    var firstSetLoad = ref(false)
    function selectSimpleFirstValue() {
        handleReadyToSaveState(false);
        firstSetLoad.value = false;
        finalPrices.value = 0
        optionsPrices.value = []

        firstBorderCheck.value = true;
        firstBorderColorCheck.value = true;
        firstColorCheck.value = true;



        //recuperation des données por le chargement 
        var stopSize = false
        if(sizees.value.length >0){
            var index = 0
            var haveDefault = false
            while (index < sizees.value.length && !haveDefault) {
                if(sizees.value[index].isDefault){
                    var sizeData = {
                        label: sizees.value[index].label,
                        width: sizees.value[index].width,
                        height: sizees.value[index].height,
                        // thickness: (sizees.value[index].thickness.active ? sizees.value[index].thickness : {active: false, value: 0}),
                    };
                    var settings = {
                        textNumber: sizees.value[index].textNumber, 
                        charPrice: sizees.value[index].charPrice,
                        basePrice: sizees.value[index].basePrice,
                        maxTextChar: sizees.value[index].maxTextChar,
                        startPriceAtChar: sizees.value[index].startPriceAtChar,
                    }
                    haveDefault = true
                    getSignInfos(sizeData)
                    currentSizeId.value = index
                    break;
                }
                index++;
            }
            if(!haveDefault){
                var sizeData = {
                    label: sizees.value[0].label,
                    width: sizees.value[0].width,
                    height: sizees.value[0].height,
                    // thickness: (sizees.value[0].thickness.active ? sizees.value[0].thickness : {active: false, value: 0}),
                };
                var settings = {
                    textNumber: sizees.value[0].textNumber, 
                    charPrice: sizees.value[0].charPrice,
                    basePrice: sizees.value[0].basePrice,
                    maxTextChar: sizees.value[0].maxTextChar,
                    startPriceAtChar: sizees.value[0].startPriceAtChar,
                }
                getSignInfos(sizeData)
                currentSizeId.value = 0
            }
        }else{
            var size ={
                width: 0,
                height: 0
            }
            changeSize(size)
        }
        if(shapees.value.length >0){
            var matchingShapes = []
            shapees.value.forEach((shapee, id) => {
                allShapes.value.forEach((shape, index) => {
                    if(shapee.shapeId == index){
                        matchingShapes.push({shape, shapee})
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingShapes.length && !haveDefault) {
                if(matchingShapes[index].shapee.isDefault){
                    handleGetShape(matchingShapes[index].shape.value)
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                handleGetShape(matchingShapes[0].shape.value)
            }
        }else{
            handleGetShape('square')
        }

        var stopColor = false
        if(colorrs.value.allColors.length > 0){
            var index = 0
            var haveDefault = false
            while (index < colorrs.value.allColors.length && !haveDefault) {
                if(colorrs.value.allColors[index].isDefault){
                    if(colorrs.value.allColors[index].active){
                        patternActive1.value = true
                        patternActive2.value = true
                        activeSignColorCode1.value = colorrs.value.allColors[index].url
                        activeSignColorCode2.value = colorrs.value.allColors[index].url
                    }else{
                        patternActive1.value = false
                        patternActive2.value = false
                        activeSignColorCode1.value = colorrs.value.allColors[index].codeHex
                        activeSignColorCode2.value = colorrs.value.allColors[index].codeHex
                    }
                    if(colorrs.value.allColors[index].active){
                        colorTextColorName1.value = colorrs.value.allColors[index].name
                        colorTextColorName2.value = colorrs.value.allColors[index].name
                        
                        colorTextCodeHex1.value = colorrs.value.allColors[index].codeHex
                        colorTextCodeHex2.value = colorrs.value.allColors[index].codeHex
                        if(colorrs.value.allColors[index].sameForBorder){
                            colorForBorder1.value = false
                            colorForBorder2.value = false
                        }else{
                            colorForBorder1.value = true
                            colorForBorder2.value = true
                        }
                    }else{
                        colorTextColorName1.value = ''
                        colorTextColorName2.value = ''

                        colorTextCodeHex1.value = ''
                        colorTextCodeHex1.value = ''

                        colorForBorder1.value = true
                        colorForBorder2.value = true
                    }
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                if(colorrs.value.allColors[0].active){
                    patternActive1.value = true
                    patternActive2.value = true
                    activeSignColorCode1.value = colorrs.value.allColors[0].url
                    activeSignColorCode2.value = colorrs.value.allColors[0].url
                }else{
                    patternActive1.value = false
                    patternActive2.value = false
                    activeSignColorCode1.value = colorrs.value.allColors[0].codeHex
                    activeSignColorCode2.value = colorrs.value.allColors[0].codeHex
                }
                if(colorrs.value.allColors[index].active){
                    colorTextColorName1.value = colorrs.value.allColors[0].name
                    colorTextColorName2.value = colorrs.value.allColors[0].name
                    
                    colorTextCodeHex1.value = colorrs.value.allColors[0].codeHex
                    colorTextCodeHex2.value = colorrs.value.allColors[0].codeHex
                    if(colorrs.value.allColors[0].sameForBorder){
                        colorForBorder1.value = false
                        colorForBorder2.value = false
                    }else{
                        colorForBorder1.value = true
                        colorForBorder2.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextColorName2.value = ''

                    colorTextCodeHex1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                    colorForBorder2.value = true
                }
            }
        }else{
            // changeSignColor(color, colorr)
            colorForBorder1.value = true
            colorForBorder2.value = true
        }

        var stopBorder = false
        matchingBorders.value = []
        if(borderrs.value.allBorders.length > 0){
            borderrs.value.allBorders.forEach((borderr, id) => {
                allBorders.value.forEach((border, index) => {
                    if(borderr.manageBorderId == index){
                        matchingBorders.value.push({border, borderr})
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingBorders.value.length && !haveDefault) {
                if(matchingBorders.value[index].borderr.isDefault){
                    // console.log(matchingBorders[index].borderr, "Default")
                    selectBorder(matchingBorders.value[index].border.value, matchingBorders.value[index].borderr.settings, matchingBorders.value[index].borderr.additionalPrice, matchingBorders.value[index].borderr.excludeShapes, matchingBorders.value[index].borderr.excludeSizes, index, true)
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                // console.log("first")
                selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0, true)
            }
        }else{
        }

        var stopColor = false
        if(colorrs.value.allColors.length > 0){
            var index = 0
            var haveDefault = false
            while (index < colorrs.value.allColors.length && !haveDefault) {
                if(colorrs.value.allColors[index].isDefault){
                    // console.log(colorrs.value.allColors[index], "default")
                    changeSignColor(index, colorrs.value.allColors[index].name, colorrs.value.allColors[index].pattern, colorrs.value.allColors[index].textColor, colorrs.value.allColors[index].additionalPrice, true )
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                changeSignColor(0, colorrs.value.allColors[0].name, colorrs.value.allColors[0].pattern, colorrs.value.allColors[0].textColor, colorrs.value.allColors[0].additionalPrice, true )
            }
        }else{
            // changeSignColor(color, colorr)
        }

        // selectedShape.value = shapes.value[0].name
        // handleGetShape(shapes.value[0].name)
        var stopShape = false
        var matchingShapes = []
        if(shapees.value.length >0){
            shapees.value.forEach((shapee, id) => {
                allShapes.value.forEach((shape, index) => {
                    if(shapee.shapeId == index){
                        matchingShapes.push({shape, shapee})
                        // console.log(id, "shapee.shape")
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingShapes.length && !haveDefault) {
                if(matchingShapes[index].shapee.isDefault){
                    selectedShape.value = matchingShapes[index].shape.value
                    currentShapeId.value = index
                    handleGetShape(matchingShapes[index].shape.value)
                    var shapePriceObject = {
                        name: "shape",
                        price: matchingShapes[index].shapee.additionalPrice
                    }
                    getOptionPrice(shapePriceObject)
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                // console.log("first", matchingShapes[0])
                selectedShape.value = matchingShapes[0].shape.value
                currentShapeId.value = 0
                handleGetShape(matchingShapes[0].shape.value)
                var shapePriceObject = {
                    name: "shape",
                    price: matchingShapes[0].shapee.additionalPrice
                }
                getOptionPrice(shapePriceObject)
            }
        }else{
            selectedShape.value = 'square'
            handleGetShape('square')
        }

        var stopFixing = false
        matchingFixings.value = []
        if(fixinggs.value.length > 0){
            fixinggs.value.forEach((fixingg, id) => {
                allFixings.value.forEach((fixing, index) => {
                    if(fixingg.fixingMethodId == index && !fixingg.excludeSizes.includes(currentSizeId) && !fixingg.excludeShapes.includes(currentShapeId)){
                        matchingFixings.value.push({fixing, fixingg})
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingFixings.value.length && !haveDefault) {
                if(matchingFixings.value[index].fixingg.isDefault){
                    handleGetActiveFixing(matchingFixings.value[index].fixing.type)
                    activeFixingMethode.value = matchingFixings.value[index].fixing.type
                    fixingExcludeSizes.value = matchingFixings.value[index].fixingg.excludeSizes
                    fixingExcludeShapes.value = matchingFixings.value[index].fixingg.excludeShapes
                    activeFixingId.value = index

                    var fixingPrice = matchingFixings.value[index].fixingg.additionalPrice
                    var fixingPriceObject = {
                        name: "fixing",
                        price: fixingPrice
                    }
                    getOptionPrice(fixingPriceObject)

                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                handleGetActiveFixing(matchingFixings.value[0].fixing.type)
                activeFixingMethode.value = matchingFixings.value[0].fixing.type
                fixingExcludeSizes.value = matchingFixings.value[0].fixingg.excludeSizes
                fixingExcludeShapes.value = matchingFixings.value[0].fixingg.excludeShapes
                activeFixingId.value = 0

                var fixingPrice = matchingFixings.value[0].fixingg.additionalPrice
                var fixingPriceObject = {
                    name: "fixing",
                    price: fixingPrice
                }
                getOptionPrice(fixingPriceObject)

            }
        }else{
            selectFixingMethode('none')
        }

        var stopSize = false
        var matchingSizes = []
        if(sizees.value.length >0){
            var index = 0
            var haveDefault = false
            while (index < sizees.value.length && !haveDefault) {
                if(sizees.value[index].isDefault){
                    var sizeData = {
                        label: sizees.value[index].label,
                        width: sizees.value[index].width,
                        height: sizees.value[index].height,
                        // thickness: (sizees.value[index].thickness.active ? sizees.value[index].thickness : {active: false, value: 0}),
                    };
                    var settings = {
                        textNumber: sizees.value[index].textNumber, 
                        charPrice: sizees.value[index].charPrice,
                        basePrice: sizees.value[index].basePrice,
                        maxTextChar: sizees.value[index].maxTextChar,
                        startPriceAtChar: sizees.value[index].startPriceAtChar,
                    }
                    changeSize(sizeData, settings, index); 
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                var sizeData = {
                    label: sizees.value[0].label,
                    width: sizees.value[0].width,
                    height: sizees.value[0].height,
                    // thickness: (sizees.value[0].thickness.active ? sizees.value[0].thickness : {active: false, value: 0}),
                };
                var settings = {
                    textNumber: sizees.value[0].textNumber, 
                    charPrice: sizees.value[0].charPrice,
                    basePrice: sizees.value[0].basePrice,
                    maxTextChar: sizees.value[0].maxTextChar,
                    startPriceAtChar: sizees.value[0].startPriceAtChar,
                }
                changeSize(sizeData, settings, 0); 
            }
        }else{
            var size ={
                width: 0,
                height: 0
            }
            changeSize(size)
            if(!customSizeActive.value){
                hideCanvasElements()
            }
        }

        if(additionalComponents.value.length > 0){
            additionalComponents.value.forEach(addOption => {
                let index = 0
                var haveDefault = false

                if(addOption.options.length > 0){
                    while (index < addOption.options.length && !haveDefault) {
                        if(addOption.options[index].isDefault){
                            selectAddComponent(addOption.title, addOption.options[index].title, addOption.options[index].additionalPrice)
                            haveDefault = true
                            break;
                        }
                        index++;
                    }
                    if(!haveDefault){
                        selectAddComponent(addOption.title, addOption.options[0].title, addOption.options[0].additionalPrice)
                    }
                }
            })
        }
        selectAdditionnalsOption()

        if(!firstSetLoad.value){
            saveStep("select of first values")
        }
        handleReadyToSaveState(true, true)
        firstSetLoad.value = true
    }
    function selectAdvanceFirstValue(){
        handleReadyToSaveState(false);
        finalPrices.value = 0

        var stop = false
        var stopDefOption = false
        var stopOption = false

        if(currentMaterial.value.data.length > 0){
            currentMaterial.value.data.forEach(component => {
                if(!stop){
                    advancedComponent.value = component
                    stop = true
                }
            })
            if(advancedComponent.value.options.length > 0){
                advancedComponent.value.options.forEach( (option, index) => {
                    if(!stopDefOption){
                        if(option.isDefault){
                            // console.log('default')
                            selectSignModel(option, index)
                            stopDefOption = true
                        }
                        if(!option.isDefault && stopDefOption && !stopOption){
                            // console.log('first')
                            selectSignModel(option, index)
                            stopDefOption = true
                            stopOption = true
                        }
                    }
                })
            }else{
                hideCanvasElements()
            }
        }else{
            hideCanvasElements()
        }
        selectAdditionnalsOption()
    }
    function selectAdditionnalsOption(){
        //selection des premières custom AdditionnalOptions 
        if(configAdditionnalOptions.value.length != 0){
            var customOptions = configAdditionnalOptions.value
            customOptions.forEach((option, indexx) => {
                switch(option.type){
                    case 'yes/no':
                        if(option.default === 'yes'){
                            addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.inputs.yes, option.price)
                        }else{
                            addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.inputs.no, {type: 'none', value: 0})
                        }
                    break;
                    case 'image-input':
                        addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.options[0].value, option.options[0].price);
                        selectOption(option.options[0].value, option.options[0].price, indexx)
                    break;
                    case 'dropdown':
                        dropdownValue.value = option.options[0] 
                        addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.options[0].value, option.options[0].price);
                        dropdownExampleImg.value = option.options[0].popImg
                        selectOption(option.options[0].value, option.options[0].price, indexx);
                        // dropdownExampleImg.value = option.options[0].popupImg;
                        dropdownIndex.value = indexx
                        // console.log(dropdownExampleImg.value, "Dropdown example", dropdownIndex.value);
                    break;
                }
            });

        }
    }


    function undo() {
        // console.log(stepArray.value.currentStateIndex , "Undo")
        if(stepArray.value.currentStateIndex > 0){
            var options = handleUndo()
            // console.log(options, "Added")
            previousStep()
            addedTexts.value = options.texts
            usedImages.value = options.images
        //     centerSign(canvas)
        // centerSign(canvasBack)
        //         handleReadyToSaveState(false);
        // currentSizeValues.value = handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeData.value.name, currentSizeSetting.value.maxTextChar)
        // handleReadyToSaveState(true);

        }
        
    }
    function redo() {
        var options = handleRedo()
        nextStep()
        addedTexts.value = options.texts
        usedImages.value = options.images
        // centerSign(canvas)
        // centerSign(canvasBack)
        //         handleReadyToSaveState(false);
        // currentSizeValues.value = handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeData.value.name, currentSizeSetting.value.maxTextChar)
        // handleReadyToSaveState(true);
    }
    var resetAllBool = ref(false)
    function confirmResetAll(value){
        resetAllBool.value = value
    }
    var resetType = ref("simple")
    async function clearAll() {
        if(resetType.value == "template"){
            if(templateDatas.value != {}){
                clearStep(true)
                if(templateStatut.value == "making"){
                    await selectTemplate(templateDatas.value, "making")
                }else{
                    await selectTemplate(templateDatas.value)
                }
                checkScreenSize()
            }else{
                handleClearAll()
                clearStep()
            }
        }else if(resetType.value == "simple") {
            handleClearAll()
            clearStep()
        }

        resetAllBool.value = false
    }

    var stepArray = ref({
        states: [],
        currentStateIndex: -1,
        undoStatus: false,
        redoStatus: false,
        undoFinishedStatus: 1,
        redoFinishedStatus: 1,
    })
    function saveStep(position){
        // console.log(position)
        var step = {
            material: {
                name: currentMaterial.value,
                type: materialType.value,
                values: selectedMaterial.value,
                textImage: currentMaterialTextImages.value,
            },
            size: {
                name: currentSizeName.value,
                data: currentSizeData.value,
                values: currentSizeValues.value,
                settings: currentSizeSetting.value,
            },
            shape: selectedShape.value,
            fixingMethod: {
                value: activeFixingMethode.value,
                excludeShapes: fixingExcludeShapes.value,
                excludeSizes: fixingExcludeSizes.value,
            },
            color: {
                textColor: {
                    face1: signTextColor1.value,
                    face2: signTextColor2.value
                },
                colorsObject: colorrs.value,

                face1: {
                    name: activeSignColor.value,
                    codeHex: activeSignColorCode1.value,
                    pattern: patternActive1.value
                },
                face2: {
                    name: activeSignFace2Color.value,
                    codeHex : activeSignColorCode2.value,
                    pattern: patternActive2.value
                },

                firstColorCheck: firstColorCheck.value,
            },
            border: {
                face1: {
                    type: activeFace1Border.value,
                    colorForBorder: colorForBorder1.value,
                    color: activeFace1BorderColor.value,

                    excludeShapes: border1ExcludeShapes.value,
                    excludeSizes: border1ExcludeSizes.value
                },
                face2: {
                    type: activeFace2Border.value,
                    colorForBorder: colorForBorder2.value,
                    color: activeFace2BorderColor.value,

                    excludeShapes: border2ExcludeShapes.value,
                    excludeSizes: border2ExcludeSizes.value
                },
            },
            texts: [...addedTexts.value],
            images: [...usedImages.value],
            price: finalPrices.value,
        }
        // console.log(usedImages.value, "usedImages")
        if(stepArray.value.currentStateIndex < stepArray.value.states.length-1){
            var indexToBeInserted = stepArray.value.currentStateIndex+1;
            stepArray.value.states[indexToBeInserted] = step;
            var numberOfElementsToRetain = indexToBeInserted+1;
            stepArray.value.states = stepArray.value.states.splice(0,numberOfElementsToRetain);
        }else{
            stepArray.value.states.push(step);
        }
        stepArray.value.currentStateIndex = stepArray.value.states.length-1;
        if((stepArray.value.currentStateIndex == stepArray.value.states.length-1) && stepArray.value.currentStateIndex != -1){
            // stepArray.value.redoButton.disabled= "disabled";
        }

        // console.log(stepArray.value.states.length, "states INDEX")
        // console.log(stepArray.value.currentStateIndex, "state index")
    }
    function previousStep(){
        handleReadyToSaveState(false);

        if(stepArray.value.undoFinishedStatus){
            if(stepArray.value.currentStateIndex == -1){
                stepArray.value.undoStatus = false;
            }
            else{
                if (stepArray.value.states.length >= 1) {
                    stepArray.value.undoFinishedStatus = 0;
                    if(stepArray.value.currentStateIndex != 0){
                        stepArray.value.undoStatus = true;
    
                        var currentStep = stepArray.value.states[stepArray.value.currentStateIndex-1]
                        // console.log(stepArray.value.states[stepArray.value.currentStateIndex-1].images, "all states")
                        currentMaterial.value = currentStep.material.name
                        materialType.value = currentStep.material.type
                        selectedMaterial.value = currentStep.material.values
                        currentMaterialTextImages.value = currentStep.material.textImage

                        selectedShape.value = currentStep.shape
                        handleGetShape(selectedShape.value)

                        activeFixingMethode.value = currentStep.fixingMethod.value
                        fixingExcludeShapes.value = currentStep.fixingMethod.excludeShapes
                        fixingExcludeSizes.value = currentStep.fixingMethod.excludeSizes
                        handleSelectFixingMethode(activeFixingMethode.value)

                        currentSizeName.value = currentStep.size.name
                        currentSizeData.value = currentStep.size.data
                        currentSizeValues.value = currentStep.size.values
                        // handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeName.value, currentSizeValues.value.maxTextChar)
                        
                        signTextColor1.value = currentStep.color.textColor.face1
                        signTextColor2.value = currentStep.color.textColor.face2
                        colorrs.value = currentStep.color.colorsObject
                        activeSignColor.value = currentStep.color.face1.name
                        activeSignColorCode1.value = currentStep.color.face1.codeHex
                        patternActive1.value = currentStep.color.face1.pattern
                        activeSignFace2Color.value = currentStep.color.face2.name
                        activeSignColorCode2.value = currentStep.color.face2.codeHex
                        patternActive2.value = currentStep.color.face2.pattern

                        firstColorCheck.value = currentStep.color.firstColorCheck

                        if(materialType.value === 'advance'){
                            setImageToSignBackground(activeSignColorCode1.value, activeSignColor.value)
                        }else{
                            if(activeFace.value === 'front-face' && patternActive1.value){
                                setPattern(canvas, activeSignColorCode1.value)
                            }
                            if(activeFace.value === 'back-face' && patternActive2.value){
                                setPattern(canvasBack, activeSignColorCode2.value)
                            }
                        }
    
                        activeFace1Border.value = currentStep.border.face1.type
                        activeFace1BorderColor.value = currentStep.border.face1.color
                        border1ExcludeShapes.value = currentStep.border.face1.excludeShapes
                        border1ExcludeSizes.value = currentStep.border.face1.excludeSizes
    
                        activeFace2Border.value = currentStep.border.face2.type
                        activeFace2BorderColor.value = currentStep.border.face2.color
                        border2ExcludeShapes.value = currentStep.border.face2.excludeShapes
                        border2ExcludeSizes.value = currentStep.border.face2.excludeSizes
    
                        // if(materialType.value === 'simple'){
                        //     if(signTextColor1.value.active && signTextColor1.value.sameForBorder){

                        //     }else{
                        //         if(activeFace.value === 'front-face'){
                        //             handleSelectBorder(activeFace1Border.value)
                        //             if(activeFace1Border.value !== 'none'){
                        //                 handlechangeBorderColor(activeFace1BorderColor.value)
                        //             }
                        //         }else{
                        //             handleSelectBorder(activeFace2Border.value)
                        //             if(activeFace2Border.value !== 'none'){
                        //                 handlechangeBorderColor(activeFace2BorderColor.value)
                        //             }
                        //         }
                        //     }
                        // }
    
                        finalPrices.value = currentStep.price
    
                        stepArray.value.undoStatus = false;
                        stepArray.value.currentStateIndex -= 1;
                        // stepArray.value.undoButton.removeAttribute("disabled");
                        if(stepArray.value.currentStateIndex !== stepArray.value.states.length-1){
                            // stepArray.value.redoButton.removeAttribute('disabled');
                        }
                        stepArray.value.undoFinishedStatus = 1;
                    }
                    else if(stepArray.value.currentStateIndex == 0){
                        var currentStep = stepArray.value.states[0]

                        currentMaterial.value = currentStep.material.name
                        materialType.value = currentStep.material.type
                        selectedMaterial.value = currentStep.material.values
                        currentMaterialTextImages.value = currentStep.material.textImage

                        selectedShape.value = currentStep.shape
                        handleGetShape(selectedShape.value)

                        activeFixingMethode.value = currentStep.fixingMethod.value
                        fixingExcludeShapes.value = currentStep.fixingMethod.excludeShapes
                        fixingExcludeSizes.value = currentStep.fixingMethod.excludeSizes
                        handleSelectFixingMethode(activeFixingMethode.value)

                        currentSizeName.value = currentStep.size.name
                        currentSizeData.value = currentStep.size.data
                        currentSizeValues.value = currentStep.size.values
                        // handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeName.value, currentSizeValues.value.maxTextChar)
                        
                        signTextColor1.value = currentStep.color.textColor.face1
                        signTextColor2.value = currentStep.color.textColor.face2
                        colorrs.value = currentStep.color.colorsObject
                        activeSignColor.value = currentStep.color.face1.name
                        activeSignColorCode1.value = currentStep.color.face1.codeHex
                        patternActive1.value = currentStep.color.face1.pattern
                        activeSignFace2Color.value = currentStep.color.face2.name
                        activeSignColorCode2.value = currentStep.color.face2.codeHex
                        patternActive2.value = currentStep.color.face2.pattern

                        firstColorCheck.value = currentStep.color.firstColorCheck

                        if(materialType.value === 'advance'){
                            setImageToSignBackground(activeSignColorCode1.value, activeSignColor.value)
                        }else{
                            if(activeFace.value === 'front-face' && patternActive1.value){
                                setPattern(canvas, activeSignColorCode1.value)
                            }
                            if(activeFace.value === 'back-face' && patternActive2.value){
                                setPattern(canvasBack, activeSignColorCode2.value)
                            }
                        }
    
                        activeFace1Border.value = currentStep.border.face1.type
                        activeFace1BorderColor.value = currentStep.border.face1.color
                        border1ExcludeShapes.value = currentStep.border.face1.excludeShapes
                        border1ExcludeSizes.value = currentStep.border.face1.excludeSizes
    
                        activeFace2Border.value = currentStep.border.face2.type
                        activeFace2BorderColor.value = currentStep.border.face2.color
                        border2ExcludeShapes.value = currentStep.border.face2.excludeShapes
                        border2ExcludeSizes.value = currentStep.border.face2.excludeSizes
    
                        // console.log(currentStep.images, "added")
    
                        finalPrices.value = currentStep.price
    
                        stepArray.value.undoFinishedStatus = 1;
                        // stepArray.value.undoButton.disabled= "disabled";
                        // stepArray.value.redoButton.removeAttribute('disabled');
                        stepArray.value.currentStateIndex -= 1;
                    }
                }
            }
            handleReadyToSaveState(true);
        }
        simulateCanvasClick()
    }
    function nextStep(){
        handleReadyToSaveState(false);

        if(stepArray.value.redoFinishedStatus){
            if((stepArray.value.currentStateIndex == stepArray.value.states.length-1) && stepArray.value.currentStateIndex != -1){
                // stepArray.value.redoButton.disabled= "disabled";
            }else{
                if (stepArray.value.states.length > stepArray.value.currentStateIndex && stepArray.value.states.length != 0){
                    // console.log("stepArray.value")
                    stepArray.value.redoFinishedStatus = 0;
                    stepArray.value.redoStatus = true;

                    var currentStep = stepArray.value.states[stepArray.value.currentStateIndex+1]

                    currentMaterial.value = currentStep.material.name
                    materialType.value = currentStep.material.type
                    selectedMaterial.value = currentStep.material.values
                    currentMaterialTextImages.value = currentStep.material.textImage

                    selectedShape.value = currentStep.shape
                    handleGetShape(selectedShape.value)

                    activeFixingMethode.value = currentStep.fixingMethod.value
                    fixingExcludeShapes.value = currentStep.fixingMethod.excludeShapes
                    fixingExcludeSizes.value = currentStep.fixingMethod.excludeSizes
                    handleSelectFixingMethode(activeFixingMethode.value)

                    currentSizeName.value = currentStep.size.name
                    currentSizeData.value = currentStep.size.data
                    currentSizeValues.value = currentStep.size.values
                    // handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeName.value, currentSizeValues.value.maxTextChar)
                    
                    signTextColor1.value = currentStep.color.textColor.face1
                    signTextColor2.value = currentStep.color.textColor.face2
                    colorrs.value = currentStep.color.colorsObject
                    activeSignColor.value = currentStep.color.face1.name
                    activeSignColorCode1.value = currentStep.color.face1.codeHex
                    patternActive1.value = currentStep.color.face1.pattern
                    activeSignFace2Color.value = currentStep.color.face2.name
                    activeSignColorCode2.value = currentStep.color.face2.codeHex
                    patternActive2.value = currentStep.color.face2.pattern

                    firstColorCheck.value = currentStep.color.firstColorCheck

                    if(materialType.value === 'advance'){
                        setImageToSignBackground(activeSignColorCode1.value, activeSignColor.value)
                    }else{
                        if(activeFace.value === 'front-face' && patternActive1.value){
                            setPattern(canvas, activeSignColorCode1.value)
                        }
                        if(activeFace.value === 'back-face' && patternActive2.value){
                            setPattern(canvasBack, activeSignColorCode2.value)
                        }
                    }

                    activeFace1Border.value = currentStep.border.face1.type
                    activeFace1BorderColor.value = currentStep.border.face1.color
                    border1ExcludeShapes.value = currentStep.border.face1.excludeShapes
                    border1ExcludeSizes.value = currentStep.border.face1.excludeSizes

                    activeFace2Border.value = currentStep.border.face2.type
                    activeFace2BorderColor.value = currentStep.border.face2.color
                    border2ExcludeShapes.value = currentStep.border.face2.excludeShapes
                    border2ExcludeSizes.value = currentStep.border.face2.excludeSizes

                    // if(materialType.value === 'simple'){
                    //     if(activeFace.value === 'front-face'){
                    //         if(signTextColor1.value.active && signTextColor1.value.sameForBorder){
                    //             if(activeFace1Border.value !== 'none'){
                    //                 handleSelectBorder(activeFace1Border.value)
                    //                 handlechangeBorderColor(signTextColor1.value.codeHex)
                    //             }
                    //         }else{
                    //             handleSelectBorder(activeFace1Border.value)
                    //             if(activeFace1Border.value !== 'none'){
                    //                 handlechangeBorderColor(activeFace1BorderColor.value)
                    //             }
                    //         }

                    //     }else{
                    //         if(signTextColor2.value.active && signTextColor2.value.sameForBorder){
                    //             if(activeFace2Border.value !== 'none'){
                    //                 handleSelectBorder(activeFace2Border.value)
                    //                 handlechangeBorderColor(signTextColor2.value.codeHex)
                    //             }
                    //         }else{
                    //             handleSelectBorder(activeFace2Border.value)
                    //             if(activeFace2Border.value !== 'none'){
                    //                 handlechangeBorderColor(activeFace2BorderColor.value)
                    //             }
                    //         }
                    //     }
                    // }
                    

                    finalPrices.value = currentStep.price

                    stepArray.value.redoStatus = false;
                    stepArray.value.currentStateIndex += 1;
                    if(stepArray.value.currentStateIndex != -1){
                        // stepArray.value.undoButton.removeAttribute('disabled');
                    }
                    stepArray.value.redoFinishedStatus = 1;
                    if((stepArray.value.currentStateIndex == stepArray.value.states.length-1) && stepArray.value.currentStateIndex != -1){
                    //   stepArray.value.redoButton.disabled= "disabled";
                    }
                }
            }
            handleReadyToSaveState(true);
        }
        simulateCanvasClick()
    }
    function clearStep(){
        // currentSizeName.value = stepArray.value.states[0].size.name
        // currentSizeValues.value = stepArray.value.states[0].size.values


        addedTexts.value = []
        usedImages.value = []

        // finalPrices.value = stepArray.value.states[0].price

        stepArray.value.states = []
        stepArray.value.currentStateIndex = -1
        stepArray.value.undoFinishedStatus = 1;
        firstSetLoad.value = false
        if(props.config.data.materials.length > 0){
            selectMaterial(props.config.data.materials[0], 0)
        }
    }


    var flipped = ref(false)
    var activeFace = ref('front-face')
    function flipRect() {
        var flipper = document.getElementById('asowp-canvas-containers')
        var signFace = document.getElementById('asowp-sign-recto')
        var signBack = document.getElementById('asowp-sign-verso')
        if(!flipped.value){
            flipper.classList.add('flipper-switch')
            handleCheckActiveSignFace('back')
            activeFace.value = 'back-face'
            activeCanvas = canvasBack
            canvas.discardActiveObject();
        }else{
            flipper.classList.remove('flipper-switch')
            handleCheckActiveSignFace('front')
            activeFace.value = 'front-face'
            activeCanvas = canvas
            canvasBack.discardActiveObject();
        }
        flipped.value = !flipped.value
    }


    function centerAndZoomAfterResize(canva, targetZoom, newWidth, newHeight) {
        // console.log(targetZoom, "zoom")
        // 1. Désactiver temporairement le rendu
        canva.renderOnAddRemove = false;
        
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
        });

        // 7. Réactiver le rendu et forcer le refresh
        canva.renderOnAddRemove = true;
        canva.calcOffset();
        canva.renderAll();

        // Vérification visuelle (debug)
        const finalPos = safeObject.getCenterPoint();
        // console.log("Centrage réussi:", 
        //     Math.round(finalPos.x) === Math.round(canvasCenter.x) && 
        //     Math.round(finalPos.y) === Math.round(canvasCenter.y),
        //     `Objet: (${Math.round(finalPos.x)},${Math.round(finalPos.y)}) | Canvas: (${Math.round(canvasCenter.x)},${Math.round(canvasCenter.y)})`
        // );
    }
    function checkScreenSize(width, height, fillFactor){
        handleReadyToSaveState(false);

        var canvasContainer = document.getElementById("asowp-canvas-containers")
        if(width){
            var canvasWidth = width;
            var canvasHeight = height;
        }else{
            var canvasWidth = canvasContainer.clientWidth;
            var canvasHeight = canvasContainer.clientHeight;
        }        // console.log(canvasWidth, canvasHeight, "canvas", canvasContainer)

        let windowRatio = canvasWidth / canvasHeight;
        let targetRatio = 16/9;


        let scaleRatio;
        if (windowRatio > targetRatio) {
            scaleRatio = canvasHeight / (canvasWidth / targetRatio);
            var hValue = handleGetObjectByName('height-value')
            var wValue = handleGetObjectByName('width-value')
            var tValue = handleGetObjectByName('thickness-value')
            var fontSize = (hValue.fontSize / targetRatio) + 10
            // hValue.fontSize = fontSize
            // wValue.fontSize = fontSize
            // tValue.fontSize = fontSize
            // console.log("==1==", scaleRatio, "==1==")
        } else {
            scaleRatio = canvasWidth / (canvasHeight * targetRatio) - 0.15;
            var hValue = handleGetObjectByName('height-value')
            var wValue = handleGetObjectByName('width-value')
            var tValue = handleGetObjectByName('thickness-value')
            var fontSize = (hValue.fontSize * targetRatio) + 10
            // hValue.fontSize = fontSize
            // wValue.fontSize = fontSize
            // tValue.fontSize = fontSize
            // console.log("==2==", scaleRatio, "==2==")
        }

        if(fillFactor && fillFactor != 0){
            scaleRatio = scaleRatio * fillFactor
            // let newScaleRatio = scaleRatio * fillFactor
            console.log(scaleRatio, "zoom before render", fillFactor)
        }

        centerAndZoomAfterResize(canvas, scaleRatio, canvasWidth, canvasHeight)
        centerAndZoomAfterResize(canvasBack, scaleRatio, canvasWidth, canvasHeight)

        

        currentSizeValues.value = handleGetSignPosition()
        handleReadyToSaveState(true);

        simulateCanvasClick()
    }
    function simulateCanvasClick(){
        activeCanvas.fire('mouse:down', {
            e: new MouseEvent('click', { clientX: 100, clientY: 100 }), // Coordonnées du clic
            pointer: { x: 100, y: 100 }, // Position du clic
        });
    }
    function getCanvasCenter() {
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const viewportTransform = canvas.viewportTransform;

        // Coordonnées du centre du canvas avant la transformation de viewport
        const untransformedCenter = {
            x: canvasWidth / 2,
            y: canvasHeight / 2
        };

        // Appliquer la transformation de viewport inverse aux coordonnées du centre
        const invertedTransform = fabric.util.invertTransform(viewportTransform);
        const transformedCenter = fabric.util.transformPoint(untransformedCenter, invertedTransform);

        return transformedCenter;
    }
    function centerSign(canva){
        var sign = handleGetObjectByName('safeObject', canva)
        var canvasCenter = getCanvasCenter()
        const allObjects = canva.getObjects();
        var zoom = canva.getZoom()

        if (allObjects.length > 0) {
            const group = new fabric.Group(allObjects);
            canva.discardActiveObject();

            var newRectLeft = canvasCenter.x - sign.width / 2;
            var newRectTop = canvasCenter.y - sign.height / 2;

            var hLine = handleGetObjectByName('heightLine', canva)
            var hValue = handleGetObjectByName('height-value', canva)

            var wLine = handleGetObjectByName('widthtLine', canva)
            var wValue = handleGetObjectByName('width-value', canva)

            var wDiff = group.width - (sign.width + 55 + hValue.height - 15)
            var hDiff = group.height - (sign.height + 65 + wValue.height)


            // Centrer le groupe
            group.set('left', newRectLeft - wDiff)
            group.set('top', newRectTop - hDiff)

            group.setCoords();

            currentSizeValues.value.left = canvasCenter.x - sign.width/2
            currentSizeValues.value.top = canvasCenter.y - sign.height/2
            handleGetNewPosition(canvasCenter.x - sign.width/2, canvasCenter.y - sign.height/2)


            // Dégrouper les objets
            group._restoreObjectsState();
            canva.remove(group);
            canva.getObjects().forEach((obj) => {
                if(obj.name === 'asowp-signText'){
                    if(obj.isEditing){
                        obj.exitEditing();
                    }
                    obj.clipPath = handleClipAddedObject(canva);

                }
                if (obj.name === 'asowp-SignImage') {
                    obj.clipPath = handleClipAddedObject(canva);
                }
                obj.setCoords()
            })
        }
        canva.renderAll()
    }  
    // function centerSign(canva){
    //     var sign = handleGetObjectByName('safeObject', canva)
    //     var canvasCenter = getCanvasCenter()
    //     const allObjects = canva.getObjects();

    //     if (allObjects.length > 0) {
    //         const group = new fabric.Group(allObjects);
    //         canva.discardActiveObject();

    //         // Centrer le groupe
    //         group.set('left', canvasCenter.x - sign.width/2)
    //         group.set('top', canvasCenter.y - sign.height/2)

    //         group.setCoords();

    //         currentSizeValues.value.left = canvasCenter.x - sign.width/2
    //         currentSizeValues.value.top = canvasCenter.y - sign.height/2
    //         handleGetNewPosition(canvasCenter.x - sign.width/2, canvasCenter.y - sign.height/2)


    //         // Dégrouper les objets
    //         group._restoreObjectsState();
    //         canva.remove(group);
    //         canva.getObjects().forEach((obj) => {
    //             if(obj.name === 'asowp-signText'){
    //                 if(obj.isEditing){
    //                     obj.exitEditing();
    //                 }
    //                 obj.clipPath = handleClipAddedObject(canva);

    //             }
    //             if (obj.name === 'asowp-SignImage') {
    //                 obj.clipPath = handleClipAddedObject(canva);
    //             }
    //             obj.setCoords()
    //         })
    //     }
    //     canva.renderAll()
    // }  
    

    var angleActive = ref(false)
    function showObjectValues(){
        var div = document.getElementById('activeObject-values');
        var object = activeCanvas.getActiveObject();
        if(object.type == 'image'){
            angleActive.value = true
            // showOptions('image')
            // editAddedImage(object)
        }
        div.classList.remove("asowp-invisible");
        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)

        if(route.name == 'template-maker'){
            checkTemplateObjectLockMoving(object)
            showTempSettings.value = true;
        }
        // if(object.type === 'i-text'){
        //     showOptions('text')
        //     getTextObject(object)
        // }

    }
    function closeObjectValues(){
        var div = document.getElementById('activeObject-values');
        div.classList.add("asowp-invisible");
        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)

        // if(route.name == 'template-maker'){
            showTempSettings.value = false;
        // }
    }

    var allMaterials = ref([])
    var customSizeActive = ref(false)
    var currentMaterial = ref({})
    var currentMaterialId = ref(0)
    var currentMaterialTextImages = ref({})
    var selectedMaterial = ref('')
    var materialType = ref('')
    var firstLoad = ref(false)
    function selectMaterial(material, id){
        // console.log(material, "selected material")

        currentMaterial.value = material
        currentMaterialId.value = id
        currentMaterialTextImages.value = material.data.textImages
        materialType.value = material.type
        // console.log("selectMaterial", material)
        selectedMaterial.value = material.name

        if(material.type == 'simple'){
            if(material.data.sizes.allSizes){
                sizees.value = material.data.sizes.allSizes
                thicknesss.value = material.data.sizes.thickness
            }else{
                sizees.value = []
            }
            if(material.data.sizes.customSize){
                customSizes.value = material.data.sizes.customSize
                customSizeActive.value = material.data.sizes.customSize.active
            }
            // if(material.data.sizes.customSize){
            // }
            if(customSizeActive.value){
                // console.log("custom size", customSizes.value)
                customSizeValues.value.width = customSizes.value.width.min
                customSizeValues.value.height = customSizes.value.height.min
            }


            shapees.value = material.data.shapes
            fixinggs.value = material.data.fixingMethods
            colorrs.value = material.data.colors
            borderrs.value = material.data.borders
            additionalComponents.value = material.data.additionalOptions
            addComponentSelected.value = []

            if(firstLoad.value){
                selectSimpleFirstValue()
            }
        }

        var stop = false
        var stopDefOption = false
        var stopOption = false
        if(material.type == 'advance'){
            // currentMaterial.value.data.forEach(component => {
            //     if(!stop){
            //         showOptions('component', component)
            //         stop = true
            //     }
            // })
            // advancedComponent.value.options.forEach( option => {
            //     if(!stopDefOption){
            //         if(option.isDefault){
            //             console.log('default')
            //             selectSignModel(option)
            //             stopDefOption = true
            //         }
            //         if(!option.isDefault && stopDefOption && !stopOption){
            //             console.log('first')
            //             selectSignModel(option)
            //             stopDefOption = true
            //             stopOption = true
            //         }
            //     }
            // })
            if(firstLoad.value){
                selectAdvanceFirstValue()
            }
        }

        firstLoad.value = true
    }

    var activeSignModel = ref()
    var activeSignModelName = ref('')
    var activeSignModelId = ref(0)
    function selectSignModel(model, id){
        handleReadyToSaveState(false);

        firstSetLoad.value = false

        activeSignModel.value = model
        activeSignModelName.value = model.name
        activeSignModelId.value = id

        handleSelectBorder('none')
        var borderPrice1Object = {
            name: "border1",
            price: 0
        }
        getOptionPrice(borderPrice1Object)

        var borderPrice2Object = {
            name: "border2",
            price: 0
        }
        getOptionPrice(borderPrice2Object)

        // selection de fixing
        var stopFixing = false
        fixinggs.value = model.fixingMethods
        // console.log(model.fixingMethods,"fixing materail advance")
        fixinggs.value.forEach(fixingId => {
            allFixings.value.forEach((fixing, index) => {
                if(fixingId == index && !stopFixing){
                    // selectFixingMethode(fixing.type)
                    activeFixingMethode.value = fixing.type
                    stopFixing = true
                }
            });
        });

        // selection du shape 
        allShapes.value.forEach((shape, index) => {
            if(model.shapeId == index ){
                selectedShape.value = shape.value
                handleGetShape(shape.value,  activeFixingMethode.value)
            }
        })

        // selection de la size
        var modelSize = {
            name: model.name,
            width: model.size.width,
            height: model.size.height
        }
        var modelSizeSetting = {
            basePrice: model.size.basePrice,
            charPrice: model.size.charPrice,
            maxTextChar: model.size.maxTextChar,
            startPriceAtChar: model.size.startPriceAtChar,
        }
        changeSize(modelSize, modelSizeSetting)
        currentThickValue.value = -99
        handleChangeThickness(false, 0)

        //selection de la couleur
        setImageToSignBackground(model.image, model.color.name)
        if(configDoublePart.value.active){
            activeSignColor.value = model.color.name
            activeSignColorCode1.value = model.image
            
            activeSignFace2Color.value = model.color.name
             activeSignColorCode2.value = model.image
        }else{
            activeSignColor.value = model.color.name
            activeSignColorCode1.value = model.image
        }

        // selection de la couleur
        colorrs.value = [{color: model.color, image: model.image}]
        firstColorCheck.value = true

        var modelPrice = model.additionalPrice
        var modelPriceObject = {
            name: "model",
            price: modelPrice
        }
        getOptionPrice(modelPriceObject)

        // if(firstSetLoad.value){
        // }
        saveStep('select model')
        handleReadyToSaveState(true, true);
    }


    function setImageToSignBackground(image, colorName){
        activeSignColor.value = colorName
        activeSignColorCode1.value = image
        patternActive1.value = true

        activeSignFace2Color.value = colorName
        activeSignColorCode2.value = image
        patternActive2.value = true
        handleSetImageToSignBackground(image);
        // console.log("setImageToSign")
    }



    var customSizeValues = ref({
        label: '',
        width: 0,
        height: 0
    })
    var customSizeTextValues = ref({
        textNumber: 0, 
        charPrice: 0, 
        basePrice: 0, 
        maxTextChar: -1, 
        startPriceAtChar: 1
    })


    var sizeRatio = ref('big')
    var fixScale = ref(0)
    var signRatio = ref(0)
    var ratioScale = ref(0)


    function editObject(){
        var currentObject = activeCanvas.getActiveObject()
        if(currentObject !== undefined){
            if(currentObject !== null){
                if(currentObject.name === 'asowp-SignText'){
                    showOptions('text')
                    getTextObject(currentObject, true)
                }
                if(currentObject.name === 'asowp-SignImage'){
                    showOptions('image')
                    editAddedImage(currentObject)
                }
            }
        }
    }
    function deleteObject(){
        // console.log(activeCanvas.getActiveObject())
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                // addedTexts.value = handleDeleteObject(object)
                if(object.name == "asowp-SignText"){
                    addedTexts.value = handleDeleteObject(object)
                    selectText.value = false
                    // console.log(addedTexts.value)
        
                    textsPrices.value = handleSetPrice()
                    var priceObject = {
                        name: 'none',
                        price: 0
                    }
                    getOptionPrice(priceObject)
                }
                if(object.name == 'asowp-SignImage'){
                    usedImages.value = handleDeleteObject(object)
                    // selectText.value = false
                    // console.log(usedImages.value, 'image')
                    // console.log(optionsPrices.value, "before")
        
                    var index = 0
                    while(index < optionsPrices.value.length){
                        if(optionsPrices.value[index].type === 'image'){
                            const exists = usedImages.value.some(image => image.object.priceId === optionsPrices.value[index].id);
                            if(!exists){
                                optionsPrices.value.splice(index, 1)
                            }
                        }
                        index ++
                    }
                    var priceObject = {
                        name: 'none',
                        price: 0
                    }
                    getOptionPrice(priceObject)
                }

                if(firstSetLoad.value){
                    saveStep('clone object')
                }
            }
        }
    }
    function cloneObject(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                newImagePriceId.value = newImagePriceId.value + 1
                var object = activeCanvas.getActiveObject();
                if(object.name === 'asowp-SignText'){
                    handleCloneObject(object)
                    saveStep('clonage du text');
                }
                textsPrices.value = handleSetPrice()
        
                var stop = false
                if(object.name === 'asowp-SignImage'){
                    optionsPrices.value.forEach(element => {
                        if(element.type){
                            var objectUrl = (object.objectType === "svg" ? object.imageUrl : object.getSrc())
                            // console.log(objectUrl)
                            if(objectUrl === element.name && !stop){
                                // console.log(element, "qsdqsdqsdqsd")
                                var imagePriceObject = {
                                    id: newImagePriceId.value,
                                    name: element.name,
                                    type: 'image',
                                    price: element.price
                                }
                                getOptionPrice(imagePriceObject) 
                                stop = true
                            }
                        }
                    });
        
                    usedImages.value = handleCloneObject(object, newImagePriceId.value)
                    // console.log(usedImages.value)
                }
                var priceObject = {
                    name: 'none',
                    price: 0
                }
                getOptionPrice(priceObject)

                // if(firstSetLoad.value){
                //     saveStep('clone object')
                // }
            }
        }
    }
    function centerHorizontally(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                handleCenterHorizontally(object)
            }
        }
    }
    function centerVertically(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                handleCenterVertically(object)
            }
        }
    }

    function moveObject(to){
        handleMoveobject(to)
    }

    var objectLockMoving = ref({
        x: false,
        y: false,
    })
    function lockMoving(axe){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                objectLockMoving.value = handleLockMoving(object, axe)
                checkTemplateObjectLockMoving(object)
            }
        }
    }
    var lockingXobject = ref(false)
    var lockingYobject = ref(false)
    function checkTemplateObjectLockMoving(object){
        // console.log("Checking", object)
        objectLockMoving.value = object.lockMoving
        if(objectLockMoving.value.x === true){
            lockingXobject.value = true
        }else{
            lockingXobject.value = false
        }
        if(objectLockMoving.value.y === true){
            lockingYobject.value = true
        }else{
            lockingYobject.value = false
        }

        lockObjectScale.value = object.lockScale
        lockObjectRotation.value = object.lockRotation
        lockObjectEdition.value = object.lockEdition
    }
    var lockObjectScale = ref(false)
    function lockScaling(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                lockObjectScale.value = handleLockScaling(object)
                checkTemplateObjectLockMoving(object)
            }
        }
    }
    var lockObjectRotation = ref(false)
    function lockRotation(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                lockObjectRotation.value = handleLockRotating(object)
                checkTemplateObjectLockMoving(object)
            }
        }
    }
    var lockObjectEdition = ref(false)
    function lockEdition(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                if(object.type === 'i-text'){
                    lockObjectEdition.value = handleLockEdition(object)
                    checkTemplateObjectLockMoving(object)
                }
            }
        }
    }


    var sizees = ref([])
    var thicknesss = ref([])
    var customSizes = ref({})
    var allSizes = ref({})
    var currentSizeName = ref('')
    var currentSizeData = ref({})
    var currentSize = ref('')
    var currentSizeId = ref(0)
    var currentSizeValues = ref({})
    var currentSizeSetting = ref({})
    var currentSizeThickness = ref(false)
    function changeSize(sizeData, sizeSetting, sizeId) {
        currentSizeData.value = sizeData
        // console.log(sizeData, sizeSetting, "change size")
        if(sizeId != undefined){
            currentSizeId.value = sizeId
        }

        if(sizeSetting){
            currentSizeSetting.value = sizeSetting
            textNumberForSize.value = sizeSetting.textNumber
            currentSizeValues.value = handleChangeSize(sizeData.width, sizeData.height, sizeData.name, sizeSetting.maxTextChar)
            maxTextCharForSize.value = sizeSetting.maxTextChar
            // console.log(currentSizeValues.value, "1")
        }else{
            currentSizeSetting.value = {}
            currentSizeValues.value = handleChangeSize(sizeData.width, sizeData.height, sizeData.name, -1)
            maxTextCharForSize.value = -1
        }

        currentSizeName.value = sizeData.label;
        if(thicknesss.value.active){
            currentSizeThickness.value = thicknesss.value.active
            selectSizeThickness(thicknesss.value.values[0])
            handleChangeThickness(thicknesss.value.active, thicknesss.value.values[0])

        }else{
            handleChangeThickness(thicknesss.value.active, 0)
        }

        addedTexts.value = currentSizeValues.value.texts

        if(sizeSetting){
            var sizeBasePrice = sizeSetting.basePrice
            handleGetCharPrice(sizeSetting.charPrice, sizeSetting.startPriceAtChar)
            var sizeBasePriceObject = {
                name: "sizeTextBase",
                price: sizeBasePrice
            }
            getOptionPrice(sizeBasePriceObject)
        }

        if(sizeId != undefined){
            // desactivation du fixingMethode si il n'est pas actif pour la size selectionné
            if(matchingFixings.value.length > 0){
                if(fixingExcludeSizes.value.includes(sizeId)){
                    // if(activeFixingId.value == matchingFixings.value.length-1){
                    //     selectFixingMethode(matchingFixings.value[0].fixing.type, matchingFixings.value[0].fixingg, 0)
                    // }
                    // selectFixingMethode(matchingFixings.value[activeFixingId.value+1].fixing.type, matchingFixings.value[activeFixingId.value+1].fixingg, activeFixingId.value+1)
                    selectFixingMethode('none')
                    var fixingPriceObject = {
                        name: "fixing",
                        price: 0
                    }
                    getOptionPrice(fixingPriceObject)
                }
            }

            // desactivation du border si il n'est pas actif pour la size selectionné
            if(activeFace.value == 'front-face'){
                if(border1ExcludeSizes.value.includes(sizeId)){
                    // if(face1BorderId.value === matchingBorders.value.length-1){
                    //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                    // }
                    // selectBorder(matchingBorders.value[face1BorderId.value+1].border.value, matchingBorders.value[face1BorderId.value+1].borderr.settings, matchingBorders.value[face1BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face1BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face1BorderId.value+1].borderr.excludeSizes, face1BorderId.value+1)
                    selectBorder('none')
                    var borderPrice1Object = {
                        name: "border1",
                        price: 0
                    }
                    getOptionPrice(borderPrice1Object)
                }
            }
            if(activeFace.value == 'back-face'){
                if(border2ExcludeSizes.value.includes(sizeId)){
                    // if(face2BorderId.value === matchingBorders.value.length-1){
                    //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                    // }
                    // selectBorder(matchingBorders.value[face2BorderId.value+1].border.value, matchingBorders.value[face2BorderId.value+1].borderr.settings, matchingBorders.value[face2BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face2BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face2BorderId.value+1].borderr.excludeSizes, face2BorderId.value+1)
                    selectBorder('none')
                    var borderPrice2Object = {
                        name: "border2",
                        price: 0
                    }
                    getOptionPrice(borderPrice2Object)
                }
            }
        }

        if(firstSetLoad.value){
            saveStep('select size')
        }

        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)

        // let timer;
        // clearTimeout(timer);
        // timer = setTimeout(() => {
        //     centerSign(canvas)
        //     centerSign(canvasBack)
        // }, 50);
        // simulateCanvasClick()
    }

    function selectCustomSize(customSize){
        // console.log(customSize, "custom size")
        function checkInterval(pricings, value){
            let settings = pricings[0];
            for (let i = 0; i < pricings.length; i++) {
                if (value <= (pricings[i].surface * pricings[i].surface)) {
                    settings = pricings[i];
                    break;
                }
                settings = pricings[i];
            }
            return settings;   
        }

        if((customSizeValues.value.width >= customSize.width.min && customSizeValues.value.width <= customSize.width.max) && (customSizeValues.value.height >= customSize.height.min && customSizeValues.value.height <= customSize.height.max)){
            if(customSize.pricings && customSize.pricings.length > 0){
                var valeur = customSizeValues.value.width * customSizeValues.value.height
                var matchingSettings = checkInterval(customSize.pricings, valeur)
                // console.log(matchingSettings, "resultat")
        
                customSizeTextValues.value = {
                    textNumber: 0, 
                    charPrice: matchingSettings.charPrice, 
                    basePrice: matchingSettings.basePrice, 
                    maxTextChar: -1, 
                    startPriceAtChar: 0
                }
            }else{
                customSizeTextValues.value = {
                    textNumber: 0, 
                    charPrice: 0, 
                    basePrice: 0, 
                    maxTextChar: -1, 
                    startPriceAtChar: 0
                }
            }
    
            changeSize(customSizeValues.value, customSizeTextValues.value)
        }

        simulateCanvasClick()
    }

    var currentThickValue = ref(0)
    function selectSizeThickness(thick){
        currentThickValue.value = thick
        handleChangeThickness(thicknesss.value.active, thick)
    }

    var allShapes = ref({})
    var shapees = ref([])
    var selectedShape = ref('square')
    var currentShapeId = ref(0)
    function selectShape(shape, setting, shapeId){
        // currentShapeId.value = setting.shapeId
        currentShapeId.value = shapeId
        if(fixingExcludeShapes.value.includes(shapeId)){
            // if(activeFixingId === matchingFixings.value.length-1){
            //     selectFixingMethode(matchingFixings.value[0].fixing.type, matchingFixings.value[0].fixingg, 0)
            // }
            // selectFixingMethode(matchingFixings.value[activeFixingId+1].fixing.type, matchingFixings.value[activeFixingId+1].fixingg, activeFixingId+1)
            selectFixingMethode('none')
            var fixingPriceObject = {
                name: "fixing",
                price: 0
            }
            getOptionPrice(fixingPriceObject)
        }
        if(activeFace.value == 'front-face'){
            if(border1ExcludeShapes.value.includes(shapeId)){
                // if(face1BorderId.value === matchingBorders.value.length-1){
                //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                // }
                // selectBorder(matchingBorders.value[face1BorderId.value+1].border.value, matchingBorders.value[face1BorderId.value+1].borderr.settings, matchingBorders.value[face1BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face1BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face1BorderId.value+1].borderr.excludeSizes, face1BorderId.value+1)
                selectBorder('none')
                var borderPrice1Object = {
                    name: "border1",
                    price: 0
                }
                getOptionPrice(borderPrice1Object)
            }
        }
        if(activeFace.value == 'back-face'){
            if(border2ExcludeShapes.value.includes(shapeId)){
                // if(face2BorderId.value === matchingBorders.value.length-1){
                //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                // }
                // selectBorder(matchingBorders.value[face2BorderId.value+1].border.value, matchingBorders.value[face2BorderId.value+1].borderr.settings, matchingBorders.value[face2BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face2BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face2BorderId.value+1].borderr.excludeSizes, face2BorderId.value+1)
                selectBorder('none')
                var borderPrice2Object = {
                    name: "border2",
                    price: 0
                }
                getOptionPrice(borderPrice2Object)

            }
        }

        handleSelectShape(shape, currentSizeValues.value.width, currentSizeValues.value.height, currentSizeValues.value.top, currentSizeValues.value.left)
        selectedShape.value = shape

        var shapePrice = setting.additionalPrice
        var shapePriceObject = {
            name: "shape",
            price: shapePrice
        }
        getOptionPrice(shapePriceObject)

        if(firstSetLoad.value){
            saveStep('select shape')
        }
        
        simulateCanvasClick()
    }

    var firstBorderCheck = ref(true)
    var allBorders = ref({})
    var borderrs = ref([])
    var borderSettings = ref([])
    var face1BorderId = ref('')
    var face2BorderId = ref('')
    var activeFace1Border = ref('')
    var activeFace2Border = ref('')
    var activeFace1BorderColor = ref('')
    var activeFace2BorderColor = ref('')
    var activeFace1BorderColorPrice = ref(0)
    var activeFace2BorderColorPrice = ref(0)
    var borderColors1 = ref({})
    var borderColors2 = ref({})
    var customBorderColor1 = ref(false)
    var customBorderColor2 = ref(false)
    var border1ExcludeShapes = ref([])
    var border2ExcludeShapes = ref([])
    var border1ExcludeSizes = ref([])
    var border2ExcludeSizes = ref([])
    function selectBorder(border, settings, price, excludeShapes, excludeSizes, id, restart) {
        var border1Price = 0
        var border2Price = 0
        
        handleGetBorderRestart(restart)

        if(firstBorderCheck.value){
            var currentId = id
            var activeBorder = handleSelectBorder(border)
            var colors = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
            firstBorderColor.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors[0] : {} )
            var customColor = borderrs.value.settings.enableBorderColor
            var exShapes = excludeShapes
            var exSizes = excludeSizes

            if(configDoublePart.value.active){
                face1BorderId.value = currentId
                activeFace1Border.value = activeBorder.type;
                // activeFace1BorderColor.value = activeBorder.color;
                borderColors1.value = colors
                customBorderColor1.value = customColor
                border1ExcludeShapes.value = exShapes
                border1ExcludeSizes.value = exSizes
                border1Price = price

                face2BorderId.value = currentId
                activeFace2Border.value = activeBorder.type;
                // activeFace2BorderColor.value = activeBorder.color;
                borderColors2.value = colors
                customBorderColor2.value = customColor
                border2ExcludeShapes.value = exShapes
                border2ExcludeSizes.value = exSizes
                border2Price = price

                var borderPrice1Object = {
                    name: "border1",
                    price: border1Price
                }
                getOptionPrice(borderPrice1Object)

                var borderPrice2Object = {
                    name: "border2",
                    price: border2Price
                }
                getOptionPrice(borderPrice2Object)

                var stop = false
                if(colorForBorder1.value || colorForBorder2.value){
                    if(colors.length > 0){
                        changeBorderColor(colors[0].codeHex, colors[0].additionalPrice, colors[0].name)
                    }
                }else{
                    // console.log("WARNING")
                    // changeBorderColor(colorTextColor.value, 0)
                }
                if(colorForBorder2.value){
                    if(colors.length > 0){
                        // changeBorderColor(colors[0].codeHex, colors[0].additionalPrice, colors[0].name)
                    }
                }else{
                    // changeBorderColor(colorTextColor.value, 0)
                }
            }else{
                face1BorderId.value = currentId
                activeFace1Border.value = activeBorder.type;
                // activeFace1BorderColor.value = activeBorder.color;
                borderColors1.value = colors
                customBorderColor1.value = customColor
                border1ExcludeShapes.value = exShapes
                border1ExcludeSizes.value = exSizes
                border1Price = price

                var borderPrice1Object = {
                    name: "border1",
                    price: border1Price
                }
                getOptionPrice(borderPrice1Object)

                if(colorForBorder1.value){
                    if(colors.length > 0){
                        changeBorderColor(colors[0].codeHex, colors[0].additionalPrice, colors[0].name)
                    }
                }else{
                    changeBorderColor(colorTextColor.value, 0)
                }
            }
        }else{
            var currentId = id
            var activeBorder = handleSelectBorder(border)
            var colors = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
            firstBorderColor.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors[0] : {} )
            var customColor = borderrs.value.settings.enableBorderColor
            var exShapes = excludeShapes
            var exSizes = excludeSizes

            if(activeFace.value === "front-face"){
                face1BorderId.value = currentId
                activeFace1Border.value = activeBorder.type;
                // activeFace1BorderColor.value = activeBorder.color;
                borderColors1.value = colors
                customBorderColor1.value = customColor
                border1ExcludeShapes.value = exShapes
                border1ExcludeSizes.value = exSizes
                border1Price = price
                
                var borderPrice1Object = {
                    name: "border1",
                    price: border1Price
                }
                getOptionPrice(borderPrice1Object)

                if(colorForBorder1.value){
                    if(borderColors1.value.length > 0){
                        // changeBorderColor(borderColors1.value[0].codeHex, borderColors1.value[0].additionalPrice, borderColors1.value[0].name)
                        changeBorderColor(activeFace1BorderColor.value, activeFace1BorderColorPrice.value, borderColorName1.value)
                    }
                }else{
                    changeBorderColor(colorTextColor.value, 0)
                }
            }
            if(configDoublePart.value.active && activeFace.value === "back-face"){
                face2BorderId.value = currentId
                activeFace2Border.value = activeBorder.type;
                // activeFace2BorderColor.value = activeBorder.color;
                borderColors2.value = colors
                customBorderColor2.value = customColor
                border2ExcludeShapes.value = exShapes
                border2ExcludeSizes.value = exSizes
                border2Price = price

                var borderPrice2Object = {
                    name: "border2",
                    price: border2Price
                }
                getOptionPrice(borderPrice2Object)

                if(colorForBorder2.value){
                    if(borderColors2.value.length > 0){
                        // changeBorderColor(borderColors2.value[0].codeHex, borderColors2.value[0].additionalPrice, borderColors2.value[0].name)
                        changeBorderColor(activeFace2BorderColor.value, activeFace2BorderColorPrice.value, borderColorName2.value)
                    }
                }else{
                    changeBorderColor(colorTextColor.value, 0)
                }
            }
        }
        firstBorderCheck.value = false
    }

    var firstBorderColorCheck = ref(true)
    var firstBorderColor = ref({})
    var borderCustomColor1 = ref("#000000")
    var borderCustomColor2 = ref("#000000")
    var borderColorName1 = ref("")
    var borderColorName2 = ref("")
    var colorForBorder1 = ref(false)
    var colorForBorder2 = ref(false)
    function changeBorderColor(colorHex, price, name){
        // console.log(name, "changeBorderColor")
        if(firstBorderColorCheck.value){
            borderColorName1.value = name
            activeFace1BorderColor.value = colorHex
            activeFace1BorderColorPrice.value = price
            handlechangeBorderColor(colorHex, "first load fornt face")
            var borderColor1Price = price
            var borderColorPrice1Object = {
                name: "border-color1",
                price: borderColor1Price
            }
            getOptionPrice(borderColorPrice1Object)

            borderColorName2.value = name
            activeFace2BorderColor.value = colorHex
            activeFace2BorderColorPrice.value = price
            handlechangeBorderColor(colorHex, "first load back face")
            var borderColor2Price = price
            var borderColorPrice2Object = {
                name: "border-color2",
                price: borderColor2Price
            }
            getOptionPrice(borderColorPrice2Object)
        }else{
            if(activeFace.value === "front-face"){
                borderColorName1.value = name
                activeFace1BorderColor.value = colorHex
                activeFace1BorderColorPrice.value = price
                handlechangeBorderColor(colorHex,"front face border color")
                var borderColor1Price = price
    
                var borderColorPrice1Object = {
                    name: "border-color1",
                    price: borderColor1Price
                }
                getOptionPrice(borderColorPrice1Object)
            }
            if(configDoublePart.value.active && activeFace.value === "back-face"){
                borderColorName2.value = name
                activeFace2BorderColor.value = colorHex
                activeFace2BorderColorPrice.value = price
                handlechangeBorderColor(colorHex, "back face border color")
                var borderColor2Price = price
    
                var borderColorPrice2Object = {
                    name: "border-color2",
                    price: borderColor2Price
                }
                getOptionPrice(borderColorPrice2Object)
            }
        }

        if(firstSetLoad.value){
            saveStep('select borderColor')
        }
        firstBorderColorCheck.value = false
    }

    var firstColorCheck = ref(true)
    var allColors = ref({})
    var colorrs = ref([])
    var activeSignColor = ref('')
    var activeSignFace2Color = ref('')
    var activeSignColoriD = ref(0)
    var activeSignFace2ColoriD = ref(0)
    var activeSignColorCode1 = ref('')
    var activeSignColorCode2 = ref('')
    var patternActive1 = ref(false)
    var patternActive2 = ref(false)
    var signTextColor1 = ref(false)
    var signTextColor2 = ref(false)
    var colorTextColor = ref("")
    var colorTextColorName1 = ref("")
    var colorTextColorName2 = ref("")
    var colorTextCodeHex1 = ref("")
    var colorTextCodeHex2 = ref("")
    function changeSignColor(id, name, pattern, textColor, price, restart) {
        // console.log(color.name, "changeSignColor")
        var color1Price = 0
        var color2Price = 0
        
        if(firstColorCheck.value){
            if(configDoublePart.value.active){
                signTextColor1.value = textColor
                activeSignColor.value = name;
                activeSignColoriD.value = id;
                color1Price = price
    
                signTextColor2.value = textColor
                activeSignFace2Color.value = name;
                activeSignFace2ColoriD.value = id;
                color2Price = price
    
                var colorPrice1Object = {
                    name: "color1",
                    price: color1Price
                }
                getOptionPrice(colorPrice1Object)
    
                var colorPrice2Object = {
                    name: "color2",
                    price: color2Price
                }
                getOptionPrice(colorPrice2Object)

                if(pattern.active){
                    patternActive1.value = true
                    patternActive2.value = true
                    activeSignColorCode1.value = pattern.url
                    activeSignColorCode2.value = pattern.url
                }else{
                    patternActive1.value = false
                    patternActive2.value = false
                    activeSignColorCode1.value = pattern.codeHex
                    activeSignColorCode2.value = pattern.codeHex
                }
                if(textColor.active){
                    colorTextColorName1.value = textColor.name
                    colorTextColorName2.value = textColor.name
                    
                    colorTextCodeHex1.value = textColor.codeHex
                    colorTextCodeHex2.value = textColor.codeHex
                    if(textColor.sameForBorder){
                        colorForBorder1.value = false
                        colorForBorder2.value = false
                    }else{
                        colorForBorder1.value = true
                        colorForBorder2.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextColorName2.value = ''

                    colorTextCodeHex1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                    colorForBorder2.value = true
                }
            }else{
                signTextColor1.value = textColor
                activeSignColor.value = name;
                activeSignColoriD.value = id;
                color1Price = price
                var colorPrice1Object = {
                    name: "color1",
                    price: color1Price
                }
                getOptionPrice(colorPrice1Object)

                if(pattern.active){
                    patternActive1.value = true
                    activeSignColorCode1.value = pattern.url
                }else{
                    patternActive1.value = false
                    activeSignColorCode1.value = pattern.codeHex
                }
                if(textColor.active){
                    colorTextColorName1.value = textColor.name
                    colorTextCodeHex1.value = textColor.codeHex
                    if(textColor.sameForBorder){
                        colorForBorder1.value = false
                    }else{
                        colorForBorder1.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                }
            }
        }else{
            if(activeFace.value === "front-face"){
                signTextColor1.value = textColor
                activeSignColor.value = name;
                activeSignColoriD.value = id;
                color1Price = price
                
                var colorPrice1Object = {
                    name: "color1",
                    price: color1Price
                }
                getOptionPrice(colorPrice1Object)

                if(pattern.active){
                    patternActive1.value = true
                    activeSignColorCode1.value = pattern.url
                }else{
                    patternActive1.value = false
                    activeSignColorCode1.value = pattern.codeHex
                }
                if(textColor.active){
                    colorTextColorName1.value = textColor.name
                    colorTextCodeHex1.value = textColor.codeHex

                    if(textColor.sameForBorder){
                        colorForBorder1.value = false
                    }else{
                        colorForBorder1.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                }
            }

            if(configDoublePart.value.active && activeFace.value === "back-face"){
                signTextColor2.value = textColor
                activeSignFace2Color.value = name;
                activeSignFace2ColoriD.value = id;
                color2Price = price

                var colorPrice2Object = {
                    name: "color2",
                    price: color2Price
                }

                if(pattern.active){
                    patternActive2.value = true
                    activeSignColorCode2.value = pattern.url
                }else{
                    patternActive2.value = false
                    activeSignColorCode2.value = pattern.codeHex
                }
                getOptionPrice(colorPrice2Object)
                if(textColor.active){
                    colorTextColorName2.value = textColor.name
                    colorTextCodeHex2.value = textColor.codeHex

                    if(textColor.sameForBorder){
                        colorForBorder2.value = false
                    }else{
                        colorForBorder2.value = true
                    }
                }else{
                    colorTextColorName2.value = ''
                    colorTextCodeHex2.value = ''

                    colorForBorder2.value = true
                }
            }
        }

        var defTextColor = (configTextSettings.value.colors.length > 0 ? configTextSettings.value.colors[0].codeHex : "#000000")
        // console.log("change", textColor)
        if(textColor.active){
            handleChangeSignColor(name, pattern, textColor, defTextColor, restart)
            if(textColor.sameForBorder){
                // changeBorderColor(textColor.codeHex, 0, textColor.name)
                handlechangeBorderColor(textColor.codeHex, "back face border color")
                if(firstBorderColorCheck.value){
                    if(configDoublePart.value.active){
                        borderColorName1.value = textColor.name 
                        borderColorName2.value = textColor.name

                        var borderColorPrice1Object = {
                            name: "border-color1",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice1Object)
                        var borderColorPrice2Object = {
                            name: "border-color2",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice2Object)
                    }else{
                        borderColorName1.value = textColor.name
                        var borderColorPrice1Object = {
                            name: "border-color1",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice1Object)
                    }
                }else{
                    if(activeFace.value === "front-face"){
                        borderColorName1.value = textColor.name
                        var borderColorPrice1Object = {
                            name: "border-color1",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice1Object)
                    }else{
                        borderColorName2.value = textColor.name
                        var borderColorPrice2Object = {
                            name: "border-color2",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice2Object)
                    }
                }
                colorTextColor.value = textColor.codeHex
                // colorForBorder.value = false
                if(firstSetLoad.value){
                    saveStep('select borderColor')
                }
            }
            if(!textColor.sameForBorder){
                // console.log("qsqdqsdqdsqs")
                // colorForBorder.value = true
                if(activeFace.value === "front-face"){
                    changeBorderColor(activeFace1BorderColor.value, activeFace1BorderColorPrice.value)
                }else if(activeFace.value === "back-face"){
                    changeBorderColor(activeFace2BorderColor.value, activeFace2BorderColorPrice.value)
                }
            }
        }else{
            // colorForBorder.value = true
            handleChangeSignColor(name, pattern, textColor, defTextColor, restart)
            // changeBorderColor(firstBorderColor.value.codeHex, firstBorderColor.value.additionalPrice)
            if(activeFace.value === "front-face"){
                changeBorderColor(activeFace1BorderColor.value, activeFace1BorderColorPrice.value)
            }else if(activeFace.value === "back-face"){
                changeBorderColor(activeFace2BorderColor.value, activeFace2BorderColorPrice.value)
            }
        }

        firstColorCheck.value = false
        // if(firstSetLoad.value){
        //     saveStep('select signColor')
        // }
    }

    var allFixings = ref({})
    var fixinggs = ref([])
    var activeFixingId = ref(0)
    var activeFixingMethode = ref('')
    var fixingExcludeShapes = ref({})
    var fixingExcludeSizes = ref({})
    function selectFixingMethode(methode, setting, id){
        // console.log(methode, "select")
        activeFixingId.value = id
        activeFixingMethode.value = methode
        handleSelectFixingMethode(methode)

        if(setting){
            fixingExcludeShapes.value = setting.excludeShapes
            fixingExcludeSizes.value = setting.excludeSizes
            var fixingPrice = setting.additionalPrice
            var fixingPriceObject = {
                name: "fixing",
                price: fixingPrice
            }
            getOptionPrice(fixingPriceObject)
        }

        if(firstSetLoad.value){
            saveStep('slect fixingMethode')
        }

        // let timer;
        // clearTimeout(timer);
        // timer = setTimeout(() => {
        //     centerSign(canvas)
        //     centerSign(canvasBack)
        // }, 150);
    }

    var additionalComponents = ref({})
    var selectedAddComponent = ref("")
    var addComponentSelected = ref([])
    function selectAddComponent(addOption, option, price){

        function addUniqueObject(arr, obj, key) {
            const index = arr.findIndex(item => item[key] === obj[key]);
            if(index !== -1){
                arr[index] = obj;
            }
            else{
                arr.push(obj);
            }
        }
        addUniqueObject(addComponentSelected.value, {option: addOption, value: option}, 'option')

        selectedAddComponent.value = option

        // console.log(addComponentSelected.value, "selected")
        // console.log(addComponentValue.value, "selected fsdfsdf")

        var addOptionPrice = price
        var addOptionPriceObject = {
            type: 'add-component',
            name: addOption,
            price: addOptionPrice
        }
        getOptionPrice(addOptionPriceObject)
    }


    var customAdditionalValues = ref([])
    var noteValue = ref('')
    var dropdownIndex = ref()
    var dropdownValue = ref({})
    function addToOrUpdateArray(arr, id, label, value, price) {
        // if(img){
        //     dropdownIndex.value = id
        //     dropdownExampleImg.value = img
        // }
        // if(img == ''){
        //     dropdownExampleImg.value = ""
        // }
        // Vérifier si l'id existe déjà dans le tableau
        // console.log(dropdownValue.value, "id existe déjà dans le tableau")   
        const existingIndex = arr.findIndex(item => item.id === id);

        if (existingIndex !== -1) {
            // Si l'id existe, mettez à jour les valeurs de l'objet existant
            arr[existingIndex].label = label;
            arr[existingIndex].value = value;
            arr[existingIndex].price = price;
        } else {
            // Si l'index n'existe pas, ajoutez un nouvel objet au tableau
            arr.push({
                id: id,
                label: label,
                value: value,
                price: price,
            });
        }

        if(price){
            customAdditionalValues.value.forEach((element, id) => {
                if(element.price.type === 'base'){
                    var addOptionPrice = element.price.value
                    var addOptionPriceObject = {
                        type: 'add-options',
                        name: element.label,
                        priceType: 'base',
                        price: addOptionPrice,
                    }
                    getOptionPrice(addOptionPriceObject)
                }
                if(element.price.type === 'multiplier'){
                    var addOptionPrice = element.price.value
                    var addOptionPriceObject = {
                        type: 'add-options',
                        name: element.label,
                        priceType: 'multiplier',
                        price: addOptionPrice,
                    }
                    getOptionPrice(addOptionPriceObject)
                }
                if(element.price.type === 'none'){
                    var addOptionPriceObject = {
                        type: 'add-options',
                        name: element.label,
                        price: 0
                    }
                    getOptionPrice(addOptionPriceObject)
                }
            })
        }
    }

    var selectedOption = ref('')
    var selectedId = ref()
    function selectOption(label, price, id){
        selectedId.value = id
        switch(price.type) {
            case 'base':
                selectedOption.value = label + ' (' + '+' + price.value + props.currency + ')';
                break;
            case 'multiplier':
                selectedOption.value = label + ' (' + '+' + price.value + '%)';
                break;
            case 'none':
                selectedOption.value = label;
            break;

        }
    }




    var allClipart = ref({})
    var currentClipart = ref({})
    var clipartId = ref(0)
    var showClipart = ref(false)
    function showClipartImages(cliparts, id){
        showClipart.value = true
        currentClipart.value = cliparts
        clipartId.value = id
    }
    var clipartSection = ref(false)
    function showClipartsSection(statut){
        clipartSection.value = statut
    }
    var recentlyUsedImages = ref([])
    var usedImages = ref([])
    var imageError = ref("")
    var newImagePriceId = ref(0)
    async function addImageToSign(image, price, id){
        // console.log(price, "Added")
        newImagePriceId.value ++
        var currentImages = {}
        try {
            if(image){      
                var imagePrice = price
                var imagePriceObject = {
                    id: newImagePriceId.value,
                    name: image,
                    type: 'image',
                    price: imagePrice
                }
                getOptionPrice(imagePriceObject) 

                currentImages = await handleAddImageToSign(image, newImagePriceId.value, price)
            }else{
                currentImages = await handleAddImageToSign()
            }
            imageError.value = ""
            usedImages.value = currentImages.images
            addRecentImages()
            editImage.value = false
            clipartSection.value = false
        } catch (error) {
            currentImages = error
            imageError.value = error.error;
            usedImages.value = error.images;
            // console.log(imageError.value, "lsdfsdf", usedImages.value);
        }

        if(currentImages != {}){
            // console.log('currentImages', currentImages.images{0})
            // editAddedImage(currentImages.images[0].object)
        }

        if(firstSetLoad.value){
            saveStep('add image to sign')
        }
        // console.log(usedImages.value, "currznt images")
    }

    var recentlyUsedImages = ref([])
    function addRecentImages(){
        function getImages(canva){
            var objects = canva.getObjects();
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].name === "asowp-SignImage") {
                    function addUniqueObject(arr, obj, key1, key2) {
                        const exists = arr.some(item => item[key1] === obj[key1]);
                        if (!exists) {
                            const exists2 = arr.some(item => item[key2] === obj[key2]);
                            if (!exists2) {
                                arr.push(obj);
                            }
                        }
                    }
                    addUniqueObject(recentlyUsedImages.value, {id: objects[i].id, object: objects[i], url: (objects[i].objectType === 'svg' ? objects[i].imageUrl : objects[i].getSrc())}, 'id', 'url')
                }
            }
        }

        let resizeTimer
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            getImages(canvas)
            getImages(canvasBack)
            if(recentlyUsedImages.value.length >= 6){
                recentlyUsedImages.value.shift()
            }
        }, 250); // Délai de 250 millisecondes
        
    }
    function deleteFromRecentlyUsed(index, tab){
        tab.splice(index, 1);
    }
    var activeImageType = ref('no-svg')
    var activeImgWithBackground = ref(false)
    function editAddedImage(image){
        if(activeFace.value === image.canvasName){
            editImage.value = true
            activeCanvas.getObjects().forEach(function(obj){
                if(image.id === obj.id){
                    activeImageType.value = obj.objectType

                    activeCanvas.setActiveObject(obj);
                    handleGetAddedImageValues(obj)
                    selectedImage.value.object = obj
                    selectedImage.value.filters = obj.filters
                    if(obj.objectType === 'svg'){
                        currentSvgColor.value = obj.fill
                    }else{
                        checkFilter()
                    }
                    activeImgWithBackground.value = !obj.imageNoBgUrl || (obj.imageNoBgUrl && obj.imageNoBgUrl == "") ? false : true
                }
            })
        }
    }
    function changeImageWidth(e){
        var newScaleX = e.target.value
        handleChangeImageWidth(newScaleX)
    }
    function changeImageHeight(e){
        var newScaleY = e.target.value
        handleChangeImageHeight(newScaleY)
    }
    function selectImageBorder(){

    }
    var setFilter = ref({
        blur : false,
        greyscale : false,
        sepia : false,
        embross : false,
        sharpen : false,
    })
    function selectImageFilter(filter){
        selectedImage.value.filters = handleSelectFilter(filter)
        checkFilter()
    }
    function checkFilter(){
        if(selectedImage.value.filters.some(item => item['name'] === 'blur')){
            setFilter.value.blur = true
        }else{
            setFilter.value.blur = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'greyscale')){
            setFilter.value.greyscale = true
        }else{
            setFilter.value.greyscale = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'sepia')){
            setFilter.value.sepia = true
        }else{
            setFilter.value.sepia = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'embross')){
            setFilter.value.embross = true
        }else{
            setFilter.value.embross = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'sharpen')){
            setFilter.value.sharpen = true
        }else{
            setFilter.value.sharpen = false
        }
    }
    var currentSvgColor = ref('')
    function changeSvgColor(color){
        currentSvgColor.value = handleChangeAddedSvgColor(color)
    }




    var editAction = ref(false)
    var selectedText = ref({
        object: {},
        color: '',
        width: '',
        height: '',
        left: '',
        right: '',
        top: '',
        bottom: '',
        value: '',
        align: 'left',
        font: '',
        size: '',
        weight: 'normal',
        style: '',
        underline: false,
        linethrough: false,
        overline: false,
    })
    // function editText(eventData, transform){
    //     editAction.value = true
    //     var target = transform.target;
    // 	var canvas = target.canvas;
    // }

    var textNumberForSize = ref(0)
    var addedTexts = ref([])
    async function addTextToSign(){
        addedTexts.value =  await handleAddTextToSign()
        // console.log(addedTexts.value, "added text")
        if(addedTexts.value.length > 0){
            var index = addedTexts.value.length - 1
            if(configTextType.value != "normal"){
                getTextObject(addedTexts.value[index], true)
            }else{
                getTextObject(addedTexts.value[index], false)
            }
        }
        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)
        if(firstSetLoad.value){
            saveStep('add text to sign')
        }
    }
    function getTextObject(object, setActive) {
        if(activeFace.value == object.canvasName){
            selectText.value = true
            object.selected = true;
    
            selectedText.value.value = object.text
            
            activeCanvas.getObjects().forEach(function(obj){
                if(obj.name === "asowp-SignText" && obj.id === object.id){
                    // console.log(obj, "asowp-SignText")
                    if(setActive){
                        activeCanvas.setActiveObject(obj);
                    }
                    handleGetAddedTextValues(obj)
                    selectedText.value.object = obj
                    selectedText.value.color = obj.fill
                    fontFamSelected.value = obj.fontFamily
                    selectedText.value.weight = obj.fontWeight
                    selectedText.value.align = obj.textAlign
                    selectedText.value.style = obj.fontStyle
                    selectedText.value.underline = obj.underline
                    selectedText.value.linethrough = obj.linethrough
                    selectedText.value.overline = obj.overline

                    borderSize.value = obj.strokeWidth
                    borderLayerSize.value = obj.secondStrokeWidth
                    currentTextBorder1Color.value = obj.stroke
                    currentTextBorder2Color.value = obj.secondStroke

                    active3dSide.value = obj.activeSide
                    active3dSideColor.value = obj.sideColor

                    if(obj.type == "neon-Text"){
                        curentTextLightColor.value = obj.neonColor
                        activeTextLight.value = obj.glowRadius == 0 ? false : true
                    }
                }
            })
            activeCanvas.requestRenderAll();
        }
    }
    function changeText(){
        selectText.value = false
    }

    var maxTextCharForSize = ref(0)
    function changeTextValue(event){
        handleChangeTextValue(event)

        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)
    }
    function changeTextWeight(){
        var weight = handleChangeTextWeight()
        selectedText.value.weight = weight
    }
    function changeTextAlign(align){
        selectedText.value.align = handleChangeTextAlign(align)
    }
    function changeTextStyle(){
        selectedText.value.style = handleChangeTextStyle()
    }
    function changeTextSize(size, min, max){
        handleChangeTextSize(parseInt(size), min, max)
    }
    function changeTextSizeValue(statut){
        var max = configTextFontSettings.value.maximumFontSize
        var min = configTextFontSettings.value.minimumFontSize
        var input = document.getElementById('asowp-text-size')

        if(route.name === 'template-maker'){
            if(statut === 'up'){
                if(input.value < max){
                    input.stepUp()
                    handleChangeTextSize(parseInt(input.value), min, max)
                }
            } else if(statut === 'down'){
                if(input.value > min){
                    input.stepDown()
                    handleChangeTextSize(parseInt(input.value), min, max)
                }
            }
        }else{
            if(selectedText.value.object.lockScale === false){
                // console.log(selectedText.value.object.lockScale, "lock scale")
                if(statut === 'up'){
                    if(input.value < max){
                        input.stepUp()
                        handleChangeTextSize(parseInt(input.value), min, max)
                    }
                } else if(statut === 'down'){
                    if(input.value > min){
                        input.stepDown()
                        handleChangeTextSize(parseInt(input.value), min, max)
                    }
                }
            }
        }
    }
    var fontFamSelected = ref("Arial")
    var allFonts = ref([])
    async function changeTextFontFam(font, url, index){
        fontFamSelected.value = font
        await handleChangeTextFontFam(font, url)
    }
    var customTextColor = ref("#000000")
    function changeTextColor(color){
        selectedText.value.color = handleChangeTextColor(color)
    }
    function underlineText(){
        selectedText.value.underline = handleUnderlineText()
    }
    function crossText(){
        selectedText.value.linethrough = handleCrossText()
    }
    function overlineText(){
        selectedText.value.overline = handleOverlineText()
    }
    var borderSize = ref(2)
    var borderLayerSize = ref(2)
    function changeTextBorder(layer, e){
        if(layer){
            borderLayerSize.value = e.target.value
        }else{
            borderSize.value = e.target.value
        }
        handleChangeTextBorder(layer, e.target.value)
    }
    var borderLineJoin = ref("round")
    function changeBorderLineJoin(join){
        borderLineJoin.value = join
        handleChangeBorderLineJoin(join)
    }
    var firstBorder = ref(true)
    var currentTextBorder1Color = ref("")
    var currentTextBorder2Color = ref("")
    function changeTextBorderColor(color){
        if(firstBorder.value){
            currentTextBorder1Color.value = color
        }else{
            currentTextBorder2Color.value = color
        }       
         handleChangeTextBorderColor(firstBorder.value, color)
    }
    var active3dSide = ref(true)
    function show3dSide(){
        active3dSide.value = !active3dSide.value
        handleShow3dSide(active3dSide.value)
    }
    var active3dSideColor = ref("")
    function change3dSideColor(color){
        active3dSideColor.value = color
        handleChange3dSideColor(color)
    }
    var curentTextLightColor = ref("")
    function changeTextLightColor(color){
        curentTextLightColor.value = color
        handleChangeTextLightColor(color)
    }
    var activeTextLight = ref(true)
    function turnNeonLightOnOff(){
        activeTextLight.value = !activeTextLight.value
        handleTurnLightOnOff(activeTextLight.value)
    }


    function changeTextBackground(textObject){

    }

    var selectedImage = ref({
        object: {},
        width: '',
        height: '',
        left: '',
        right: '',
        top: '',
        bottom: '',
        angle: 0,
        filters: [],
    })
    function turnLeftImage(){
        if(route.name === 'template-maker'){
            handleTurnImageLeft()
        }else{
            if(selectedImage.value.object.lockRotate === false){
                handleTurnImageLeft()
            }
        }
    }
    function turnRightImage(){
        if(route.name === 'template-maker'){
            handleTurnRightImage()
        }else{
            if(selectedImage.value.object.lockRotate === false){
                handleTurnRightImage()
            }
        }
    }
    function flipImage(){
        handleFlipImage()
    }
    async function removeBackground(){
        let activeImg = activeCanvas.getActiveObject()
        // if(activeImg.name == "asowp-SignImage" && activeImg.objectType == "no-svg" && (activeImg.imageNoBgUrl && activeImg.imageNoBgUrl != "")){
        if(activeImg.name == "asowp-SignImage" && activeImg.objectType == "no-svg"){
            showLoader(true)
            let images = await handleRemoveBgImage(activeImg)
            usedImages.value = images.images
            usedImages.value.forEach(image=>{
                if(image.id === activeImg.id){
                    activeImgWithBackground.value = !image.object.imageNoBgUrl || (image.object.imageNoBgUrl && image.object.imageNoBgUrl == "") ? false : true
                }
            })
            showLoader(false)

            if(firstSetLoad.value){
                saveStep('remove image background')
            }
        }
    }

    let usedQRCodes = ref([])
    let addQRActive = ref(false)
    let selectQRCode = ref(false)
    let qrCodeType = ref("text")
    let qrCodeData = ref({})
    let activeQrCode = ref({})
    let activeQrCodeData = ref("")
    let activeQrCodeColorPart = ref("dark")
    let activeQrCodeColor = ref({
        dark: '#000000',
        light: '#ffffff',
    })
    async function getQRCodeData(e){
        let source;
        if (e.target.type === 'textarea' || e.target.tagName === 'TEXTAREA') {
            source = e.target.value;
        } else if (e.target.type === 'file') {
            const file = e.target.files?.[0];
            if (!file) return;
            source = file;
        }
        
        try {
            qrCodeData.value = source
        } catch (err) {
            console.error("Erreur QR:", err);
        }
    }
    async function addQRCode(){
        try {
            if(qrCodeData.value != {}){
                const qrObject = await handleAddQRCode(qrCodeData.value);
                addQRActive.value = false

                usedQRCodes.value = qrObject.codes
                editQRCode(qrObject.activeCode)

                if(firstSetLoad.value){
                    saveStep('add qrCode to sign')
                }
            }
        } catch (err) {
            console.error("Erreur QR:", err);
        }
    }
    async function editQRCode(code, active){
        try {
            if(activeFace.value == code.canvasName){
                if(active == true){
                    let activeCode = activeCanvas.getActiveObject()
                    if(code.name == "asowp-QRCode" && code.id == activeCode.id){
                        selectQRCode.value = true
                        
                        activeQrCode.value = code
                        activeQrCodeData.value = code.fromData
                        activeQrCodeColor.value = code.color
                    }
                }else{
                    if(code.name == "asowp-QRCode"){
                        selectQRCode.value = true
                        activeCanvas.setActiveObject(code)
                        
                        activeQrCode.value = code
                        activeQrCodeData.value = code.fromData
                        activeQrCodeColor.value = code.color
                    }
                }
            }
        } catch (err) {
            console.error("Erreur QR:", err);
        }
    }
    async function changeQRCodeValue(){
        try {
            usedQRCodes.value = await handleEditQRCode(activeQrCode.value, activeQrCodeData.value, activeQrCodeColor.value)

            console.log(usedQRCodes.value, "editing")
        } catch (err) {
            console.error("Erreur QR:", err);
        }
    }
    async function changeQRCodeColor(color){
        try {
            if(activeQrCodeColorPart.value == "dark"){
                activeQrCodeColor.value.dark = color
            }else{
                activeQrCodeColor.value.light = color
            }
            usedQRCodes.value = await handleChangeQRCodeColor(activeQrCode.value, activeQrCodeColor.value)

            console.log(usedQRCodes.value, "editing")
        } catch (err) {
            console.error("Erreur QR:", err);
        }
    }

    var optionsPrices = ref([])
    var textsPrices = ref(0)
    var finalPrices = ref(0)
    function getOptionPrice(priceObject){
        textsPrices.value = handleSetPrice()
        function addUniqueObject(arr, obj, key) {
            if(obj.type === 'image'){
                const index = arr.findIndex(item => item.id === obj.id)
                if(index !== -1){
                    arr[index] = obj;
                }
                else{
                    arr.push(obj);
                }
            }else{
                const index = arr.findIndex(item => item.name === obj.name);
                if(index !== -1){
                    arr[index] = obj;
                }
                else{
                    arr.push(obj);
                }
            }
        }
        if(priceObject){
            addUniqueObject(optionsPrices.value, priceObject, 'name')
        }
        // console.log(optionsPrices.value, "priceObject")

        function removeObjectByName(arr, name) {
            const index = arr.findIndex(item => item.name === name);
            if(index !== -1){
                arr.splice(index, 1);
            }
        }
        function removeObjectByType(arr, type){
            const index = arr.findIndex(item => item.type === type);
            if(index !== -1){
                arr.splice(index, 1);
            } 
        }
        function sumOptionsPrice(arr, key) {
            // var newPrice = 0
            // var multiple = 0
            // var index = 0
            // while (index < arr.length){
            //     if(arr[index].priceType === 'multiplier'){
            //         multiple = multiple + arr[index].price
            //         // newPrice = newPrice * multiple
            //     }else { 
            //         // newPrice = newPrice + arr[index].price
            //         if(multiple === 0){
            //             newPrice = (newPrice + arr[index].price) * 1
            //         }else{
            //             newPrice = (newPrice + arr[index].price) * multiple
            //         }
            //     }
                
            //     index++;
            // }
            // arr.forEach((object, id) => {
            // })
            // arr.reduce((sum, obj) => sum + obj[key], 0);

            let baseSum = 0;
            let multipliers = [];
            let present = false;

            for (const item of arr) {
                if (item.priceType === 'multiplier') {
                    multipliers.push(item.price);
                    present = true;
                }else{
                    baseSum += item.price;
                } 
            }

            let totalPrice = baseSum;
            if(present){
                totalPrice *= multipliers.reduce((sum, obj) => sum + obj, 0);
            }else{
                totalPrice *= multipliers.reduce((sum, obj) => sum + obj, 1);
            }
            
            return totalPrice
        }
        if(priceObject){
            if(materialType.value === 'advance'){
                removeObjectByName(optionsPrices.value, 'none')
                removeObjectByName(optionsPrices.value, 'shape')
                removeObjectByName(optionsPrices.value, 'color1')
                removeObjectByName(optionsPrices.value, 'color2')
                removeObjectByName(optionsPrices.value, 'border1')
                removeObjectByName(optionsPrices.value, 'border2')
    
                removeObjectByType(optionsPrices.value, 'add-component')
    
                // console.log("options pricing advance", optionsPrices.value)
                // console.log("PRIX TOTAL",sumOptionsPrice(optionsPrices.value, 'price'))
    
            }else{
                removeObjectByName(optionsPrices.value, 'none')
                removeObjectByName(optionsPrices.value, 'model')
            }
        }
        finalPrices.value = sumOptionsPrice(optionsPrices.value, 'price') + textsPrices.value;
    }

    var finish = ref(false)
    var configData = ref({})
    var templateData = ref({})
    async function finishConfig(){
        closeObjectValues()
        var heightValue = handleGetObjectByName('height-value', canvas)
        var widthValue = handleGetObjectByName('width-value', canvas)
        var thicknessValue = 'none'
        switch(currentSizeThickness.value) {
            case false:
                thicknessValue = 'none'
            break;
            case true:
                thicknessValue = String(currentThickValue.value + " " + configSettings.value.customizerSign.customizerOptions.measurementUnit)
            break;
        }

        function getBorderColor(border, canva){
            var color = ""
            if(border === 'none'){
                var sign = handleGetObjectByName('safeObject', canva)
                color = sign.stroke
            }
            if(border === 'normal'){
                var sign = handleGetObjectByName('normal-border', canva)
                color = sign.fill
            }
            if(border === 'old-world'){
                var borderObject = handleGetObjectByName('old-world-border', canva)
                color = borderObject.fill
            }
            if(border === 'rounded-corners'){
                var borderObject = handleGetObjectByName('rounded-corners-border', canva)
                color = borderObject.stroke
            }

            return color
        }

        // console.log(getBorderColor(activeFace1Border.value, canvas))


        var textObjects = []
        var imageObjects = []
        
        var objects = canvas.getObjects();
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].name === "asowp-SignText") {
                function addUniqueObject(arr, obj, key) {
                    const exists = arr.some(item => item[key] === obj[key]);
                    if (!exists) {
                        arr.push(obj);
                    }
                }
                addUniqueObject(textObjects, objects[i], 'id')
            }
            if (objects[i].name === "asowp-SignImage") {
                function addUniqueObject(arr, obj, key) {
                    const exists = arr.some(item => item[key] === obj[key]);
                    if (!exists) {
                        arr.push(obj);
                    }
                }
                addUniqueObject(imageObjects, objects[i], 'id')
            }
        }
        var addedObject = handleFinishConfiguration(textObjects, imageObjects)


        var designImagesFace1 = []
        async function generateOutputImage(tab, canva) {
            switch (configOutputSettings.value.filesFormat) {
                case 'png':
                    tab.push({format: 'png', url: await genImage(canva, 'png')})
                break;

                case 'jpeg':
                    tab.push({format: 'jpeg', url: await genImage(canva, 'jpeg')})
                break;

                case 'svg':
                    tab.push({format: 'svg', url: await genImage(canva, 'svg')})
                break;

                case 'png+jpeg':
                    tab.push({format: 'png', url: await genImage(canva, 'png')})
                    tab.push({format: 'jpeg', url: await genImage(canva, 'jpeg')})
                break;

                case 'png+svg':
                    tab.push({format: 'png', url: await genImage(canva, 'png')})
                    tab.push({format: 'svg', url: await genImage(canva, 'svg')})
                break;

                case 'jpeg+svg':
                    tab.push({format: 'jpeg', url: await genImage(canva, 'jpeg')})
                    tab.push({format: 'svg', url: await genImage(canva, 'svg')})
                break;
            }

            // var pdfBlob = generateHighResolutionImage(canva, 'pdf')
            // const pdfUrl = URL.createObjectURL(pdfBlob)
            // tab.push({format: 'pdf', url: pdfUrl})
            
            return tab
        }

        configData.value = {
            sign: {
                size: {
                    label: (configVisualiserTexts.value.textSize && configVisualiserTexts.value.textSize.trim() != '' ? configVisualiserTexts.value.textSize : 'Size'),
                    value: {
                        width: {
                            label: (configVisualiserTexts.value.textWidth && configVisualiserTexts.value.textWidth.trim() != '' ? configVisualiserTexts.value.textWidth : 'Width'),
                            value: widthValue.text
                        },
                        height: {
                            label: (configVisualiserTexts.value.textHeight && configVisualiserTexts.value.textHeight.trim() != '' ? configVisualiserTexts.value.textHeight : 'Height'),
                            value: heightValue.text
                        },
                        thickness: {
                            label: (configVisualiserTexts.value.thickness && configVisualiserTexts.value.thickness.trim() != '' ? configVisualiserTexts.value.thickness : 'thickness'),
                            value: (currentThickValue.value !== -99 ? thicknessValue : 'none'),
                        }
                    }
                },
                shape: { 
                    label: (configVisualiserTexts.value.textShape && configVisualiserTexts.value.textShape.trim() != '' ? configVisualiserTexts.value.textShape : 'Shape'),
                    value: selectedShape.value,
                },
                color: {
                    label: (configVisualiserTexts.value.textColor && configVisualiserTexts.value.textColor.trim() != '' ? configVisualiserTexts.value.textColor : 'Colors'),
                    value: {
                        id: activeSignColoriD.value,
                        name: activeSignColor.value,
                        codeHex: activeSignColorCode1.value,
                        textColor: {
                            active: signTextColor1.value.active,
                            name: (signTextColor1.value.active ? colorTextColorName1.value : null),
                            codeHex: (signTextColor1.value.active ? colorTextCodeHex1.value : null),
                        }
                    },
                },
                border: {
                    label: (configVisualiserTexts.value.textBorder && configVisualiserTexts.value.textBorder.trim() != '' ? configVisualiserTexts.value.textBorder : 'Borders'),
                    value: {
                        type: activeFace1Border.value,
                        color: (activeFace1Border.value == 'none' ? null : (signTextColor1.value.active && !colorForBorder1.value ? colorTextColorName1.value : borderColorName1.value)),
                        codeHex: (activeFace1Border.value == 'none' ? null : getBorderColor(activeFace1Border.value, canvas)),
                    },
                },
                fixingMethod: {
                    label: (configVisualiserTexts.value.textFixingMethods && configVisualiserTexts.value.textFixingMethods.trim() != '' ? configVisualiserTexts.value.textFixingMethods : 'Fixing method'),
                    value: activeFixingMethode.value
                },
            },
            texts: {
                label: (configVisualiserTexts.value.textOptionText && configVisualiserTexts.value.textOptionText.trim() != '' ? configVisualiserTexts.value.textOptionText : 'Texts'),
                value: addedObject.texts,
            },
            images: {
                label: (configVisualiserTexts.value.textImage && configVisualiserTexts.value.textImage.trim() != '' ? configVisualiserTexts.value.textImage : 'Images'),
                value: addedObject.images,
            },
            additionalComponents: (addComponentSelected.value.length > 0 ? addComponentSelected.value : []),
            additionalOptions: (customAdditionalValues.value.length > 0 ? customAdditionalValues.value : []),
            designImages: await generateOutputImage(designImagesFace1, canvas),
            output:{
                prefix: (configOutputSettings.value.zipOutputFiles.active ? configOutputSettings.value.zipOutputFiles.zipOutFolderPrefix : ''),
                designDisplayComposition: configOutputSettings.value.designComposition
            }

        }

        var face2AddedObject = {}
        if(configDoublePart.value.active){
            var face2TextObjects = []
            var face2ImageObjects = []
            var objects = canvasBack.getObjects();

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].name === "asowp-SignText") {
                    function addUniqueObject(arr, obj, key) {
                        const exists = arr.some(item => item[key] === obj[key]);
                        if (!exists) {
                            arr.push(obj);
                        }
                    }
                    addUniqueObject(face2TextObjects, objects[i], 'id')
                }
                if (objects[i].name === "asowp-SignImage") {
                    function addUniqueObject(arr, obj, key) {
                        const exists = arr.some(item => item[key] === obj[key]);
                        if (!exists) {
                            arr.push(obj);
                        }
                    }
                    addUniqueObject(face2ImageObjects, objects[i], 'id')
                }
            }
            face2AddedObject = handleFinishConfiguration(face2TextObjects, face2ImageObjects)

            var designImagesFace2 = []

            configData.value = {
                faces: {
                    face1: configDoublePart.value.part1,
                    face2: configDoublePart.value.part2,
                },
                sign: {
                    size: {
                        label: (configVisualiserTexts.value.textSize && configVisualiserTexts.value.textSize.trim() != '' ? configVisualiserTexts.value.textSize : 'Size'),
                        value: {
                            width: {
                                label: (configVisualiserTexts.value.textWidth && configVisualiserTexts.value.textWidth.trim() != '' ? configVisualiserTexts.value.textWidth : 'Width'),
                                value: widthValue.text
                            },
                            height: {
                                label: (configVisualiserTexts.value.textHeight && configVisualiserTexts.value.textHeight.trim() != '' ? configVisualiserTexts.value.textHeight : 'Height'),
                                value: heightValue.text
                            },
                            thickness: {
                                label: (configVisualiserTexts.value.thickness && configVisualiserTexts.value.thickness.trim() != '' ? configVisualiserTexts.value.thickness : 'thickness'),
                                value: (currentThickValue.value !== -99 ? thicknessValue : 'none'),
                            }
                        }
                    },
                    shape: { 
                        label: (configVisualiserTexts.textShape && configVisualiserTexts.textShape.trim() != '' ? configVisualiserTexts.textShape : 'Shape'),
                        value: selectedShape.value,
                    },
                    color: {
                        label: (configVisualiserTexts.textColor && configVisualiserTexts.textColor.trim() != '' ? configVisualiserTexts.textColor : 'Colors'),
                        value: {
                            face1: {
                                id: activeSignColoriD.value,
                                name: activeSignColor.value,
                                codeHex: activeSignColorCode1.value,
                                textColor: {
                                    active: signTextColor1.value.active,
                                    name: (signTextColor1.value.active ? colorTextColorName1.value : null),
                                    codeHex: (signTextColor1.value.active ? colorTextCodeHex1.value : null),
                                }
                            },
                            face2: {
                                id: activeSignFace2ColoriD.value,
                                name: activeSignFace2Color.value,
                                codeHex : activeSignColorCode2.value,
                                textColor: {
                                    active: signTextColor2.value.active,
                                    name: (signTextColor2.value.active ? colorTextColorName2.value : null),
                                    codeHex: (signTextColor2.value.active ? colorTextCodeHex2.value : null),
                                }
                            },
                        },
                    },
                    border: {
                        label: (configVisualiserTexts.value.textBorder && configVisualiserTexts.value.textBorder.trim() != '' ? configVisualiserTexts.value.textBorder : 'Borders'),
                        value: {
                            face1: {
                                type: activeFace1Border.value,
                                color: (activeFace1Border.value == 'none' ? null : (signTextColor1.value.active && !colorForBorder1.value ? colorTextColorName1.value : borderColorName1.value)),
                                codeHex: (activeFace1Border.value == 'none' ? null : getBorderColor(activeFace1Border.value, canvas)),
                            },
                            face2: {
                                type: activeFace2Border.value,
                                color: (activeFace2Border.value == 'none' ? null : (signTextColor2.value.active && !colorForBorder2.value ? colorTextColorName2.value : borderColorName2.value)),
                                codeHex: (activeFace2Border.value == 'none' ? null : getBorderColor(activeFace2Border.value, canvasBack)),
                            },
                        },
                    },
                    fixingMethod: {
                        label: (configVisualiserTexts.value.textFixingMethods && configVisualiserTexts.value.textFixingMethods.trim() != '' ? configVisualiserTexts.value.textFixingMethods : 'Fixing method'),
                        value: activeFixingMethode.value
                    },
                },
                texts: {
                    label: (configVisualiserTexts.value.textOptionText && configVisualiserTexts.value.textOptionText.trim() != '' ? configVisualiserTexts.value.textOptionText : 'Texts'),
                    value: {
                        face1 :addedObject.texts,
                        face2 :face2AddedObject.texts
                    }
                },
                images: {
                    label: (configVisualiserTexts.value.textImage && configVisualiserTexts.value.textImage.trim() != '' ? configVisualiserTexts.value.textImage : 'Images'),
                    value: {
                        face1 :addedObject.images,
                        face2 :face2AddedObject.images
                    }
                },
                additionalComponents: (addComponentSelected.value.length > 0 ? addComponentSelected.value : []),
                additionnalOptions: (customAdditionalValues.value.length > 0 ? customAdditionalValues.value : []),
                designImages: {
                    face1: designImagesFace1,
                    face2: await generateOutputImage(designImagesFace2, canvasBack),
                },
                output:{
                    prefix: (configOutputSettings.value.zipOutputFiles.active ? configOutputSettings.value.zipOutputFiles.zipOutFolderPrefix : ''),
                    designDisplayComposition: configOutputSettings.value.designComposition
                }
            }

        }


        if(route.name == 'template-maker'){
            function supprimerNonChiffres(chaine) {
                return chaine.replace(/[^0-9.]/g, '');
            }
            canvas.getObjects().forEach((obj, index) => {
                obj.zIndex = index;
            });
            var jsonData1 = canvas.toJSON(['fill', 'name', 'id', 'selectable', 'canvasName', 'priceId', 'uniScaleTransform', 'centeredScaling', 'lockScalingFlip',"lockMoving", "lockScale", "lockRotate", "lockEdition", "fixingRatio", "fixingScale", "ratioScale", "source", "objectType", "imageUrl", "fontFamilyUrl", "neonColor", "glowRadius", "secondStrokeWidth", "secondStroke", "activeSide", "sideColor", "zIndex",])
            var canvas1AsJson = JSON.stringify(jsonData1)
            var current1State = JSON.parse(canvas1AsJson);

            canvasBack.getObjects().forEach((obj, index) => {
                obj.zIndex = index;
            });
            var jsonData2 = canvasBack.toJSON(['fill', 'name', 'id', 'selectable', 'canvasName', 'priceId', 'uniScaleTransform', 'centeredScaling', 'lockScalingFlip',"lockMoving", "lockScale", "lockRotate", "lockEdition", "fixingRatio", "fixingScale", "ratioScale", "source", "objectType", "imageUrl", "fontFamilyUrl", "neonColor", "glowRadius", "secondStrokeWidth", "secondStroke", "activeSide", "sideColor", "zIndex",])
            var canvas2AsJson = JSON.stringify(jsonData2)
            var current2State = JSON.parse(canvas2AsJson);


            templateData.value = {
                sign: {
                    doubleFace: configDoublePart.value.active,
                    material: {
                        name: selectedMaterial.value,
                        id: currentMaterialId.value,
                        type: materialType.value,
                        advanceComponent: {
                            component: (materialType.value == 'advance' ? advancedComponent.value : null),
                            option: {
                                data: activeSignModel.value,
                                id: activeSignModelId.value
                            }
                        }
                    },
                    size: {
                        width: supprimerNonChiffres(widthValue.text),
                        height: supprimerNonChiffres(heightValue.text),
                        maxChars: maxTextCharForSize.value,
                        thickness: {
                            avtive: currentSizeThickness.value,
                            value: (currentThickValue.value !== -99 ? thicknessValue : 'none'),
                        },
                        ratioScale: activeCanvas.ratioScale,
                        unit: configSettings.value.customizerSign.customizerOptions.measurementUnit,
                        setting: currentSizeSetting.value,
                    },
                    shape: selectedShape.value,
                    color: {
                        face1: {
                            id: activeSignColoriD.value,
                            name: activeSignColor.value,
                            codeHex: activeSignColorCode1.value,
                            textColor: {
                                active: signTextColor1.value.active,
                                sameForBorder: signTextColor1.value.sameForBorder,
                                name: (signTextColor1.value.active ? colorTextColorName1.value : null),
                                codeHex: (signTextColor1.value.active ? colorTextCodeHex1.value : null),
                            }
                        },
                        face2: {
                            id: activeSignFace2ColoriD.value,
                            name: activeSignFace2Color.value,
                            codeHex : activeSignColorCode2.value,
                            textColor: {
                                active: signTextColor2.value.active,
                                sameForBorder: signTextColor2.value.sameForBorder,
                                name: (signTextColor2.value.active ? colorTextColorName2.value : null),
                                codeHex: (signTextColor2.value.active ? colorTextCodeHex2.value : null),
                            }
                        },
                    },
                    border: {
                        face1: {
                            type: activeFace1Border.value,
                            color: (activeFace1Border.value == 'none' ? null : (signTextColor1.value.active && !colorForBorder1.value ? colorTextColorName1.value : borderColorName1.value)),
                            codeHex: (activeFace1Border.value == 'none' ? null : getBorderColor(activeFace1Border.value, canvas)),
                        },
                        face2: {
                            type: activeFace2Border.value,
                            color: (activeFace2Border.value == 'none' ? null : (signTextColor2.value.active && !colorForBorder2.value ? colorTextColorName2.value : borderColorName2.value)),
                            codeHex: (activeFace2Border.value == 'none' ? null : getBorderColor(activeFace2Border.value, canvasBack)),
                        },
                    },
                    fixingMethod: {
                        type: activeFixingMethode.value,
                        ratio: activeCanvas.fixingRatio,
                        scale: activeCanvas.fixingScale,
                    },
                },
                texts: {
                    face1 :addedObject.texts,
                    face2 :(face2AddedObject != {} ? face2AddedObject.texts : null)
                },
                images: {
                    face1 :addedObject.images,
                    face2 :(face2AddedObject != {} ? face2AddedObject.images : null)
                },
                designImages: {
                    face1: designImagesFace1,
                    face2: (configDoublePart.value.active ? await generateOutputImage(designImagesFace2, canvasBack) : []),
                },
                template:{
                    face1: current1State,
                    face2: current2State,
                },
                price: {
                    value: parseFloat(asowp_configurator_data.regularPrice) + finalPrices.value,
                    array: optionsPrices.value,
                    textAfter: configVisualiserTexts.value.textAfterPrice,
                },
                additionalOptions: customAdditionalValues.value,
            }
            console.log(templateData.value, "template")
        }



        console.log(configData.value, "Added")
        finish.value = true
        if(configTextType.value != 'neon'){
            await genImage(canvas, 'svg', 'finish-1')
        }else{
            prevImg.value = await genImage(canvas, 'png', 'preview')
        }
        if(configDoublePart.value.active){
            if(configTextType.value != 'neon'){
                await genImage(canvasBack, 'svg', 'finish-2')
            }else{
                prevImgBack.value = await genImage(canvasBack, 'png', 'preview')
            }
        }

    }

    var showImg = ref(false)
    var prevImg = ref("")
    var prevImgBack = ref("")
    function closeprevImg(){
        showImg.value = false
        currentSceneId.value = -1
        currentSceneUrl.value = 'none'
    }
    const showPreview = ref(null)
    async function showConfigRender(){
        showImg.value = true

        if(configDoublePart.value.active){
            if(activeFace.value === "front-face"){
                if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                    if(configTextType.value == 'neon'){
                        prevImg.value = await genImageWithWatermark(canvas, 'png', 'preview');
                    }else{
                        prevImg.value = await genImageWithWatermark(canvas, 'svg', 'preview');
                    }
                }else{
                    if(configTextType.value == 'neon'){
                        prevImg.value = await genImage(canvas, 'png', 'preview');
                    }else{
                        prevImg.value = await genImage(canvas, 'svg', 'preview');
                    }
                }
            }else if(activeFace.value === "back-face"){
                if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                    // prevImg.value = await genImageWithWatermark(canvasBack, 'svg', 'preview', 1317, 622);
                    if(configTextType.value == 'neon'){
                        prevImg.value = await genImageWithWatermark(canvasBack, 'png', 'preview', 1317, 622);
                    }else{
                        prevImg.value = await genImageWithWatermark(canvasBack, 'svg', 'preview', 1317, 622);
                    }
                }else{
                    if(configTextType.value == 'neon'){
                        prevImg.value = await genImage(canvasBack, 'png', 'preview');
                    }else{
                        prevImg.value = await genImage(canvasBack, 'svg', 'preview');
                    }
                }
            }
        }else{
            if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                if(configTextType.value == 'neon'){
                    prevImg.value = await genImageWithWatermark(canvas, 'png', 'preview');
                }else{
                    prevImg.value = await genImageWithWatermark(canvas, 'svg', 'preview');
                }
            }else{
                if(configTextType.value == 'neon'){
                    prevImg.value = await genImage(canvas, 'png', 'preview');
                }else{
                    prevImg.value = await genImage(canvas, 'svg', 'preview');
                }
            }
        }
    }
    async function downLoadConfigRender(){
        if(configDoublePart.value.active){
            if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                await genImageWithWatermark(canvas, 'svg', 'download', 1317, 622);
                await genImageWithWatermark(canvasBack, 'svg', 'download', 1317, 622);
            }else{
                await genImage(canvas, 'svg', 'download');
                await genImage(canvasBack, 'svg', 'download');
            }
        }else{
            if(configOutputSettings.value.waterMark && configOutputSettings.value.waterMark != ''){
                await genImageWithWatermark(canvas, 'svg', 'download', 1317, 622);
            }else{
                await genImage(canvas, 'svg', 'download');
                // await genImage(canvas, 'png', 'download');
            }
        }
    }
    var currentSceneId = ref(-1)
    var currentSceneUrl = ref('none')
    function slideSceneImage(to){
        var previewDiv = document.getElementById('showPreview')
        var scenes = configImageSettings.value.scenes
        if (scenes.length > 0) {
            if (to === 'right' && currentSceneId.value < scenes.length - 1) {
                currentSceneId.value += 1;
                currentSceneUrl.value = scenes[currentSceneId.value]
                setPreviewScene(scenes[currentSceneId.value], currentSceneId.value);
            } else if (to === 'left' && currentSceneId.value > -1) {
                currentSceneId.value -= 1;
                currentSceneUrl.value = scenes[currentSceneId.value]
                if (currentSceneId.value === -1) {
                    // Condition particulière pour l'indice -1
                    setPreviewScene('none', -1)
                } else {
                    setPreviewScene(scenes[currentSceneId.value], currentSceneId.value);
                }
            }
            // console.log(scenes.length, currentSceneId.value, to);
        }
        
    }
    function setPreviewScene(url, index){
        // console.log(url, index)
        var previewDiv = document.getElementById('showPreview')

        if (previewDiv) {
            if(url == 'none'){
                var removableDiv = previewDiv.querySelector('div');
                if(removableDiv){
                    previewDiv.removeChild(removableDiv);
                }

                currentSceneId.value = -1
                currentSceneUrl.value = 'none'
            }else{
                var removableDiv = previewDiv.querySelector('div');
                if(removableDiv){
                    previewDiv.removeChild(removableDiv);
                }
    
                var sceneClass = 'animated-bg asowp-w-full asowp-h-full asowp-absolute asowp-z-0 asowp-animate-slideToleft asowp-duration-300'
                currentSceneId.value = index
                currentSceneUrl.value = url
    
                // Définir l'image en arrière-plan dans une nouvelle div
                const imgDiv = document.createElement('div');
                imgDiv.className = sceneClass;
                imgDiv.style.backgroundImage = `url(${url})`;
                // previewDiv.style.backgroundImage = `url(${url})`;
                imgDiv.style.backgroundSize = 'cover'; // Pour couvrir toute la div
                imgDiv.style.backgroundPosition = 'center'; // Centrer l'image
                imgDiv.style.backgroundRepeat = 'no-repeat'; // Ne pas répéter l'image
                
                previewDiv.appendChild(imgDiv);
            }

            // console.log(imgDiv);
        }
    }



    function newCenterTool(canva){
        const originalPositions = canva.getObjects().map(obj => ({
            id: obj.id,
            left: obj.left,
            top: obj.top
        }));

        // Créer un groupe avec tous les objets du canvas
        const group = new fabric.Group(canva.getObjects(), {
            originX: 'center',
            originY: 'center'
        });

        // Centrer le groupe sur le canvas
        group.center();

        // Ajouter le groupe au canvas
        canva.add(group);

        // Supprimer les objets individuels du canvas (facultatif)
        canva.getObjects().forEach(obj => {
            if (obj !== group) {
                obj.set("visible", false);
            }
        });


        group.toActiveSelection();
        canva.getActiveObjects().forEach((obj, index) => {
            const originalPosition = originalPositions.find(pos => pos.id === obj.id);
            if (originalPosition) {
                obj.set({
                    left: originalPosition.left,
                    top: originalPosition.top
                });
            }
            canva.add(obj);
        });
        canva.discardActiveObject().renderAll();
    }

    // function applyNeonEffectToSVG(svgString, canva) {
    //     var neonTextArray = canva.getObjects().filter(obj => obj.name === "asowp-SignText" && obj.type === "neon-Text")
    //     // Parser le SVG en un document DOM
    //     const parser = new DOMParser();
    //     const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

    //     // Récupérer tous les éléments <text> dans le SVG
    //     const textElements = svgDoc.querySelectorAll('text');

    //     textElements.forEach(textElement => {
    //         // Récupérer le contenu du texte
    //         // const textContent = textElement.textContent.trim();
    //         const textContent = textElement.textContent;

    //         console.log(textContent, "rtyeotyeority", textElement)

    //         // Trouver l'objet correspondant dans le tableau neonTextArray
    //         const neonText = neonTextArray.find(item => item.text === textContent);

    //         if (neonText) {
    //             // Appliquer l'effet néon avec text-shadow
    //             textElement.setAttribute('style', `text-shadow: ${neonText.neonColor} 1px 0 20px; fill: ${neonText.fill}`);
    //             // textElement.setAttribute('font-size', `100px`);
    //         }
    //     });

    //     // Convertir le document SVG modifié en chaîne de caractères
    //     const serializer = new XMLSerializer();
    //     return serializer.serializeToString(svgDoc.documentElement);
    // }

    function applyNeonEffectToSVG(svgString, canva) {
        var neonTextArray = canva.getObjects().filter(obj => obj.name === "asowp-SignText" && obj.type === "neon-Text")
        // Parser le SVG en un document DOM
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

        // Récupérer tous les éléments <text> dans le SVG
        const textElements = svgDoc.querySelectorAll('text');

        textElements.forEach(textElement => {
            // Récupérer tous les <tspan> à l'intérieur de <text>
            const tspanElements = textElement.querySelectorAll('tspan');

            tspanElements.forEach(tspan => {
                const textContent = tspan.textContent;

                // Trouver l'objet correspondant dans neonTextArray
                const neonText = neonTextArray.find(item => item.text.includes(textContent.trim()));

                if (neonText && neonText.glowRadius > 0) {
                    // Appliquer l'effet néon avec text-shadow au <tspan> individuellement
                    tspan.setAttribute('style', `text-shadow: ${neonText.neonColor} 1px 0 20px; fill: ${neonText.fill}`);
                }
            });
        });

        // Convertir le document SVG modifié en chaîne de caractères
        const serializer = new XMLSerializer();
        return serializer.serializeToString(svgDoc.documentElement);
    }

    
    var imageCanvasRef = ref(null);
    function getUsedFonts(canva){
        var fonts = [];

        function removeDuplicates(array) {
            const uniqueItems = new Map();
        
            array.forEach(item => {
            const key = `${item.label}-${item.url}`; // Clé unique basée sur label + url
            uniqueItems.set(key, item);
            });
        
            return Array.from(uniqueItems.values());
        }
        
        let objects = canva.getObjects();
        objects.forEach(obj => {
            if(obj.name == "asowp-SignText"){
                fonts.push({
                    label: obj.fontFamily,
                    url: obj.fontFamilyUrl
                })
            }
        });

        fonts = removeDuplicates(fonts);

        return fonts;
    }
    async function getFontAsBase64(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }
    async function addFontsToSVG(svgContent, fonts) {
        let fontStyles = '';

        // Parcourir le tableau allFonts pour ajouter les polices
        for (const font of fonts) {
            const fontBase64 = await getFontAsBase64(font.url);
            fontStyles += `
                @font-face {
                    font-family: '${font.label.replaceAll(/\s+/g, '-')}';
                    src: url('${fontBase64}') format('woff2');
                }
            `;
        }

        // Insérer la balise <style> juste après l'ouverture de <svg>
        const svgWithFonts = svgContent.replace(
            /<svg[^>]*>/,
            `$&<style>${fontStyles}</style>`
        );

        return svgWithFonts;
    }

    async function genImage(canva, format, purpose, width, height) {
        try{
            var currentWidth = canva.width
            var currentHeight = canva.height


            var sign = handleGetObjectByName('safeObject', canva)          // img.scaleToHeight(40);
            const optionsPreview = {
                width: '100%',
                height: '100%',
                encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
            };

            const options = {
                width: '1900px',
                height: '1080px',
                // viewBox: {
                //     x: 0,
                //     y: 0,
                //     width: canva.width,
                //     height: canva.height,
                // },
                encoding: 'UTF-8',
            };


            function convertSvgToImage(svgDataUrl, format) {
                return new Promise((resolve, reject) => {
                    const canvas = document.createElement('canvas');
                    var tempCanvas = new fabric.Canvas(canvas, {
                        width: 1900,
                        height: 1080,
                        interactive: false,
                        backgroundColor: "transparent",
                    });

                    // Supprimer la balise <style> du SVG
                    fetch(svgDataUrl)
                        .then(response => response.text())
                        .then(svgText => {
                            const svgWithoutStyle = svgText.replace(/<style[\s\S]*?<\/style>/g, '');

                            // Convertir le SVG nettoyé en URL de données
                            const svgWithoutStyleUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgWithoutStyle)))}`;

                            // Charger le SVG nettoyé dans Fabric.js
                            fabric.loadSVGFromURL(svgWithoutStyleUrl, function (image, options) {
                                try {
                                    const img = fabric.util.groupSVGElements(image, options);

                                    img.scale(1);                                
                                    img.setCoords();

                                    // console.log(img._objects, "Image")

                                    img._objects.forEach((obj) => {
                                        if (obj.name === 'asowp-SignText') {
                                            console.log('Loaded Text Object:', {
                                                left: obj.left,
                                                top: obj.top,
                                                scaleX: obj.scaleX,
                                                scaleY: obj.scaleY,
                                                width: obj.width,
                                                height: obj.height,
                                                originX: obj.originX,
                                                originY: obj.originY,
                                            });
                                        }
                                    });

                                    var newW = img.width * img.scaleX
                                    var newH = img.height * img.scaleX


                                    tempCanvas.add(img);
                                    tempCanvas.renderAll();

                                    var dataUrl = ""
                                    switch (format) {
                                        case 'png':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'png',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'jpeg':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'jpeg',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'webp':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'webp',
                                                quality: 1.0
                                            });
                                        break;       
                                    }

                                    tempCanvas.dispose();

                                    // Résoudre la Promise avec l'URL des données
                                    resolve(dataUrl);
                                } catch (error) {
                                    reject(error);
                                }
                            });
                        })
                        .catch(error => reject(error));
                });
            }
    
            async function drawnPathFromText() {
                return new Promise((resolve, reject) => {
                    var elements = canva.getObjects()
                    let promises = []

                    elements.forEach((object, index) => {
                        if (object.name === 'safeObject') {
                            if (typeof object.fill !== 'string') {
                                var patternFill = object.fill
                                let promise = new Promise((resolve, reject) => {
                                    handleConvertImageToDataURI(object.fill.source.src, function(dataURI) {
                                        fabric.Image.fromURL(dataURI, (img) => {
                                            try {
                                                img.left = object.left;
                                                img.top = object.top;

                                                let scaleX = object.width / img.width;
                                                let scaleY = object.height / img.height;


                                                img.clipPath = handleClipAddedObject(canva);
                                                
                                                img.name = 'asowp-signPattern';

                                                img.scaleX = scaleX;
                                                img.scaleY = scaleY;
                                                
                                                // if (object.width > object.height) {
                                                //     img.scaleToWidth(object.width);
                                                // } else {
                                                //     img.scaleToHeight(object.height);
                                                // }
                                                var shadowRect = handleSetShadow(canva)
                                                object.shadow = null
                                                canva.add(img, shadowRect);
                                                img.moveTo(index + 1);
                                                shadowRect.sendToBack()                                                                                         
                                                
                                                canva.renderAll()
                                                resolve(img);
                                            } catch (error) {
                                                reject(error);
                                            }
                                        });
                                    });
                                });
                                promises.push(promise);
                            }
                        }
                    });

                    Promise.all(promises)
                        .then(groups => resolve(groups))
                        .catch(error => reject(error));
                });
            }
    
            var widthVisibility
            var heightVisibility
            var thickVisibility
            var borderPositionId
            var fixingPositionId
            canva.getObjects().forEach((object, index) => {
                if(object.name === 'widthLine' || object.name === 'width-value'){
                    widthVisibility = object.visible
                    object.set('visible', false);
                }
                if(object.name === 'heightLine' || object.name === 'height-value'){
                    heightVisibility = object.visible
                    object.set('visible', false);
                }
                if(object.name === 'asowp-SignText'){
                    // object.set('visible', false);
                }
                if(object.name === 'thickness-value'){
                    thickVisibility = object.visible
                    object.set('visible', false);
                }
                if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                    borderPositionId = index
                    object.bringToFront();
                }
                if(object.objectType === 'asowp-fixingMethods'){
                    fixingPositionId = index
                    object.bringToFront();
                }
            });
            canva.renderAll();
            simulateCanvasClick(canva)


            // Ajouter les polices dans le SVG
        
            await drawnPathFromText()

            // Générer le SVG avec les polices intégrées
            let svgContent = canva.toSVG(options);
            let usedFonts = getUsedFonts(canva)

            if(configTextType.value === "neon"){
                svgContent = applyNeonEffectToSVG(svgContent, canva)
            }
            const svgWithFonts = await addFontsToSVG(svgContent, usedFonts);
            const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgWithFonts))); 
                    
            // Générer le SVG avec les polices intégrées pour le preview
            const svgPreview = canva.toSVG(optionsPreview);
            const svgDataPreview = await addFontsToSVG(svgPreview, usedFonts);
            var previewScreen = document.getElementById('showPreview')


            var dataURL  = ""
            // Génère l'image avec le format spécifié
            switch (format) {
                case 'png':
                    canva.setWidth(1900)
                    canva.setHeight(1080)
                    checkScreenSize(1900, 1080)
                    canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                    dataURL = canva.toDataURL({
                        format: 'png',
                        quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    });

                    // dataURL = await convertSvgToImage(svgUrl, 'png')
                break;
    
                case 'jpeg':
                    canva.setWidth(1900)
                    canva.setHeight(1080)
                    checkScreenSize(1900, 1080)
                    canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                    canva.backgroundColor = configColors.value.canvasBackgroundColor
                    dataURL = canva.toDataURL({
                        format: 'jpeg',
                        quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    });
                    // dataURL = await convertSvgToImage(svgUrl, 'jpeg')
                break;
    
                case 'webp':
                    canva.setWidth(1900)
                    canva.setHeight(1080)
                    checkScreenSize(1900, 1080)
                    canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                    dataURL = canva.toDataURL({
                        format: 'webp',
                        quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    });
                    // dataURL = await convertSvgToImage(svgUrl, 'webp')
                break;
    
                case 'svg':
                    dataURL = svgUrl
                break;
            
                default:
    
                break;
            }
    
            // Restaure les dimensions et l'affichage originales du canvas
            canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
            canva.getObjects().forEach(object => {
                if(object.name === 'widthLine' || object.name === 'width-value'){
                    object.set('visible', widthVisibility);
                }
                if(object.name === 'heightLine' || object.name === 'height-value'){
                    object.set('visible', heightVisibility);
                }
                if(object.name === 'asowp-SignText'){
                    object.set('visible', true);
                }
                if(object.name === 'thickness-value'){
                    object.set('visible', thickVisibility);
                }
                if(object.name === 'watermark' || object.name === 'asowp-svg-path' || object.name === 'asowp-signPattern'){
                    // console.log(object, "watermark")
                    canva.remove(object)
                }
                if(object.name === 'safeObject'){
                    if(activeFace.value == 'front-face' && activeFace1Border.value != 'normal'){
                        object.shadow = defaultShadow.value
                    }
                    if(activeFace.value == 'back-face' && activeFace2Border.value != 'normal'){
                        object.shadow = defaultShadow.value
                    }
                }
                if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                    object.moveTo(borderPositionId);
                }
                if(object.objectType === 'asowp-fixingMethods'){
                    object.moveTo(fixingPositionId);
                }
            });

            if(purpose === 'preview'){
                // if(configTextType.value == 'neon'){
                //     canva.setWidth(1900)
                //     canva.setHeight(1080)
                //     checkScreenSize(1900, 1080)
                //     canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                //     prevImg.value = canva.toDataURL({
                //         format: 'png',
                //         quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                //     });
                    
                // }
                if(configTextType.value != 'neon'){
                    previewScreen.innerHTML = svgDataPreview;
    
                    const svgElement = previewScreen.querySelector('svg');
    
                    svgElement.classList.add('asowp-z-10');
                }

                if(configImageSettings.value.scenes.length > 0){
                    var miniPreview = document.getElementById('asowp-miniPreview')
                    miniPreview.innerHTML = svgDataPreview;
                }
            }else if(purpose === 'download'){
                const link = document.createElement('a');
                link.href = dataURL;
                // link.href = svgUrl;
                link.download = 'img'+'.'+format;
                link.click();
            }else if(purpose === 'finish-1'){
                var previewFinish1 = document.getElementById('asowp-previewFinish1')
                previewFinish1.innerHTML = svgDataPreview;
            }else if(purpose === 'finish-2'){
                var previewFinish1 = document.getElementById('asowp-previewFinish2')
                previewFinish1.innerHTML = svgDataPreview;
            }

            checkScreenSize()
            canva.renderAll();
            simulateCanvasClick(canva)

            return dataURL;

        }catch (error) {
            console.error("Une erreur est survenue:", error);
        }
        // return dataURL;

    }
    async function genImageWithWatermark(canva, format, purpose, width, height) {
        return new Promise((resolve, reject) => {
            try{
                // Sauvegarde les dimensions actuelles du canvas
                const originalWidth = canva.getWidth();
                const originalHeight = canva.getHeight();

                var canvasCenter = getCanvasCenter()

                // Redimensionne le canvas si les nouvelles dimensions sont spécifiées
                // if (width && height) {
                //     canva.setWidth(width);
                //     canva.setHeight(height);
                //     checkScreenSize(width, height)
                // }

                fabric.Image.fromURL(configOutputSettings.value.waterMark, async function(img) {  
                    var sign = handleGetObjectByName('safeObject', canva)          // img.scaleToHeight(40);
                    const imgWidth = 100;
                    const imgHeight = 100;
                    const spacing = 50; // Espacement entre les images

                    // Créer un canvas temporaire
                    const patternCanvas = document.createElement('canvas');
                    const patternContext = patternCanvas.getContext('2d');
                    // Définir les dimensions du canvas temporaire
                    patternCanvas.width = imgWidth + spacing;
                    patternCanvas.height = imgHeight + spacing;
                    // Dessiner l'image de filigrane sur le canvas temporaire
                    patternContext.drawImage(img.getElement(), 0, 0, imgWidth, imgHeight);
                    const pattern = new fabric.Pattern({
                        // source: img.getElement(),
                        source: patternCanvas,
                        repeat: 'no-repeat'
                    });
                    const watermarkRect = new fabric.Rect({
                        left: sign.left + sign.width - imgWidth - 10,
                        top: sign.top + sign.height - imgHeight - 10,
                        // left: -canvasCenter.x,
                        // top: -canvasCenter.y,
                        width: imgWidth,
                        height: imgHeight,
                        // width: (originalWidth*2),
                        // height: (originalHeight*2),
                        fill: pattern,  
                        selectable: false,
                        evented: false,
                        name: 'watermark',
                        opacity: 0.5,
                    });
                    canva.add(watermarkRect);
                    watermarkRect.bringToFront()


                    const optionsPreview = {
                        width: '100%',
                        height: '100%',
                        class: 'asowp-z-10',
                        // viewBox: {
                        //     x: -100,
                        //     y: -50,
                        //     width: canva.width+300,
                        //     height: canva.height+300
                        // },
                        encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
                    };

                    const options = {
                        width: '1900px',  // ou la largeur que vous souhaitez
                        height: '1080px', // ou la hauteur que vous souhaitez
                        encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
                    };
                    function checkWoff2(chaine) {
                        return chaine.endsWith('.woff2');
                    }

                    function hasExtendedLowercase(text, font, xHeight, fontSize) {
                        if (typeof text !== 'string') {
                            console.error('Text must be a string');
                            return false;
                        }
                        const testChars = ['a', 'x', 'o', 'n', 'm']; // Caractères de base pour la hauteur
                        const testExtendsChars = ['g', 'j', 'p', 'q', 'y'];
                        
                        // let hasSame = false;
                        // for (let char of testChars) {
                        //     if (char.match(/[a-z]/)) {
                        //         let path = font.getPath(char, 0, 0, fontSize);
                        //         let bbox = path.getBoundingBox();
                        //         console.log(xHeight, (bbox.y2 - bbox.y1), "erettrtretrre")
                        //         if (xHeight > bbox.y2 - bbox.y1) {
                        //             return true;
                        //         }
                        //     }
                        // }
                        for (let char of testExtendsChars) {
                            if (char.match(/[a-z]/)) {
                                let path = font.getPath(char, 0, 0, fontSize);
                                let bbox = path.getBoundingBox();
                                // console.log((bbox.y2 - bbox.y1), xHeight , "syojiçyboytrh")
                                // console.log((bbox.y2 - bbox.y1), xHeight*0.9 , "sfudbgpgoiebiàbj,yojiçyboytrh")
                                if (xHeight*0.9 > bbox.y2 - bbox.y1) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }

                    async function drawnPathFromText() {
                        return new Promise((resolve, reject) => {
                            var elements = canvas.getObjects()
                            let promises = []

                            elements.forEach((object, index) => {
                                if (object.name === 'safeObject') {
                                    if (typeof object.fill !== 'string') {
                                        var patternFill = object.fill
                                        let promise = new Promise((resolve, reject) => {
                                            handleConvertImageToDataURI(object.fill.source.src, function(dataURI) {
                                                fabric.Image.fromURL(dataURI, (img) => {
                                                    try {
                                                        img.left = object.left;
                                                        img.top = object.top;

                                                        let scaleX = object.width / img.width;
                                                        let scaleY = object.height / img.height;

                                                        img.clipPath = handleClipAddedObject(canva);
                                                        
                                                        img.name = 'asowp-signPattern';

                                                        img.scaleX = scaleX;
                                                        img.scaleY = scaleY;
                                                        
                                                        // if (object.width > object.height) {
                                                        //     img.scaleToWidth(object.width);
                                                        // } else {
                                                        //     img.scaleToHeight(object.height);
                                                        // }
                                                        var shadowRect = handleSetShadow(canva)
                                                        object.shadow = null
                                                        canva.add(img, shadowRect);
                                                        img.moveTo(index + 1);
                                                        shadowRect.sendToBack()                                                                                          
                                                        
                                                        object.fill = patternFill;
                                                        canva.renderAll()
                                                        resolve(img);
                                                    } catch (error) {
                                                        reject(error);
                                                    }
                                                });
                                            });
                                        });
                                        promises.push(promise);
                                    }
                                }
                            });

                            Promise.all(promises)
                                .then(groups => resolve(groups))
                                .catch(error => reject(error));
                        });
                    }

                    // function convertSvgToImage(svgDataUrl, format = 'png'){
                    //     const canvas = document.createElement('canvas');
                    //     var tempCanvas  = new fabric.Canvas(imageCanvasRef.value,{
                    //         width: 1900, 
                    //         height: 1080, 
                    //         interactive: false,
                    //         backgroundColor : "transparent",
                    //     });

                    //     var url = ''
                        
                    //     fabric.loadSVGFromURL(svgDataUrl, async function (image) {
                    //         const img = fabric.util.groupSVGElements(image);

                    //         img.scale(1.5);

                    //         img.setCoords();
                    //         var newWidth = img.width * img.scaleX;
                    //         var newHeight = img.height * img.scaleY;

                    //         img.width = 1900;
                    //         img.height = 1080;

                    //         tempCanvas.add(img);
                    //         img.center()
                    //         tempCanvas.renderAll();

                    //         console.log(tempCanvas, "tempCanvas", img)

                    //         const dataURL = tempCanvas.toDataURL({
                    //             format: 'png',
                    //             quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    //         });

                    //         url = await dataURL

                    //         var downloadLink = document.createElement("a");
                    //         downloadLink.href = dataURL ;
                    //         downloadLink.download = 'fileName' + ".png";

                    //         document.body.appendChild(downloadLink);
                    //         downloadLink.click();
                    //         document.body.removeChild(downloadLink);

                    //         tempCanvas.dispose()
                    //     });
                    // }
                    function convertSvgToImage(svgDataUrl, format) {
                        return new Promise((resolve, reject) => {
                            const canvas = document.createElement('canvas');
                            var tempCanvas = new fabric.Canvas(canvas, {
                                width: 1900,
                                height: 1080,
                                interactive: false,
                                backgroundColor: "transparent",
                            });

                            // fabric.Image.fromURL( svgDataUrl, function (img) {
                            //     try {
                            //         // const img = fabric.util.groupSVGElements(image, options);
                            //         img.scale(1);
                                    
                            //         // img.left = -300
                            //         // img.top = -300
                            //         img.setCoords();
                            //         var newW = img.width * img.scaleX
                            //         var newH = img.height * img.scaleX

                            //         // img.width = 1900;
                            //         // img.height = 1080;
                            //         // img.strokeWidth = 10
                            //         // img.stroke = 'red'

                            //         console.log(img.width, img.height, tempCanvas.width, tempCanvas.height, "tempCanvas")

                            //         tempCanvas.add(img);
                            //         // img.center();
                            //         tempCanvas.renderAll();

                            //         var dataUrl = ""
                            //         switch (format) {
                            //             case 'png':
                            //                 dataUrl = tempCanvas.toDataURL({
                            //                     format: 'png',
                            //                     quality: 1.0
                            //                 });
                            //             break;       
                            //             case 'jpeg':
                            //                 dataUrl = tempCanvas.toDataURL({
                            //                     format: 'jpeg',
                            //                     quality: 1.0
                            //                 });
                            //             break;       
                            //             case 'webp':
                            //                 dataUrl = tempCanvas.toDataURL({
                            //                     format: 'webp',
                            //                     quality: 1.0
                            //                 });
                            //             break;       
                            //         }

                            //         tempCanvas.dispose();

                            //         // Résoudre la Promise avec l'URL des données
                            //         resolve(dataUrl);
                            //     } catch (error) {
                            //         reject(error);
                            //     }
                            // });
                            fabric.loadSVGFromURL(svgDataUrl, function (image, options) {
                                try {
                                    const img = fabric.util.groupSVGElements(image, options);
                                    img.scale(1);
                                    
                                    // img.left = -300
                                    // img.top = -300
                                    img.setCoords();
                                    var newW = img.width * img.scaleX
                                    var newH = img.height * img.scaleX

                                    // img.width = 1900;
                                    // img.height = 1080;
                                    // img.strokeWidth = 10
                                    // img.stroke = 'red'

                                    // console.log(img.width, img.height, tempCanvas.width, tempCanvas.height, "tempCanvas")

                                    tempCanvas.add(img);
                                    // img.center();
                                    tempCanvas.renderAll();

                                    var dataUrl = ""
                                    switch (format) {
                                        case 'png':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'png',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'jpeg':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'jpeg',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'webp':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'webp',
                                                quality: 1.0
                                            });
                                        break;       
                                    }

                                    tempCanvas.dispose();

                                    // Résoudre la Promise avec l'URL des données
                                    resolve(dataUrl);
                                } catch (error) {
                                    reject(error);
                                }
                            });
                        });
                    }
            
            
                    var widthVisibility
                    var heightVisibility
                    var thickVisibility
                    var borderPositionId
                    var fixingPositionId
                    canva.getObjects().forEach((object, index) => {
                        // if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'asowp-SignText'){
                        //     object.set('visible', false);
                        // }
                        if(object.name === 'widthLine' || object.name === 'width-value'){
                            widthVisibility = object.visible
                            object.set('visible', false);
                        }
                        if(object.name === 'heightLine' || object.name === 'height-value'){
                            heightVisibility = object.visible
                            object.set('visible', false);
                        }
                        if(object.name === 'asowp-SignText'){
                            // object.set('visible', true);
                        }
                        if(object.name === 'thickness-value'){
                            thickVisibility = object.visible
                            object.set('visible', false);
                        }
                        if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                            borderPositionId = index
                            object.bringToFront();
                        }
                        if(object.objectType === 'asowp-fixingMethods'){
                            fixingPositionId = index
                            object.bringToFront();
                        }
                    });
                    canva.renderAll();

                    await drawnPathFromText()
                    simulateCanvasClick(canva)
                            
                    let svgContent = canva.toSVG(options);
                    let usedFonts = getUsedFonts(canva)

                    if(configTextType.value == "neon"){
                        svgContent = applyNeonEffectToSVG(svgContent, canva)
                    }
                    const svgWithFonts = await addFontsToSVG(svgContent, usedFonts);
                    const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgWithFonts))); 
                            
                    // Générer le SVG avec les polices intégrées pour le preview
                    const svgPreview = canva.toSVG(optionsPreview);
                    const svgDataPreview = await addFontsToSVG(svgPreview, usedFonts);
                    
                    var previewScreen = document.getElementById('showPreview')
                    var dataURL  = ""
                    // Génère l'image avec le format spécifié
                    switch (format) {
                        case 'png':
                            canva.setWidth(1900)
                            canva.setHeight(1080)
                            checkScreenSize(1900, 1080)
                            canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                            dataURL = canva.toDataURL({
                                format: 'png',
                                quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                            });
                            // dataURL = await convertSvgToImage(svgUrl, 'png')
                        break;
            
                        case 'jpeg':
                            canva.setWidth(1900)
                            canva.setHeight(1080)
                            checkScreenSize(1900, 1080)
                            canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                            canva.backgroundColor = configColors.value.canvasBackgroundColor
                            dataURL = canva.toDataURL({
                                format: 'jpeg',
                                quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                            });
                            // dataURL = await convertSvgToImage(svgUrl, 'jpeg')
                        break;
            
                        case 'webp':
                            canva.setWidth(1900)
                            canva.setHeight(1080)
                            checkScreenSize(1900, 1080)
                            canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                            dataURL = canva.toDataURL({
                                format: 'webp',
                                quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                            });
                            // dataURL = await convertSvgToImage(svgUrl, 'webp')
                        break;
            
                        case 'svg':
                            dataURL = svgUrl
                        break;
                    
                        default:
            
                        break;
                    }
            
                    // Restaure les dimensions et l'affichage originales du canvas
                    canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
                    canva.getObjects().forEach(object => {
                        // if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'asowp-SignText'){
                        //     object.set('visible', true);
                        // }
                        if(object.name === 'widthLine' || object.name === 'width-value'){
                            object.set('visible', widthVisibility);
                        }
                        if(object.name === 'heightLine' || object.name === 'height-value'){
                            object.set('visible', heightVisibility);
                        }
                        if(object.name === 'asowp-SignText'){
                            // object.set('visible', false);
                        }
                        if(object.name === 'thickness-value'){
                            object.set('visible', thickVisibility);
                        }
                        if(object.name === 'watermark' || object.name === 'asowp-svg-path' || object.name === 'asowp-signPattern'){
                            // console.log(object, "watermark")
                            canva.remove(object)
                        }
                        if(object.name === 'safeObject'){
                            if(activeFace.value == 'front-face' && activeFace1Border.value != 'normal'){
                                object.shadow = defaultShadow.value
                            }
                            if(activeFace.value == 'back-face' && activeFace2Border.value != 'normal'){
                                object.shadow = defaultShadow.value
                            }
                        }
                        if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                        // borderPositionId = index
                            object.moveTo(borderPositionId);
                        }
                        if(object.objectType === 'asowp-fixingMethods'){
                            object.moveTo(fixingPositionId);
                        }
                    });
        
        
                    if(purpose === 'preview'){
                        // if(configTextType.value == 'neon'){
                        //     canva.setWidth(1900)
                        //     canva.setHeight(1080)
                        //     checkScreenSize(1900, 1080)
                        //     canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                        //     prevImg.value = canva.toDataURL({
                        //         format: 'png',
                        //         quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                        //     });                   
                        // }
                        if(configTextType.value != 'neon'){
                            previewScreen.innerHTML = svgDataPreview;
        
                            const svgElement = previewScreen.querySelector('svg');
        
                            // Ajoutez une classe à l'élément SVG
                            svgElement.classList.add('asowp-z-10');
                        }

                        if(configImageSettings.value.scenes.length > 0){
                            var miniPreview = document.getElementById('asowp-miniPreview')
                            miniPreview.innerHTML = svgDataPreview;

                        }
                    }else{
                        var ink = document.createElement("a");
                        ink.href = dataURL;
                        ink.download = 'image' + "." + format;
                        document.body.appendChild(ink);
                        ink.click();
                        document.body.removeChild(ink);
                    }

                    checkScreenSize()
                    canva.renderAll();
                    simulateCanvasClick(canva)

                    resolve(dataURL)
                });
            }catch (error) {
                reject("Une erreur est survenue:", error);
            }
        })
        // return dataURL;

    }
    async function genImageWithoutFixing(canva, format, purpose, width, height) {
        try{
            var currentWidth = canva.width
            var currentHeight = canva.height


            var sign = handleGetObjectByName('safeObject', canva)          // img.scaleToHeight(40);
            const optionsPreview = {
                width: '100%',
                height: '100%',
                encoding: 'UTF-8' // optionnel, mais recommandé pour la compatibilité
            };

            const options = {
                width: '1900px',
                height: '1080px',
                // viewBox: {
                //     x: 0,
                //     y: 0,
                //     width: canva.width,
                //     height: canva.height,
                // },
                encoding: 'UTF-8',
            };


            function convertSvgToImage(svgDataUrl, format) {
                return new Promise((resolve, reject) => {
                    const canvas = document.createElement('canvas');
                    var tempCanvas = new fabric.Canvas(canvas, {
                        width: 1900,
                        height: 1080,
                        interactive: false,
                        backgroundColor: "transparent",
                    });

                    // Supprimer la balise <style> du SVG
                    fetch(svgDataUrl)
                        .then(response => response.text())
                        .then(svgText => {
                            const svgWithoutStyle = svgText.replace(/<style[\s\S]*?<\/style>/g, '');

                            // Convertir le SVG nettoyé en URL de données
                            const svgWithoutStyleUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgWithoutStyle)))}`;

                            // Charger le SVG nettoyé dans Fabric.js
                            fabric.loadSVGFromURL(svgWithoutStyleUrl, function (image, options) {
                                try {
                                    const img = fabric.util.groupSVGElements(image, options);

                                    img.scale(1);                                
                                    img.setCoords();

                                    // console.log(img._objects, "Image")

                                    img._objects.forEach((obj) => {
                                        if (obj.name === 'asowp-SignText') {
                                            console.log('Loaded Text Object:', {
                                                left: obj.left,
                                                top: obj.top,
                                                scaleX: obj.scaleX,
                                                scaleY: obj.scaleY,
                                                width: obj.width,
                                                height: obj.height,
                                                originX: obj.originX,
                                                originY: obj.originY,
                                            });
                                        }
                                    });

                                    var newW = img.width * img.scaleX
                                    var newH = img.height * img.scaleX


                                    tempCanvas.add(img);
                                    tempCanvas.renderAll();

                                    var dataUrl = ""
                                    switch (format) {
                                        case 'png':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'png',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'jpeg':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'jpeg',
                                                quality: 1.0
                                            });
                                        break;       
                                        case 'webp':
                                            dataUrl = tempCanvas.toDataURL({
                                                format: 'webp',
                                                quality: 1.0
                                            });
                                        break;       
                                    }

                                    tempCanvas.dispose();

                                    // Résoudre la Promise avec l'URL des données
                                    resolve(dataUrl);
                                } catch (error) {
                                    reject(error);
                                }
                            });
                        })
                        .catch(error => reject(error));
                });
            }
    
            async function drawnPathFromText() {
                return new Promise((resolve, reject) => {
                    var elements = canva.getObjects()
                    let promises = []

                    elements.forEach((object, index) => {
                        if (object.name === 'safeObject') {
                            if (typeof object.fill !== 'string') {
                                var patternFill = object.fill
                                let promise = new Promise((resolve, reject) => {
                                    handleConvertImageToDataURI(object.fill.source.src, function(dataURI) {
                                        fabric.Image.fromURL(dataURI, (img) => {
                                            try {
                                                let scaleX = object.width / img.width;
                                                let scaleY = object.height / img.height;

                                                img.left = object.left;
                                                img.top = object.top;

                                                img.clipPath = handleClipAddedObject(canva);
                                                
                                                img.name = 'asowp-signPattern';

                                                img.scaleX = scaleX;
                                                img.scaleY = scaleY;
                                                
                                                
                                                // if (object.width > object.height) {
                                                //     img.scaleToWidth(object.width);
                                                // } else {
                                                //     img.scaleToHeight(object.height);
                                                // }


                                                var shadowRect = handleSetShadow(canva)
                                                object.shadow = null
                                                canva.add(img, shadowRect);
                                                img.moveTo(index + 1);
                                                shadowRect.sendToBack()                                                                                         
                                                
                                                canva.renderAll()
                                                resolve(img);
                                            } catch (error) {
                                                reject(error);
                                            }
                                        });
                                    });
                                });
                                promises.push(promise);
                            }
                        }
                    });

                    Promise.all(promises)
                        .then(groups => resolve(groups))
                        .catch(error => reject(error));
                });
            }
            var noShadow = new fabric.Shadow({
              color: "black",
              offsetX: 0,
              offsetY: 0,
              blur: 0,
              isActive: true,
            });
    
            var widthVisibility
            var heightVisibility
            var thickVisibility
            var borderPositionId
            var fixingPositionId
            let fixingVisibility
            let signShadow
            let borderShadow
            canva.getObjects().forEach((object, index) => {
                if(object.name === 'widthLine' || object.name === 'width-value'){
                    widthVisibility = object.visible
                    object.set('visible', false);
                }
                if(object.name === 'heightLine' || object.name === 'height-value'){
                    heightVisibility = object.visible
                    object.set('visible', false);
                }
                if(object.name === 'asowp-SignText'){
                    // object.set('visible', false);
                }
                if(object.name === 'thickness-value'){
                    thickVisibility = object.visible
                    object.set('visible', false);
                }
                if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                    borderPositionId = index
                    object.bringToFront();
                }
                if(object.objectType === 'asowp-fixingMethods'){
                    fixingVisibility = object.visible
                    fixingPositionId = index
                    object.bringToFront();
                    object.set('visible', false);
                }
                if(object.name === 'safeObject'){
                    signShadow = object.shadow
                    object.shadow = noShadow
                }
                if(object.name === 'normal-border'){
                    borderShadow = object.shadow
                    object.shadow = noShadow
                }
            });
            canva.renderAll();


            await drawnPathFromText()

            // Générer le SVG avec les polices intégrées
            let svgContent = canva.toSVG(options);
            let usedFonts = getUsedFonts(canva)

            if(configTextType.value === "neon"){
                svgContent = applyNeonEffectToSVG(svgContent, canva)
            }
            const svgWithFonts = await addFontsToSVG(svgContent, usedFonts);
            const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgWithFonts))); 
                    
            // Générer le SVG avec les polices intégrées pour le preview
            const svgPreview = canva.toSVG(optionsPreview);
            const svgDataPreview = await addFontsToSVG(svgPreview, usedFonts);
            var previewScreen = document.getElementById('showPreview')


            var dataURL  = ""
            // Génère l'image avec le format spécifié
            switch (format) {
                case 'png':
                    canva.setWidth(1900)
                    canva.setHeight(1080)
                    checkScreenSize(1900, 1080)
                    canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                    dataURL = canva.toDataURL({
                        format: 'png',
                        quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    });

                    // dataURL = await convertSvgToImage(svgUrl, 'png')
                break;
    
                case 'jpeg':
                    canva.setWidth(1900)
                    canva.setHeight(1080)
                    checkScreenSize(1900, 1080)
                    canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                    canva.backgroundColor = configColors.value.canvasBackgroundColor
                    dataURL = canva.toDataURL({
                        format: 'jpeg',
                        quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    });
                    // dataURL = await convertSvgToImage(svgUrl, 'jpeg')
                break;
    
                case 'webp':
                    canva.setWidth(1900)
                    canva.setHeight(1080)
                    checkScreenSize(1900, 1080)
                    canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                    dataURL = canva.toDataURL({
                        format: 'webp',
                        quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                    });
                    // dataURL = await convertSvgToImage(svgUrl, 'webp')
                break;
    
                case 'svg':
                    dataURL = svgUrl
                break;
            
                default:
    
                break;
            }
    
            // Restaure les dimensions et l'affichage originales du canvas
            canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
            canva.getObjects().forEach(object => {
                if(object.name === 'widthLine' || object.name === 'width-value'){
                    object.set('visible', widthVisibility);
                }
                if(object.name === 'heightLine' || object.name === 'height-value'){
                    object.set('visible', heightVisibility);
                }
                if(object.name === 'asowp-SignText'){
                    object.set('visible', true);
                }
                if(object.name === 'thickness-value'){
                    object.set('visible', thickVisibility);
                }
                if(object.name === 'watermark' || object.name === 'asowp-svg-path' || object.name === 'asowp-signPattern'){
                    // console.log(object, "watermark")
                    canva.remove(object)
                }
                if(object.name === 'safeObject'){
                    if(activeFace.value == 'front-face' && activeFace1Border.value != 'normal'){
                        object.shadow = defaultShadow.value
                    }
                    if(activeFace.value == 'back-face' && activeFace2Border.value != 'normal'){
                        object.shadow = defaultShadow.value
                    }
                }
                if(object.name === 'old-world-border' || object.name === 'rounded-corners-border'){
                    object.moveTo(borderPositionId);
                }
                if(object.objectType === 'asowp-fixingMethods'){
                    object.moveTo(fixingPositionId);
                    object.set('visible', fixingVisibility);
                }
                if(object.name === 'safeObject'){
                    object.shadow = signShadow
                }
                if(object.name === 'normal-border'){
                    object.shadow = borderShadow
                }
            });


            if(purpose === 'preview'){
                // if(configTextType.value == 'neon'){

                //     canva.setWidth(1900)
                //     canva.setHeight(1080)
                //     checkScreenSize(1900, 1080)
                //     canva.zoomToPoint({x: canva.getWidth() /2, y: canva.getHeight() /2}, 1.5)

                //     prevImg.value = canva.toDataURL({
                //         format: 'png',
                //         quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                //     });
                     
                // }
                if(configTextType.value != 'neon'){
                    previewScreen.innerHTML = svgDataPreview;
    
                    const svgElement = previewScreen.querySelector('svg');
    
                    svgElement.classList.add('asowp-z-10');
                }
                
                if(configImageSettings.value.scenes.length > 0){
                    var miniPreview = document.getElementById('asowp-miniPreview')
                    miniPreview.innerHTML = svgDataPreview;
                }
            }else if(purpose === 'download'){
                const link = document.createElement('a');
                link.href = dataURL;
                // link.href = svgUrl;
                link.download = 'img'+'.'+format;
                link.click();
            }else if(purpose === 'finish-1'){
                var previewFinish1 = document.getElementById('asowp-previewFinish1')
                previewFinish1.innerHTML = svgDataPreview;
            }else if(purpose === 'finish-2'){
                var previewFinish1 = document.getElementById('asowp-previewFinish2')
                previewFinish1.innerHTML = svgDataPreview;
            }

            checkScreenSize()
            canva.renderAll();

            return dataURL;

        }catch (error) {
            console.error("Une erreur est survenue:", error);
        }
        // return dataURL;

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
    function generateHighResolutionImage(canva, format) {
        // Dimensions actuelles du canvas en pixels
        var width = 12
        var height = 7
        var dpi = 300
        
        var originalWidth = 0
        var originalHeight = 0
        const originalZoom = canva.getZoom();
        if(width){
            var realWidth = convertToPx(width, 'in')
            var realHeight = convertToPx(height, 'in')
            originalWidth = realWidth;
            originalHeight = realHeight;
        }else{
            originalWidth = canva.width;
            originalHeight = canva.height;
        }


        // Taille physique en pouces (supposons que le canvas est initialement à 72 DPI)
        const widthInInches = originalWidth / 72;
        const heightInInches = originalHeight / 72;

        // Nouvelles dimensions pour 300 DPI
        const scaleFactor = dpi / 72;
        const newWidth = Math.round(originalWidth * scaleFactor);
        const newHeight = Math.round(originalHeight * scaleFactor);

        // console.log(scaleFactor, newWidth, newHeight, originalWidth, originalHeight)
        //cacher les element à retirer de l'image
        var thickVisibility
        canva.getObjects().forEach(object => {
            if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'thickness-value'){
                object.set('visible', false);
            }
            if(object.name === 'thickness-value'){
                thickVisibility = object.visible
                object.set('visible', false);
            }
            // if(object.name === 'watermark'){
            //     canva.remove(object)
            // }
        });

        // Créer un canvas temporaire à haute résolution
        // const tempCanvas = new fabric.Canvas(document.createElement('canvas'));
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;
        const tempContext = tempCanvas.getContext('2d');

        // Configurer le lissage
        tempContext.imageSmoothingEnabled = true;
        tempContext.imageSmoothingQuality = 'high';

        // Augmenter temporairement la taille du canvas Fabric
        canva.setWidth(newWidth);
        canva.setHeight(newHeight);
        canva.setZoom(12);
        centerSign(canva)


        // Rendre le canvas à la nouvelle résolution
        canva.renderAll();

        // Copier le contenu sur le canvas temporaire
        tempContext.drawImage(canva.getElement(), 0, 0, newWidth, newHeight);

        // Restaurer les dimensions originales du canvas Fabric
        canva.setWidth(originalWidth);
        canva.setHeight(originalHeight);
        canva.getObjects().forEach(object => {
            if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'thickness-value'){
                object.set('visible', true);
            }
            if(object.name === 'thickness-value'){
                object.set('visible', thickVisibility);
            }
        });
        // canva.setZoom(originalZoom);
        checkScreenSize()


        function canvasToSVG(canva, width, height) {
            // Obtenez l'image base64 du canvas
            const imageData = canva.toDataURL('image/png');
            
            // Créez le contenu SVG
            const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                <image width="${width}" height="${height}" href="${imageData}" />
                </svg>
            `;
            
            // Encodez le contenu SVG en base64
            const svgBase64 = btoa(unescape(encodeURIComponent(svgContent)));
            const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;
            
            return dataUrl;
        }

        canva.renderAll();

        // Générer l'URL de données de l'image
        // const dataUrl = tempCanvas.toDataURL(`image/${format}`, 1.0);
        var dataUrl = ''
        switch (format) {
            case 'png':
                dataUrl = tempCanvas.toDataURL({
                    format: 'png',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
            break;

            case 'jpeg':
                canva.backgroundColor = configColors.value.canvasBackgroundColor
                dataUrl = tempCanvas.toDataURL({
                    format: 'jpeg',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
            break;

            case 'webp':
                dataUrl = tempCanvas.toDataURL({
                    format: 'webp',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
            break;

            case 'svg':
                // const svgData = canva.toSVG();
                const svgData = tempCanvas.toDataURL({
                    format: 'png',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
                // dataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                dataUrl = canvasToSVG(tempCanvas, newWidth, newHeight)
            break;

            case 'pdf':
                const zoom = canva.getZoom();
                const pan = canva.viewportTransform;
                const pdfWidth = newWidth / zoom;
                const pdfHeight = newHeight / zoom;
                const offsetX = -pan[4] / zoom;
                const offsetY = -pan[5] / zoom;

                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'px',
                    format: [pdfWidth, pdfHeight]
                });

                pdf.addImage(tempCanvas.toDataURL('image/png'), 'PNG', offsetX/4, offsetY/100, pdfWidth/2, pdfHeight/2);
                const pdfOutput = pdf.output('blob');

                dataUrl = pdfOutput
            break;
        
            default:

            break;
        }
        // return new Promise((resolve, reject) => {
        //     try {
        //         var dataUrl = '';
        //         switch (format) {
        //             case 'png':
        //                 dataUrl = tempCanvas.toDataURL('image/png', 1.0);
        //                 resolve(dataUrl);
        //                 break;
        //             case 'jpeg':
        //                 canva.backgroundColor = configColors.value.canvasBackgroundColor;
        //                 dataUrl = tempCanvas.toDataURL('image/jpeg', 1.0);
        //                 resolve(dataUrl);
        //                 break;
        //             case 'webp':
        //                 dataUrl = tempCanvas.toDataURL('image/webp', 1.0);
        //                 resolve(dataUrl);
        //                 break;
        //             case 'svg':
        //                 dataUrl = canvasToSVG(tempCanvas, newWidth, newHeight);
        //                 resolve(dataUrl);
        //                 break;
        //             case 'pdf':
        //                 const pdf = new jsPDF({
        //                     orientation: newWidth > newHeight ? 'landscape' : 'portrait',
        //                     unit: 'px',
        //                     format: [newWidth, newHeight]
        //                 });

        //                 pdf.addImage(tempCanvas.toDataURL('image/png'), 'PNG', 0, 0, newWidth, newHeight);
        //                 const pdfOutput = pdf.output('blob');
        //                 resolve(pdfOutput); // Résoudre avec le Blob directement
        //             break;
        //             reject(new Error('Format non supporté'));
        //         }
        //     } catch (error) {
        //         reject(error);
        //     }
        // });

        // const link = document.createElement('a');
        // link.href = dataUrl;
        // link.download = 'my_design';
        // link.click();

        // Créer un objet avec les informations utiles
        return dataUrl
        // return {
        //     dataUrl: dataUrl,
        //     width: newWidth,
        //     height: newHeight,
        //     widthInInches: widthInInches,
        //     heightInInches: heightInInches,
        //     dpi: dpi
        // };
    }


    // fonctions concernant l'affichage des exemples
    //popup d'exemple matéral
    var showMaterialEx = ref(false)
    var materialExample = ref('')
    function showMaterialExample(statut, example){
        showMaterialEx.value = statut
        if(example){
            materialExample.value = example
        }
    }

    //popup d'exemple fixing-methode
    var showFixingEx = ref(false)
    var fixingExample = ref('')
    function showFixingExample(statut, example){
        showFixingEx.value = statut
        if(example){
            fixingExample.value = example
        }
    }    

    //popup d'exemple matéral
    var showAddComponentEx = ref(false)
    var addComponentExample = ref('')
    var addComponentExId = ref(0)
    function showAddComponentExample(statut, example, id){
        showAddComponentEx.value = statut
        if(id){
            addComponentExId.value = id
        }
        if(example){
            addComponentExample.value = example
        }
    }    

    // popup d'example additionnal options "yes/no"
    var yesNoIndex = ref()
    var showYesNo = ref(false)
    var showYesNoImg =ref("")
    function showYesNoExample(img, id){
        yesNoIndex.value = id
        showYesNo.value = !showYesNo.value
        showYesNoImg.value = img
    }

    // popup d'example additionnal options "image-input"
    var inputImageIndex = ref();
    var inputImageLabel = ref('');
    var inputImageExample = ref(false);
    var inputImageImg = ref('');
    function showInputImageExample(img, id, label){
        inputImageIndex.value = id;
        inputImageLabel.value = label;
        inputImageExample.value = !inputImageExample.value
        inputImageImg.value = img
    }

    //popup d'example additionnal option "dropdown"
    var dropdownExampleImg = ref('');
    var dropdownExample = ref(false);
    function showDropdownExample(){
        dropdownExample.value = !dropdownExample.value
    }

    var textSideHelp = ref(false);
    function show3DTextHelp(){
        textSideHelp.value = !textSideHelp.value
    }

    const isAddingToCart = ref(false)
    const addToCart = async ()=>{
        isAddingToCart.value = true;
        const cart_data = {
            recaps:{...configData.value,
                custom_price: parseFloat(
                    finalPrices.value + parseFloat(asowp_configurator_data.regularPrice)
                ).toFixed(asowp_configurator_data.decimals)
            },
            variation_id:asowp_configurator_data.productID,
            quantity:1
        }
        var add = await add_to_cart(asowp_data.ajax_url, cart_data,asowp_configurator_data.frontend_nonce,props.config.data.settings.generals.product.redirectToCheckOutPage);
        if(!add.success){
            toastMessage(add.message,"error");
            isAddingToCart.value = false
        }
    }

    const isSavingTemplate = ref(false)
    const saveTemplate = async ()=>{
        isSavingTemplate.value = true;
        const template_data = {
            ...template.value,
            data:{
                templateData:{...templateData.value},
                cartData:{...configData.value,custom_price:finalPrices.value}
            }
        }
        const result = await api.updateTemplate(template_id,template_data);
        if(result.success){
            isSavingTemplate.value=false;
            if(result.success == true){
                toastMessage(result.message);
            }else{
                toastMessage(result.message,"warning");
            }
        }else{
            isSavingTemplate.value=false;            
            toastMessage(result.message,"error");
        }
    }


    onMounted(async() => {

        try{
            await document.fonts.ready;

            if(document.querySelector("#asowp-configurator-loader")){
                document.querySelector("#asowp-configurator-loader").remove();
            }
            configSettings.value = props.config.data.settings
            configDoublePart.value = props.config.data.settings.customizerSign.signPart.doublePart

            // allSizes.value = props.manage.manageSize
            allMaterials.value = props.config.data.materials
            allShapes.value = props.manage.allShapes
            allFixings.value = props.manage.allFixingMethod
            allColors.value = props.manage.colors
            allBorders.value = props.manage.allBorder
            allFonts.value = props.manage.fonts
            allClipart.value = props.manage.cliparts
            
            configTextSettings.value = props.config.data.settings.customizerSign.text
            configTextFontSettings.value = props.config.data.settings.customizerSign.text.enableFontSize
            configImageSettings.value = props.config.data.settings.customizerSign.images
            configImageSettingsClipart.value = props.config.data.settings.customizerSign.images.enableClipart
            configImageSettingsFilters.value = props.config.data.settings.customizerSign.images.filter
            configSectionIcons.value = props.config.data.settings.languageImages.images
            configOutputSettings.value = props.config.data.settings.generals.output
            configVisualiserTexts.value = props.config.data.settings.languageImages.visualizer
            configTextType.value = configTextSettings.value.textType;

            customSizeValues.value.label = (configVisualiserTexts.value.customSize && configVisualiserTexts.value.customSize.trim() !== '' ? configVisualiserTexts.value.customSize : 'Custom size')

            configAdditionnalOptions.value = props.config.data.additionalOptions
            
            // console.log(props.config.data.settings.languageImages.uploadDesign, "configTextFontSettings")

            let acceptedFormatTable = configImageSettings.value.fileUploadScript.allowedUploadsExtentions.map(element => (element === 'svg' ? 'image/svg+xml' : 'image/' + element));
            configImagesFormat.value = acceptedFormatTable.join(', ');
            // console.log(props.template, "config")

            handleGetImageSettings(configImageSettings.value)
            // console.log(configImageSettings.value.scenes, "configTextFontSettings")

            handleGetCurrentUnit(configSettings.value.customizerSign.customizerOptions.measurementUnit, configTextFontSettings.value.defaultFontSize, configTextFontSettings.value.minimumFontSize, configTextFontSettings.value.maximumFontSize, (allFonts.value.length > 0 ? allFonts.value[0].label : 'Arial'), (allFonts.value.length > 0 ? allFonts.value[0].url : ''))
            handleGetDefaultText(
                {
                    width: (configVisualiserTexts.value.textWidth && configVisualiserTexts.value.textWidth.trim() !== '' ? configVisualiserTexts.value.textWidth : 'width'),
                    height: (configVisualiserTexts.value.textHeight && configVisualiserTexts.value.textHeight.trim() !== '' ? configVisualiserTexts.value.textHeight : 'height'),
                    left: (configVisualiserTexts.value.textLeft && configVisualiserTexts.value.textLeft.trim() !== '' ? configVisualiserTexts.value.textLeft : 'Left'),
                    top: (configVisualiserTexts.value.textTop && configVisualiserTexts.value.textTop.trim() !== '' ? configVisualiserTexts.value.textTop : 'top'),
                    right: (configVisualiserTexts.value.textRight && configVisualiserTexts.value.textRight.trim() !== '' ? configVisualiserTexts.value.textRight : 'right'),
                    bottom: (configVisualiserTexts.value.textBottom && configVisualiserTexts.value.textBottom.trim() !== '' ? configVisualiserTexts.value.textBottom : 'bottom'),
                }
            )
            handleGetTextType(configTextType.value)
            
            fontFamSelected.value = (allFonts.value.length > 0 ? allFonts.value[0].label : 'Arial')
            configUnit.value = configSettings.value.customizerSign.customizerOptions.measurementUnit
            

            var optionss = document.querySelector('#asowp-options-container')
            document.addEventListener('click', handleDocumentClick)
            console.log(fabric.version)

            const canvasElementFace1 = canvasFace1Ref.value
            const canvasElementFace2 = canvasFace2Ref.value

            // document.addEventListener("DOMContentLoaded", function() {

                var canvasContainer = document.getElementById("asowp-canvas-containers")
                var canvasWidth = canvasContainer.clientWidth;
                var canvasHeight = canvasContainer.clientHeight;

                canvas = new fabric.Canvas(canvasElementFace1,{
                    // backgroundColor : "#f5f5f5",
                    width: canvasWidth, 
                    height: canvasHeight, 
                    // selectable: true,
                    // hasControls: true,
                    interactive: true,
                    name: 'front-face'
                });
                canvasBack = new fabric.Canvas(canvasElementFace2,{
                    // backgroundColor : "#f5f5f5",
                    width: canvasElementFace2.clientWidth, 
                    height: canvasElementFace2.clientHeight, 
                    // selectable: true,
                    // hasControls: true,
                    interactive: true,
                    name: 'back-face'
                });

                canvas.hoverCursor = 'pointer';
                canvasBack.hoverCursor = 'pointer';

                const rectWidth = 400; 
                const rectHeight = 200; 
                const clipWidth = rectWidth + (rectWidth * 0.3); 
                const clipHeight = rectHeight + (rectHeight * 0.3); 

                const rectLeft = (canvas.width /2) -(rectWidth/2)
                const rectTop = (canvas.height/2) - (rectHeight/2);
                const clipLeft = (canvas.width /2) -(clipWidth/2)
                const clipTop = (canvas.height/2) - (clipHeight/2);

                const rectangle = new fabric.Rect({
                    width: rectWidth,
                    height: rectHeight,
                    fill: '#cfcece', // Couleur du rectangle
                    left: rectLeft,
                    top: rectTop,
                    shadow: defaultShadow.value,
                    selectable: false,
                    name: 'safeObject',
                    originX: 'center',
                    originY: 'center',
                    id: 0,
                });
                const rectangle2 = new fabric.Rect({
                    width: rectWidth,
                    height: rectHeight,
                    fill: '#cfcece', // Couleur du rectangle
                    left: rectLeft,
                    top: rectTop,
                    shadow: defaultShadow.value,
                    selectable: false,
                    name: 'safeObject',
                    originX: 'center',
                    originY: 'center',
                    id: 0,
                });
                
                const cnvasClip = new fabric.Rect({
                    width: clipWidth ,
                    height: clipHeight ,
                    left: clipLeft,
                    top: clipTop,
                });

                const bodyElement = document.body;
                const computedStyle = getComputedStyle(bodyElement);

                const pageFontFamily = computedStyle.fontFamily

                var hLine = new fabric.Line([(rectangle.left + rectangle.width +20), rectangle.top, (rectangle.left + rectangle.width +20), (rectangle.top + rectangle.height)], {
                    stroke: 'black',
                    strokeWidth: 2,
                    selectable: false,
                    name: 'heightLine',
                    id: 1, 
                    visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-height' ? true : false)
                });
                var hValue = new fabric.IText(String(rectHeight),{
                    left: (rectangle.left + rectangle.width +10),
                    top: rectangle.top + (rectangle.height/2),
                    fontSize: 15,
                    fontFamily: pageFontFamily,
                    fill: 'black',
                    name: 'height-value',
                    // backgroundColor: configColors.value.canvas.backgroundColor,
                    angle: 90,
                    id: 2,
                    selectable: false,
                    visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-height' ? true : false)
                })
                
                var wLine = new fabric.Line([rectangle.left, (rectangle.top+rectangle.height+20), (rectangle.left+rectangle.width+20), (rectangle.top+rectangle.height+20) ], {
                    stroke: 'black',
                    strokeWidth: 2,
                    selectable: false,
                    name: 'widthLine',
                    id: 3,
                    visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-width' ? true : false)
                });
                var wValue = new fabric.IText(String(rectWidth),{
                    left: rectangle.left + (rectangle.width/2),
                    top: rectangle.top + (rectangle.height +10),
                    fontSize: 15,
                    fontFamily: pageFontFamily,
                    fill: 'black',
                    name: 'width-value',
                    id: 4,
                    selectable: false,
                    visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-width' ? true : false)
                })
                var thickness = new fabric.IText(String(configVisualiserTexts.thickness + ': 1cm'),{
                    left: rectangle.left + (rectangle.width/2),
                    top: rectangle.top + (rectangle.height +20),
                    fontSize: 15,
                    fontFamily: pageFontFamily,
                    fill: 'black',
                    name: 'thickness-value',
                    id: 4,
                    selectable: false,
                })

                await hideCanvasForWaiting(true)

                activeCanvas = canvas

                canvas.add(rectangle, hLine, hValue, wLine, wValue, thickness);
                canvasBack.add(rectangle2);
            
                if(configDoublePart.value.active === true){
                    getCanvas(canvas, canvasBack, 'double')
                }else{
                    getCanvas(canvas, canvasBack, 'simple')
                }
                handleCloneCanvas(canvas, canvasBack)
            
                canvas.selection = false;
                canvasBack.selection = false;

                if(route.name == 'template-maker'){
                    template.value = await api.getTemplate(template_config_id,template_id);
                    asowp_configurator_data.regularPrice = template.value.basePrice;
                }

                handleCheckTemplate(props.template.designFromTemplate)
                isTemplate.value = props.template.designFromTemplate
                if(route.name === 'template-maker'){
                    if(template.value.data.templateData.length == 0){
                        resetType.value = "simple"
                        // console.log(template.value.data.templateData, "template-maker")
                        if(props.config.data.materials.length > 0){
                            selectMaterial(props.config.data.materials[0], 0)
                        }else{
                            hideCanvasElements()
                        }
                        if(materialType.value === 'simple'){
                            selectSimpleFirstValue()
                        }
                        if(materialType.value === 'advance'){
                            selectAdvanceFirstValue()
                        }
                    }else{                    
                        resetType.value = "template"
                        await selectTemplate(template.value.data.templateData, 'making')
                    }
                }else{
                    if(props.template.designFromTemplate === true){
                        resetType.value = "template"
                        await selectTemplate(props.template.template.data.templateData)
                    }else{
                        resetType.value = "simple"
                        if(props.config.data.materials.length > 0){
                            selectMaterial(props.config.data.materials[0], 0)
                        }else{
                            hideCanvasElements()
                        }
                        if(materialType.value === 'simple'){
                            selectSimpleFirstValue()
                        }
                        if(materialType.value === 'advance'){
                            selectAdvanceFirstValue()
                        }
                    }
                }

                fabric.Object.prototype.transparentCorners = false;
                fabric.Object.prototype.cornerColor = '#181818';
                fabric.Object.prototype.borderColor = 'black';
                fabric.Object.prototype.cornerStyle = 'circle';
                
                canvas.on('selection:created', function(e){
                    showObjectValues()
                });
                canvas.on('selection:updated', function(e) {
                    var object = e.selected[0]
                    checkTemplateObjectLockMoving(object)
                });
                canvas.on('selection:cleared', closeObjectValues);
                canvas.on('object:moving', function(e) {
                    var activeObject = e.target;
                    var objects = canvas.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.top = activeObject.top
                            object.left = activeObject.left
                        }
                    })
                });
                canvas.on('object:scaling', function(e) {
                    var activeObject = e.target;
                    var objects = canvas.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.scaleX = activeObject.scaleX
                            object.scaleY = activeObject.scaleY
                        }
                    })
                });
                canvas.on('object:rotating', function(e) {
                    var activeObject = e.target;
                    var objects = canvas.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.angle = activeObject.angle
                        }
                    })
                });
                canvas.on('mouse:down', function(options) {
                    var sign = handleGetObjectByName('safeObject');
                    canvas.getObjects().forEach(function(obj) {
                        if (obj.name === 'asowp-SignText' || obj.name === "asowp-SignTextLayer") {
                            if(obj.isEditing){
                                obj.exitEditing();
                            }
                            obj.clipPath = handleClipAddedObject(canvas);
                            canvas.renderAll();
                        }
                        if (obj.name === 'asowp-SignImage') {
                            obj.clipPath = handleClipAddedObject(canvas);
                            canvas.renderAll();
                        }
                    });
                });
                canvas.on('mouse:wheel', function(opt) {
                    if (opt.e.ctrlKey) { // Vérifier si la touche Ctrl est enfoncée
                        var delta = opt.e.deltaY;
                        var zoom = canvas.getZoom();
                        zoom *= 0.999 ** delta;
                        if (zoom > 20) zoom = 20;
                        if (zoom < 0.01) zoom = 0.01;

                        // console.log("delta:", delta, "zoom:", zoom)

                        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                        opt.e.preventDefault();
                        opt.e.stopPropagation();
                    }
                });

                canvasBack.on('selection:created', showObjectValues);
                canvasBack.on('selection:updated', function(e) {
                    var object = e.selected[0]
                    checkTemplateObjectLockMoving(object)
                });
                canvasBack.on('selection:cleared', closeObjectValues);
                canvasBack.on('object:moving', function(e) {
                    var activeObject = e.target;
                    var objects = canvasBack.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.top = activeObject.top
                            object.left = activeObject.left
                        }
                    })
                });
                canvasBack.on('object:scaling', function(e) {
                    var activeObject = e.target;
                    var objects = canvasBack.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.scaleX = activeObject.scaleX
                            object.scaleY = activeObject.scaleY
                        }
                    })
                });
                canvasBack.on('object:rotating', function(e) {
                    var activeObject = e.target;
                    var objects = canvasBack.getObjects();
                    objects.forEach(function(object) {
                        if(object.id == activeObject.id){
                            object.angle = activeObject.angle
                        }
                    })
                });
                canvasBack.on('mouse:down', function(options) {
                    var sign = handleGetObjectByName('safeObject');
                    canvasBack.getObjects().forEach(function(obj) {
                        if (obj.name === 'asowp-SignText' || obj.name === "asowp-SignTextLayer") {
                            if(obj.isEditing){
                                obj.exitEditing();
                            }
                            obj.clipPath = handleClipAddedObject(canvasBack);
                            canvasBack.renderAll();
                        }
                        if (obj.name === 'asowp-SignImage') {
                            obj.clipPath = handleClipAddedObject(canvasBack);
                            canvasBack.renderAll();
                        }
                    });
                });
                canvasBack.on('mouse:wheel', function(opt) {
                    if (opt.e.ctrlKey) { // Vérifier si la touche Ctrl est enfoncée
                        var delta = opt.e.deltaY;
                        var zoom = canvasBack.getZoom();
                        zoom *= 0.999 ** delta;
                        if (zoom > 20) zoom = 20;
                        if (zoom < 0.01) zoom = 0.01;

                        // console.log("delta:", delta, "zoom:", zoom)

                        canvasBack.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                        opt.e.preventDefault();
                        opt.e.stopPropagation();
                    }
                });
                

                checkScreenView()

                let resizeTimer;
                window.addEventListener('load', () => {
                    checkScreenView()
                });
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(() => {
                        checkScreenView()
                        checkScreenSize()
                        // centerSign(canvas)
                        // centerSign(canvasBack)
                    }, 250); // Délai de 250 millisecondes
                });
                
            // });
            
            if(window.innerWidth < 688){
                showOption.value = true
            }
            
            
            setScrollColor(configColors.value.optionsSideBar.options.modals.headerBackgroundColor)
            setIsLoadedToFalse()
            activeCanvas = canvas

            window.dispatchEvent(new Event('resize'));
            if(route.name == 'template-maker'){
                template.value = await api.getTemplate(template_config_id,template_id);
            }

            await hideCanvasForWaiting(false)
            
            return {
                canvas
            }
        } catch (error) {
            console.error('Erreur lors du chargement des polices:', error);
        }

    });

</script>