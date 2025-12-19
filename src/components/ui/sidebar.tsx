import * as React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const SidebarContext = React.createContext<{
	open: boolean;
	setOpen: (open: boolean) => void;
	toggleSidebar: () => void;
} | null>(null);

export function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
}

export function SidebarProvider({ children }: { children?: React.ReactNode }) {
	const [open, setOpen] = React.useState(true);

	const toggleSidebar = React.useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	return (
		<SidebarContext.Provider value={{ open, setOpen, toggleSidebar }}>
			<div className="w-full bg-background overflow-hidden">{children}</div>
		</SidebarContext.Provider>
	);
}

export function Sidebar({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const { open } = useSidebar();

	return (
		<aside
			className={cn(
				"group/sidebar relative flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out shrink-0",
				open ? "w-[260px]" : "w-[60px]",
				className
			)}
			{...props}
		>
			<div className="flex h-full flex-col gap-2 overflow-hidden">
				{children}
			</div>
		</aside>
	);
}

export function SidebarTrigger({
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { toggleSidebar } = useSidebar();
	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn("h-8 w-8", className)}
			onClick={toggleSidebar}
			{...props}
		>
			<PanelLeft className="h-4 w-4" />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}

export function SidebarHeader({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { open } = useSidebar();
	return (
		<div
			className={cn(
				"flex flex-col p-4 h-14 justify-center",
				!open && "items-center px-2",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function SidebarContent({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex min-h-0 flex-1 flex-col gap-2 overflow-auto px-2",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function SidebarFooter({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { open } = useSidebar();
	return (
		<div
			className={cn(
				"flex flex-col p-4",
				!open && "items-center px-2",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function SidebarMenu({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLUListElement>) {
	return (
		<ul
			className={cn("flex w-full min-w-0 flex-col gap-1", className)}
			{...props}
		>
			{children}
		</ul>
	);
}

export function SidebarMenuItem({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLLIElement>) {
	return (
		<li className={cn("relative", className)} {...props}>
			{children}
		</li>
	);
}

export interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
	active?: boolean;
	tooltip?: string;
}

export function SidebarMenuButton({
	active,
	className,
	children,
	onClick,
	tooltip,
	...props
}: SidebarMenuButtonProps) {
	const { open } = useSidebar();

	return (
		<button
			onClick={onClick}
			title={!open ? tooltip : undefined}
			className={cn(
				"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
				active &&
					"bg-sidebar-accent text-sidebar-accent-foreground font-medium",
				!open && "justify-center",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
