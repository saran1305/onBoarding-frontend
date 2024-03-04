export const convertToBase64 = (file, callback) => {
    const reader = new FileReader();

    reader.onload = event => {
        const result = event.target.result;

        const base64Data = result.split(',')[1]

        callback(base64Data);
    };
    reader.readAsDataURL(file);
};