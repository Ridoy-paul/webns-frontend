"use client";
import { toast } from 'react-toastify';
import UserData from '@/app/lib/data/utility/UserData';
import { redirect } from 'next/navigation';
import { axios } from '@/app/lib/axios';
import Cookies from 'js-cookie';

class NetworkCaller {
  constructor() {
    this.token = null;
    this.csrfToken = null;
  }

  async initialize() {
    this.token = await UserData.getToken();
    this.csrfToken = this.getCsrfTokenFromCookie();
    if (!this.csrfToken) {
      await this.generateCsrfToken();
    }
  }

  getCsrfTokenFromCookie() {
    return Cookies.get('XSRF-TOKEN');
  }

  async csrfTokenRequest() {
    try {
      const response = await axios.get('/sanctum/csrf-cookie', {
        headers: {
          'Accept': 'application/json',
        },
      });
      return response.data.csrf_token;
    } catch (error) {
      //toast.error('Failed to fetch CSRF token.');
    }
    return null;
  }

  async generateCsrfToken() {
    this.csrfToken = await this.csrfTokenRequest();
  }

  async getRequest(url) {
    try {
      if (!this.token || !this.csrfToken) {
        await this.initialize();
      }

      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': this.csrfToken,
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const data = response.data;

      if (response.status === 401) {
        await UserData.clearToken();
        await UserData.clearUserData();
        window.location.href = '/login';
        return;
      }

      return data;

    } catch (error) {
      await this.handleRequestError(error);
    }
  }

  async postRequest(url, body = {}) {
    try {
      const csToken = await this.csrfTokenRequest();
      const response = await axios.post(url, body, {
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csToken,
        },
      });

      const data = response.data;
      return data;

    } catch (error) {
      await this.handleRequestError(error);
    }
  }

  async postRequestWithToken(url, body = {}) {
    try {
      if (!this.token) {
        await this.initialize();
      }
      
      const csToken = await this.csrfTokenRequest();

      const response = await axios.post(url, body, {
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csToken,
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const data = response.data;
      return data;

    } catch (error) {
      await this.handleRequestError(error);
    }
  }

  async handleRequestError(error) {
    
    if(error.response.status == 401) {
      // await UserData.clearToken();
      // await UserData.clearUserData();
      // window.location.href = '/login';
    }

    // This is for validation error
    if(error.response.status == 422) {
      try {
          const errorMessages = JSON.parse(error.response.data.errorMessage);
          Object.values(errorMessages).forEach(messages => {
              messages.forEach(msg => toast.error(msg));
          });
      } catch (e) {
          toast.error('Validation error occurred, but the message could not be parsed.');
      }
      return;
    }
    
    toast.error(error.response.data.errorMessage || 'Network error! Please try again.');
    /*
    if (error.response) {
      toast.error(error.response.data.message || 'Error occurred.');
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('Error: ' + (error.message || 'Unknown error.'));
    }
    */
  }
}

export default NetworkCaller;
