import AllTicket from "@/app/components/Ticket/AllTicket";

export const metadata = {
    title: "All Tickets",
};

export default function CreateTicket() {
    return (
        <div className="container-fluid p-0">
            <h1 className="h3 mb-3">All Tickets</h1>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body p-1">
                            <AllTicket />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
