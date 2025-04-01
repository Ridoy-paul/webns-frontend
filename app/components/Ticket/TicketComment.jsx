'use client';
import { useEffect, useState } from 'react';
import { Link, UserData, NetworkCaller, Urls } from '@/app/components/Link';
import { toast } from 'react-toastify';

export default function TicketCommentSection({ id }) {
    const networkCaller = new NetworkCaller();
    
    const [ticketItem, setticketItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formProcessing, setFormProcessing] = useState(false);
    const [comment, setComment] = useState('');

    const fetchticketItem = async () => {
        const response = await networkCaller.getRequest(`${Urls.getticketItemComments()}?ticket_id=${id}`);
        if (response && response.isSuccess) {
            setticketItem(response.responseData);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchticketItem();
    }, [id]);

    const handleStoreCommentSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            toast.error('Please enter a comment');
            return;
        }

        setFormProcessing(true);

        const formDataToSend = { 
            ticket_id: id,
            comment 
        };
        
        const response = await networkCaller.postRequestWithToken(Urls.saveTicketCommentUrl(), formDataToSend);

        if (response && response.isSuccess) {
            toast.success('Saved Ticket Comment.');
            setComment('');
            fetchticketItem();
        } else {
            toast.error(response.errorMessage || 'Something went wrong');
        }

        setFormProcessing(false);
    };

    if (loading) {
        return (
            <div className="text-center">
                Comments Loading.......
            </div>
        );
    }

    return (
        <div className="row mt-2 border rounded py-3">
            <div className="col-md-12">
                <h5 className="card-title fw-bold border-bottom">Comments</h5>
                
                {ticketItem.length > 0 ? (
                    <div className="mt-3">
                        {ticketItem.map((commentItem, index) => (
                            <div key={index} className="border-bottom py-2">
                                <p>{commentItem.message}</p>
                                <small><strong>{commentItem?.user_info?.name}</strong> {new Date(commentItem.created_at).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No comments Found!</p>
                )}

                <form onSubmit={handleStoreCommentSubmit} className="mt-4">
                    <div className="form-group">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="form-control"
                            rows="4"
                            placeholder="Write a comment..."
                        />
                    </div>
                    <div className="mt-2">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={formProcessing}
                        >
                            {formProcessing ? 'Posting...' : 'Post Comment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
