import React from 'react';

const Dashboard = () => {
    return <div>{window.location.pathname.slice(1).toString()} </div>;
};

export default Dashboard;
