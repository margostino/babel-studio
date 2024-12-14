'use client'

import debounce from 'lodash.debounce'
import { Loader2 } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const MAX_MESSAGE_LENGTH = 1000
const INITIAL_MESSAGES: Message[] = []

interface Message {
  id: string
  sender: string
  text: string
  isTyping?: boolean
}

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageIdCounter = useRef(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const eventSourceRef = useRef<EventSource | null>(null)

  const generateMessageId = () => {
    messageIdCounter.current += 1
    return `msg-${Date.now()}-${messageIdCounter.current}`
  }

  const handleSend = useCallback(async () => {
    if (!input.trim() || input.length > MAX_MESSAGE_LENGTH || isProcessing) return

    setIsProcessing(true)
    const userMessage = { id: generateMessageId(), sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const botMessageId = generateMessageId()
      setMessages((prev) => [
        ...prev,
        { id: botMessageId, sender: 'bot', text: '', isTyping: true },
      ])

      eventSourceRef.current = new EventSource(
        `${API_URL}/completion?input=${encodeURIComponent(input)}`
      )

      const cleanup = () => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close()
          eventSourceRef.current = null
        }
        setIsProcessing(false)
      }

      window.addEventListener('beforeunload', cleanup)

      eventSourceRef.current.onmessage = (event) => {
        if (event.data === '[DONE]') {
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1]
            return [...prev.slice(0, -1), { ...lastMessage, isTyping: false }]
          })
          cleanup()
          return
        }

        try {
          const parsed = JSON.parse(event.data)
          if (parsed.content) {
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1]
              return [
                ...prev.slice(0, -1),
                {
                  ...lastMessage,
                  text: lastMessage.text + parsed.content,
                  isTyping: true,
                },
              ]
            })
          }
        } catch (e) {
          console.warn('Failed to parse message:', event.data)
        }
      }

      eventSourceRef.current.addEventListener('error', (error) => {
        console.error('EventSource failed:', error)
        cleanup()
      })

      eventSourceRef.current.onerror = (error) => {
        console.error('EventSource error:', error)
        cleanup()
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
      setIsProcessing(false)
    }
  }, [input, isProcessing])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  const debouncedScrollToBottom = useCallback(
    debounce(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100),
    []
  )

  useEffect(() => {
    debouncedScrollToBottom()
  }, [messages.length, debouncedScrollToBottom])

  useEffect(() => {
    setIsLoading(false)
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
    }
  }, [])

  const MessageItem = memo(({ message }: { message: Message }) => (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
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
  ))
  MessageItem.displayName = 'MessageItem'

  const messageElements = useMemo(
    () => messages.map((message) => <MessageItem key={message.id} message={message} />),
    [messages]
  )

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="p-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-center text-white">Babel 🧠 ⚡️</h1>
      </header>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          <div
            role="log"
            aria-live="polite"
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-black"
          >
            {messageElements}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-gray-800">
            <div className="flex items-center space-x-4">
              <Input
                type="text"
                aria-label="Message input"
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-gray-200 placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleKeyPress}
                disabled={isProcessing}
                maxLength={MAX_MESSAGE_LENGTH}
              />
              <Button
                onClick={handleSend}
                className="bg-gray-500 hover:bg-blue-600"
                disabled={isProcessing}
                aria-label="Send message"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {isProcessing ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Chat
