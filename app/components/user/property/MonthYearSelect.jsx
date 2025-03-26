'use client';
import { useEffect, useState } from 'react';

export default function MonthYearSelect({ month, year, onMonthYearChange }) {
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year);
    const [isLoading, setLoading] = useState(true);

    // Month options
    const months = Array.from({ length: 12 }, (_, index) => ({
        value: index + 1,
        label: new Date(0, index).toLocaleString('default', { month: 'long' }),
    }));

    // Year options (2020 to current year + 1)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2020 + 2 }, (_, index) => 2020 + index);

    useEffect(() => {
        // Set default values if empty
        const currentMonth = new Date().getMonth() + 1; // Months are 0-based
        if (month === '') {
            setSelectedMonth(currentMonth === 12 ? 1 : currentMonth + 1);
        } else {
            setSelectedMonth(month);
        }

        if (year === '') {
            setSelectedYear(currentMonth === 12 ? currentYear + 1 : currentYear);
        } else {
            setSelectedYear(year);
        }

        setLoading(false);
    }, [month, year, currentYear]);

    useEffect(() => {
        onMonthYearChange(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear, onMonthYearChange]);

    const handleMonthChange = (event) => {
        const sMonth = event.target.value;
        setSelectedMonth(sMonth);
        onMonthYearChange(sMonth, selectedYear);
    };

    const handleYearChange = (event) => {
        const sYear = event.target.value;
        setSelectedYear(sYear);
        onMonthYearChange(selectedMonth, sYear);
    };

    if (isLoading) return <div>Loading Month with Year...</div>;

    return (
        <div className="form-group mb-3">
            <label>Month and Year</label>
            <div className="d-flex justify-content-between align-items-center">
                <select className="form-select" name='month' value={selectedMonth} onChange={handleMonthChange}>
                    <option value="">Select Month</option>
                    {months.map(month => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>

                <select className="form-select ms-2" name="year" value={selectedYear} onChange={handleYearChange}>
                    <option value="">Select Year</option>
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
