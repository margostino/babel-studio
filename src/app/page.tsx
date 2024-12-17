import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
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
            placeholder="What can I help with?"
            className="w-full h-12 pr-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-zinc-700"
            autoFocus
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              size="sm"
              variant="ghost"
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
