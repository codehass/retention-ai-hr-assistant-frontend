"use client";
import React, { createContext, useContext, useState } from "react";

const StepContext = createContext<any>(null);

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const STEPS = [
		{ id: 0, title: "Personal Details" },
		{ id: 1, title: "Job Details" },
		{ id: 2, title: "Work History" },
		{ id: 3, title: "Satisfaction Metrics" },
		{ id: 4, title: "Analysis Summary" },
	];

	return (
		<StepContext.Provider value={{ currentStep, setCurrentStep, STEPS }}>
			{children}
		</StepContext.Provider>
	);
};

export const useSteps = () => useContext(StepContext);
