// DemoPage.tsx
import React from 'react';
import CourseResarchToolbar from '@/components/ui/coursetoolbar';

const DemoPage = () => {
    return (
        <div>
            <h1 className='text-center text-4xl font-bold text-gray-800'>Course Research Tool</h1>            
            <div className='center'>
                <CourseResarchToolbar />
            </div>
        </div>
    );
}



export default DemoPage;

