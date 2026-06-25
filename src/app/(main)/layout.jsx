import Footer from '@/components/homepage/Footer';
import Navbar from '@/components/homepage/Navbar';
import React from 'react';

const layout = ({ children }) => {
    return (
        <div>
            <Navbar></Navbar>
            <main>
                {children}
            </main>
            <Footer></Footer>
        </div>
    );
};

export default layout;