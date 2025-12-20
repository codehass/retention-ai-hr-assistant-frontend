"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bot } from "lucide-react";

interface RetentionPlanCardProps {
	plan: string[];
}

const RetentionPlanCard: React.FC<RetentionPlanCardProps> = ({ plan }) => {
	return (
		<Card className="mt-6 border-indigo-100 shadow-lg overflow-hidden animate-in slide-in-from-bottom-4">
			<div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center text-white">
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
					{plan && plan.length > 0 ? (
						plan.map((action, index) => (
							<div
								key={index}
								className="flex gap-4 p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 hover:shadow-md transition-shadow"
							>
								<div className="shrink-0 h-8 w-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
									{index + 1}
								</div>
								<p className="text-foreground font-medium leading-relaxed">
									{action}
								</p>
							</div>
						))
					) : (
						<p className="text-sm text-gray-500">
							No specific actions generated.
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default RetentionPlanCard;
