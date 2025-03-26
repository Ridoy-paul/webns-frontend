'use client';
import LoginComponent from '@/app/components/Auth/LoginComponent';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Login() {

    const searchParams = useSearchParams();
    const redirected = searchParams.get('r');

    useEffect(() => {
        if (redirected) {
            toast.warning('Please log in to access this.');
        }
    }, [redirected]);
    
    return (
        <main className="main__content_wrapper">
            <section className="auth-page-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-xl-6 col-md-8 col-12">
                            <LoginComponent />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
