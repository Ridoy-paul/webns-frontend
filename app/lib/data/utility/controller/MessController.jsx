import networkCaller from '../utils/networkCaller'; // adjust the import based on your project structure
import { toast } from 'react-toastify';
import { UserData } from '../utils/UserData'; // make sure the path is correct
import { Urls, routes } from '../constants'; // assuming these are constants you are using for API URLs and routes

// Helper function to handle token expiration and redirect to login
const handleUnauthorized = async (router) => {
    await UserData.clearToken();
    await UserData.clearUserData();
    router.push('/login');
};

// Controller to get mess list
const getMessData = async (setServerData, setPageLoading, router) => { 
    try {
        const response = await networkCaller.getRequest(Urls.myMessList());

        if (response.status === 401) {
            await handleUnauthorized(router);
            return;
        }

        if (response?.isSuccess) {
            setServerData(response.responseData);
        }

    } catch (error) {
        toast.error('Error fetching mess data.');
        console.error('Error fetching mess data:', error);
    } finally {
        setPageLoading(false);
    }
};

// Controller to get specific mess data based on mess ID
const getData = async (code, setDefaultData, setDataNotFound, setPageLoading) => {
    try {
        const pUrl = `${Urls.myMessList()}?mess_id=${code}`;
        const response = await networkCaller.getRequest(pUrl);

        if (response?.isSuccess && response.responseData?.length > 0) {
            setDefaultData(response.responseData[0].mess_info);
        } else {
            setDataNotFound(true);
        }
    } catch (error) {
        toast.error('Error fetching data.');
        console.error('Error fetching data:', error);
    } finally {
        setPageLoading(false);
    }
};

// Controller to store or update mess data
const storeMessData = async (e, setFormProcessing, router) => {
    e.preventDefault();
    setFormProcessing(true);

    try {
        const formData = new FormData(e.currentTarget);
        const response = await networkCaller.postRequest(Urls.createOrUpdateMess(), formData);

        if (response?.isSuccess) {
            toast.success('Mess Information Updated successfully!');
            router.push(routes.user.mess.my_mess_list);
        } else {
            toast.error(response.errorMessage);
        }
    } catch (error) {
        toast.error('Error updating mess.');
        console.error('Error updating mess:', error);
    } finally {
        setFormProcessing(false);
    }
};

// Export all functions to be used elsewhere in your project
export default {
    getMessData,
    getData,
    storeMessData
};
