import LoginForm from "@/components/login/form";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid place-content-center relative">
      <div className="w-sm max-w-sm border border-neutral-900 bg-[#1b1b1b] rounded-lg overflow-hidden p-1 transition-all duration-300 space-y-2 relative backdrop-blur-sm z-50">
        <div className="flex flex-col gap-1.5 p-4">
          <Link href="/" className="transition-opacity duration-300 opacity-100 hover:opacity-65 self-start">
            <Image src="/devilsect-logo.png" width={50} height={50} quality={100} className="size-9" alt="Home" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-accent-foreground self-center">Sign in</h1>
        </div>
        <div className="relative p-4 pt-0 transition-all duration-300 space-y-4">
          <LoginForm />
          <div className="flex justify-center text-sm gap-1 font-medium leading-relaxed ">
            Don&apos;t have an account? <Link href="/signup" className="transition-colors duration-200 hover:text-accent underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
