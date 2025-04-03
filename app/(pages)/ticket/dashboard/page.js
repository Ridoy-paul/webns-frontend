"use client";
import { useEffect, useState } from "react";
import { NetworkCaller, Urls } from "@/app/components/Link";

export default function Dashboard() {
    const networkCaller = new NetworkCaller();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);

    const getDashboardData = async () => {
        const response = await networkCaller.getRequest(Urls.getDashboardDataUrl());
        if (response && response.isSuccess) {
            setDashboardData(response.responseData);
        }
        setLoading(false);
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <div className="dashboard-container" style={{ padding: "20px", margin: "auto", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="dashboard-content">
                    <h2>📊 Dashboard Overview</h2>
                    <p><strong>🎟️ Total Tickets:</strong> {dashboardData?.total_tickets}</p>

                    <h3>📌 Tickets by Status:</h3>
                    <ul>
                        {dashboardData?.status_by_tickets.map((status, index) => (
                            <li key={index}>
                                {status.status}: <strong>{status.count}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
