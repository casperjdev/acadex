export const useUpload = () => {
  const client = useSupabaseClient();

  const uploadListingImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `listings/${fileName}`;

    const { data, error } = await client.storage
      .from('listing-images')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = client.storage
      .from('listing-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  return {
    uploadListingImage,
  };
};
