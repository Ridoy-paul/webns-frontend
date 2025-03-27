'use client';
import { toast } from 'react-toastify';
import UserData from '@/app/lib/data/utility/UserData';
import { redirect } from 'next/navigation';

class NetworkCaller {

  constructor() {
    // We need to get the token asynchronously.
    this.token = null;
  }

  // This function is to initialize the token asynchronously
  async initialize() {
    this.token = await UserData.getToken();  // Await token retrieval
  }

  async fetchCsrfToken() {
    const response = await fetch('/sanctum/csrf-cookie');
    const data = await response.json();
    //setCsrfToken(data.csrfToken);
  }

  async getRequest(url) {
    try {
      // Ensure token is retrieved before making the request
      if (!this.token) {
        await this.initialize();  // Initialize token if not already available
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const data = await response.json();
      //console.log(data);

      // Handle unauthorized response
      if (response.status == 401) {
        // Clear token and redirect to login
        await UserData.clearToken();
        await UserData.clearUserData();
        redirect('/login');
        return;  // Exit as the user is not authenticated
      }

      if (!response.ok) {
        //toast.error(response.statusText || 'Error occurred.');
      }

      if (!data.isSuccess) {
        //toast.error(data.errorMessage || 'Error occurred.');
      }

      return data;

    } catch (error) {
      if (error instanceof TypeError) {
        //toast.error('Network error. Please check your connection.');
      } else {
        //toast.error('Error: ' + (error.message || 'Unknown error.'));
      }
    }
  }

  async postRequest(url, body = {}) {
    try {
      // Ensure token is retrieved before making the request
      if (!this.token) {
        await this.initialize();  // Initialize token if not already available
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        body: body,  // Ensure the body is properly stringified
      });

      const data = await response.json();
      //console.log(response);

      if (!response.ok) {
        toast.error(data.errorMessage || 'An error occurred.');
      }

      return data;

    } catch (error) {
      toast.error('Network error. Please check your connection.');
    }
  }
}

export default NetworkCaller;
