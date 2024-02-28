export const convertToBase64 = (file, callback) => {
    const reader = new FileReader();

    reader.onload = event => {
        const result = event.target.result;

        callback(result);
    };
    reader.readAsDataURL(file);
};