import { SignedIn } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs"
import { SignedOut } from "@clerk/nextjs"
import Link from "next/link"


function Navbar() {
  return (
    <div className="shadow-md border-black h-14 p-3 flex items-center justify-between font-medium">
        Video-streaming-app
        <Link href="/">New meeting</Link>
        <SignedIn>
            <div className="flex items-center gap-5">
                 <Link href="/meetings">Meetings</Link>
                 <UserButton />
            </div>
        </SignedIn>
        <SignedOut>
            <SignedIn />
        </SignedOut>
    </div>
  )
}

export default Navbar
