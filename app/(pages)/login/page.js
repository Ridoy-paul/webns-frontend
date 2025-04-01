'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginComponent from "@/app/components/Auth/LoginComponent";
import UserData from '@/app/lib/data/utility/UserData';
import { NetworkCaller, Urls } from '@/app/components/Link';
import { toast } from 'react-toastify';

export default function Login() {
  const [processing, setProcessing] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const token = await UserData.getToken();
      if (token != null) {
        const response = await new NetworkCaller().getRequest(Urls.authProfile());
        if (response && response.isSuccess) {
          setUserInfo(response.responseData);
          router.push('/ticket/dashboard');
          toast.error('You are already looged in!');
        }
      }
      setProcessing(false);
    };

    checkLoggedInStatus();
  }, [router]);

  const handleOnLogin = (status) => {
    window.location.href = '/ticket/dashboard';
  };

  return (
    <main className="main__content_wrapper">
      <section className="auth-page-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-xl-6 col-md-6 col-12">
              <LoginComponent onLogin={handleOnLogin} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
