import React from 'react';


const PostProjects: React.FC = () => {
    return (
        <div>
            <h1>Are you a client?</h1>
            <h2>post your project</h2>
            <input type="text" placeholder="your address" />
            <input type="text" placeholder="title" />
            <input type="text" placeholder="description" />
            <input type="number" placeholder="budget" />
            <input type="text" placeholder="skills" />
            <input type="number" placeholder="deadline" />

        </div>
    );
};

export default PostProjects;