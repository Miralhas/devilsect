import ResetPassword from "@/components/authentication/reset-password";
import Image from "next/image";
import Link from "next/link";

const ResetPasswordPage = () => {
  return (
    <div className="w-full max-w-[400px] border border-neutral-900 bg-secondary/60 rounded-lg overflow-hidden p-1 transition-all duration-300 space-y-2 relative backdrop-blur-sm z-50">
      <div className="flex flex-col p-4 pb-0">
        <Link href="/" className="transition-opacity duration-300 opacity-100 hover:opacity-65 self-start">
          <Image src="/devilsect-logo.png" width={50} height={50} quality={100} className="size-9" alt="Home" />
        </Link>
      </div>
      <div className="relative p-4 pt-0 transition-all duration-300">
        <ResetPassword />
      </div>
    </div>
  )
}

export default ResetPasswordPage;
