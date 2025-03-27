"use client";
import Cookies from 'js-cookie';

class UserData {
    static USER_AUTH_TOKEN = 'authToken';
    static USER_DATA_KEY = 'userData';
    static USER_SEARCH_KEY = 'userSearch';

    static storeData(key, data, months, options = {}) {
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + months);

        const storageData = {
            ...data,
            expires: expirationDate.toISOString(),
        };

        // Set cookie on client-side
        Cookies.set(key, JSON.stringify(storageData), {
            expires: months * 30, // Convert months to days
            ...options,
        });
    }

    static getData(key, options = {}) {
        const cookieDataClient = Cookies.get(key);

        if (cookieDataClient) {
            try {
                const parsedData = JSON.parse(cookieDataClient);
                const currentDate = new Date();
                if (new Date(parsedData.expires) > currentDate) {
                    return parsedData; // Return valid data
                } else {
                    this.clearData(key, options); // Expired, remove it
                }
            } catch (error) {
                console.error('Error parsing cookie data:', error);
                this.clearData(key, options); // Clear on error
            }
        }
        return null; // No valid data
    }

    static storeToken(token, options = {}) {
        this.storeData(this.USER_AUTH_TOKEN, { token }, 6, options);
    }

    static getToken(options = {}) {
        const tokenData = this.getData(this.USER_AUTH_TOKEN, options);
        return tokenData ? tokenData.token : null;
    }

    static storeUserData(responseData, options = {}) {
        this.storeData(this.USER_DATA_KEY, responseData, 6, options);
    }

    static getUserData(options = {}) {
        return this.getData(this.USER_DATA_KEY, options);
    }

    static storeSearchData(searchData, options = {}) {
        this.storeData(this.USER_SEARCH_KEY, { searchData }, 6, options);
    }

    static getSearchData(options = {}) {
        const searchData = this.getData(this.USER_SEARCH_KEY, options);
        return searchData ? searchData.searchData : null;
    }

    static clearData(key, options = {}) {
        // Clear on client-side
        Cookies.remove(key, options);
    }

    static clearUserData(options = {}) {
        this.clearData(this.USER_DATA_KEY, options);
    }

    static clearToken(options = {}) {
        this.clearData(this.USER_AUTH_TOKEN, options);
    }

    static clearSearchData(options = {}) {
        this.clearData(this.USER_SEARCH_KEY, options);
    }
}

export default UserData;
