import UserMenuItems from "./UserMenuItem";
import SidebarProfile from "@/app/components/user/SideBar/SideBarProfile";

export default function UserSmallDeviceSidebar() {
    
  return (
    <>
      <button type="button" className="mobile-menu-sidebar-icon btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <i className="fi fi-sr-angle-circle-right"></i>
      </button>
        
    <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
        data-bs-scroll="false"
    >
        <div className="modal-dialog offcanvas-dialog">
            <div className="modal-content">
                <div className="getcom-user-sidebar user-mobile-menu-sidebar">
                <div className="user-sidebar-head">

                    <SidebarProfile />

                    {/* Offcanvas Close Button */}
                    <button
                        type="button"
                        className="mobile-menu-sidebar-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        >
                        <i className="fi fi-rr-cross-small" />
                    </button>
                </div>
                <div className="user-sidebar-menus">
                    <ul className="user-sidebar-menu-list">
                        <UserMenuItems />
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  );
}
