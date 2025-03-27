'use client';
import { useRouter } from 'next/navigation';

export default function TitleWithBackBtn({ title = '', textColor = '' }) {
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    }

  return (
    <div onClick={handleGoBack} className="d-flex align-items-center">
        <btn type="button" className={`btn ${textColor}`}>
            <i className="fi fi-br-angle-left"></i>
        </btn>
        <h5 className={`dashboard-head-widget-title ${textColor}`}>{title}</h5>
    </div>
  );
}
