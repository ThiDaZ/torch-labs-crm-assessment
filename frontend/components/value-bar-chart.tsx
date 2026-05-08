"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { DashboardMetricsProps } from "@/lib/types";

const chartConfig = {
	won: {
		label: "Won",
	},
	lost: {
		label: "Lost",
	},
} satisfies ChartConfig;

interface ValueBarChartProps  {
  className?: string;
  data?: DashboardMetricsProps["data"] | null;
}

export function ValueBarChart({ className, data }: ValueBarChartProps) {
	const chartData = [
		{ title: "won", count: data?.wonLeads || 0, fill: "#22c55e" },
		{ title: "lost", count: data?.lostLeads || 0, fill: "#ef4444" },
	];

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle> Win/Loss Distribution </CardTitle>
				<CardDescription> Won vs Lost deal comparisons </CardDescription>
			</CardHeader>
			<CardContent className="lg:h-full">
				<ChartContainer config={chartConfig} className="h-64 lg:h-full w-full aspect-auto">
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							right: 40,
						}}
					>
						<YAxis
							dataKey="title"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
						/>
						<XAxis dataKey="count" type="number" hide />
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Bar dataKey="count" radius={4}>
							<LabelList
								dataKey="count"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
