'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { NetworkCaller, Urls, routes, Link } from '@/app/components/Link';

const MessMenu = () => {
    const [defaultMessCode, setDefaultMessCode] = useState('');
    const scrollRef = useRef();

    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    };

    const currentPath = usePathname();
    
    const isActive = (paths) => {
        return paths.some(path => {
            if (path.includes(':')) {
                const regex = new RegExp(path.replace(/:[^\s/]+/g, '[^/]+')); // Convert dynamic part to regex
                return regex.test(currentPath);
            }
            return path === currentPath;
        });
    };

    const networkCaller = new NetworkCaller();
    const getData = async () => {
        const response = await networkCaller.getRequest(Urls.getDefaultMessCode());

        if (response && response.isSuccess) {
            setDefaultMessCode(response.responseData.default_mess_code);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <div className="d-flex align-items-center justify-content-between">
           
            <div onClick={scrollLeft} className="scroll-btn ms-2">
                <i className="fi fi-ss-angle-circle-left"></i>
            </div>

            <div
                ref={scrollRef} 
                className="d-flex scroll-container" 
                style={{ whiteSpace: 'nowrap', width: '100%' }}
            >
                <Link
                    className={`px-3 m-1 border mx-2 ${isActive([routes.user.mess.mess_dashboard]) ? 'activec' : ''}`}
                    href={routes.user.mess.mess_dashboard}
                >
                    Mess Dashboard
                </Link>

                <Link
                    className={`px-3 m-1 border mx-2 ${isActive([routes.user.mess.my_mess_list, routes.user.mess.mess_create, routes.user.mess.edit_mess_info(':code')]) ? 'activec' : ''}`}
                    href={routes.user.mess.my_mess_list}
                >
                    My Mess
                </Link>

                <Link
                    className={`px-3 m-1 border mx-2 ${isActive([routes.user.mess.mess_mill_system(':code')]) ? 'activec' : ''}`}
                    href={routes.user.mess.mess_mill_system(defaultMessCode)}
                >
                    Mill Chart
                </Link>

                <Link
                    className={`px-3 m-1 border mx-2 ${isActive([routes.user.mess.mess_mill_bazar_info(':code'), routes.user.mess.add_mill_bazar(':code')]) ? 'activec' : ''}`}
                    href={routes.user.mess.mess_mill_bazar_info(defaultMessCode)}
                >
                    Mess Bazar
                </Link>

                <Link
                    className={`px-3 m-1 border mx-2 ${isActive([routes.user.mess.extra_bazar_info(':code'), routes.user.mess.add_extra_bazar(':code')]) ? 'activec' : ''}`}
                    href={routes.user.mess.extra_bazar_info(defaultMessCode)}
                >
                    Extra Bazar
                </Link>

                <Link
                    className={`px-3 m-1 border mx-2 ${isActive([routes.user.mess.all_money_collection(':code')]) ? 'activec' : ''}`}
                    href={routes.user.mess.all_money_collection(defaultMessCode)}
                >
                    Money Collection
                </Link>

                <Link
                    className={`px-3 m-1 border mx-2 ${isActive([routes.user.mess.mess_report_page(':code')]) ? 'activec' : ''}`}
                    href={routes.user.mess.mess_report_page(defaultMessCode)}
                >
                    Mess Report
                </Link>
                <Link
                    className={`px-3 m-1 border mx-2 ${isActive([routes.user.mess.mess_history_page(':code')]) ? 'activec' : ''}`}
                    href={routes.user.mess.mess_history_page(defaultMessCode)}
                >
                    Mess History
                </Link>
                
            </div>

            <div onClick={scrollRight} className="scroll-btn ms-2">
                <i className="fi fi-ss-angle-circle-right"></i>
            </div>
        </div>
    );
};

export default MessMenu;
