'use client';
import { NetworkCaller, Urls } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserData from '@/app/lib/data/utility/UserData';
import RegisterComponent from '@/app/components/Auth/RegisterComponent';

export default function Register() {
  const networkCaller = new NetworkCaller();
  const [processing, setProcessing] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await UserData.getToken();
      if (token != null) {
        const response = await networkCaller.getRequest(Urls.authProfile());
        if (response && response.isSuccess) {
          setUserInfo(response.responseData);
          router.push('/ticket/dashboard');
          toast.error('You are already looged in!');
        }
      }
      setProcessing(false);
    };

    fetchUserData();
  }, [router]);

  const handleOnRegister = (status) => {
    window.location.href = '/ticket/dashboard';
  };

  return (
    <main className="main__content_wrapper">
      <section className="auth-page-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-xl-4 col-md-8 col-12">
              <RegisterComponent onRegister={handleOnRegister} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
