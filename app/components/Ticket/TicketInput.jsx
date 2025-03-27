"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Urls, UserData, NetworkCaller } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/app/lib/axios';

export default function TicketInput({ ticket = null }) {
  const networkCaller = new NetworkCaller();
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  const [formProcessing, setFormProcessing] = useState(false);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [ticketStatus, setTicketStatus] = useState([]);

  
  // Form data state for ticket creation
  const [formData, setFormData] = useState({
    user_id: ticket?.user_id || '',
    category_id: ticket?.category_id || '',
    subject: ticket?.subject || '',
    description: ticket?.description || '',
    priority: ticket?.priority || 'Medium',
    status_id: ticket?.status_id || '',
    is_active: ticket?.is_active ?? true,
  });

  const [attachments, setAttachments] = useState(ticket?.attachments || []);

  // Fetch categories and status for tickets
  const getTicketStatusAndCategory = async () => {
    try {
      const response = await networkCaller.getRequest(Urls.getTicketStatusAndCategoryUrl());

      if (response?.isSuccess) {
        setTicketCategories(response?.responseData?.ticketCategories || []);
        setTicketStatus(response?.responseData?.ticketStatus || []);
      } else {
        toast.error('Failed to fetch categories and statuses.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching categories and statuses.');
    }
  };

  useEffect(() => {
    const fetchAuthToken = async () => {
      const token = await UserData.getToken();
      setAuthToken(token);
    };

    fetchAuthToken();
    getTicketStatusAndCategory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormProcessing(true);

    const formDataToSend = new FormData();
    // Append regular form fields
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    // Append attachments
    attachments.forEach(file => {
      formDataToSend.append('attachments[]', file);
    });

    const response = await networkCaller.postRequest(Urls.storeTicketData(), formDataToSend);

    //console.log(response);
    if (response && response.isSuccess) {
        toast.success('Updated Ticket Data.');
        // setFormProcessing(false);
        //onUpdateData(true);
        //router.push(routes.user.mess.my_mess_list);
    } else {
        toast.error(response.errorMessage);
    }
    
    setFormProcessing(false);
  };

  console.log("Ticket: "+ticketCategories);

  return (
    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="subject">Subject<span className='text-danger'>*</span></label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-control"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="category_id">Category<span className='text-danger'>*</span></label>
          <select
            id="category_id"
            name="category_id"
            className="form-control"
            value={formData.category_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {ticketCategories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label" htmlFor="description">Description<span className='text-danger'>*</span></label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label" htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            className="form-control"
            value={formData.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor="status_id">Status</label>
          <select
            id="status_id"
            name="status_id"
            className="form-control"
            value={formData.status_id}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            {ticketStatus?.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label" htmlFor="attachments">Attachments</label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            className="form-control"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-success"
        disabled={formProcessing}
      >
        {formProcessing ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          'Save Ticket'
        )}
      </button>
    </form>
  );
}
