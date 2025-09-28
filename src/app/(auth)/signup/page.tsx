import SignupForm from "@/components/authentication/signup/form";
import LogoImage from "@/components/logo-image";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="w-full max-w-md border border-neutral-900 bg-secondary/60 rounded-lg overflow-hidden p-1 transition-all duration-300 space-y-2 relative backdrop-blur-sm z-50">
      <div className="flex flex-col gap-1.5 p-4">
        <Link href="/" className="transition-opacity duration-300 opacity-100 hover:opacity-65 self-start">
          <LogoImage
            priority
            height={36}
            width={0}
            className="inline-block object-cover w-[25px]"
          />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-accent-foreground self-center">Create your account</h1>
      </div>
      <div className="relative p-4 pt-0 transition-all duration-300 space-y-4">
        <SignupForm />
        <div className="flex justify-center text-sm gap-1 font-medium leading-relaxed ">
          Already have an account? <Link href="/login" className="transition-colors duration-200 hover:text-red-800 underline">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;
