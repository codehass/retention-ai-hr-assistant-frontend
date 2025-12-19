export interface User {
	username: string;
	token: string;
}

export interface EmployeeProfile {
	// Personal Info
	age: number;
	gender: string;
	maritalStatus: string;
	education: number; // 1-5
	educationField: string;

	// Job Details
	department: string;
	jobRole: string;
	jobLevel: number;
	businessTravel: string;
	monthlyIncome: number;
	stockOptionLevel: number; // 0-3
	overTime: "Yes" | "No";

	// Experience & History
	totalWorkingYears: number;
	yearsAtCompany: number;
	yearsInCurrentRole: number;
	yearsWithCurrManager: number;

	// Satisfaction & Performance (1-4)
	environmentSatisfaction: number;
	jobSatisfaction: number;
	relationshipSatisfaction: number;
	jobInvolvement: number;
	workLifeBalance: number;
	performanceRating: number;
}

export interface PredictionResult {
	churnProbability: number; // 0.0 to 1.0
	riskLevel: "Low" | "Medium" | "High";
}

export interface RetentionPlan {
	actions: string[];
}
