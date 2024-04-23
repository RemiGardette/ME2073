import { auth, currentUser } from "@clerk/nextjs";
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from "next";
import { env } from "process";
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { create } from "domain";
import { FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { redirect } from 'next/navigation'
import axios from "axios";
import { DOMParser } from 'xmldom';

type review = {
    courseId: string,
    userId: string,
    title: string,
    reviewText: string,
    rating: Rating,
}

type Rating = {
    courseRating: number,
    workloadRating: number,
    lectureRating: number,
    difficultyRating: number,
    annoyanceRating: number,
}

const initialState = {
    courseId: '',
    userId: '',
    title: '',
    reviewText: '',
    rating: {
        courseRating: 0,
        workloadRating: 0,
        lectureRating: 0,
        difficultyRating: 0,
        annoyanceRating: 0,
    }
}

const prisma = new PrismaClient({
    datasourceUrl : process.env.DIRECT_URL
})


var currentCourse = 'NULL'

async function findCourse(courseId : string){
    await prisma.$connect();
    const hits = await prisma.course.findUnique({
        where: {
            courseId: courseId,
        },
    })

    // console.log(hits)

    return hits?.courseName
}


async function getCourseInfo(courseCode: string, language: string = 'en'): Promise<any> {
    try {
        const response = await axios.get(`https://api.kth.se/api/kopps/v1/course/${courseCode}/${language}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course information:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

const parseXml = (xmlString: string): any => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const courseNode = xmlDoc.getElementsByTagName('course')[0];

    const title = courseNode.getElementsByTagName('title')[0].textContent;
    const examiner = courseNode.getElementsByTagName('examiner')[0].textContent;
    const creditCheck = courseNode.getElementsByTagName('credits')[0].textContent || "N/A";
    var creditString: string;
    if(creditCheck !== null){
        creditString = creditCheck;
    }
    else{
        creditString = "N/A";
    }
    const credits = parseFloat(creditString);
  
    return {
      title,
      examiner,
      credits
    };
  };


  async function funcCourseInfo(courseId: string) {
    try {
        // Fetch course information
        const courseData = await getCourseInfo(courseId);

        // Parse XML data
        const { title, examiner, credits } = parseXml(courseData);
     
     // Return HTML code
     return {
        title,
        examiner,
        credits
    };
    } catch (error) {
        console.error('Error getting course information:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

async function getCourseDesc(courseCode: string, language: string = 'en'): Promise<any> {
    try {
        const response = await axios.get(`https://api.kth.se/api/kopps/v1/course/${courseCode}/plan`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course information:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

//   async function funcCourseDesc(courseId: string) {
//     try {
//         // Fetch course information
//         const courseData = await getCourseDesc(courseId);

//         // Parse XML data
//         const content = parseCourseInfo(courseData);
     
//      // Return HTML code
//      return {
//         content
//     };
//     } catch (error) {
//         console.error('Error getting course information:', error);
//         throw error; // Re-throw the error to be handled by the caller
//     }
// }


async function getUser(){
    const { userId } = auth();
    
    if (!userId){
            'User not signed in!'
    }

    const user = await currentUser();
    return user?.username;
}

async function getReviews(courseId: string, username: string){
    if(username != ''){
        const hits = await prisma.reviews.findMany({
            where:{
                courseId: courseId,
                userId: username,
            },
        },
        )
        // console.log(hits)
        return hits;
    }
    return "User not logged in"
}

async function addReview(courseId: string, username: string){
    console.log("Adding review")
    if (username != ''){
        const hits = await prisma.reviews.findMany({
            where:{
                courseId: courseId,
                userId: username,
            },
        })

        if (hits.length == 0){
            const reviewsWithRatings = await prisma.reviews.findMany({
                where:{
                    courseId: courseId,
                },include:{
                    ratings: true,
                },
            });
            console.log(reviewsWithRatings);

            return(
                <div className="">
                    <form action={onSubmit} className="p-10 border border-indigo-500/50 rounded-md content-center">
                        <div className="p-2">
                            <input type="text" id="title" name="title" placeholder="Title" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>                      
                        </div>
                        <div className="p-2">
                            <input type="text" id="reviewText" name="reviewText" placeholder="Review" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                        </div>
                        <div className="p-2">
                            Rate the course overall
                            <select id="rating" name="rating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue="Choose a Overall course rating">Choose a Overall course rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="p-2">
                            Rate the overall workload of the course
                            <select id="workloadRating" name="workloadRating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue="Choose a Overall workload rating">Choose a Overall workload rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="p-2">
                            Rate the overall lectures of the course
                            <select id="lectureRating" name="lectureRating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue="Choose a lecture rating">Choose a lecture rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="p-2">
                            Rate the overall difficulty of the course
                            <select id="difficultyRating" name="difficultyRating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue="Choose a difficulty rating">Choose a difficulty rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="p-2">
                            Rate the overall annoyance of the course
                            <select id="annoyanceRating" name="annoyanceRating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue="Choose a annoyance rating">Choose a annoyance rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                    {
                        reviewsWithRatings.map((item) => (
                            <div key={item.id} className="p-10 border border-indigo-500/50 rounded-md content-center">
                                <h1 className="text-left text-5xl pb-2">{item.title}</h1>
                                <div className="border rounded-md border-indigo-500/50">{item.reviewText}</div>
                                <div>
                                    {item.ratings.map((rating) => (
                                <div>Overall rating: {rating.courseRating} Workload rating: {rating.workload} Lecture rating: {rating.lecture} Difficulty Rating: {rating.difficulty} Annoyance rating: {rating.annoyance}</div>
                            ))}
                        </div>
                        <div>Made by: {item.userId} </div>
                        </div>
                        ))
                    }
                </div>  
            )
        }else{
            const reviewsWithRatings = await prisma.reviews.findMany({
                where:{
                    courseId: courseId,
                },include:{
                    ratings: true,
                },
            });
            console.log(reviewsWithRatings);
            return(
                reviewsWithRatings.map((item) => (
                    <div key={item.id} className="p-10 border border-indigo-500/50 rounded-md">
                        <h1 className="text-left text-5xl pb-2">{item.title}</h1>
                        <div className="border rounded-md border-indigo-500/50">{item.reviewText}</div>
                        <div>
                            {item.ratings.map((rating ) => (
                                <div className="">Overall rating: {rating.courseRating} Workload rating: {rating.workload} Lecture rating: {rating.lecture} Difficulty Rating: {rating.difficulty} Annoyance rating: {rating.annoyance}</div>
                            ))}
                        </div>
                        <div>Made by: {item.userId} </div>
                    </div>
                ))
            )
        }
    }
}

async function onSubmit(formData: FormData){
    'use server'
    const user = await currentUser();
    console.log(formData);
    console.log(currentCourse);
    const title = formData.get('title');
    const reviewText = formData.get('reviewText');
    const rating = formData.get('rating');
    const workloadRating = formData.get('workloadRating');
    const lectureRating = formData.get('lectureRating');
    const difficultyRating = formData.get('difficultyRating');
    const annoyanceRating = formData.get('annoyanceRating');
    const username = user?.username;

    const newReview = await prisma.reviews.create({
        data: {
            title: ''+title,
            reviewText: ''+reviewText,
            userId: ''+username,
            courseId: ''+currentCourse,
            ratings:{
                create:{
                    courseRating: Number(''+rating),
                    workload: Number(''+workloadRating),
                    lecture: Number(''+lectureRating),
                    difficulty: Number(''+difficultyRating),
                    annoyance: Number(''+annoyanceRating),
                },
            },
        },
    })
    console.log(newReview)
    redirect('/Demo/Courses/' + currentCourse)
}


export default async function CoursePage({ params }: { params: any }) {
    const courseInfo = await findCourse(params.CourseInfo);
    const additionalInfos = await funcCourseInfo(params.CourseInfo);
    const teacher = additionalInfos.examiner;
    const credits = additionalInfos.credits;
    const title = additionalInfos.title;
    const user = await currentUser();
    const reviews = await getReviews(params.CourseInfo, user?.username ?? '');
    const reviewToAdd = await addReview(params.CourseInfo, user?.username ?? '');
    const desc = getCourseDesc(params.CourseInfo);
    currentCourse = params.CourseInfo;

    return(
        <div className="pt-4 content-center">
        <div className="pb-5">
            <table style={{ width: "50%", margin: "0 auto", borderCollapse: "collapse", fontFamily: "Arial, sans-serif", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", borderRadius: "10px" }}>
            <tr>
                    <td style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left", backgroundColor: "#fff", color: "#444" }}>Code</td>
                    <td style={{ border: "1px solid #ddd", padding: "12px", backgroundColor: "#fff" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{currentCourse}</div>
                    </td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left", backgroundColor: "#fff", color: "#444" }}>Title</td>
                    <td style={{ border: "1px solid #ddd", padding: "12px", backgroundColor: "#fff" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{title}</div>
                    </td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left", backgroundColor: "#fff", color: "#444" }}>Teachers</td>
                    <td style={{ border: "1px solid #ddd", padding: "12px", backgroundColor: "#fff" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{teacher}</div>
                    </td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left", backgroundColor: "#fff", color: "#444" }}>Credits</td>
                    <td style={{ border: "1px solid #ddd", padding: "12px", backgroundColor: "#fff" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{credits}</div>
                    </td>
                </tr>
            </table>
            <div style={{ width: "50%", margin: "0 auto", borderCollapse: "collapse", fontFamily: "Arial, sans-serif", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", borderRadius: "10px" }}>
            {reviewToAdd}       
            </div>
        </div>
    </div>
    )

}