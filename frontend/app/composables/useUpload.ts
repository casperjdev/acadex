export const useUpload = () => {
  const supabase = useSupabaseClient()

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `listings/${fileName}`

    const { data, error } = await supabase.storage
      .from('listing-images')
      .upload(filePath, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('listing-images')
      .getPublicUrl(filePath)

    return publicUrl
  }

  return {
    uploadImage
  }
}
