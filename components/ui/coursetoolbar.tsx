// CourseResearchToolbar.tsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Console } from 'console';
import Link from "next/link";

const CourseResearchToolbar: React.FC = () => {
    const [courseCode, setCourseCode] = useState<string>('');
    const [courseInfo, setCourseInfo] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [courseCodeHit, setCourseCodeHit] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseCode(event.target.value);
        console.log("Hello")
    };

    const handleSearch = async () => {
        console.log("Hello")
        try {
            if (!courseCode) {
                throw new Error('Course code cannot be empty');
            }
            const response = await axios.get(`/api/course?code=${courseCode}`);
            setCourseInfo(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching course information:', error);
            setCourseInfo(null);
            setError('Error fetching course information');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="toolbar-container" style={{ height: '160px', width: '600px' }}> {/* Doubled height and width */}
            <input
                type="text"
                placeholder="Search for courses using course code..."
                value={courseCode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                style={{
                    padding: '20px', /* Doubled padding for increased size */
                    fontSize: '24px', /* Doubled font size for increased size */
                    marginRight: '20px', /* Doubled margin for increased size */
                    borderRadius: '10px', /* Doubled border radius for increased size */
                    border: '2px solid #ccc', /* Doubled border width for increased size */
                    width: '500px', /* Doubled width */
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    padding: '20px', /* Doubled padding for increased size */
                    fontSize: '24px', /* Doubled font size for increased size */
                    borderRadius: '50%', /* Doubled border radius for increased size */
                    border: '2px solid #007bff', /* Doubled border width for increased size */
                    backgroundColor: 'transparent',
                    color: '#007bff',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#007bff'}
            >
                &#128269; {/* Unicode for magnifying glass */}
            </button>
            {courseInfo && (
                <div>
                    <h1>Course Information</h1>
                    <h2>Course Name: {JSON.stringify(courseName)} </h2>
                    {/* <h2>Course Code: {JSON.stringify(courseCodeHit)} </h2> */}
                    <Button size="sm" asChild>
                        <Link href={courseCodeHit}>
                            Go to course
                        </Link>
                    </Button>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default CourseResearchToolbar;




