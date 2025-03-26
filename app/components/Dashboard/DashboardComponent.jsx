"use client";
import { NetworkCaller, Urls } from '@/app/components/Link';
import { useEffect, useState } from 'react';
import { SkeletonLoader } from '@/app/components/ClientLink';

export default function DashboardComponent() {
    const networkCaller = new NetworkCaller();
    const [pageLoading, setPageLoading] = useState(true);
    const [reportData, setReportData] = useState(null);

    const getData = async () => {
        setPageLoading(true);
        const response = await networkCaller.getRequest(Urls.getDashboardReport());
        
        console.log(response);

        if (response.isSuccess) {
            setReportData(response.responseData);
        }

        setPageLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        pageLoading ? (
            <SkeletonLoader />
        ) : (
            <div className="row">
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Total Properties</h5>
                                </div>
                                <div className="card-body">
                                    <h1><b>{reportData?.totalProperty ?? 0}</b></h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Active Properties</h5>
                                </div>
                                <div className="card-body">
                                    <h1><b>{reportData?.activeProperty ?? 0}</b></h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Deactivated Properties</h5>
                                </div>
                                <div className="card-body">
                                    <h1><b>{reportData?.deactiveProperty ?? 0}</b></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Profile Info</h5>
                        </div>
                        <div className="card-body text-center">
                            <img 
                                src={reportData?.userInfo?.image ?? "/assets/img/no-profile.webp"} 
                                alt="Profile" 
                                className="img-fluid rounded-circle mb-3" 
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                            />
                            <h6><b>{reportData?.userInfo?.name ?? "User Name"}</b></h6>
                            <p className="text-muted">{reportData?.userInfo?.email ?? "user@example.com"}</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    );
}
