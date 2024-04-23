"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";

const CourseResearchToolbar: React.FC = () => {
    const [courseCode, setCourseCode] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseCode(event.target.value);
    };

    const handleSearch = async () => {
        try {
            if (!courseCode) {
                throw new Error('Course code cannot be empty');
            }
            const response = await axios.get(`/api/checkCourse?courseCode=${courseCode}`);
            const { exists } = response.data;

            if (exists) {
                window.location.href = `/Demo/Courses/${courseCode}`;
            } else {
                setError(`Course with code ${courseCode} not found`);
            }
        } catch (error) {
            console.error('Error fetching course information:', error);
            setError('Error fetching course information');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="toolbar-container">
            <Input
                type="text"
                placeholder="Search for courses using course code..."
                value={courseCode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            {error && <p>{error}</p>}
        </div>
    );
}

export default CourseResearchToolbar;




