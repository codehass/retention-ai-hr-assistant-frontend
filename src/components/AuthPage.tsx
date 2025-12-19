"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Loader2, Lock } from "lucide-react";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState("hr_manager");
	const [password, setPassword] = useState("securepassword");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
	};

	return (
		<div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
			<Card className="w-full max-w-md shadow-xl">
				<CardHeader className="space-y-1 text-center">
					<div className="flex justify-center mb-2">
						<div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
							<span className="text-primary-foreground font-bold italic text-2xl">
								R
							</span>
						</div>
					</div>
					<CardTitle className="text-2xl font-bold">RetentionAI</CardTitle>
					<CardDescription>
						Enter your credentials to access the HR Decision Support System
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center w-full mb-6 rounded-md bg-muted p-1">
						<Button
							variant={isLogin ? "default" : "ghost"}
							className="flex-1 shadow-none"
							size="sm"
							onClick={() => setIsLogin(true)}
						>
							Log In
						</Button>
						<Button
							variant={!isLogin ? "default" : "ghost"}
							className="flex-1 shadow-none"
							size="sm"
							onClick={() => setIsLogin(false)}
						>
							Register
						</Button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								placeholder="hr_manager"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
							</div>
						</div>

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
								</>
							) : isLogin ? (
								"Access Dashboard"
							) : (
								"Create Account"
							)}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col gap-2 border-t pt-4">
					<p className="text-xs text-center text-muted-foreground">
						HR platform
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default AuthPage;
