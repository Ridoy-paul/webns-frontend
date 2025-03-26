import UserMenuItems from "./UserMenuItem";
import SidebarProfile from "@/app/components/user/SideBar/SideBarProfile";

export default function LargeDeviceSidebar() {
    return (
        <div className="getcom-user-sidebar">
            <div className="user-sidebar-head">
                <SidebarProfile />
            </div>
            <div className="user-sidebar-menus">
            <ul className="user-sidebar-menu-list">
                <UserMenuItems />
            </ul>
            </div>
        </div>
    );
}