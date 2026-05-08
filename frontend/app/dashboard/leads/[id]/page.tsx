import { LeadDetailClient } from "@/components/lead-details";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";

export default async function LeadDetailsPage({ params }: { params: { id: string } }) {
	const { id } = await params;

	return (
		<>
			<SiteHeader title={`Leads Details #${id}`} />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<div className="px-6 py-4">
							<div className="flex items-center justify-between">
								<div>
									<h1 className="text-2xl font-bold text-foreground">Leads Details</h1>
									<p className="text-sm text-muted-foreground mt-1">
										Drag and drop leads to change their status
									</p>
								</div>
								<div className="flex items-center gap-3">
									<Edit />
								</div>
							</div>
						</div>
						<div className="min-h-screen bg-background">
							<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
								<div className="mb-6">
									<Link href="/">
										<Button
											variant="ghost"
											size="sm"
											className="gap-2 text-muted-foreground hover:text-foreground"
										>
											<ArrowLeft className="h-4 w-4" />
											Back to Dashboard
										</Button>
									</Link>
								</div>

								<LeadDetailClient leadId={id} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
