'use client';
import { routes } from "../Link";
import { useEffect, useState } from 'react';
import { Link, UserData, NetworkCaller, Urls } from '@/app/components/Link';

export default function Sidebar() {
    const networkCaller = new NetworkCaller();
    
    const [userInfo, setUserInfo] = useState(null);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const token = await UserData.getToken();
            if(token != null) {
                const response = await networkCaller.getRequest(Urls.authProfile());
                if (response && response.isSuccess) {
                    setUserInfo(response.responseData);
                    setUserName(response.responseData.type == 'admin' ? 'Hello Admin!' : `Hello ${response.responseData.name}`);
                }
            }
            
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) {
        return (
            <nav id="sidebar" className="sidebar js-sidebar">
                <div className="sidebar-content js-simplebar">
                    <Link className="sidebar-brand border-bottom" href={routes.home}>
                        <span className="align-middle">Ticket Management</span>
                    </Link>
                    <ul className="sidebar-nav">
                        <li className="sidebar-item text-center">
                            <span className="spinner-border spinner-border-sm mt-3 text-light" role="status">
                                <span className="sr-only"></span>
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

    return (
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <Link className="sidebar-brand border-bottom" href={routes.home}>
                    <span className="align-middle">Ticket Management</span>
                </Link>
                <ul className="sidebar-nav">
                    <li className="sidebar-item text-center bg-light">
                        <span className="align-middle text-dark">{userName}</span>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" href={routes.home}>
                            <i className="align-middle" data-feather="sliders" />
                            <span className="align-middle">Home</span>
                        </Link>
                    </li>
                    {userInfo && (
                        <>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" href={routes.ticket.dashboard}>
                                    <i className="align-middle" data-feather="user" />
                                    <span className="align-middle">Dashboard</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" href={routes.ticket.create_ticket}>
                                    <i className="align-middle" data-feather="user" />
                                    <span className="align-middle">Create New Ticket</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" href={routes.ticket.all_tickets}>
                                    <i className="align-middle" data-feather="user" />
                                    <span className="align-middle">All Tickets</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
