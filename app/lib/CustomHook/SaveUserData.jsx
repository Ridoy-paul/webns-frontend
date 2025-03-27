'use client';
import { useState, useEffect } from 'react';
import { UserData } from '@/app/components/Link';
import { toast } from 'react-toastify';

const useUserDataUpdate = (newUserData) => {
    const [status, setStatus] = useState(null);  // State to track the status of updates

    useEffect(() => {
        const checkAndUpdateUserData = async () => {
            let currentUserData = UserData.getUserData();  // Get current user data from cache
            let updateInProgress = false;  // Flag to check if update is in progress

            // Function to compare two user data objects
            const isUserDataEqual = (oldData, newData) => {
                return JSON.stringify(oldData) === JSON.stringify(newData);
            };

            // Loop until user data is successfully updated and stabilized
            while (!isUserDataEqual(currentUserData, newUserData)) {
                if (updateInProgress) return;  // Prevent multiple update requests at the same time

                updateInProgress = true;
                try {
                    // Store new user data
                    await UserData.storeUserData(newUserData);
                    currentUserData = UserData.getUserData();  // Fetch updated user data
                    if (!isUserDataEqual(currentUserData, newUserData)) {
                        toast.info('Updating user data...');
                    }
                } catch (error) { 
                    console.error('Error updating user data:', error);
                    toast.error('Failed to update user data.');
                    setStatus('error');
                    return;
                }
                updateInProgress = false;
            }

            // If data is the same, return a success status
            if (isUserDataEqual(currentUserData, newUserData)) {
                toast.success('User data updated successfully!');
                setStatus('success');  // Return success status when update is complete
            } else {
                setStatus('error');
            }
        };

        checkAndUpdateUserData();  // Trigger the update check when newUserData changes
    }, [newUserData]);  // Re-run this effect whenever newUserData changes

    return status;  // Return the update status (e.g., success, error, etc.)
};

export default useUserDataUpdate;
