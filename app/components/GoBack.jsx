
'use client';
import { useRouter } from 'next/navigation';

export default function GoBack() {
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    }

  return (
    <btn onClick={handleGoBack} type="button" className="btn">
       <i class="fi fi-br-angle-left"></i>
    </btn>
    // <button type='button'  className='btn btn-success' >Back</button>
  );
}
