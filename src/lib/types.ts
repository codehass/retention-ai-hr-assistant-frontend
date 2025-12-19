export interface User {
	username: string;
	token: string;
}

export interface EmployeeProfile {
	age: number;
	gender: string;
	maritalStatus: string;
	education: number;
	educationField: string;
	department: string;
	jobRole: string;
	jobLevel: number;
	businessTravel: string;
	monthlyIncome: number;
	stockOptionLevel: number;
	overTime: "Yes" | "No";
	totalWorkingYears: number;
	yearsAtCompany: number;
	yearsInCurrentRole: number;
	yearsWithCurrManager: number;
	environmentSatisfaction: number;
	jobSatisfaction: number;
	relationshipSatisfaction: number;
	jobInvolvement: number;
	workLifeBalance: number;
	performanceRating: number;
}

export interface PredictionResult {
	churnProbability: number;
	riskLevel: "Low" | "Medium" | "High";
}

export interface RetentionPlan {
	actions: string[];
}
