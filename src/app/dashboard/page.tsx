"use client";

import { useState } from "react";
import EmployeeForm from "@/src/components/EmployeeForm";
import PredictionResultCard from "@/src/components/PredictionResultCard";
import RetentionPlanCard from "@/src/components/RetentionPlanCard";
import { useSteps } from "@/src/context/StepContext";

import {
	predictChurn,
	generateRetentionPlan,
} from "@/src/services/authService";
import {
	GENDER,
	MARITAL_STATUS,
	EDUCATION_FIELDS,
	DEPARTMENTS,
	JOB_ROLES,
	BUSINESS_TRAVEL,
} from "@/src/lib/constants";
import { EmployeeProfile } from "@/src/lib/types";

export default function DashboardPage() {
	const { currentStep, setCurrentStep } = useSteps();
	const [prediction, setPrediction] = useState<any | null>(null);
	const [retentionPlan, setRetentionPlan] = useState<any | null>(null);
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

	const handlePrediction = async () => {
		setIsPredicting(true);
		try {
			const result = await predictChurn(formData);
			setPrediction(result);
			setCurrentStep(4);
		} catch (err) {
			alert("Error calculating retention risk.");
			console.log(err);
		} finally {
			setIsPredicting(false);
		}
	};

	const handleGeneratePlan = async () => {
		if (!prediction?.id) return;

		setIsGeneratingPlan(true);
		try {
			const plan = await generateRetentionPlan(prediction.id);
			console.log("Plan API Response:", plan);
			setRetentionPlan(plan);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Error generating plan";
			alert(errorMessage);
		} finally {
			setIsGeneratingPlan(false);
		}
	};

	return (
		<>
			{currentStep < 4 ? (
				<EmployeeForm
					currentStep={currentStep}
					formData={formData}
					setFormData={setFormData}
					onNext={() => setCurrentStep((c: number) => c + 1)}
					onPrev={() => setCurrentStep((c: number) => c - 1)}
					onSubmit={handlePrediction}
					isLoading={isPredicting}
				/>
			) : (
				<div className="space-y-6">
					{prediction && (
						<PredictionResultCard
							result={{
								churnProbability: prediction.churn_probability,
								riskLevel: prediction.attrition === 1 ? "High" : "Low",
							}}
							onGeneratePlan={handleGeneratePlan}
							isGeneratingPlan={isGeneratingPlan}
							hasPlan={!!retentionPlan}
							employeeName="Analysis Subject #001"
							employeeId={`ID-${prediction.employee_id}`}
						/>
					)}

					{retentionPlan && (
						<RetentionPlanCard plan={retentionPlan.plan_content} />
					)}
				</div>
			)}
		</>
	);
}
