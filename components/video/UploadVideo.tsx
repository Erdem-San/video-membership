import { useState } from 'react'
import { uploadVideo } from '@/lib/videos'
import { getCurrentUser } from '@/lib/auth'

export default function UploadVideo() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    try {
      setUploading(true)
      setMessage('')

      const { user, error: userError } = await getCurrentUser()
      if (userError) throw userError
      if (!user) throw new Error('Kullanıcı girişi yapılmamış')

      const { error } = await uploadVideo(file, user.id, title, description)
      if (error) throw error

      setMessage('Video başarıyla yüklendi!')
      setFile(null)
      setTitle('')
      setDescription('')
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Video Yükle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Video Dosyası
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Başlık
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Açıklama
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>
        {message && (
          <p className="text-sm text-center text-red-600">{message}</p>
        )}
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {uploading ? 'Yükleniyor...' : 'Video Yükle'}
        </button>
      </form>
    </div>
  )
} 