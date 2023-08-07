import Supabase from '@/src/app/backend/model/supabase';
import { v4 as uuidv4 } from "uuid";

const PushImages = async (files: File[], uuid: string) => {

  const pushPromises = files.map(async (file) => {
    
    const path = `${uuid}/images/${uuidv4()}-${file.name.replace(/\s/g, '-')}`;
    const { data, error } = await Supabase
      .storage
      .from('data')
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;
    if (!data) return;

    return `https://pmjwqjsoojzbascysdbk.supabase.co/storage/v1/object/public/data/
      ${data.path}` || '';
  });

  const links = await Promise.all(pushPromises);

  return links.filter((link) => link !== undefined) as string[];
};

export default PushImages;