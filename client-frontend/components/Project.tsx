
import React from 'react';

const Project = () => {
    return (
        <div className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded-md p-2"
            />
            <input
                type="text"
                placeholder="Description"
                className="border border-gray-300 rounded-md p-2"
            />
            <input
                type="number"
                placeholder="Price"
                className="border border-gray-300 rounded-md p-2"
            />
            <input
                type="date"
                placeholder="Deadline"
                className="border border-gray-300 rounded-md p-2"
            />
        </div>
    );
};

export default Project;