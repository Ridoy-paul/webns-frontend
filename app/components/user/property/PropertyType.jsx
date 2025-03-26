'use client';
import { useEffect, useState } from 'react';

export default function PropertyType({ data, onInputChange }) {
    const [isLoading, setLoading] = useState(true);
    const [propertyType, setPropertyType] = useState(data?.main_property_type || '');

    const [formData, setFormData] = useState({
        main_property_type: data?.main_property_type || '',
        property_type_id: data?.property_type_id || '',
        bedroom: data?.bedroom ||  '',
        bathroom: data?.bathroom ||  '',
        balcony: data?.balcony ||  '',
        floor: data?.floor ||  '',
        size: data?.size ||  '',
        gender: data?.gender ||  '',
        office_room: data?.office_room ||  '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
    };

    useEffect(() => {
        // Update formData with the current propertyType when it changes
        setFormData(prevState => ({
          ...prevState,
          main_property_type: propertyType,
        }));
    }, [propertyType]);

    useEffect(() => {
        onInputChange(formData);
    }, [formData]);
    

    useEffect(() => {
        setLoading(false);
    }, []);

    const handlePropertyTypeChange = (event) => {
        const selectedType = event.target.value;
        setPropertyType(selectedType);
        //console.log(propertyType);
    };


    if (isLoading) return <div className="text-center"><div className="spinner-border spinner-border-sm ms-2" role="status"><span className="sr-only">Loading...</span></div></div>;

    const renderPropertyDetails = () => {
        const renderMap = {
            family: renderCommonFields,
            bachelor: renderBachelorFields,
            office: renderOfficeFields,
            sublet: renderSubletFields,
            hostel: renderHostelFields,
            shop: renderShopFields,
        };
    
        const RenderFields = renderMap[propertyType];
        
        return RenderFields ? (
            <div className="row">
                {RenderFields()}
            </div>
        ) : null;
    };    

    // Start Property Type Input
    const commonOptions = [
        { value: 1, label: 'House' },
        { value: 2, label: 'Unit' },
        { value: 3, label: 'Room' },
        { value: 5, label: 'Flat' },
        { value: 6, label: 'Floor' },
        { value: 7, label: 'Apartment' },
    ];
    
    const familyBachelorOfficeOptions = [
        { value: 4, label: 'Seat' },
        ...commonOptions,
    ];
    
    const propertyOptions = {
        family: commonOptions,
        bachelor: familyBachelorOfficeOptions,
        office: commonOptions,
        sublet: [
            { value: 3, label: 'Room' },
            { value: 4, label: 'Seat' },
        ],
        hostel: [
            { value: 4, label: 'Seat' },
            { value: 3, label: 'Room' },
        ],
        shop: [
            { value: 8, label: 'Shop' },
        ],
    };
    
    const propertyTypeHtml = () => {
        const options = propertyOptions[propertyType] || [];
    
        return (
            <div className="form-floating mb-3">
                <select
                    className="form-select cursor-pointer"
                    id="floatingSelect"
                    aria-label=""
                    name="property_type_id"
                    required
                    onChange={handleChange}
                    value={formData.property_type_id}
                >
                    {options.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <label htmlFor="floatingSelect">Property type*</label>
            </div>
        );
    };
    // End Property Type Input

    const genderHtml = () => (
        <div className="col-md-4 col-6">
            <div className="form-floating mb-3">
                <select
                    className="form-select cursor-pointer"
                    id="gender-bachelor"
                    aria-label="Select Gender"
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="female / family">Female / Family</option>
                    <option value="others">Others</option>
                </select>
                <label htmlFor="gender-bachelor">
                    Select Gender
                </label>
            </div>
        </div>
    );

    const floorNoHtml = () => (
        <div className="col-md-4 col-6">
            <div className="form-floating mb-3">
                <select
                    className="form-select cursor-pointer"
                    id="floatingSelect"
                    aria-label=""
                    name="floor"
                    onChange={handleChange}
                    value={formData.floor}
                >
                    <option value="">Select floor</option>
                    {[...Array(50)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <label htmlFor="floatingSelect">
                    Floor no
                </label>
            </div>
        </div>
    );

    const totalSizeHtml = () => (
        <div className="col-md-4 col-6">
            <div className="form-floating mb-3">
                <input
                    type="number"
                    className="form-control"
                    id="floating-input-size"
                    defaultValue=""
                    autoComplete="off"
                    placeholder="Size (sq feet)"
                    name="size"
                    onChange={handleChange}
                    value={formData.size}
                />
                <label htmlFor="floating-input-size">
                    Total Size (Sq feet)
                </label>
            </div>
        </div>
    );

    const renderRoomQty = () => (
        <div className="col-md-4 col-6">
            <div className="form-floating mb-3">
                <select
                    className="form-select cursor-pointer"
                    id="floatingSelect"
                    aria-label=""
                    name="bedroom"
                    onChange={handleChange}
                    value={formData.bedroom}
                >
                    <option value="">Select room qty</option>
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <label htmlFor="floatingSelect">Room Qty [রুম সংখ্যা]</label>
            </div>
        </div>
    );

    const renderCommonFields = () => (
        <>
            <div className="col-md-4 col-6">
                {propertyTypeHtml()}
            </div>

            {(propertyType === 'family') && renderRoomQty()}

            <div className="col-md-4 col-6">
                <div className="form-floating mb-3">
                    <select
                        className="form-select cursor-pointer"
                        id="floatingSelect"
                        aria-label=""
                        name="bathroom"
                        onChange={handleChange}
                        value={formData.bathroom}
                    >
                        <option value="">Select bathroom</option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <label htmlFor="floatingSelect">Bathroom</label>
                </div>
            </div>

            <div className="col-md-4 col-6">
                <div className="form-floating mb-3">
                    <select
                        className="form-select cursor-pointer"
                        id="floatingSelect"
                        aria-label=""
                        name="balcony"
                        onChange={handleChange}
                        value={formData.balcony}
                    >
                        <option value="">Select Balcony</option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <label htmlFor="floatingSelect">
                        Balcony{" "}
                        <small>
                            <span className="text-muted">(optional)</span>
                        </small>
                    </label>
                </div>
            </div>
            
            {floorNoHtml()}

            {(propertyType === 'family' || propertyType === 'office') && totalSizeHtml()}
        </>
    );

    const renderOfficeFields = () => (
        <>
            {renderCommonFields()}
            <div className="col-md-4 col-6">
                <div className="form-floating mb-3">
                    <select
                        className="form-select cursor-pointer"
                        id="floatingSelect-office"
                        aria-label="Select Office Room"
                        name="office_room"
                        onChange={handleChange}
                        value={formData.office_room}
                    >
                        <option value="">Select Office Room</option>
                        {[...Array(30)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <label htmlFor="floatingSelect-office">
                        Office Room
                    </label>
                </div>
            </div>
        </>
    );

    const renderBachelorFields = () => (
        <>
            {renderCommonFields()}
            {genderHtml()}
        </>
    );

    const renderSubletFields = () => (
        <>
            {renderCommonFields()}
            {genderHtml()}
        </>
    );

    const renderHostelFields = () => (
        <>
            {renderCommonFields()}
            {genderHtml()}
        </>
    );

    const renderShopFields = () => (
        <>
            <div className="col-md-4 col-6">
                {propertyTypeHtml()}
            </div>
            {floorNoHtml()}
            {totalSizeHtml()}
        </>
    );

    
    return (
        <div className="card">
            <h5 className="card-header">Property Information</h5>
            <div className="card-body">
                <div className="row">
                    {['family', 'bachelor', 'office', 'sublet', 'hostel', 'shop'].map((type, index) => (
                        <div className="col mb-2" key={type}>
                            <input
                                className="cat_item"
                                type="radio"
                                id={`property_label_id${index + 1}`}
                                name="property_type"
                                value={type}
                                checked={propertyType === type}
                                onChange={handlePropertyTypeChange}
                            />
                            <label className="cat_label" htmlFor={`property_label_id${index + 1}`}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="mt-3">
                    {renderPropertyDetails()}
                </div>
                
            </div>
        </div>
    );
}