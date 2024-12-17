import {
  Camera,
  Compass,
  Database,
  GitGraph,
  LineChart,
  MessageSquare,
  Plug,
  Settings,
  User,
} from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'

const AppSidebar = () => {
  // Mock logged in user
  const user = {
    username: 'margostino',
    isLoggedIn: true,
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mb-6">
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
            <SidebarMenuButton asChild tooltip="Assets">
              <Link href="/assets" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <Database className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-white transition-opacity group-data-[state=collapsed]:opacity-0">
                  Assets
                </span>
              </Link>
            </SidebarMenuButton>
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
