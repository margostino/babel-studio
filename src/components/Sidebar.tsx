'use client'

import {
  Archive,
  BrainCircuit,
  Camera,
  ChevronDown,
  ChevronRight,
  Compass,
  Database,
  FolderTree,
  GitGraph,
  Inbox,
  LineChart,
  MessageSquare,
  Plug,
  Scale,
  Search,
  Settings,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from './ui/sidebar'

const AppSidebar = () => {
  const [isAssetsExpanded, setIsAssetsExpanded] = useState(false)
  const { state } = useSidebar()
  const pathname = usePathname()

  useEffect(() => {
    if (state === 'collapsed') {
      setIsAssetsExpanded(false)
    }
  }, [state])

  useEffect(() => {
    if (!pathname.startsWith('/assets')) {
      setIsAssetsExpanded(false)
    }
  }, [pathname])

  const handleAssetsClick = () => {
    console.log('Assets clicked, current state:', isAssetsExpanded)
    setIsAssetsExpanded(!isAssetsExpanded)
  }

  console.log('Rendering sidebar, isAssetsExpanded:', isAssetsExpanded)

  // Mock logged in user
  const user = {
    username: 'margostino',
    isLoggedIn: true,
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mb-6 mt-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Home">
              <Link href="/" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <span className="h-4 w-4">🧠</span>
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Babel Studio
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Chat">
              <Link href="/chat" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Chat
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Brainstorming">
              <Link href="/brainstorming" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Brainstorming
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Decision Engine">
              <Link href="/decisions" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <Scale className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Decision Engine
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Assets"
              onClick={handleAssetsClick}
              className="w-full flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="min-w-[24px] flex items-center justify-center">
                  <Database className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Assets
                </span>
              </div>
              <div className="min-w-[24px] flex items-center justify-center text-white">
                {isAssetsExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </SidebarMenuButton>
            {isAssetsExpanded && (
              <SidebarMenuSub className="mt-1 ml-2 pl-4 border-l border-zinc-800">
                <SidebarMenuSubItem className="py-1">
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/assets/inbox"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                    >
                      <Inbox className="h-4 w-4" />
                      <span>Inbox</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem className="py-1">
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/assets/areas"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                    >
                      <FolderTree className="h-4 w-4" />
                      <span>Areas</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem className="py-1">
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/assets/projects"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                    >
                      <FolderTree className="h-4 w-4" />
                      <span>Projects</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem className="py-1">
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/assets/resources"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                    >
                      <FolderTree className="h-4 w-4" />
                      <span>Resources</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem className="py-1">
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/assets/archive"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                    >
                      <Archive className="h-4 w-4" />
                      <span>Archive</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Capture">
              <Link href="/capture" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <Camera className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Capture
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Knowledge Graph">
              <Link href="/graph" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <GitGraph className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Knowledge Graph
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Insights">
              <Link href="/insights" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <LineChart className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Insights
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Explore">
              <Link href="/explore" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <Compass className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Explore
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Integration Center">
              <Link href="/integrations" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <Plug className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Integration Center
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <Settings className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Settings
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="relative w-full px-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-700"
                />
              </div>
            </div>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="w-full" tooltip={user.username}>
              <div className="min-w-[24px] flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="flex items-center gap-2 text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                {user.isLoggedIn ? (
                  <>
                    <span>{user.username}</span>
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                  </>
                ) : (
                  'Login'
                )}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
