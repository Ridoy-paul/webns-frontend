import EditTicketInfo from "@/app/components/Ticket/EditTicketInfo";

export const metadata = {
    title: "Edit Ticket",
};

export default function PropertyDetails({ params }) {
    const id = params?.id ?? null;

    return (
        <EditTicketInfo id={id} />
    )
};