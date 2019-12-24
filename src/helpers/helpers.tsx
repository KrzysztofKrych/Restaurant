const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result || "");
        reader.onerror = error => reject(error);
    });
}

const s = (a:number) => a+a


export {
    getBase64,
    s
}