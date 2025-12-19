"use client";

import { useState } from "react";
import AuthPage from "@/src/components/AuthPage";
import EmployeeForm from "@/src/components/EmployeeForm";
import PredictionResultCard from "@/src/components/PredictionResultCard";
import RetentionPlanCard from "@/src/components/RetentionPlanCard";
// import { predictChurn, generateRetentionPlan } from "@/src/services/aiService";
import {
	EmployeeProfile,
	PredictionResult,
	RetentionPlan,
	User,
} from "@/src/lib/types";
import {
	DEPARTMENTS,
	JOB_ROLES,
	BUSINESS_TRAVEL,
	EDUCATION_FIELDS,
	GENDER,
	MARITAL_STATUS,
} from "@/src/lib/constants";

// const STEPS = [
// 	{ id: 0, title: "Personal Details" },
// 	{ id: 1, title: "Job Details" },
// 	{ id: 2, title: "Work History" },
// 	{ id: 3, title: "Satisfaction Metrics" },
// 	{ id: 4, title: "Analysis Summary" },
// ];

export default function DashboardPage() {
	const [user, setUser] = useState<User | null>(null);

	const [currentStep, setCurrentStep] = useState(0);
	const [prediction, setPrediction] = useState<PredictionResult | null>(null);
	const [retentionPlan, setRetentionPlan] = useState<RetentionPlan | null>(
		null
	);
	const [isPredicting, setIsPredicting] = useState(false);
	const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

	const [formData, setFormData] = useState<EmployeeProfile>({
		age: 32,
		gender: GENDER[0],
		maritalStatus: MARITAL_STATUS[1],
		education: 3,
		educationField: EDUCATION_FIELDS[3],
		department: DEPARTMENTS[1],
		jobRole: JOB_ROLES[1],
		jobLevel: 2,
		businessTravel: BUSINESS_TRAVEL[1],
		monthlyIncome: 6500,
		stockOptionLevel: 1,
		overTime: "No",
		totalWorkingYears: 8,
		yearsAtCompany: 4,
		yearsInCurrentRole: 2,
		yearsWithCurrManager: 2,
		environmentSatisfaction: 3,
		jobSatisfaction: 2,
		relationshipSatisfaction: 3,
		jobInvolvement: 3,
		workLifeBalance: 2,
		performanceRating: 3,
	});

	const handleLogin = (username: string) => {
		setUser({ username, token: "mock-jwt-token-xyz" });
	};

	const handleLogout = () => {
		setUser(null);
		setPrediction(null);
		setRetentionPlan(null);
		setCurrentStep(0);
	};

	const handlePrediction = async () => {
		setIsPredicting(true);
		// try {
		// 	const result = await predictChurn(formData);
		// 	setPrediction(result);
		setCurrentStep(4);
		// } finally {
		// 	setIsPredicting(false);
		// }
	};

	const handleGeneratePlan = async () => {
		// if (!prediction) return;
		// setIsGeneratingPlan(true);
		// try {
		// 	const plan = await generateRetentionPlan(
		// 		formData,
		// 		prediction.churnProbability
		// 	);
		// 	setRetentionPlan(plan);
		// } finally {
		// 	setIsGeneratingPlan(false);
		// }
	};

	// 🔐 Auth guard
	// if (!user) {
	// 	return (
	// 		<AuthPage
	// 		// onLogin={handleLogin}
	// 		/>
	// 	);
	// }

	return (
		<>
			{currentStep < 4 ? (
				<EmployeeForm
					currentStep={currentStep}
					formData={formData}
					setFormData={setFormData}
					onNext={() => setCurrentStep((c) => c + 1)}
					onPrev={() => setCurrentStep((c) => c - 1)}
					onSubmit={handlePrediction}
					isLoading={isPredicting}
				/>
			) : (
				<>
					{prediction && (
						<PredictionResultCard
							result={prediction}
							onGeneratePlan={handleGeneratePlan}
							isGeneratingPlan={isGeneratingPlan}
							hasPlan={!!retentionPlan}
							employeeName="Analysis Subject #001"
							employeeId={`ID-${Math.random() * 10000}`}
						/>
					)}

					{retentionPlan && <RetentionPlanCard plan={retentionPlan} />}
				</>
			)}
		</>
	);
}
