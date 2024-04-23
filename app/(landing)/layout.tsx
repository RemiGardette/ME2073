import { Footer } from "@/components/ui/footer";
import { Navbar } from "./_components/navbar";

const landingLayout = ({children}: {children:React.ReactNode}) => {
    return(
        <div className="h-full bg-slate-200 ease-out">
            <Navbar />
            <main className="h-full pt-40 pb-20 bg-slate-300">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default landingLayout;