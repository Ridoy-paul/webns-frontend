"use client";
import { Image, Link, routes } from '@/app/components/Link';

export default function Dashboard() {
    return (
        <div>
            <div className="wishlist-items-area" style={{ marginTop: 32 }}>
                <div className="dashboard-wishlist-inner">
                    <Link href={routes.user.all_properties}>
                        <div className="wishlist-card shadow rounded-pill">
                            <div className="wishlist-card-data">
                                <div className="wishlist-card-info d-flex align-items-center ms-2">
                                    <Image alt="Properties-img" width={50} height={50} src="/assets/img/other/property.webp" />
                                    <h4 className="ms-2 mb-0 fw-bold d-font-s">All Properties</h4>
                                </div>
                            </div>
                            <div className="wishlist-card-btn ">
                                <a href='#' className="icon-wrapper rounded-pill">
                                    <i className="fi fi-ss-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                    </Link>
                    <Link href={routes.user.add_property}>
                        <div className="wishlist-card shadow rounded-pill">
                            <div className="wishlist-card-data">
                                <div className="wishlist-card-info d-flex align-items-center ms-2">
                                    <Image alt="Properties-img" width={50} height={50} src="/assets/img/other/giving.webp" />
                                    <h4 className="ms-2 d-font-s">Add Properties</h4>
                                </div>
                            </div>
                            <div className="wishlist-card-btn ">
                                <a href='#' className="icon-wrapper rounded-pill">
                                    <i className="fi fi-ss-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                    </Link>
                    <Link href={routes.user.messages}>
                        <div className="wishlist-card shadow rounded-pill">
                            <div className="wishlist-card-data">
                                <div className="wishlist-card-info d-flex align-items-center ms-2">
                                    <Image alt="Properties-img" width={50} height={50} src="/assets/img/other/message.webp" />
                                    <h4 className="ms-2 d-font-s">All Messages</h4>
                                </div>
                            </div>
                            <div className="wishlist-card-btn ">
                                <a href='#' className="icon-wrapper rounded-pill">
                                    <i className="fi fi-ss-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                    </Link>
                    <Link href={routes.user.mess.mess_dashboard}>
                        <div className="wishlist-card shadow rounded-pill">
                            <div className="wishlist-card-data">
                                <div className="wishlist-card-info d-flex align-items-center ms-2">
                                    <Image alt="Properties-img" width={50} height={50} src="/assets/img/other/mess-dashboard.webp" />
                                    <h4 className="ms-2 d-font-s">Mess Dashboard</h4>
                                </div>
                            </div>
                            <div className="wishlist-card-btn ">
                                <a href='#' className="icon-wrapper rounded-pill">
                                    <i className="fi fi-ss-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                    </Link>
                    <Link href={routes.user.notification}>
                        <div className="wishlist-card shadow rounded-pill">
                            <div className="wishlist-card-data">
                                <div className="wishlist-card-info d-flex align-items-center ms-2">
                                    <Image alt="Properties-img" width={50} height={50} src="/assets/img/other/notification.webp" />
                                    <h4 className="ms-2 d-font-s">Notifications</h4>
                                </div>
                            </div>
                            <div className="wishlist-card-btn ">
                                <a href='#' className="icon-wrapper rounded-pill">
                                    <i className="fi fi-ss-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                    </Link>
                    <Link href={routes.user.profile}>
                        <div className="wishlist-card shadow rounded-pill">
                            <div className="wishlist-card-data">
                                <div className="wishlist-card-info d-flex align-items-center ms-2">
                                    <Image alt="Properties-img" width={50} height={50} src="/assets/img/other/profile.webp" />
                                    <h4 className="ms-2 d-font-s">Profile Information</h4>
                                </div>
                            </div>
                            <div className="wishlist-card-btn ">
                                <a href='#' className="icon-wrapper rounded-pill">
                                    <i className="fi fi-ss-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                    </Link>
                    
                    
                    
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
  