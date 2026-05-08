"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetricsProps } from "@/lib/types";

export function SalesPipeline({ data }: DashboardMetricsProps) {
	const stages = [
		{ name: "New", count: data?.newLeads || 0, color: "#3b82f6" },
		{ name: "Contacted", count: data?.contactedLeads || 0, color: "#f97316" },
		{ name: "Qualified", count: data?.qualifiedLeads || 0, color: "#a855f7" },
		{ name: "Proposal", count: data?.proposalLeads || 0, color: "#eab308" },
		{ name: "Won", count: data?.wonLeads || 0, color: "#22c55e" },
		{ name: "Lost", count: data?.lostLeads || 0, color: "#ef4444" },
	];

	const totalCount = stages.reduce((sum, stage) => sum + stage.count, 0);

	return (
		<Card className="border-border/50 bg-card">
			<CardHeader>
				<CardTitle className="text-foreground">Sales Pipeline</CardTitle>
				<CardDescription className="text-muted-foreground">Current deals by stage</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{stages.map((stage) => (
						<div key={stage.name} className="space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span className="text-foreground font-medium">{stage.name}</span>
								<span className="text-muted-foreground">{stage.count} leads</span>
							</div>
							<div className="h-2 bg-secondary rounded-full overflow-hidden">
								<div
									className="h-full rounded-full transition-all"
									style={{
										width: `${(stage.count / totalCount) * 100}%`,
										backgroundColor: stage.color,
									}}
								/>
							</div>
						</div>
					))}
				</div>
				<div className="mt-6 pt-4 border-t border-border">
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">Total Pipeline Count</span>
						<span className="text-lg font-bold text-foreground">{totalCount}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
