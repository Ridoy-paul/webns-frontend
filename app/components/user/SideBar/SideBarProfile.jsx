"use client";
import { Link, Image, UserData, NetworkCaller, Urls, Swal } from '@/app/components/Link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { AuthenticationSystem } from '@/hooks/Authentication';

export default function SidebarProfile() {
    const { csrf, mutate } = AuthenticationSystem();
    const networkCaller = new NetworkCaller();
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(UserData.getUserData());

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await UserData.getUserData();
            setUserInfo(data);
        };

        fetchUserData();
    }, []);

    const logout = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await networkCaller.getRequest(Urls.authLogout());

                if (response.status === 401) {
                    await UserData.clearToken();
                    await UserData.clearUserData();
                    window.location.href = '/login';
                }

                if (response && response.isSuccess) {
                    toast.success('Logout successful!');
                    await UserData.clearToken();
                    await UserData.clearUserData();
                    mutate();
                    window.location.href = '/';
                }
            }
        });
    }

    const { name, phone, photo } = userInfo || {};

    const defaultPhotoUrl = "/assets/img/user.webp";
    const userPhotoUrl = photo ? Urls.getStorageUrl() + photo : defaultPhotoUrl;

    return (
        <>
            <div className="user-sidebar-profile">
                <Image alt="#" src={userPhotoUrl} width={100} height={100} loading="lazy" />
            </div>
            <div className="user-sidebar-profile-info">
                <h5>{name || 'Guest'}</h5>
                <p>{phone || 'No phone available'}</p>
                <div className="user-sidebar-profile-btn">
                    <Link href="#" onClick={logout}>
                        <i className="fi-rr-sign-out-alt" />
                        Logout
                    </Link>
                </div>
            </div>
        </>
    );
}
