'use client'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    // Encode the input for URL safety
    const encodedMessage = encodeURIComponent(input.trim())
    router.push(`/chat?message=${encodedMessage}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSend()
    }
  }

  const sections = [
    {
      title: 'Projects',
      description: 'Explore your projects and manage simulations.',
      link: '/projects',
    },
    {
      title: 'Examples',
      description: 'Browse example simulations and use cases.',
      link: '/examples',
    },
    {
      title: 'Usage',
      description: 'Learn how to use Autobox effectively.',
      link: '/usage',
    },
    {
      title: 'Documentation',
      description: 'Find detailed information about Autobox features.',
      link: '/documentation',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center bg-background p-6">
      {/* Title Section */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-semibold text-white">Babel Studio</h1>
        <h2 className="text-xl text-gray-400">Bridging minds through machines</h2>
      </div>

      {/* Message Input Section */}
      <div className="w-full max-w-5xl">
        <div className="relative">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="What can I help with?"
            className="w-full h-12 pr-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-zinc-700"
            autoFocus
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSend}
              className="h-full aspect-square rounded-full hover:bg-zinc-800 flex items-center justify-center"
            >
              <ArrowRight className="h-5 w-5 text-zinc-400" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 mt-8">
        {sections.map((item, index) => (
          <Link href={item.link} key={index}>
            <Card className="border-2 border-gray-800 hover:shadow-xl shadow-md transition-shadow duration-300 cursor-pointer flex flex-col p-3">
              <CardHeader className="p-2 text-center">
                <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                <CardDescription className="text-sm mb-2">{item.description}</CardDescription>
              </CardHeader>
              <div className="relative w-full"></div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
