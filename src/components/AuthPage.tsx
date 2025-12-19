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
import { login, register } from "@/src/services/authService";
import { useRouter } from "next/navigation";

const AuthPage = () => {
	const router = useRouter();
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState("hr_manager");
	const [password, setPassword] = useState("secure password");
	const [email, setEmail] = useState("email");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (loading) return;

		setLoading(true);
		setError(null);

		try {
			if (isLogin) {
				await login(username, password);
			} else {
				await register(username, email, password);
			}
			router.push("/dashboard");
			router.refresh();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Something went wrong");
			}
		} finally {
			setLoading(false);
		}
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
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>

						{!isLogin && (
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<div className="relative">
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
									<Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
								</div>
							</div>
						)}

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

						{error && (
							<p className="text-sm text-red-500 text-center">{error}</p>
						)}

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Processing
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
