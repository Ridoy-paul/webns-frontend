'use client';
import { routes } from "../Link";
import { useEffect, useState } from 'react';
import { Link, UserData, NetworkCaller, Urls } from '@/app/components/Link';
import Loading from "@/app/loading";
import TicketInput from "./TicketInput";

export default function EditTicketInfo({ id }) {
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

    if (!ticketItem.id) {
        return null;
    }

    return (
        <TicketInput ticket={ticketItem} />
    );
}
