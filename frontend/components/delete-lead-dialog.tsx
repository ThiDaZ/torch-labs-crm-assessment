import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "./ui/alert-dialog";

interface DeleteLeadDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	handleDeleteLead: () => void;
	isDeleting?: boolean;
	data: { id: string; name: string; companyName: string };
}

export default function DeleteLeadDialog({
	open,
	onOpenChange,
	handleDeleteLead,
	isDeleting = false,
	data,
}: DeleteLeadDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Lead</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete {data.name} from {data.companyName}? This action cannot
						be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteLead}
						disabled={isDeleting}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
