'use client';
import { useState, useEffect } from 'react';
import { UserData } from '@/app/components/Link';

function useMessStatus() {
    const [messStatus, setMessStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userData = await UserData.getUserData();
                
                if (userData?.is_mess_system_active == 1) {
                    setMessStatus(true);
                } else {
                    setMessStatus(false);
                }
            } catch (error) {
                setError(error);
                setMessStatus(false);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserData();
    }, []);

    return { messStatus, isLoading, error };
}

export default useMessStatus;
