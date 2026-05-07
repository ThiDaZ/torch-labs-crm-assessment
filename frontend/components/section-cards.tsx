"use client";

import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetricsProps } from "@/lib/types";
import { TrendingUpIcon, UserPlus, Award, Users2 } from "lucide-react";



export function SectionCards({ data }: DashboardMetricsProps) {
	const cardData = [
		{
			title: "Total Leads",
			value: data ? data.totalLeads.toString() : "0",
			trendIcon: <Users2 fill="#f59e0b" size={20} color="#f59e0b" />,
		},
		{
			title: "New Leads",
			value: data ? data.newLeads.toString() : "0",
			trendIcon: <UserPlus size={20} fill="#f59e0b" color="#f59e0b" />,
		},
		{
			title: "Qualified Leads",
			value: data ? data.qualifiedLeads.toString() : "0",
			trendIcon: <Award size={20} fill="#f59e0b" color="#f59e0b" />,
		},
		{
			title: "Est. Total Value",
			value: data ? `LKR.${data.totalEstimatedValue.toLocaleString()}` : "LKR.0",
			trendIcon: <TrendingUpIcon size={20} fill="#f59e0b" color="#f59e0b" />,
		},
	];

	return (
		<div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
			{cardData.map((card, index) => (
				<Card className="@container/card" key={index}>
					<CardHeader className="gap-1 h-24">
						<CardDescription>{card.title}</CardDescription>
						<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
							{card.value}
						</CardTitle>
						<CardAction>
							<div className="flex items-center justify-center border rounded-full h-12 w-12">
								{card.trendIcon}
							</div>
						</CardAction>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}
