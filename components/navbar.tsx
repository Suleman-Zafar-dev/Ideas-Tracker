import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

const Navbar = () => {
  return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <Link href={"/"}>Ideas Tracker</Link>
            <div className="flex items-center justify-between gap-4">
              <Link href={"/dashboard"}>dashboard</Link>
              <Link href={"/add-idea"}>Add-Idea</Link>
              <Link href={"/ideas"}>Ideas</Link>
              <Link href={"/tags"}>Tags</Link>
             <ThemeSwitcher />
            </div>
          </div>
        </nav>   
  )
}

export default Navbar