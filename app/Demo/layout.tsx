import { ClerkProvider } from "@clerk/nextjs";

const DemoLayout = ({
    children
}: {
    children: React.ReactNode;
}) => 
{
    return (<ClerkProvider>
        {children}
    </ClerkProvider>)

}

export default DemoLayout;