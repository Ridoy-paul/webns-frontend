'use client';
import { useEffect, useState } from 'react';

export default function PropertyPrice({ priceData, onPriceChange }) {
    const [isLoading, setLoading] = useState(true);
    const [price, setPrice] = useState(priceData?.price || '');
    const [priceType, setPriceType] = useState(priceData?.price_type || 1);
    const [includedBills, setIncludedBills] = useState({
        electricity: priceData?.electricity || false,
        gas: priceData?.gas || false,
        water: priceData?.water || false,
        lift: priceData?.lift || false,
        security: priceData?.security || false,
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        // Call onPriceChange whenever price, priceType, or includedBills change
        onPriceChange({
            price,
            price_type: priceType,
            ...includedBills,
        });
    }, [price, priceType, includedBills, onPriceChange]);

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handlePriceTypeChange = (e) => {
        setPriceType(Number(e.target.value));
    };

    const handleBillChange = (e) => {
        const { name, checked } = e.target;
        setIncludedBills((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="spinner-border spinner-border-sm ms-2" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <h5 className="card-header">Others Information</h5>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6 col-6">
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="floating-input"
                                value={price}
                                onChange={handlePriceChange}
                                autoComplete="off"
                                placeholder="Price"
                                name="price"
                                required
                            />
                            <label htmlFor="floating-input">Price*</label>
                        </div>
                    </div>
                    <div className="col-md-6 col-6">
                        <div className="form-floating mb-3">
                            <select
                                className="form-select cursor-pointer"
                                id="floatingSelect"
                                value={priceType}
                                onChange={handlePriceTypeChange}
                                aria-label="Floating label select example"
                                name="price_type"
                            >
                                <option value={1}>Monthly</option>
                                <option value={2}>Weekly</option>
                                <option value={3}>Daily</option>
                            </select>
                            <label htmlFor="floatingSelect">Price for*</label>
                        </div>
                    </div>
                    <div className="col-md-12 col-12">
                        <div className="mb-3">
                            <div className="form-label">Price included with </div>
                            <div>
                                {Object.keys(includedBills).map((bill) => (
                                    <label key={bill} className="form-check form-check-inline cursor-pointer">
                                        <input
                                            className="form-check-input cursor-pointer"
                                            type="checkbox"
                                            name={bill}
                                            checked={includedBills[bill]}
                                            onChange={handleBillChange}
                                        />
                                        <span className="form-check-label">{bill.charAt(0).toUpperCase() + bill.slice(1)} bill</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
