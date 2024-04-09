import { auth, currentUser } from "@clerk/nextjs";
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from "next";
import { env } from "process";
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { create } from "domain";
import { FormEvent } from 'react'


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
                <div>
                    <form action={onSubmit}>
                        <input type="text" id="title" name="title" placeholder="Title"></input>
                        <input type="text" id="reviewText" name="reviewText" placeholder="Review"></input>
                        <input type="text" id="rating" name="rating" placeholder="Rating"></input>
                        <input type="text" id="workloadRating" name="workloadRating" placeholder="Workload Rating"></input>
                        <input type="text" id="lectureRating" name="lectureRating" placeholder="Lecture Rating"></input>
                        <input type="text" id="difficultyRating" name="difficultyRating" placeholder="Difficulty Rating"></input>
                        <input type="text" id="annoyanceRating" name="annoyanceRating" placeholder="Annoyance Rating"></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )
        }else{
            return(
                hits.map((review) => (
                    <div>
                        <h1>{review.title}</h1>
                        <h2>{review.reviewText}</h2>
                        <h3>{review.userId}</h3>
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
    
}


export default async function CoursePage({ params }) {
    const courseInfo = await findCourse(params.CourseInfo);
    const user = await currentUser();
    const reviews = await getReviews(params.CourseInfo, user?.username ?? '');
    const reviewToAdd = await addReview(params.CourseInfo, user?.username ?? '');

    currentCourse = params.CourseInfo;


    return(
    <div>
        Course: {params.CourseInfo}
        <div>
            {courseInfo}
            {reviewToAdd}
        </div>
    </div>
    )

}