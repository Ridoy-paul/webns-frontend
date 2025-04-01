"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Urls, UserData, NetworkCaller, routes } from '@/app/components/Link';
import { toast } from 'react-toastify';


export default function TicketInput({ ticket = null }) {
  const networkCaller = new NetworkCaller();
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  const [formProcessing, setFormProcessing] = useState(false);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [ticketStatus, setTicketStatus] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState({
    ticket_id: ticket?.id || '',
    category_id: ticket?.category_id || '',
    subject: ticket?.subject || '',
    description: ticket?.description || '',
    priority: ticket?.priority || 'Medium',
    status_id: ticket?.status_id || '',
    is_active: ticket?.is_active ?? true,
  });

  const [attachments, setAttachments] = useState(ticket?.attachments || []);

  const getTicketStatusAndCategory = async () => {
    const response = await networkCaller.getRequest(Urls.getTicketStatusAndCategoryUrl());
    if (response?.isSuccess) {
      setTicketCategories(response?.responseData?.ticketCategories || []);
      setTicketStatus(response?.responseData?.ticketStatus || []);
    }
  };

  const fetchUserData = async () => {
    const token = await UserData.getToken();
    if (token != null) {
      const response = await networkCaller.getRequest(Urls.authProfile());
      if (response && response.isSuccess) {
        setUserInfo(response.responseData);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
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
    const file = e.target.files[0];
    if (file) {
      setAttachments([file]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormProcessing(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    if (attachments.length > 0) {
      formDataToSend.append('attachment', attachments[0]);
    }

    const response = await networkCaller.postRequestWithToken(Urls.saveTicketDataUrl(), formDataToSend);

    if (response && response.isSuccess) {
      toast.success('Saved Ticket Data.');
      setFormProcessing(false);
      router.push(routes.ticket.all_tickets);
    } else {
      toast.error(response.errorMessage);
    }

    setFormProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
      <div className="row mb-3">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12 mb-3">
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
            <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="description">Description<span className='text-danger'>*</span></label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="5"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-body shadow rounded border p-2">
            <div className="row">
              <div className="col-md-12 mb-3">
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

              <div className="col-md-12 mb-3">
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

              {userInfo?.type == 'admin' && (
                <div className="col-md-12 mb-3">
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
              )}

              <div className="col-md-12">
                <label className="form-label" htmlFor="attachments">Attachments</label>
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
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
