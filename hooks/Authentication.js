'use client';
import useSWR from 'swr';
import { axios } from '@/app/lib/axios';
import { useRouter } from 'next/navigation';

export const AuthenticationSystem = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then((res) => res.data)
            .catch((error) => {})
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    return {
        user,
        error,
        mutate,
        csrf,
    };
};
