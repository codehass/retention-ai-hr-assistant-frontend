import React from "react";
import { PredictionResult } from "@/src/lib/types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Loader2, Wand2, Edit, X } from "lucide-react";

interface PredictionResultCardProps {
	result: PredictionResult;
	onGeneratePlan: () => void;
	isGeneratingPlan: boolean;
	hasPlan: boolean;
	employeeName: string;
	employeeId: string;
}

const PredictionResultCard: React.FC<PredictionResultCardProps> = ({
	result,
	onGeneratePlan,
	isGeneratingPlan,
	hasPlan,
	employeeName = "Employee Analysis",
	employeeId = "EMP-2023-X92",
}) => {
	const percentage = Math.round(result.churnProbability * 100);

	const getRiskVariant = (
		risk: number
	): "default" | "destructive" | "secondary" | "outline" => {
		if (risk > 50) return "destructive";
		if (risk > 20) return "secondary"; // Using secondary for Amber/Medium roughly
		return "outline"; // Using outline for Safe
	};

	const badgeVariant = getRiskVariant(percentage);

	return (
		<div className="mt-8 animate-in fade-in slide-in-from-bottom-2">
			<div className="flex justify-between items-end mb-4">
				<p className="font-medium text-foreground">Analysis Result</p>
				<Button
					variant="ghost"
					size="sm"
					className="h-auto p-0 text-muted-foreground hover:text-foreground"
				>
					<X className="mr-1 h-3 w-3" /> Clear
				</Button>
			</div>

			<Card className="overflow-hidden">
				<CardContent className="p-0">
					<div className="flex flex-col md:flex-row">
						{/* Left Section: User */}
						<div className="p-6 flex-1 flex flex-col md:flex-row gap-6 md:items-start">
							<div className="flex items-start gap-4">
								<div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-lg font-bold text-secondary-foreground">
									{employeeName.charAt(0)}
								</div>
								<div>
									<h3 className="font-bold text-foreground">{employeeName}</h3>
									<p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
										{employeeId}
									</p>
								</div>
							</div>

							<div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 md:pl-8 md:border-l">
								<div>
									<p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
										PROBABILITY
									</p>
									<p className="text-2xl font-bold">{percentage}%</p>
								</div>
								<div>
									<p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
										STATUS
									</p>
									<Badge variant={badgeVariant}>{result.riskLevel} Risk</Badge>
								</div>
								<div className="col-span-2 md:col-span-1">
									<p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
										RECOMMENDATION
									</p>
									<p className="font-medium truncate">
										{percentage > 50
											? "Retention Plan Required"
											: "Monitor Quarterly"}
									</p>
								</div>
							</div>
						</div>

						{/* Right Section: Actions */}
						<div className="bg-muted/50 p-6 flex flex-row md:flex-col items-center justify-center gap-3 border-t md:border-t-0 md:border-l">
							<Button variant="outline" className="w-full">
								<Edit className="mr-2 h-4 w-4" /> Edit
							</Button>

							{percentage > 50 && !hasPlan && (
								<Button
									onClick={onGeneratePlan}
									disabled={isGeneratingPlan}
									className="w-full"
								>
									{isGeneratingPlan ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<Wand2 className="mr-2 h-4 w-4" />
									)}
									Generate Plan
								</Button>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default PredictionResultCard;
