import { Star } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const marketingPage = () => {
    return(
        <div className="flex items-center justify-center flex-col bg-slate-300">
            <div className={cn("flex items-center justify-center flex-col")}>
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                    <Star className="h-6 w-6 mr-2"/>
                    ME2073
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6"> 
                        Made by group: Team Evaluate
                </h1>
                <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-700 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
                    Made By Students For Students
                </div>
            </div>
            <div className={cn("text-sm md-text-xl text-neautral-200 mt-4 max-w-xs md:max-w-2xl text-center mx-auto")}>
                Course Evaluation System specifaclly designed for students to provide feedback on their courses.
                This platform is mainly intended for KTH courses and professors, but can be used by any university.
            </div>
            <Button variant="link" className="transition duration-150 ease-in-out" asChild>
                <Link href="/">
                    Learn more about the project
                </Link>
            </Button>
        </div>
    );
};

export default marketingPage;

