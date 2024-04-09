// CourseResearchToolbar.tsx
"use client";

// components/ui/CourseResearchToolbar.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Console } from 'console';
import Link from "next/link";

const CourseResearchToolbar: React.FC = () => {
    const [courseCode, setCourseCode] = useState<string>(''); // Initialize courseCode state
    const [courseInfo, setCourseInfo] = useState<any>(null); // Initialize courseInfo state
    const [courseName, setCourseName] = useState<string>(''); // Initialize courseName state
    const [courseCodeHit, setCourseCodeHit] = useState<string>(''); // Initialize courseCodeHit state
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
            const responseParsed =  JSON.parse(JSON.stringify(response.data));
            // setCourseName(responseParesed.title); // Update courseName state with course title
            setCourseName(responseParsed.courseInfo.course.title[0]._);
            setCourseCodeHit("/Demo/Courses/"+responseParsed.courseInfo.course.$.code);
            
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
            <Input
                type="text"
                placeholder="Search for courses..."
                value={courseCode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <Button onClick={handleSearch}>Search Courses</Button>
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
};

export default CourseResearchToolbar;




