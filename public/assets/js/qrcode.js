const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Button submit
const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    // const url = document.getElementById('url').value;
    //  const state = document.getElementById('state').value;
    // const taluka = document.getElementById('Taluka').value;
    const size = document.getElementById('size').value;
    const dist = document.getElementById('Dist').value;
    const city = document.getElementById('City').value;
    var queryurl = `http://192.168.0.102:3000/feedbackpage?dist=${dist}&city=${city}`;
    console.log(queryurl);

    // Validate url
    if (dist === '' && city === '') {
        alert('Please enter a URL');
    } else {
        showSpinner();
        // Show spinner for 1 sec
        setTimeout(() => {
            hideSpinner();
            generateQRCode(queryurl, size);

            // Generate the save button after the qr code image src is ready
            setTimeout(() => {
                // Get save url
                const saveUrl = qr.querySelector('img').src;
                // Create save button
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }
};

// Generate QR code

const generateQRCode = (queryurl, size) => {
    const qrcode = new QRCode('qrcode', {
        text: queryurl,
        width: size,
        height: size,
    });
};

// Clear QR code and save button
const clearUI = () => {
    qr.innerHTML = '';
    const saveBtn = document.getElementById('save-link');
    if (saveBtn) {
        saveBtn.remove();
    }
};

// Show spinner
const showSpinner = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
};

// Hide spinner
const hideSpinner = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList =
        'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);