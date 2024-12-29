'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth'
import AuthForm from '@/components/auth/AuthForm'
import UploadVideo from '@/components/video/UploadVideo'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user } = await getCurrentUser()
        setUser(user)
      } catch (error) {
        console.error('Kullanıcı kontrolü hatası:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Video Membership Platformu
        </h1>
        {!user ? (
          <AuthForm />
        ) : (
          <div>
            <UploadVideo />
          </div>
        )}
      </div>
    </main>
  )
}

