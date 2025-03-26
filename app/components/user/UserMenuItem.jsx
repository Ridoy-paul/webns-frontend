"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import userMenus from '@/app/lib/data/service/UserMenu';

export default function UserMenuItems() {
    const pathname = usePathname();

    return (
        <>
            {userMenus.map(menu => (
                <li key={menu.id}>
                    <Link href={menu.link} className={pathname === menu.link ? 'active' : ''}>
                        <i className={menu.icon} />
                        {menu.title}
                    </Link>
                </li>
            ))}
        </>
    );
}
