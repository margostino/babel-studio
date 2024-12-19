'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { FileIcon, FolderIcon } from 'lucide-react'
import { useState } from 'react'

interface FileSystemItem {
  id: string
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileSystemItem[]
  createdAt: string
  updatedAt: string
}

// Mock data - replace with your actual data fetching logic
const mockFiles: FileSystemItem[] = [
  {
    id: '1',
    name: 'Work',
    type: 'folder',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    children: [
      {
        id: '2',
        name: 'Project A Notes.md',
        type: 'file',
        content: '# Project A\n\nThis is a markdown file with project notes...',
        createdAt: '2024-03-20',
        updatedAt: '2024-03-20',
      },
      {
        id: '3',
        name: 'Meeting Notes.md',
        type: 'file',
        content: '# Team Meeting - March 20\n\n## Agenda\n\n1. Project updates\n2. Next steps',
        createdAt: '2024-03-20',
        updatedAt: '2024-03-20',
      },
    ],
  },
  {
    id: '4',
    name: 'Personal',
    type: 'folder',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    children: [
      {
        id: '5',
        name: 'Goals 2024.md',
        type: 'file',
        content: '# 2024 Goals\n\n- Learn new technologies\n- Complete side projects',
        createdAt: '2024-03-20',
        updatedAt: '2024-03-20',
      },
    ],
  },
]

const FileTreeItem = ({
  item,
  level = 0,
  selectedFile,
  onSelect,
}: {
  item: FileSystemItem
  level?: number
  selectedFile?: FileSystemItem
  onSelect: (file: FileSystemItem) => void
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const paddingLeft = `${level * 1.5}rem`

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded)
    } else {
      onSelect(item)
    }
  }

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 py-1.5 px-2 hover:bg-zinc-800/50 rounded-md cursor-pointer text-sm',
          selectedFile?.id === item.id && 'bg-zinc-800/50'
        )}
        style={{ paddingLeft }}
        onClick={handleClick}
      >
        {item.type === 'folder' ? (
          <FolderIcon className="h-4 w-4 text-zinc-400" />
        ) : (
          <FileIcon className="h-4 w-4 text-zinc-400" />
        )}
        <span className="text-zinc-100">{item.name}</span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              selectedFile={selectedFile}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function InboxPage() {
  const [selectedFile, setSelectedFile] = useState<FileSystemItem | undefined>()
  const { state } = useSidebar()

  const isExpanded = state === 'expanded'
  const sidebarWidth = isExpanded ? '220px' : '4rem'

  return (
    <div
      className={cn(
        'flex-1 h-full transition-all duration-200 ease-linear',
        isExpanded ? 'ml-[220px] w-[calc(100%-220px)]' : 'ml-16 w-[calc(100%-4rem)]'
      )}
    >
      <div className="h-full flex gap-6 p-6">
        {/* File Tree */}
        <div className="w-80 shrink-0 rounded-lg border border-zinc-800 bg-zinc-900/50">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-white">Inbox</h2>
          </div>
          <ScrollArea className="h-[calc(100%-5rem)]">
            <div className="p-2">
              {mockFiles.map((item) => (
                <FileTreeItem
                  key={item.id}
                  item={item}
                  selectedFile={selectedFile}
                  onSelect={setSelectedFile}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/50">
          {selectedFile ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-white">{selectedFile.name}</h2>
                <div className="flex gap-4 mt-1 text-sm text-zinc-400">
                  <span>Created: {selectedFile.createdAt}</span>
                  <span>Updated: {selectedFile.updatedAt}</span>
                </div>
              </div>
              <ScrollArea className="flex-1 p-6">
                <pre className="text-sm text-zinc-100 whitespace-pre-wrap font-mono">
                  {selectedFile.content}
                </pre>
              </ScrollArea>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-zinc-400">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
