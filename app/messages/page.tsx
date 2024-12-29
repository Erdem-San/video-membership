'use client'

import React, { useReducer, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Layout from '@/components/Layout'

type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
}

type State = {
  messages: Message[]
  nextId: number
}

type Action =
  | { type: 'ADD_MESSAGE', payload: Omit<Message, 'id'> }

const initialState: State = {
  messages: [
    { id: 1, sender: "User1", content: "Hey, how are you?", timestamp: "2023-05-01T10:00:00Z" },
    { id: 2, sender: "You", content: "I'm good, thanks! How about you?", timestamp: "2023-05-01T10:05:00Z" },
    { id: 3, sender: "User1", content: "Doing great! Just uploaded a new video.", timestamp: "2023-05-01T10:10:00Z" },
  ],
  nextId: 4
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, { id: state.nextId, ...action.payload }],
        nextId: state.nextId + 1
      }
    default:
      return state
  }
}

const MessagesPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSendMessage = () => {
    const content = inputRef.current?.value.trim()
    if (content) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          sender: "You",
          content,
          timestamp: new Date().toISOString()
        }
      })
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const formatDate = (dateString: string) => {
    if (!isMounted) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] mb-4">
              <div className="space-y-4">
                {state.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-2 rounded-lg ${
                      message.sender === "You" ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                    } max-w-[70%]`}
                  >
                    <p className="font-semibold">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(message.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default MessagesPage

