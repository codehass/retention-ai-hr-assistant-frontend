"use client";

import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/app-sidebar";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const user = { username: "Hassan" };

	const STEPS = [
		{ id: 0, title: "Personal Details" },
		{ id: 1, title: "Job Details" },
		{ id: 2, title: "Work History" },
		{ id: 3, title: "Satisfaction Metrics" },
		{ id: 4, title: "Analysis Summary" },
	];

	const currentStep = 0;

	return (
		<SidebarProvider>
			<div className="flex h-screen overflow-hidden">
				<AppSidebar
					user={user}
					steps={STEPS}
					currentStep={currentStep}
					onStepClick={(id) => console.log("Step", id)}
					onLogout={() => console.log("logout")}
				/>

				<main className="flex-1 flex flex-col bg-background">
					<header className="h-14 flex items-center gap-4 border-b px-6">
						<SidebarTrigger />
						<h1 className="text-lg font-semibold">Dashboard</h1>
					</header>

					<div className="flex-1 overflow-y-auto p-8">
						<div className="max-w-6xl mx-auto">{children}</div>
					</div>
				</main>
			</div>
		</SidebarProvider>
	);
}
