"use client";
import { useEffect, useState } from 'react';
import { Link, UserData, NetworkCaller, Urls } from '@/app/components/Link';

export default function Dashboard() {

    const networkCaller = new NetworkCaller();
    
    const [userInfo, setUserInfo] = useState(null);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    const getDashboardData = async () => {
        const response = await networkCaller.getRequest(Urls.getDashboardDataUrl());
        if (response && response.isSuccess) {
            //setUserInfo(response.responseData);
            //setUserName(response.responseData.type == 'admin' ? 'Hello Admin!' : `Hello ${response.responseData.name}`);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);



    return (
        <div>
            <div className="wishlist-items-area" style={{ marginTop: 32 }}>
                <div className="dashboard-wishlist-inner">
                    
                    
                    
                </div>
               
                
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            
        </div>
    );
  }
  