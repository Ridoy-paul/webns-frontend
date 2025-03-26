import DashboardComponent from '@/app/components/Dashboard/DashboardComponent';

export const metadata = {
    title: "Dashboard",
};

export default function Dashboard() {
    return (
        <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Dashboard</h1>
            <DashboardComponent />
        </div>
    );
  }
  