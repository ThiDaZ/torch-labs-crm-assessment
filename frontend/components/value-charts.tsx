import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ValueBarChart } from "./value-bar-chart";
import { DashboardMetricsProps } from "@/lib/types";

export default function ValueCharts({ data }: DashboardMetricsProps) {
	const chartData = [
		{
			title: "Won Revenue",
			value: data?.totalWonValue || 0,
			icon: <TrendingUpIcon size={20} />,
			foreground: "text-green-400",
		},
		{
			title: "Lost Revenue",
			value: data?.totalLostValue || 0,
			icon: <TrendingDownIcon size={20} />,
			foreground: "text-red-400",
		},
	];

	return (
		<div className="flex flex-col gap-4  md:gap-6  rounded-lg px-2 md:px-0">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="flex-1 grid gap-2">
					{chartData.map((item, index) => (
						<Card className="@container/card" key={index}>
							<CardHeader className="gap-1 h-24">
								<CardDescription className="text-xs sm:text-sm">{item.title}</CardDescription>
								<CardTitle
									className={`text-lg sm:text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${item.foreground}`}
								>
									LKR {item.value}
								</CardTitle>
								<CardAction>
									<div className="flex items-center justify-center rounded-full h-12 w-12">
										{item.icon}
									</div>
								</CardAction>
							</CardHeader>
						</Card>
					))}
				</div>

				<ValueBarChart data={data} className="lg:col-span-2 h-full" />
			</div>
		</div>
	);
}
