'use client';
import { routes } from "../Link";
import { useEffect, useState } from 'react';
import { Link, UserData, NetworkCaller, Urls } from '@/app/components/Link';
import Loading from "@/app/loading";
import TicketCommentSection from "./TicketComment";

export default function TicketItem({ id }) {
    const networkCaller = new NetworkCaller();
    
    const [ticketItem, setticketItem] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchticketItem = async () => {
        const response = await networkCaller.getRequest(`${Urls.getticketItem()}?ticket_id=${id}`);
        if (response && response.isSuccess) {
            setticketItem(response.responseData);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchticketItem();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center">
                <Loading />
            </div>
        );
    }

    const { subject, description, priority, status_info, category_info, user_info, attachments } = ticketItem;

    return (
        <div className="container">
            <h3 className="mb-4">Ticket Information</h3>
            
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <h5 className="card-title fw-bold">{subject}</h5>
                            <p className="card-text">{description}</p>
                            <TicketCommentSection id={id} />
                        </div>
                        <div className="col-md-4">
                            <div className="shadow rounded border p-2">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Priority:</strong> {priority}</li>
                                    <li className="list-group-item"><strong>Status:</strong> {status_info?.name}</li>
                                    <li className="list-group-item"><strong>Category:</strong> {category_info?.name}</li>
                                    <li className="list-group-item"><strong>Created by:</strong> {user_info?.name}</li>
                                </ul>

                                {attachments && attachments.length > 0 && (
                                    <div className="mt-3">
                                        <h6>Attachments:</h6>
                                        <ul className="list-group">
                                            {attachments.map((attachment) => (
                                                <li className="list-group-item" key={attachment.id}>
                                                    <a
                                                        href={`http://localhost:8000/${attachment.file_path}`}
                                                        download={true}
                                                        rel="noopener noreferrer"
                                                    >
                                                        {attachment.file_name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                    

                    
                </div>
            </div>

        </div>
    );
}
