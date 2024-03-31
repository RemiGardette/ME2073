import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "@/components/ui/footer";
import { Navbar } from "../(landing)/_components/navbar";

const DemoLayout = ({
    children
}: {
    children: React.ReactNode;
}) => 
{
    return (
        <ClerkProvider>
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
        </ClerkProvider>
    )

}

export default DemoLayout;