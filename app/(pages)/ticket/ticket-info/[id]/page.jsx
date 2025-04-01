import TicketItem from "@/app/components/Ticket/TicketInfo";

export const metadata = {
    title: "Ticket Information",
};

export default function PropertyDetails({ params }) {
    const id = params?.id ?? null;

    return (
        <TicketItem id={id} />
    )
};