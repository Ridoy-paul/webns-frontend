
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


    // Ticket Url
    getTicketStatusAndCategoryUrl: () => `${BASE_URL}/ticket/get-status-category`,
    
    
    

    
    
    
    
    
    
    userLoginEmailVerification: (phone) => `${BASE_URL}/UserLogin/${encodeURIComponent(phone)}`,

};

export default Urls;