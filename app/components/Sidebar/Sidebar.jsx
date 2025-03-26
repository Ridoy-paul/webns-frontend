import Link from "next/link";
import { routes } from "../Link";

export default function Sidebar() {
    return (
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
            <Link className="sidebar-brand" href={routes.home}>
                <span className="align-middle">Smart Hotel BD</span>
            </Link>
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    <Link className="sidebar-link" href={routes.home}>
                        <i className="align-middle" data-feather="sliders" />
                        <span className="align-middle">Home</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link className="sidebar-link" href={routes.user.dashboard}>
                        <i className="align-middle" data-feather="user" />
                        <span className="align-middle">Dashboard</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link className="sidebar-link" href={routes.user.add_property}>
                        <i className="align-middle" data-feather="user" />
                        <span className="align-middle">Add New Property</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link className="sidebar-link" href={routes.user.all_properties}>
                        <i className="align-middle" data-feather="user" />
                        <span className="align-middle">All Properties</span>
                    </Link>
                </li>
                
                
            </ul>
            </div>
        </nav>
    );
  }
  