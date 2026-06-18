import Navbar from '@/components/homepage/Navbar';
import React from 'react';

const layout = ({ children }) => {
    return (
        <div>
            <Navbar></Navbar>
            <main>
                {children}
            </main>
        </div>
    );
};

export default layout;