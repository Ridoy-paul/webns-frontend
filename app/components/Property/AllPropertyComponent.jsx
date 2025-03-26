'use client';
import { Link, NetworkCaller, Urls, Image, TitleWithBackBtn, routes } from '@/app/components/Link';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { SkeletonLoader } from '@/app/components/ClientLink';
import Swal from 'sweetalert2';

export default function AllPropertyComponent() {
    const [pageLoading, setPageLoading] = useState(true);
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const noImgLink = '/assets/img/no-image.jpg';
    const itemsPerPage = 8;
    
    const networkCaller = new NetworkCaller();

    const getData = async (page = 1) => {
        setPageLoading(true);
        const response = await networkCaller.getRequest(`${Urls.getAllProperties()}?page=${page}&limit=${itemsPerPage}`);
        
        //console.log(response);

        if (response && response.isSuccess) {
            setProperties(response.responseData.properties);
            setTotalPages(response.responseData.totalPages);
        }

        setPageLoading(false);
    };

    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const deletePropertyItem = async (id) => {
        Swal.fire({
            title: 'Are you want to Delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const sUrl = `${Urls.deletePropertyUrl()}?id=${id}`;
                const response = await networkCaller.getRequest(sUrl);

                if (response && response.isSuccess) {
                    toast.success("Property Deleted Successfully.");
                    getData(currentPage);
                } else {
                    toast.error(response.errorMessage);
                }
            }
        });
    };

    return (
        <div className="">
            <div className="">
                {pageLoading ? (
                    <SkeletonLoader />
                ) : (
                    <div className="row">
                        {properties?.length == 0 ? (
                            <div className="col-md-12 col-12 text-center">
                                <h4 className="my-5">No properties available.</h4>
                            </div>
                        ) : (
                            properties.map(p => (
                                <div key={p.id} className="col-md-4 col-lg-3 col-12">
                                    <div className="card shadow rounded border mb-4">
                                        <img
                                            src={p.image ? p.image : noImgLink}
                                            className="card-img-top"
                                            loading="lazy"
                                            alt={p.name}
                                            style={{ minHeight: '250px', maxHeight: '250px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <div className="">
                                                <h5>{p.name}</h5>
                                                <span>{p.address}</span>
                                                <div className="mt-2">
                                                    <strong>Cost per night: </strong>৳{p.costPerNight}
                                                </div>
                                                <div className="mt-2">
                                                    <strong>Available rooms: </strong>{p.availableRooms}
                                                </div>
                                                <div className="mt-2">
                                                    <strong>Avg. Rating: </strong>{p.averageRating || 'Not rated'}
                                                </div>
                                            </div>

                                            {/* <div className="card-text" style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: p.descriptions }} /> */}

                                            <div className="address-card-footer mt-3 text-center">
                                                <Link href={`/user/edit-property/${p.id}`} className="border rounded px-4 py-1 mt-2 mx-1">
                                                    <i className="fi fi-rr-edit"></i> Edit
                                                </Link>
                                                <button
                                                    onClick={() => deletePropertyItem(p.id)}
                                                    className={`border text-light rounded px-4 py-1 mx-1 mt-2 bg-danger`}
                                                >
                                                    X
                                                </button>
                                                <Link
                                                    href={`/user/property-details/${p.id}`}
                                                    className="border rounded px-4 py-1 mt-2 mx-1"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination mt-4 text-center">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="btn btn-primary mx-1"
                    >
                        Pre
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`btn btn-primary mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="btn btn-primary mx-1"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
