import { BocAdmin } from "./supabaseLogs";

export const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await BocAdmin.storage
        .from("product_images")
        .upload(fileName, file);

    if (error) throw error;

    const { data } = BocAdmin.storage
        .from("product_images")
        .getPublicUrl(fileName);

    return data.publicUrl;
};