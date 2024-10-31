const container = document.querySelector(".container");
const userinput = document.getElementById("placement");
const submitBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download-Btn");
const sizeOptions = document.getElementById("size");
const BGColor = document.getElementById("color1");
const BGColor2 = document.getElementById("color2");

let QR_Code;
let sizechoice = 100;
let BGColorChoice = "000000";
let FGColorChoice = "ffffff";

sizeOptions.addEventListener("change", () => {
    sizechoice = sizeOptions.value;
});

BGColor.addEventListener("input", () => {
    BGColorChoice = BGColor.value;
});

// FGColor ist nicht definiert. BGColor2 wurde definiert, vielleicht ist das FGColor?
BGColor2.addEventListener("input", () => {
    FGColorChoice = BGColor2.value;
});

userinput.addEventListener("input", () => {
    if (userinput.value.trim().length < 1) {
        submitBtn.disabled = true;
        downloadBtn.href = "";
        downloadBtn.classList.add("hide");
    } else {
        submitBtn.disabled = false;
    }
});

function inputFormatter(value) {
    value = value.replace(/[^a-zA-Z0-9]+/g, "");
    return value;
}

const generateQRCode = async () => {
    container.innerHTML = "";
 
    QR_Code = await new QRCode(container, {
        text: userinput.value,
        width: sizechoice,
        height: sizechoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice,
    });

    const src = container.firstChild.toDataURL("image/png");
    downloadBtn.href = src;

    let userValue = userinput.value;
    try {
        userValue = new URL(userValue).hostname;
    } catch (_) {
        userValue = inputFormatter(userValue);
    }
    downloadBtn.download = `${userValue}QR.png`;
    downloadBtn.classList.remove("hide");
};

window.onload = () => {
    container.innerHTML = "";
    sizeOptions.value = sizechoice;
    userinput.value = "";
    BGColor.value = BGColorChoice;
    // FGColor wurde nicht definiert, sollte vielleicht BGColor2 sein?
    BGColor2.value = FGColorChoice;
    downloadBtn.classList.add("hide");
    submitBtn.disabled = true;
};

// Hier war ein Schreibfehler. Statt "click" war "click." geschrieben.
submitBtn.addEventListener("click", generateQRCode);

document.getElementById('downloadButton').addEventListener('click', function () {
    // Inhalt für die herunterzuladende Datei
    const fileContent = 'Hello, this is the content of the file.';

    // Erstelle ein Blob-Objekt mit dem Dateiinhalt
    const blob = new Blob([fileContent], { type: 'gg.png' });

    // Erstelle eine URL für das Blob-Objekt
    const blobUrl = URL.createObjectURL(blob);

    // Erstelle einen <a> Element
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'gg.png'; // Dateiname beim Herunterladen

    // Füge das <a> Element zum Dokument hinzu
    document.body.appendChild(link);

    // Klicke auf den Link, um den Download zu starten
    link.click();

    // Entferne das <a> Element aus dem Dokument
    document.body.removeChild(link);

    // Freigabe des Blob-Objekts, um Speicher zu sparen
    URL.revokeObjectURL(blobUrl);
});


