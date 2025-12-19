export const validateImage = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) return "Only JPG/PNG allowed";
    if (file.size > 1024 * 1024) return "Max image size is 1MB";
    return null;
    };