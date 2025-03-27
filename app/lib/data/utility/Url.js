
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const Urls = {

    getStorageUrl: () => STORAGE_URL,

    verifySettingsCode: () => `${BASE_URL}/verify-settings-code`,


    //Blog / news
    getNewsList: () => `${BASE_URL}/get-news-list`,
    getNewsForHome: () => `${BASE_URL}/get-news-list-for-home-page`,
    



    //Frontend Property
    getHomeProperty: () => `${BASE_URL}/get-home-property`,
    getAllProperty: () => `${BASE_URL}/get-all-property`,
    getPropertyPageLocationInfo: () => `${BASE_URL}/get-all-property-page-location-info`,
    propertyDetails: (code) => `${BASE_URL}/get-home-property-details/${code}`,
    

    getCategories: () => `${BASE_URL}/get-categories`,
    getDivision: () => `${BASE_URL}/get-division`,
    getDistrict: () => `${BASE_URL}/get-district`,
    getThana: () => `${BASE_URL}/get-thana`,
    getSubArea: () => `${BASE_URL}/get-sub-area`,
    
    getDynamicPages: () => `${BASE_URL}/get-dynamic-pages`,
    getSingleDynamicPage: (slug) => `${BASE_URL}/get-dynamic-pages/${encodeURIComponent(slug)}`,


    authRegGetOTP: () => `${BASE_URL}/auth/registration-get-otp`,
    authVerifyOTP: () => `${BASE_URL}/auth/verify-otp`,
    authRegister: () => `${BASE_URL}/auth/register`,
    authLogin: () => `${BASE_URL}/auth/login`,
    authLogout: () => `${BASE_URL}/logout`,
    authChangePassword: () => `${BASE_URL}/auth-change-password`,

    //Forgot Password
    authForgotPasswordGetOTP: () => `${BASE_URL}/auth/forgot-password-get-otp`,
    authConfirmResetPassword: () => `${BASE_URL}/auth/forgot-password-confirm`,

    authProfile: () => `${BASE_URL}/profile`,
    updateProfile: () => `${BASE_URL}/update-profile`,

    AddPropertyUrl: () => `${BASE_URL}/add-property`,
    getPropertyUrl: () => `${BASE_URL}/get-properties`,
    updatePropertyUrl: () => `${BASE_URL}/update-property`,
    activeOrDeactivateProperty: () => `${BASE_URL}/activate-or-deactivate-property`,

    updateMessSystemActiveStatus: () => `${BASE_URL}/mess-system/update-user-mess-status`,
    createOrUpdateMess: () => `${BASE_URL}/mess-system/create-or-update-mess`,
    myMessList: () => `${BASE_URL}/mess-system/mess-list`,
    getDefaultMessCode: () => `${BASE_URL}/mess-system/get-default-mess-code`,
    setDefaultMess: (messCode) => `${BASE_URL}/mess-system/set-default-mess/${messCode}`,
    

    messInvitation: () => `${BASE_URL}/mess-system/mess-invitation`,
    userUpdateStatus: () => `${BASE_URL}/mess-system/user-update-status`,
    myInvitationSystem: () => `${BASE_URL}/mess-system/my-invitation-system`, // this url for a mess invite a person and that person accept the request or not.

    joinMessSystem: () => `${BASE_URL}/mess-system/join-mess-system`, // this url for a mess invite a person and that person accept the request or not.

    //Mess Bazar System
    storeMillBazar: () => `${BASE_URL}/mess-system/store-mill-bazar`,
    getMessBazarInfo: () => `${BASE_URL}/mess-system/mess-bazar-information`,
    cancelBazarById: () => `${BASE_URL}/mess-system/cancel-bazar`,
    updateMillBazar: () => `${BASE_URL}/mess-system/update-mill-bazar`,

    //Mess Money Collection
    storeMoneyCollection: () => `${BASE_URL}/mess-system/store-money-collection`,
    getMoneyCollection: () => `${BASE_URL}/mess-system/get-money-collection`,
    cancelMoneyCollection: () => `${BASE_URL}/mess-system/cancel-money-collection`,
    updateMoneyCollection: () => `${BASE_URL}/mess-system/update-money-collection`,

    //Mess Mills
    saveMill: () => `${BASE_URL}/mess-system/save-mill`,
    getMillInfo: () => `${BASE_URL}/mess-system/get-mill-info`,
    getMillItem: () => `${BASE_URL}/mess-system/get-mill-item`,
    
    
    
    //Mess Report
    millReportMini: () => `${BASE_URL}/mess-system/mill-report-mini`,
    messReportFullMode: () => `${BASE_URL}/mess-system/mess-report-full-mode`,

    //Mess History
    messHistory: () => `${BASE_URL}/mess-system/mess-history`,

    //Notifications
    getUserCountedNotification: () => `${BASE_URL}/user/counted-notification`,
    getNotifications: () => `${BASE_URL}/user/notifications`,
    seeAllNotification: () => `${BASE_URL}/user/see-all-notification`,

    //messageSystem
    sendFirstMessage: () => `${BASE_URL}/user/send-first-message`,
    getMessageGroup: () => `${BASE_URL}/user/get-message-group`,
    getMessageChat: (chatCode) => `${BASE_URL}/user/get-message-chat/${chatCode}`,
    sendMessage: () => `${BASE_URL}/user/send-message`,
    
    
    

    
    
    
    

    
    
    
    
    
    
    userLoginEmailVerification: (phone) => `${BASE_URL}/UserLogin/${encodeURIComponent(phone)}`,

};

export default Urls;