import { LeadDetailClient } from "@/components/lead-details";
import LeadNotes from "@/components/lead-notes";
import { SiteHeader } from "@/components/site-header";

export default async function LeadDetailsPage({ params }: { params: { id: string } }) {
	const { id } = await params;

	return (
		<>
			<SiteHeader title={`Lead Details #${id}`} />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<div className="px-6 py-4">
							<div className="flex items-center justify-between">
								<div>
									<h1 className="text-3xl font-bold text-foreground">Lead Details</h1>
									<p className="text-sm text-muted-foreground mt-1">
										Details and information about the lead. You can edit the lead information by
										clicking the edit button.
									</p>
								</div>
							</div>
						</div>
						<div className="px-6">
							<LeadDetailClient leadId={id} />
						</div>
						<div className="mt-6 px-3">
							<div>
								<LeadNotes leadId={id} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
