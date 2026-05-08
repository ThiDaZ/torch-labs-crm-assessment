"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import Image from "next/image";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	LayoutDashboardIcon,
	ListIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/auth/me";

const menu = {

	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: <LayoutDashboardIcon />,
		},
		{
			title: "Leads",
			url: "/dashboard/leads",
			icon: <ListIcon />,
		},
	],

};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

	const {data} = useQuery({
		queryKey: ["currentUser"],
		queryFn: getCurrentUser,
	});

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
							<a href="#">
								<Image
									src="/favicon-32x32.png"
									alt="Flare CRM"
									width={32}
									height={32}
									className="rounded-full"
								/>
								<span className="text-base font-semibold">Flare Leads</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={menu.navMain} />
			</SidebarContent>
			<SidebarFooter>
				{data?.user ? <NavUser user={data.user} /> : null}
			</SidebarFooter>
		</Sidebar>
	);
}
