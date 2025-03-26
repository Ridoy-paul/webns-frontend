'use client';
import useSWR from 'swr';
import { axiosInstance } from '@/app/lib/axios';
import { useRouter } from 'next/navigation';

export const AuthenticationSystem = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/user', () =>
        axiosInstance
            .get('/user')
            .then((res) => res.data)
            .catch((error) => {})
    );

    return {
        user,
        error,
        mutate,
    };
};
