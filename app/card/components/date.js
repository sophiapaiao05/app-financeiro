
import React from 'react';

const DateComponent = () => {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="date">
            {currentDate}
        </div>
    );
};

export default DateComponent;