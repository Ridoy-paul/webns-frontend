import routes from '@/app/lib/data/utility/Route';

const menus = [
    {
        id: 1,
        isLoad: false,
        title: "Home",
        link: routes.home,
        subMenu: []
    },
    {
        id: 2,
        isLoad: false,
        title: "Property List",
        link: '#',
        subMenu: [
            {
                id: 1,
                title: "ঢাকা ডিভিশন",
                link: routes.home_properties+'?division=1',
                subMenu: []
            },
            {
                id: 2,
                title: "চট্টগ্রাম ডিভিশন",
                link: routes.home_properties+'?division=2',
                subMenu: []
            },
            {
                id: 3,
                title: "রাজশাহী ডিভিশন",
                link: routes.home_properties+'?division=3',
                subMenu: []
            },
            {
                id: 4,
                title: "খুলনা ডিভিশন",
                link: routes.home_properties+'?division=4',
                subMenu: []
            },
            {
                id: 5,
                title: "বরিশাল ডিভিশন",
                link: routes.home_properties+'?division=5',
                subMenu: []
            },
            {
                id: 6,
                title: "সিলেট ডিভিশন",
                link: routes.home_properties+'?division=6',
                subMenu: []
            },
            {
                id: 7,
                title: "রংপুর ডিভিশন",
                link: routes.home_properties+'?division=7',
                subMenu: []
            },
            {
                id: 8,
                title: "ময়মনসিংহ ডিভিশন",
                link: routes.home_properties+'?division=8',
                subMenu: []
            },
        ]
    },
    {
        id: 3,
        isLoad: false,
        title: "About Us",
        link: routes.about_us,
        subMenu: []
    },
    {
        id: 4,
        isLoad: false,
        title: "Contact Us",
        link: routes.contact_us,
        subMenu: []
    },
    {
        id: 5,
        isLoad: false,
        title: "Others",
        link: '#',
        subMenu: [
            {
                id: 4,
                title: "Privacy Policy",
                link: routes.privacy_policy,
                subMenu: []
            },
            {
                id: 5,
                title: "Support Policy",
                link: routes.support_policy,
                subMenu: []
            },
            {
                id: 6,
                title: "Terms and Conditions",
                link: routes.terms_and_conditions,
                subMenu: []
            },
            {
                id: 7,
                title: "Refund Policy",
                link: routes.refund_policy,
                subMenu: []
            },
            {
                id: 8,
                title: "FAQ",
                link: routes.faq,
                subMenu: []
            },
        ]
    },
    {
        id: 4,
        isLoad: true,
        title: "News",
        link: routes.news,
        subMenu: []
    },
    
];

export default menus;
