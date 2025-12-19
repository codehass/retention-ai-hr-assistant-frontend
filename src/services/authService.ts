export async function login(username: string, password: string) {
	const formData = new URLSearchParams();
	formData.append("username", username);
	formData.append("password", password);

	const res = await fetch("/api/v1/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		credentials: "include",
		body: formData.toString(),
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.detail || "Login failed");
	}

	return res.json();
}

export async function register(
	username: string,
	email: string,
	password: string
) {
	const res = await fetch("/api/v1/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.detail || "Registration failed");
	}

	return res.json();
}

export async function logout() {
	await fetch("/api/v1/auth/logout", {
		method: "POST",
		credentials: "include",
	});
}
