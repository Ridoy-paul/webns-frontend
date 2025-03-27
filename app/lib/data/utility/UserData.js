"use client";
import Cookies from 'js-cookie';

class UserData {
    static USER_AUTH_TOKEN = 'authToken';
    static USER_DATA_KEY = 'userData';
    static USER_SEARCH_KEY = 'userSearch';

    // Store data asynchronously (though cookies themselves are not async, you may want to expand to async actions in the future)
    static async storeData(key, data, months, options = {}) {
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + months);

        const storageData = {
            ...data,
            expires: expirationDate.toISOString(),
        };

        // Set cookie on client-side
        await new Promise((resolve) => {
            Cookies.set(key, JSON.stringify(storageData), {
                expires: months * 30, // Convert months to days
                ...options,
            });
            resolve();
        });
    }

    // Get data asynchronously
    static async getData(key, options = {}) {
        const cookieDataClient = Cookies.get(key);

        if (cookieDataClient) {
            try {
                const parsedData = JSON.parse(cookieDataClient);
                const currentDate = new Date();
                if (new Date(parsedData.expires) > currentDate) {
                    return parsedData; // Return valid data
                } else {
                    await this.clearData(key, options); // Expired, remove it
                }
            } catch (error) {
                console.error('Error parsing cookie data:', error);
                await this.clearData(key, options); // Clear on error
            }
        }
        return null; // No valid data
    }

    // Store the authentication token asynchronously
    static async storeToken(token, options = {}) {
        await this.storeData(this.USER_AUTH_TOKEN, { token }, 6, options);
    }

    // Get the authentication token asynchronously
    static async getToken(options = {}) {
        const tokenData = await this.getData(this.USER_AUTH_TOKEN, options);
        return tokenData ? tokenData.token : null;
    }

    // Store user data asynchronously
    static async storeUserData(responseData, options = {}) {
        await this.storeData(this.USER_DATA_KEY, responseData, 6, options);
    }

    // Get user data asynchronously
    static async getUserData(options = {}) {
        return await this.getData(this.USER_DATA_KEY, options);
    }

    // Store search data asynchronously
    static async storeSearchData(searchData, options = {}) {
        await this.storeData(this.USER_SEARCH_KEY, { searchData }, 6, options);
    }

    // Get search data asynchronously
    static async getSearchData(options = {}) {
        const searchData = await this.getData(this.USER_SEARCH_KEY, options);
        return searchData ? searchData.searchData : null;
    }

    // Clear data asynchronously
    static async clearData(key, options = {}) {
        // Clear on client-side
        await new Promise((resolve) => {
            Cookies.remove(key, options);
            resolve();
        });
    }

    // Clear user data asynchronously
    static async clearUserData(options = {}) {
        await this.clearData(this.USER_DATA_KEY, options);
    }

    // Clear token asynchronously
    static async clearToken(options = {}) {
        await this.clearData(this.USER_AUTH_TOKEN, options);
    }

    // Clear search data asynchronously
    static async clearSearchData(options = {}) {
        await this.clearData(this.USER_SEARCH_KEY, options);
    }
}

export default UserData;
