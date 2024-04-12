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
            return(
                <div className="w-full">
                    <form action={onSubmit}>
                        <div className="p-2">
                            <input type="text" id="title" name="title" placeholder="Title" className="Review" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>                      
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
                    <div key={item.id}>
                        <div className="w-3/6 ">{item.title}</div>
                        <div >{item.reviewText}</div>
                        <div>
                            {item.ratings.map((rating, index) => (
                                <li key={index}>
                                    <p>Course Rating: {rating.courseRating}</p>
                                    <p>Workload Rating: {rating.workload}</p>
                                    <p>Lecture Rating: {rating.lecture}</p>
                                    <p>Difficulty Rating: {rating.difficulty}</p>
                                    <p>Annoyance Rating: {rating.annoyance}</p>
                                </li>
                            ))}
                        </div>
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


export default async function CoursePage({ params }) {
    const courseInfo = await findCourse(params.CourseInfo);
    const user = await currentUser();
    const reviews = await getReviews(params.CourseInfo, user?.username ?? '');
    const reviewToAdd = await addReview(params.CourseInfo, user?.username ?? '');

    currentCourse = params.CourseInfo;


    return(
    <div className="flex items-center justify-center flex-col pt-4">
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-700 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
            {currentCourse}
        </div>
            {reviewToAdd}
    </div>
    )

}