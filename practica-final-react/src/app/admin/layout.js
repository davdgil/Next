// components/AdminLayout.js

import React from 'react';
import AdminBar from '../components/Admin/navBar';
import RootLayout from '../layout';
const AdminLayout = ({ children }) => {

    return (
        <RootLayout>
        <AdminBar />
        {children}
    </RootLayout>
    );
};

export default AdminLayout;
