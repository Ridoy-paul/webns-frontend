'use client';
import { useEffect, useState } from 'react';
import { Link, NetworkCaller, Urls, Swal } from '@/app/components/Link';
import Loading from "@/app/loading";
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import './Messages.css';
import LiveChat from '../chat/LiveChat';

export default function AllTicket() {
    const networkCaller = new NetworkCaller();
    
    const [ticketList, setTicketList] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [chatTicketId, setChatTicketId] = useState(null);

    const fetchTicketList = async () => {
        const response = await networkCaller.getRequest(Urls.getTicketList());
        if (response && response.isSuccess) {
            setTicketList(response.responseData);
        }
        setLoading(false);
    };

    const fetchUserData = async () => {
        const response = await networkCaller.getRequest(Urls.authProfile());
        if (response && response.isSuccess) {
            setUserInfo(response.responseData);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchTicketList();
    }, []);


    // delete ticket 
    const handleDelete = (ticketId) => {
        Swal.fire({
            title: 'Are you want to Delete?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await networkCaller.getRequest(`${Urls.deleteTicketItemUrl()}?ticket_id=${ticketId}`);
                if (response && response.isSuccess) {
                    fetchTicketList();  
                    toast.success('Successfully Delete Ticket Data.');
                }
            }
        });
    };

    // Handle Chat Click
    const handleChatClick = (ticket) => {
        setChatTicketId(ticket);
        setShowModal(true);
    };

    // Close Modal
    const closeModal = () => {
        setShowModal(false);
    };

    if (loading) {
        return (
            <div className="text-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="container">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Subject</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketList.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.user_info.name}</td>
                            <td>{ticket.subject}</td>
                            <td>{ticket.category_info.name}</td>
                            <td>{ticket.status_info.name}</td>
                            <td>{ticket.priority}</td>
                            <td>
                                <Link
                                    className="btn btn-primary btn-sm me-2"
                                    href={'/ticket/ticket-info/'+ticket.id}
                                >
                                    View
                                </Link>
                                {userInfo?.type == 'admin' && (
                                    <>
                                        <Link
                                            className="btn btn-warning btn-sm me-2"
                                            href={'/ticket/ticket-edit/'+ticket.id}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() => handleDelete(ticket.id)}
                                        >
                                            X
                                        </button>
                                    </>
                                )}
                                <button
                                    className="btn btn-dark btn-sm"
                                    onClick={() => handleChatClick(ticket.id)}
                                >
                                    Chat
                                </button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Chat Modal */}
            <Modal
                    show={showModal}
                    onHide={closeModal}
                    size="lg"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Live Chat
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LiveChat ticket_id={chatTicketId} />
                    </Modal.Body>
                </Modal>
        </div>
    );
}
