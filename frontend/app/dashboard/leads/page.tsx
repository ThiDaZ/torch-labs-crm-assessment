import { CreateLeadSheet } from "@/components/create-lead-sheet";

export default function Leads() {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Leads</h1>
			<p>This is the leads page. You can view and manage your leads here.</p>
      <CreateLeadSheet />
		</div>
	);
}
