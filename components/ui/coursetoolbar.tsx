// CourseResearchToolbar.tsx
"use client";

// components/ui/CourseResearchToolbar.tsx
import React, { useState } from 'react';
import axios from 'axios';

const CourseResearchToolbar: React.FC = () => {
    const [courseCode, setCourseCode] = useState<string>(''); // Initialize courseCode state
    const [courseInfo, setCourseInfo] = useState<any>(null); // Initialize courseInfo state
    const [error, setError] = useState<string>(''); // Initialize error state

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseCode(event.target.value); // Update courseCode state on input change
    };

    const handleSearch = async () => {
        try {
            if (!courseCode) {
                throw new Error('Course code cannot be empty');
            }
            const response = await axios.get(`/api/course?code=${courseCode}`); // Fetch course information
            setCourseInfo(response.data); // Update courseInfo state with response data
            setError(''); // Clear any previous error message
        } catch (error) {
            console.error('Error fetching course information:', error);
            setCourseInfo(null); // Clear courseInfo state
            setError('Error fetching course information'); // Set error message
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(); // Trigger search when Enter key is pressed
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for courses..."
                value={courseCode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search Courses</button>
            {courseInfo && (
                <div>
                    <h2>Course Information</h2>
                    <pre>{JSON.stringify(courseInfo, null, 2)}</pre>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default CourseResearchToolbar;




