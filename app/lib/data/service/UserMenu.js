import routes from '@/app/lib/data/utility/Route';

const userMenus = [
    {
        id: 1,
        title: "Dashboard",
        icon: "fi-ss-apps",
        link: routes.user.dashboard,
    },
    {
        id: 2,
        title: "Add Property",
        icon: "fi-ss-shopping-cart",
        link: routes.user.add_property,
    },
    {
        id: 3,
        title: "All Property",
        icon: "fi-ss-comments",
        link: routes.user.all_properties,
    },
    {
        id: 4,
        title: "Mess System",
        icon: "fi-ss-trophy",
        link: routes.user.mess.mess_dashboard,
    },
    // {
    //     id: 5,
    //     title: "Buy Credit",
    //     icon: "fi-ss-map-marker",
    //     link: routes.user.all_transactions,
    // },
    // {
    //     id: 6,
    //     title: "All Transactions",
    //     icon: "fi-ss-ticket",
    //     link: routes.user.all_transactions,
    // },
    {
        id: 5,
        title: "Messages",
        icon: "fi-sr-messages",
        link: routes.user.messages,
    },
    {
        id: 5,
        title: "Notifications",
        icon: "fi-ss-bell-ring",
        link: routes.user.notification,
    },
    {
        id: 7,
        title: "Manage Profile",
        icon: "fi-ss-settings",
        link: routes.user.profile,
    },
    {
        id: 8,
        title: "Change Password",
        icon: "fi-ss-password",
        link: routes.user.change_password,
    }
   
    
];

export default userMenus;
