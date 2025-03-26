"use client";
import { UserData, Swal, NetworkCaller, Urls } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { AuthenticationSystem } from '@/hooks/Authentication';

export default function LogoutComponent() {
    const { csrf, mutate } = AuthenticationSystem();
    const networkCaller = new NetworkCaller();

    const logout = async () => {
        Swal.fire({
            title: 'Are you want to Logout?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {

                const response = await networkCaller.getRequest(Urls.authLogout());
                console.log(response);

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

    return (
        <>
            <button className="dropdown-item" onClick={logout}>
                <i className="align-middle me-1" data-feather="user" /> Logout
            </button>
        </>
    );
}
