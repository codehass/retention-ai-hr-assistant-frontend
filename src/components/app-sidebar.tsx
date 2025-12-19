"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/src/components/ui/sidebar";
import { Separator } from "@/src/components/ui/separator";
import { Button } from "@/src/components/ui/button";
import { LogOut, Check } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface AppSidebarProps {
	user: { username: string } | null;
	currentStep: number;
	steps: { id: number; title: string }[];
	onStepClick: (stepId: number) => void;
	onLogout: () => void;
}

export function AppSidebar({
	user,
	currentStep,
	steps,
	onStepClick,
	onLogout,
}: AppSidebarProps) {
	const { open } = useSidebar();

	return (
		<Sidebar className="h-screen bg-gray-50 border-r border-gray-200">
			<SidebarHeader>
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold italic text-lg">
						R
					</div>
					{open && (
						<span className="font-bold text-xl truncate">RetentionAI</span>
					)}
				</div>
			</SidebarHeader>

			<Separator />

			<SidebarContent className="py-4">
				{user && (
					<SidebarMenu>
						{steps.map((step) => {
							const isActive = currentStep === step.id;
							const isCompleted = currentStep > step.id;

							return (
								<SidebarMenuItem key={step.id}>
									<SidebarMenuButton
										onClick={() => onStepClick(step.id)}
										active={isActive}
										tooltip={step.title}
										className={
											!isCompleted && !isActive
												? "opacity-50 cursor-not-allowed"
												: ""
										}
									>
										<div
											className={cn(
												"flex h-5 w-5 items-center justify-center rounded-full border",
												isActive &&
													"border-primary bg-primary text-primary-foreground",
												isCompleted && "border-gray-400 bg-gray-400 text-white",
												!isActive && !isCompleted && "border-gray-300"
											)}
										>
											{isActive && (
												<div className="h-1.5 w-1.5 rounded-full bg-current" />
											)}
											{isCompleted && <Check className="h-3 w-3" />}
										</div>
										{open && <span>{step.title}</span>}
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				)}
			</SidebarContent>

			<SidebarFooter>
				{user && (
					<div className="flex flex-col gap-2">
						<Button
							variant="ghost"
							className="w-full justify-start cursor-pointer"
							onClick={onLogout}
						>
							<LogOut className="mr-2 h-4 w-4" />
							{open && "Log out"}
						</Button>

						{open && (
							<div className="flex items-center gap-3 px-2 py-2 text-sm bg-gray-100 rounded-md">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border text-xs font-bold">
									{user.username.charAt(0).toUpperCase()}
								</div>
								<p className="font-medium truncate">{user.username}</p>
							</div>
						)}
					</div>
				)}
			</SidebarFooter>
		</Sidebar>
	);
}
