'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Message {
  id: string
  sender: string
  text: string
  isTyping?: boolean // Add this new property
}

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageIdCounter = useRef(1)

  const generateMessageId = () => {
    messageIdCounter.current += 1
    return `msg-${Date.now()}-${messageIdCounter.current}`
  }

  const [messages, setMessages] = useState<Message[]>([])

  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { id: generateMessageId(), sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const botMessageId = generateMessageId()
      setMessages((prev) => [
        ...prev,
        { id: botMessageId, sender: 'bot', text: '', isTyping: true },
      ])

      // Create EventSource for SSE
      const eventSource = new EventSource(
        `http://localhost:9000/api/completion?query=${encodeURIComponent(input)}&streamEnabled=true`
      )

      eventSource.onmessage = (event) => {
        // console.log('Event received:', event.data)
        if (event.data === '[DONE]') {
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1]
            return [...prev.slice(0, -1), { ...lastMessage, isTyping: false }]
          })
          eventSource.close()
          return
        }

        try {
          const parsed = JSON.parse(event.data)
          if (parsed.content) {
            // console.log('Parsed content:', parsed.content)
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1]
              return [
                ...prev.slice(0, -1),
                {
                  ...lastMessage,
                  text: lastMessage.text + parsed.content,
                  isTyping: true, // Keep typing indicator while streaming
                },
              ]
            })
          }
        } catch (e) {
          console.warn('Failed to parse message:', event.data)
        }
      }

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error)
        eventSource.close()
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            sender: 'bot',
            text: 'Sorry, there was an error processing your request.',
          },
        ])
      }
    } catch (error) {
      console.error('Error details:', {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack,
      })
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          sender: 'bot',
          text: 'Sorry, there was an error processing your request.',
        },
      ])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // console.log('Messages updated:', messages)
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Chat Header */}
      <header className="p-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-center text-white">Babel 🧠 ⚡️</h1>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-dark-card text-dark-text'
              }`}
            >
              {message.text}
              {message.isTyping && (
                <span className="typing-indicator">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-800">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-gray-200 placeholder-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <Button onClick={handleSend} className="bg-gray-500 hover:bg-blue-600">
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Chat
