import Supabase from '@/src/app/backend/model/supabase';
import { v4 as uuidv4 } from "uuid";

const SaveImages = (files: File[]) : string[] => {

  const saveImages = async (file: File, filename: string) => {
    const { data, error } = await Supabase
      .storage
      .from('images')
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;
    if (!data) return;
  }

  const images: string[] = [];
  files.forEach((file) => {

    const filename = `${uuidv4()}-${file.name.replace(/\s/g, '-')}`;
    saveImages(file, filename);
    images.push("https://pmjwqjsoojzbascysdbk.supabase.co/storage/v1/object/public/images/" + filename);
    
  });

  return images;
};

export default SaveImages;