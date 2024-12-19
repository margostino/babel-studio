'use client'

import { Bot, Loader2, UserCircle2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()

  const generateMessageId = () => {
    messageIdCounter.current += 1
    return `msg-${Date.now()}-${messageIdCounter.current}`
  }

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleSend = useCallback(async () => {
    if (!input.trim() || input.length > MAX_MESSAGE_LENGTH || isProcessing) return

    setIsProcessing(true)
    const userMessage = { id: generateMessageId(), sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    focusInput()

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
        focusInput()
      }

      window.addEventListener('beforeunload', cleanup)

      eventSourceRef.current.onmessage = (event) => {
        if (event.data === '[DONE]') {
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1]
            return [...prev.slice(0, -1), { ...lastMessage, isTyping: false }]
          })
          cleanup()
          focusInput()
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
        focusInput()
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
        focusInput()
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
      focusInput()
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

  const isScrolledToBottom = useCallback((element: HTMLElement) => {
    const { scrollHeight, scrollTop, clientHeight } = element
    return scrollHeight - scrollTop - clientHeight <= 100
  }, [])

  useEffect(() => {
    const messagesContainer = messagesEndRef.current?.parentElement
    if (!messagesContainer) return

    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }

    scrollToBottom()

    const observer = new MutationObserver(scrollToBottom)

    observer.observe(messagesContainer, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => observer.disconnect()
  }, [messages])

  useEffect(() => {
    setIsLoading(false)
    focusInput()
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      focusInput()
    }
  }, [isLoading])

  useEffect(() => {
    const initialMessage = searchParams.get('message')
    if (initialMessage && messages.length === 0) {
      setInput(decodeURIComponent(initialMessage))
      setTimeout(() => {
        handleSend()
      }, 100)
    }
  }, [searchParams, handleSend, messages.length])

  const MessageItem = memo(({ message }: { message: Message }) => (
    <div
      className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className="flex-shrink-0">
        {message.sender === 'user' ? (
          <UserCircle2 className="w-8 h-8 text-[var(--primary)]" />
        ) : (
          <Bot className="w-8 h-8 text-[var(--foreground)]" />
        )}
      </div>
      <div
        className={`inline-block max-w-[85%] p-4 rounded-lg text-sm ${
          message.sender === 'user'
            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
            : 'bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)]'
        }`}
      >
        <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
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
    <div className="flex flex-col h-full bg-dark">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-4xl">
              <div
                role="log"
                aria-live="polite"
                className="flex-1 p-4 pt-8 overflow-y-auto space-y-4 bg-black min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)]"
                style={{ overscrollBehavior: 'contain' }}
              >
                {messageElements}
                <div ref={messagesEndRef} className="h-px" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-dark shadow-md">
            <div className="flex items-center space-x-4 max-w-4xl mx-auto">
              <Input
                ref={inputRef}
                type="text"
                aria-label="Message input"
                placeholder="Type your message..."
                className="flex-1 h-12 bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] border-[var(--border)]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleKeyPress}
                maxLength={MAX_MESSAGE_LENGTH}
              />
              <Button
                onClick={handleSend}
                className={`${
                  !input.trim() || isProcessing
                    ? 'bg-zinc-500 hover:bg-zinc-500' // Disabled state
                    : 'bg-zinc-600 hover:bg-zinc-700' // Enabled state
                }`}
                disabled={!input.trim() || isProcessing}
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
