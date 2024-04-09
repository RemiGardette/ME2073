'use client'


import { FormEvent } from 'react'


export default function addReviewForm(){
    console.log("Adding review")
        return(
                <div>
                    <form onSubmit={onSubmit}>
                        <input type="text" id="title" name="title" placeholder="Title"></input>
                        <input type="text" id="reviewText" name="reviewText" placeholder="Review"></input>
                        <input type="text" id="rating" name="rating" placeholder="Rating"></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )
}

async function onSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    console.log(event.currentTarget);
}

