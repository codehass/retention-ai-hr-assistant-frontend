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

export const logout = async () => {
	try {
		const response = await fetch("/api/v1/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Logout failed");
		}

		return await response.json();
	} catch (error) {
		console.error("Logout error:", error);
		throw error;
	}
};

export const predictChurn = async (
	data: EmployeeProfile
): Promise<PredictionResult> => {
	const payload = {
		Age: data.age,
		JobLevel: data.jobLevel,
		MonthlyIncome: data.monthlyIncome,
		StockOptionLevel: data.stockOptionLevel,
		TotalWorkingYears: data.totalWorkingYears,
		YearsAtCompany: data.yearsAtCompany,
		YearsInCurrentRole: data.yearsInCurrentRole,
		YearsWithCurrManager: data.yearsWithCurrManager,
		Education: data.education,
		EnvironmentSatisfaction: data.environmentSatisfaction,
		JobInvolvement: data.jobInvolvement,
		JobSatisfaction: data.jobSatisfaction,
		PerformanceRating: data.performanceRating,
		RelationshipSatisfaction: data.relationshipSatisfaction,
		WorkLifeBalance: data.workLifeBalance,
		BusinessTravel: data.businessTravel,
		Department: data.department,
		EducationField: data.educationField,
		Gender: data.gender,
		JobRole: data.jobRole,
		MaritalStatus: data.maritalStatus,
		OverTime: data.overTime,
	};

	const response = await fetch("/api/v1/predict/predict-attrition/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to get prediction from server");
	}

	return await response.json();
};

export const generateRetentionPlan = async (predictionId: number) => {
	const response = await fetch("/api/v1/predict/generate-retention-plan", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ prediction_id: predictionId }),
		credentials: "include",
	});
	if (!response.ok) throw new Error("Plan generation failed");
	return await response.json();
};
