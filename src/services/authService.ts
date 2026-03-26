import { EmployeeProfile, PredictionResult } from "@/src/lib/types";

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

	const text = await res.text();
	
	if (!res.ok) {
		try {
			const error = JSON.parse(text);
			throw new Error(error.detail || "Login failed");
		} catch {
			throw new Error(text || "Login failed");
		}
	}

	try {
		return JSON.parse(text);
	} catch {
		throw new Error("Invalid response from server");
	}
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

	const text = await res.text();
	
	if (!res.ok) {
		try {
			const error = JSON.parse(text);
			throw new Error(error.detail || "Registration failed");
		} catch {
			throw new Error(text || "Registration failed");
		}
	}

	try {
		return JSON.parse(text);
	} catch {
		throw new Error("Invalid response from server");
	}
}

export const logout = async () => {
	try {
		const response = await fetch("/api/v1/auth/logout", {
			method: "POST",
			credentials: "include",
		});

		if (response.ok) {
			return { message: "Logged out successfully" };
		}
		
		console.error("Logout failed with status:", response.status);
		throw new Error("Logout failed");
	} catch (error) {
		console.error("Logout error:", error);
		return { message: "Logged out" };
	}
};

export const predictChurn = async (
	data: EmployeeProfile
): Promise<PredictionResult> => {
	const payload = {
		age: data.age,
		job_level: data.jobLevel,
		monthly_income: data.monthlyIncome,
		stock_option_level: data.stockOptionLevel,
		total_working_years: data.totalWorkingYears,
		years_at_company: data.yearsAtCompany,
		years_in_current_role: data.yearsInCurrentRole,
		years_with_curr_manager: data.yearsWithCurrManager,
		education: data.education,
		environment_satisfaction: data.environmentSatisfaction,
		job_involvement: data.jobInvolvement,
		job_satisfaction: data.jobSatisfaction,
		performance_rating: data.performanceRating,
		relationship_satisfaction: data.relationshipSatisfaction,
		work_life_balance: data.workLifeBalance,
		business_travel: data.businessTravel,
		department: data.department,
		education_field: data.educationField,
		gender: data.gender,
		job_role: data.jobRole,
		marital_status: data.maritalStatus,
		over_time: data.overTime,
	};

	const response = await fetch("/api/v1/predict/attrition", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	});

	const text = await response.text();
	
	if (!response.ok) {
		try {
			const error = JSON.parse(text);
			throw new Error(error.detail || "Failed to get prediction from server");
		} catch {
			throw new Error(text || "Failed to get prediction from server");
		}
	}

	try {
		return JSON.parse(text);
	} catch {
		throw new Error("Invalid response from server");
	}
};

export const generateRetentionPlan = async (predictionId: number) => {
	const response = await fetch("/api/v1/predict/retention-plan", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ prediction_id: predictionId }),
		credentials: "include",
	});

	const text = await response.text();
	
	if (!response.ok) {
		try {
			const error = JSON.parse(text);
			throw new Error(error.detail || "Plan generation failed");
		} catch {
			throw new Error(text || "Plan generation failed");
		}
	}

	try {
		return JSON.parse(text);
	} catch {
		throw new Error("Invalid response from server");
	}
};
