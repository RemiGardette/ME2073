// DemoPage.tsx
import React from 'react';
import CourseResarchToolbar from '@/components/ui/coursetoolbar';

const DemoPage = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Adjust height as needed
        }}>
            <CourseResarchToolbar />
        </div>
    );
}

export default DemoPage;

