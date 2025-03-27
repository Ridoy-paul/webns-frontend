'use client';
import { useEffect, useState } from 'react';
import LogoutComponent from './LogoutComponent';
import { Link, UserData, NetworkCaller, Urls } from '@/app/components/Link';

export default function Header() {
    const networkCaller = new NetworkCaller();
    const [processing, setProcessing] = useState(true);
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {

            const token = await UserData.getToken();
            if(token != null) {
                const response = await networkCaller.getRequest(Urls.authProfile());
                if (response && response.isSuccess) {
                    setUserInfo(response.responseData);
                }
            }

            setProcessing(false);
        };

        fetchUserData();
    }, []);

    return (
        <>
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    {processing ? (
                        <span className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only"></span>
                        </span>
                    ) : (
                        userInfo != null ? (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="align-middle" data-feather="settings" />
                                </a>
                                <a
                                    className="nav-link dropdown-toggle d-none d-sm-inline-block"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                >
                                    <img
                                        src="/assets/img/no-profile.webp"
                                        className="avatar img-fluid rounded me-1 rounded-pill"
                                        alt="profile"
                                    />
                                    <span className="text-dark">{userInfo?.name}</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <LogoutComponent />
                                </div>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link border rounded px-2 mb-0" href='/login'>
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link border rounded px-2 mb-0" href='/register' >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )
                    )}
                </ul>
            </div>
        </nav>
        </>
    );
}
