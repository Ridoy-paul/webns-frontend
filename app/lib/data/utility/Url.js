
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const Urls = {

    getStorageUrl: () => STORAGE_URL,

   
    authRegister: () => `${BASE_URL}/auth/register`,
    authLogin: () => `${BASE_URL}/auth/login`,
    authLogout: () => `${BASE_URL}/logout`,
    authChangePassword: () => `${BASE_URL}/auth-change-password`,

    authProfile: () => `${BASE_URL}/profile`,
    updateProfile: () => `${BASE_URL}/update-profile`,

    // Dashboard Data URL
    getDashboardDataUrl: () => `${BASE_URL}/dashboard/get-report`,



    // Ticket Url
    getTicketStatusAndCategoryUrl: () => `${BASE_URL}/ticket/get-status-category`,
    saveTicketDataUrl: () => `${BASE_URL}/ticket/save-ticket-data`,
    getTicketList: () => `${BASE_URL}/ticket/get-list`,
    getticketItem: () => `${BASE_URL}/ticket/get-item`,
    deleteTicketItemUrl: () => `${BASE_URL}/ticket/delete-item`,
    getticketItemComments: () => `${BASE_URL}/ticket/get-item-comments`,
    saveTicketCommentUrl: () => `${BASE_URL}/ticket/save-item-comments`,
    
    //Live Chat Url
    
    
    userLoginEmailVerification: (phone) => `${BASE_URL}/UserLogin/${encodeURIComponent(phone)}`,

};

export default Urls;