import TicketInput from '@/app/components/Ticket/TicketInput';

export const metadata = {
    title: "Create New Ticket",
};

export default function CreateTicket() {
    return (
        <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Create New Ticket</h1>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <TicketInput />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
