import { ClerkProvider,  
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,} from "@clerk/nextjs";
import { Footer } from "@/components/ui/footer";
import { Navbar } from "../(landing)/_components/navbar";

 
function ClerkNavbar() {
    return (
      <header style={{ display: "flex", justifyContent: "space-between", padding: 15 }}>
        <h1>Evaluate</h1>
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton/>
        </SignedOut>
      </header>
    );
}

const DemoLayout = ({
    children
}: {
    children: React.ReactNode;
}) => 
{
    return (
        <ClerkProvider>
            <div className="top-0 w-full h-14 px-4 border-b shadow-sm bg-white items-center">
                <div className="md:max-w-screen-2x mx-auto items-center w-full justify-between">
                <ClerkNavbar />
                </div>
            </div>
            {children}
        </ClerkProvider>
    )

}

export default DemoLayout;