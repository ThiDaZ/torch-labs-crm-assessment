"use client";

import { SalesPipeline } from "@/components/sales-pipline";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import ValueCharts from "@/components/value-charts";
import { getDashboardMetrics } from "@/lib/api/dashboard/metrics";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
	const { data } = useQuery({
		queryKey: ["dashboardMetrics"],
		queryFn: getDashboardMetrics,
	});

	return (
		<>
			<SiteHeader title="Dashboard" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">

					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<SectionCards data={data} />

						<div className="px-4 lg:px-6">
							<SalesPipeline data={data} />
						</div>
						<div className="px-4 lg:px-6 ">
							<ValueCharts data={data} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
