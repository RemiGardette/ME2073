import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
    return (
        <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            <div className="md:max-w-screen-2x mx-auto flex items-center w-full justify-between">
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size="sm" variant="ghost" asChild>
                        <Link href="/">
                            Home
                        </Link>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                        <Link href="/Team">
                            Team
                        </Link>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                        <Link href="/Product">
                            Product
                        </Link>
                    </Button>
                </div>
                <Button size="sm" variant="default" asChild className="">
                        <Link href="/Demo/Home">
                            Demo
                        </Link>
                </Button>
            </div>
        </div>
    );
};