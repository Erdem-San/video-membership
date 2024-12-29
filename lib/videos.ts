import { supabase } from './supabase'

export const uploadVideo = async (file: File, userId: string, title: string, description?: string) => {
  // Video dosyasını yükle
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${userId}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('videos')
    .upload(filePath, file)

  if (uploadError) {
    return { error: uploadError }
  }

  // Video URL'sini al
  const { data: { publicUrl } } = supabase.storage
    .from('videos')
    .getPublicUrl(filePath)

  // Video bilgilerini veritabanına kaydet
  const { data, error } = await supabase
    .from('videos')
    .insert([
      {
        user_id: userId,
        title,
        description,
        video_url: publicUrl,
      }
    ])
    .select()

  return { data, error }
}

export const getVideos = async () => {
  const { data, error } = await supabase
    .from('videos')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const getVideoById = async (videoId: string) => {
  const { data, error } = await supabase
    .from('videos')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .eq('id', videoId)
    .single()

  return { data, error }
} 