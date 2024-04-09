// seed.ts

import { create } from "domain";

  const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const xml2js = require('xml2js');

const prisma = new PrismaClient();

// The following code fills up the course table using the courses from 2024, provided by KTH API

const endpoint1 = 'https://api.kth.se/api/kopps/v1/courseRounds/2024:1';
const endpoint2 = 'https://api.kth.se/api/kopps/v1/courseRounds/2024:2';


async function fetchCourseCodes() {
    try {
        const [response1, response2] = await Promise.all([
            axios.get(endpoint1),
            axios.get(endpoint2)
        ]);

        const courseCodes1 = await extractCourseCodes(response1.data);
        const courseCodes2 = await extractCourseCodes(response2.data);
        return [...courseCodes1, ...courseCodes2];
    } catch (error) {
        console.error('Error fetching course codes:', error);
        throw error;
    }
}

interface CourseRound {
    $: {
      courseCode: string;
      startTerm: string;
      roundId: string;
    };
  }

// Function to extract course codes from XML response
function extractCourseCodes(xmlData: string): string[] {
    let courseCodes: string[] = [];
    const parser = new xml2js.Parser();
  
    parser.parseString(xmlData, (err: any, result: any) => {
      if (err) {
        console.error('Error parsing XML data:', err);
        return;
      }
      
      const courseRounds: CourseRound[] = result.courseRoundList.courseRound;
      courseCodes.push(...courseRounds.map(round => round.$.courseCode));
      
    });
    return courseCodes;
  }

// Function to fetch course details from course code
async function fetchCourseTitle(courseCode: string) {
    try {
        const courseDetailsUrl = `https://api.kth.se/api/kopps/v1/course/${courseCode}/en`;
        const response = await axios.get(courseDetailsUrl);
        const courseTitle = extractCourseTitle(response.data);
        return courseTitle;
    } catch (error) {
        console.error(`Error fetching course details for ${courseCode}:`, error);
        return null;
    }
}

interface CourseTitle {
    lang: string;
    title: string;
  }
  
// Function to extract course title from XML response
function extractCourseTitle(xml: string): string {
    let englishTitleText: string = '';

    xml2js.parseString(xml, (err: any, result: any) => {
        if (!err) {
            // Extract the title
            const titles: any[] = result.course.title || [];
            const englishTitle = titles.find((title: any) => title['$']['xml:lang'] === 'en');
            englishTitleText = englishTitle ? englishTitle['_'] : '';
        }
    });
    return englishTitleText;
}

// Main function to fetch course codes and details
async function fetchAndStoreCourses() {
    try {
        const courseCodes = await fetchCourseCodes();
        // Store courses in the database
        // Replace this with your database insertion logic
        for (let i = 0; i < courseCodes.length; i++){
            let emptystring: string = "";
            let courseTitle = await fetchCourseTitle(courseCodes[i]);
            if (courseTitle == null) {
                courseTitle = "";
            }
            const courseSite = `https://www.kth.se/student/kurser/kurs/${courseCodes[i]}?l=en`;

            const insert_course = await prisma.course.upsert({
                where :{courseName: courseTitle,
                    courseId: courseCodes[i],
                    courseSite: courseSite},
                update: {},
                create: {courseName: courseTitle, courseId: courseCodes[i], courseSite: courseSite}
            })
        }
    } catch (error) {
        console.error('Error fetching and storing courses:', error);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
async function seed() {
  try {
    // Fetch and stores all 2024 courses
    fetchAndStoreCourses();
    // Create a user named "bob"
    // const bob = await prisma.user.create({
    //   data: {
    //     email: 'bob@example.com', // Set the email for "bob"
    //     name: 'Bob', // Set the name for "bob"
    //     role: 'USER', // Set the role for "bob" (assuming USER is a valid role)
    //   },
    // });

    // Insert the example review data into the database
    // await prisma.reviews.create({
    //   data: {
    //     title: 'Example Review', // Set the title of the review
    //     userId: bob.id, // Set the userId to the id of "bob"
    //     reviewText: 'This is an example review.', // Set the review text

    //   },
    // });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}

seed(); // Call the seed function

