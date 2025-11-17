import QRCode from 'qrcode';


export async function generateQRCodeObject(inputData, color) {
  let contentToEncode;

  // 1. Si c'est un fichier image, on le convertit en base64 (DataURL)
  if (inputData instanceof File) {
    contentToEncode = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // base64
      reader.onerror = reject;
      reader.readAsDataURL(inputData);
    });
  } else if (typeof inputData === 'string' && inputData.trim() !== '') {
    contentToEncode = inputData.trim(); // Texte propre
  } else {
    throw new Error("Entrée invalide pour le QR code");
  }

  // 2. Génération du QR code en image base64
  const qrDataURL = await QRCode.toDataURL(contentToEncode, {
    width: 256,
    margin: 2,
    color: {
      dark: color && color.dark ? color.dark : '#000000',
      light: color && color.light ? color.light : '#ffffff',
    },
  });

  // 3. Création d’un objet FabricJS Image
  return new Promise((resolve) => {
    fabric.Image.fromURL(qrDataURL, (img) => {
      img.set({
        originX: "center",
        originY: "center",
        selectable: true,
        hasControls: true,
        uniScaleTransform: true,
        centeredScaling: true,
        lockScalingFlip: true,
        evented: true,
        imageUrl: qrDataURL,
        fromData: contentToEncode,
        color: {
          dark: color && color.dark ? color.dark : '#000000',
          light: color && color.light ? color.light : '#ffffff',
        },
      });
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
      resolve(img);
    });
  });
}