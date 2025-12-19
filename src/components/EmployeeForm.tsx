import React from "react";
import {
	DEPARTMENTS,
	JOB_ROLES,
	BUSINESS_TRAVEL,
	EDUCATION_FIELDS,
	GENDER,
	MARITAL_STATUS,
	EDUCATION_LEVELS,
} from "../lib/constants";
import { EmployeeProfile } from "../lib/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "./ui/card";
import { ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react";

interface EmployeeFormProps {
	currentStep: number;
	formData: EmployeeProfile;
	setFormData: React.Dispatch<React.SetStateAction<EmployeeProfile>>;
	onNext: () => void;
	onPrev: () => void;
	onSubmit: () => void;
	isLoading: boolean;
}

const NativeSelect = React.forwardRef<
	HTMLSelectElement,
	React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
	<div className="relative">
		<select
			ref={ref}
			className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
			{...props}
		>
			{children}
		</select>
		<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
			<svg
				className="h-4 w-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M19 9l-7 7-7-7"
				></path>
			</svg>
		</div>
	</div>
));
NativeSelect.displayName = "NativeSelect";

const EmployeeForm: React.FC<EmployeeFormProps> = ({
	currentStep,
	formData,
	setFormData,
	onNext,
	onPrev,
	onSubmit,
	isLoading,
}) => {
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		const isNumberField = [
			"age",
			"education",
			"jobLevel",
			"monthlyIncome",
			"stockOptionLevel",
			"totalWorkingYears",
			"yearsAtCompany",
			"yearsInCurrentRole",
			"yearsWithCurrManager",
			"environmentSatisfaction",
			"jobSatisfaction",
			"relationshipSatisfaction",
			"jobInvolvement",
			"workLifeBalance",
			"performanceRating",
		].includes(name);

		setFormData((prev) => ({
			...prev,
			[name]: isNumberField ? Number(value) : value,
		}));
	};

	const handleRadioChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const isLastStep = currentStep === 3;
	return (
		<div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
			<Card>
				<CardHeader>
					<CardTitle>
						{currentStep === 0 && "Personal Details"}
						{currentStep === 1 && "Position & Role"}
						{currentStep === 2 && "Employment History"}
						{currentStep === 3 && "Satisfaction & Metrics"}
					</CardTitle>
					<CardDescription>
						{currentStep === 0 && "Please enter basic employee information."}
						{currentStep === 1 &&
							"Details about the employee's current position."}
						{currentStep === 2 && "Duration and loyalty metrics."}
						{currentStep === 3 && "Employee feedback and ratings (1-4)."}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Step 1: Personal Info */}
					{currentStep === 0 && (
						<div className="grid gap-6">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="space-y-2">
									<Label htmlFor="age">Age</Label>
									<Input
										id="age"
										type="number"
										name="age"
										value={formData.age}
										onChange={handleChange}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="gender">Gender</Label>
									<NativeSelect
										id="gender"
										name="gender"
										value={formData.gender}
										onChange={handleChange}
									>
										{GENDER.map((g) => (
											<option key={g} value={g}>
												{g}
											</option>
										))}
									</NativeSelect>
								</div>
								<div className="space-y-2">
									<Label htmlFor="maritalStatus">Marital Status</Label>
									<NativeSelect
										id="maritalStatus"
										name="maritalStatus"
										value={formData.maritalStatus}
										onChange={handleChange}
									>
										{MARITAL_STATUS.map((s) => (
											<option key={s} value={s}>
												{s}
											</option>
										))}
									</NativeSelect>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="education">Education Level</Label>
									<NativeSelect
										id="education"
										name="education"
										value={formData.education}
										onChange={handleChange}
									>
										{EDUCATION_LEVELS.map((e) => (
											<option key={e.value} value={e.value}>
												{e.label}
											</option>
										))}
									</NativeSelect>
								</div>
								<div className="space-y-2">
									<Label htmlFor="educationField">Field of Study</Label>
									<NativeSelect
										id="educationField"
										name="educationField"
										value={formData.educationField}
										onChange={handleChange}
									>
										{EDUCATION_FIELDS.map((f) => (
											<option key={f} value={f}>
												{f}
											</option>
										))}
									</NativeSelect>
								</div>
							</div>
						</div>
					)}

					{/* Step 2: Job Details */}
					{currentStep === 1 && (
						<div className="grid gap-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="department">Department</Label>
									<NativeSelect
										id="department"
										name="department"
										value={formData.department}
										onChange={handleChange}
									>
										{DEPARTMENTS.map((d) => (
											<option key={d} value={d}>
												{d}
											</option>
										))}
									</NativeSelect>
								</div>
								<div className="space-y-2">
									<Label htmlFor="jobRole">Job Role</Label>
									<NativeSelect
										id="jobRole"
										name="jobRole"
										value={formData.jobRole}
										onChange={handleChange}
									>
										{JOB_ROLES.map((r) => (
											<option key={r} value={r}>
												{r}
											</option>
										))}
									</NativeSelect>
								</div>
								<div className="space-y-2">
									<Label>Job Level</Label>
									<div className="flex gap-2">
										{[1, 2, 3, 4, 5].map((level) => (
											<Button
												key={level}
												type="button"
												variant={
													formData.jobLevel === level ? "default" : "outline"
												}
												className="w-10 h-10 p-0"
												onClick={() =>
													setFormData((prev) => ({ ...prev, jobLevel: level }))
												}
											>
												{level}
											</Button>
										))}
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="businessTravel">Business Travel</Label>
									<NativeSelect
										id="businessTravel"
										name="businessTravel"
										value={formData.businessTravel}
										onChange={handleChange}
									>
										{BUSINESS_TRAVEL.map((t) => (
											<option key={t} value={t}>
												{t}
											</option>
										))}
									</NativeSelect>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
								<div className="space-y-2">
									<Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
									<Input
										id="monthlyIncome"
										type="number"
										name="monthlyIncome"
										value={formData.monthlyIncome}
										onChange={handleChange}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="stockOptionLevel">Stock Level (0-3)</Label>
									<Input
										id="stockOptionLevel"
										type="number"
										name="stockOptionLevel"
										value={formData.stockOptionLevel}
										onChange={handleChange}
										min={0}
										max={3}
									/>
								</div>
								<div className="space-y-2">
									<Label>Overtime</Label>
									<div className="flex gap-2">
										<Button
											type="button"
											variant={
												formData.overTime === "Yes" ? "default" : "outline"
											}
											onClick={() => handleRadioChange("overTime", "Yes")}
											className="flex-1"
										>
											Yes
										</Button>
										<Button
											type="button"
											variant={
												formData.overTime === "No" ? "default" : "outline"
											}
											onClick={() => handleRadioChange("overTime", "No")}
											className="flex-1"
										>
											No
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Step 3: History */}
					{currentStep === 2 && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="totalWorkingYears">Total Working Years</Label>
								<Input
									id="totalWorkingYears"
									type="number"
									name="totalWorkingYears"
									value={formData.totalWorkingYears}
									onChange={handleChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="yearsAtCompany">Years at Company</Label>
								<Input
									id="yearsAtCompany"
									type="number"
									name="yearsAtCompany"
									value={formData.yearsAtCompany}
									onChange={handleChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="yearsInCurrentRole">
									Years in Current Role
								</Label>
								<Input
									id="yearsInCurrentRole"
									type="number"
									name="yearsInCurrentRole"
									value={formData.yearsInCurrentRole}
									onChange={handleChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="yearsWithCurrManager">
									Years with Current Manager
								</Label>
								<Input
									id="yearsWithCurrManager"
									type="number"
									name="yearsWithCurrManager"
									value={formData.yearsWithCurrManager}
									onChange={handleChange}
								/>
							</div>
						</div>
					)}

					{/* Step 4: Metrics */}
					{currentStep === 3 && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{[
								{
									label: "Environment Satisfaction",
									name: "environmentSatisfaction",
								},
								{ label: "Job Satisfaction", name: "jobSatisfaction" },
								{
									label: "Relationship Satisfaction",
									name: "relationshipSatisfaction",
								},
								{ label: "Job Involvement", name: "jobInvolvement" },
								{ label: "Work Life Balance", name: "workLifeBalance" },
								{ label: "Performance Rating", name: "performanceRating" },
							].map((field) => (
								<div key={field.name} className="space-y-2">
									<Label>{field.label}</Label>
									<div className="flex gap-1">
										{[1, 2, 3, 4].map((val) => (
											<Button
												key={val}
												type="button"
												variant={
													(formData as any)[field.name] === val
														? "default"
														: "secondary"
												}
												className="flex-1 h-9"
												onClick={() =>
													setFormData((prev) => ({
														...prev,
														[field.name]: val,
													}))
												}
											>
												{val}
											</Button>
										))}
									</div>
								</div>
							))}
						</div>
					)}

					<div className="flex items-center justify-between pt-6">
						<Button
							type="button" // Always specify type="button" to prevent accidental form submits
							variant="ghost"
							onClick={onPrev}
							disabled={currentStep === 0 || isLoading}
							className={currentStep === 0 ? "invisible" : ""}
						>
							<ArrowLeft className="mr-2 h-4 w-4" /> Back
						</Button>

						{isLastStep ? (
							<Button
								onClick={onSubmit}
								disabled={isLoading}
								className="bg-primary hover:bg-primary/90 min-w-[140px]"
							>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Analyzing...
									</>
								) : (
									<>
										<Sparkles className="mr-2 h-4 w-4" /> Predict Risk
									</>
								)}
							</Button>
						) : (
							<Button type="button" onClick={onNext}>
								Next Step <ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default EmployeeForm;
