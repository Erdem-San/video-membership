'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Layout from '@/components/Layout'

type Video = {
  id: string
  title: string
  author: string
  likes: number
  comments: number
}

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          {/* Video player would go here */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button variant="ghost">
            Like ({video.likes})
          </Button>
          <Button variant="ghost">
            Comment ({video.comments})
          </Button>
        </div>
        <Button variant="ghost">
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

const FeedPage: React.FC = () => {
  const videos: Video[] = [
    { id: '1', title: 'Amazing Video 1', author: 'User1', likes: 100, comments: 50 },
    { id: '2', title: 'Awesome Video 2', author: 'User2', likes: 200, comments: 75 },
    { id: '3', title: 'Cool Video 3', author: 'User3', likes: 150, comments: 60 },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Video Feed</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default FeedPage

