import { CreateLeadSheet } from "@/components/create-lead-sheet";
import { SiteHeader } from "@/components/site-header";
import KanbanBoard from "@/components/spectrumui/kanbanboard";

export default function Leads() {
	return (
		<>
			<SiteHeader title="Leads" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

						<div className="px-6 py-4">
							<div className="flex items-center justify-between">
								<div>
									<h1 className="text-2xl font-bold text-foreground">Leads Management</h1>
									<p className="text-sm text-muted-foreground mt-1">
										Drag and drop leads to change their status
									</p>
								</div>
								<div className="flex items-center gap-3">
									<CreateLeadSheet />
								</div>
							</div>
						</div>
						
						<KanbanBoard />
					</div>
				</div>
			</div>
		</>
	);
}
