import { CreateLeadSheet } from "@/components/create-lead-sheet";
import { SiteHeader } from "@/components/site-header";
import KanbanBoard from "@/components/spectrumui/kanbanboard";

export default function Leads() {
	return (
		<>
			<SiteHeader title="Leads" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<CreateLeadSheet />

					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<KanbanBoard />

					</div>
				</div>
			</div>
		</>
	);
}
