import { BookOpen, MessageSquare, User } from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from './ui/sidebar'

const AppSidebar = () => {
  // Mock logged in user
  const user = {
    username: 'margostino',
    isLoggedIn: true,
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarTrigger />
      <SidebarHeader className="mb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Home">
              <Link href="/" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <span className="h-4 w-4">🧠</span>
                </div>
                <span className="text-sm font-medium transition-opacity group-data-[state=collapsed]:opacity-0">
                  Babel
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
                <span className="text-sm font-medium transition-opacity group-data-[state=collapsed]:opacity-0">
                  Chat
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Knowledge">
              <Link href="/knowledge" className="flex items-center gap-3">
                <div className="min-w-[24px] flex items-center justify-center">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium transition-opacity group-data-[state=collapsed]:opacity-0">
                  Knowledge
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
              <span className="flex items-center gap-2 transition-opacity group-data-[state=collapsed]:opacity-0">
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
