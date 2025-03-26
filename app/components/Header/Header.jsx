'use client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RegisterComponent from "../Auth/RegisterComponent";
import LoginComponent from "../Auth/LoginComponent";
import { UserData } from '@/app/components/Link';
import { useEffect, useState } from 'react';
import LogoutComponent from './LogoutComponent';

export default function Header() {
    const [processing, setProcessing] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);

    const [stackUrls, setStackUrls] = useState([]);
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [regModalShow, setRegModalShow] = useState(false);
    
    const handleLoginModalShow = () => {
        setStackUrls((prevStack) => [...prevStack, window.location.pathname]);
        window.history.pushState({}, '', '/login');
        setLoginModalShow(true);
    };

    const handleRegModalShow = () => {
        setStackUrls((prevStack) => [...prevStack, window.location.pathname]);
        window.history.pushState({}, '', '/register');
        setRegModalShow(true);
    };

    const handleClose = (type = 'login') => {
        const previousUrl = stackUrls[stackUrls.length - 1] || '/';
        window.history.replaceState({}, '', previousUrl);
        type === 'login' ? setLoginModalShow(false) : setRegModalShow(false);
        setStackUrls((prevStack) => prevStack.slice(0, -1));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UserData.getUserData();
                const token = await UserData.getToken();
                setUserToken(token);
                setUserInfo(userData);

                setProcessing(false);
                
            } catch (error) {
                //console.error('Failed to fetch user data:', error);
            }
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
                                    <Button className="nav-link border rounded px-2 mb-0 btn-outline-success" onClick={handleLoginModalShow}>
                                        Login
                                    </Button>
                                </li>
                                <li className="nav-item">
                                    <Button className="nav-link border rounded px-2 mb-0" onClick={handleRegModalShow} >
                                        Register
                                    </Button>
                                </li>
                            </>
                        )
                    )}
                </ul>
            </div>
        </nav>

        {/* Login Modal  */}
        <Modal
            show={loginModalShow}
            onHide={ () => handleClose('login')}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginComponent />
            </Modal.Body>
        </Modal>

        {/* Registration Modal  */}
        <Modal
            show={regModalShow}
            onHide={() => handleClose('reg')}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegisterComponent />
            </Modal.Body>
        </Modal>


        </>
    );
}
