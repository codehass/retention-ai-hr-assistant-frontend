"use client";

import { useState, useEffect } from "react";

export function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await fetch(`/api/v1/auth/status`, {
					credentials: "include",
				});

				if (res.ok) {
					const data = await res.json();
					setIsAuthenticated(data.authenticated);
				} else {
					setIsAuthenticated(false);
				}
			} catch (err) {
				console.error("Auth check failed", err);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	return { isAuthenticated, setIsAuthenticated, isLoading };
}
