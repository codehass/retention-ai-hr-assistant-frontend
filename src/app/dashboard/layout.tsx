"use client";

import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/app-sidebar";
import { StepProvider, useSteps } from "@/src/context/StepContext";
import { logout } from "@/src/services/authService";

function DashboardContent({ children }: { children: React.ReactNode }) {
	const { currentStep, setCurrentStep, STEPS } = useSteps();
	const router = useRouter();
	const user = { username: "Hassan" };

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/");
			router.refresh();
		} catch (error) {
			alert("Failed to logout. Please try again.");
		}
	};

	return (
		<SidebarProvider>
			<div className="flex h-screen overflow-hidden">
				<AppSidebar
					user={user}
					steps={STEPS}
					currentStep={currentStep}
					onStepClick={(id) => setCurrentStep(id)}
					onLogout={handleLogout}
				/>
				<main className="flex-1 flex flex-col bg-background">
					<header className="h-14 flex items-center gap-4 border-b px-6">
						<SidebarTrigger />
						<h1 className="text-lg font-semibold">
							{STEPS[currentStep]?.title || "Dashboard"}
						</h1>
					</header>
					<div className="flex-1 overflow-y-auto p-8">
						<div className="max-w-6xl mx-auto">{children}</div>
					</div>
				</main>
			</div>
		</SidebarProvider>
	);
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<StepProvider>
			<DashboardContent>{children}</DashboardContent>
		</StepProvider>
	);
}
