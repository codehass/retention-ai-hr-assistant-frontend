import React from "react";
import { RetentionPlan } from "../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bot, Download, FileText } from "lucide-react";

interface RetentionPlanCardProps {
	plan: RetentionPlan;
}

const RetentionPlanCard: React.FC<RetentionPlanCardProps> = ({ plan }) => {
	return (
		<Card className="mt-6 border-indigo-100 shadow-lg overflow-hidden animate-in slide-in-from-bottom-4">
			<div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center text-white">
				<h2 className="text-lg font-bold flex items-center gap-2">
					<Bot className="h-5 w-5" />
					AI Recommended Actions
				</h2>
				<Badge
					variant="secondary"
					className="bg-white/20 text-white border-0 backdrop-blur-sm"
				>
					Gemini Powered
				</Badge>
			</div>

			<CardContent className="p-6">
				<p className="text-muted-foreground mb-6 text-sm">
					Based on the employee&apos;s profile and risk factors, here are
					concrete actions to improve retention:
				</p>

				<div className="grid gap-4">
					{plan.actions.map((action, index) => (
						<div
							key={index}
							className="flex gap-4 p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 hover:shadow-md transition-shadow"
						>
							<div className="flex-shrink-0 h-8 w-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
								{index + 1}
							</div>
							<p className="text-foreground font-medium leading-relaxed">
								{action}
							</p>
						</div>
					))}
				</div>

				<div className="mt-6 flex justify-end">
					<Button
						variant="ghost"
						className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
					>
						<Download className="mr-2 h-4 w-4" /> Export to PDF
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default RetentionPlanCard;
