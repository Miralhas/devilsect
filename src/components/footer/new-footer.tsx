import { ArrowRight } from "lucide-react";
import Link from "next/link";
import LogoImage from "../logo-image";
import { Separator } from "../ui/separator";

const CURRENT_YEAR = new Date().getUTCFullYear();

const links = {
  platform: [
    { href: "/novels", name: "Novels" },
    { href: "/ranking", name: "Ranking" },
    { href: "/updates", name: "Updates" },
    { href: "/search", name: "Search" },
  ],
  resources: [
    { href: "/authors", name: "Authors" },
    { href: "/genres", name: "Genres" },
    { href: "/tags", name: "Tags" },
    { href: "/library", name: "Library" },
  ],
  legals: [
    { href: "/dmca", name: "DMCA" },
    { href: "/privacy-policy", name: "Privacy Policy" },
    { href: "/terms-of-service", name: "Terms of Service" },
    { href: "/cookies-policy", name: "Cookies Policy" },
  ],
}

const NewFooter = () => {
  return (
    <div className="w-full bg-zinc-950 border-b-2 border-secondary shadow-2xl">
      <div className="max-w-[1280px] mx-auto p-4">
        <footer className="space-y-2">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch md:justify-between w-full gap-5 md:gap-0">
            <div className="flex flex-col gap-2">
              <Link href="/" className="transition-opacity items-center ease-in duration-200 flex gap-1.5 hover:opacity-80">
                <LogoImage
                  width={25}
                  height={25}
                  className="w-auto h-12"
                />
                <div>
                  <span className="text-base md:text-3xl uppercase tracking-widest font-tilt-warp text-accent-foreground/85">
                    DevilSect
                  </span>
                  <p className="text-xs md:text-[13px] text-zinc-300/90 leading-none">Free webnovel digital library</p>
                </div>
              </Link>
              <Link href="/contact-us" className="text-sm text-zinc-300/90 hidden md:block mt-auto self-start transition-all hover:text-zinc-200 duration-200 cursor-pointer ease-in hover:translate-x-0.25 hover:-translate-y-0.25 relative">Contact Us</Link>
            </div>
            <div className="flex justify-between md:justify-start md:gap-24 w-full md:w-auto">
              {Object.entries(links).map(([k, v], i) => (
                <div className="space-y-1 text-muted-foreground text-sm" key={i}>
                  <p className="text-foreground/90 capitalize">{k}</p>
                  <div className="flex flex-col gap-0.5 font-light text-xs md:text-sm">
                    {v.map((link, idx) => (
                      <Link className="group inline-flex text-muted-foreground transition-all hover:text-zinc-200 duration-200 cursor-pointer ease-in hover:translate-x-0.25 hover:-translate-y-0.25 relative underline decoration-[0.25px] underline-offset-3 gap-0.25" key={idx} href={link.href}>{link.name}
                        <ArrowRight className="size-3 rotate-310 opacity-70" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center md:text-sm text-zinc-500 italic font-medium leading-none mt-auto block md:hidden">Copyright {CURRENT_YEAR} © Devil Sect</p>
          </div>
          <Separator orientation="horizontal" className="mt-3" />
          <div className="flex justify-between text-sm text-[13px] items-center mt-3 text-muted-foreground">
            <p className="text-xs md:text-sm text-zinc-500 italic font-medium leading-none mt-auto hidden md:block">Copyright {CURRENT_YEAR} © Devil Sect</p>
            <Link href="/contact-us" className="text-sm text-[13px] text-muted-foreground block md:hidden transition-all hover:text-zinc-200 duration-200 cursor-pointer ease-in hover:translate-x-0.25 hover:-translate-y-0.25 relative">Contact Us</Link>
            <Link href="/sitemap.xml" className="text-sm text-[13px] text-muted-foreground transition-all hover:text-zinc-200 duration-200 cursor-pointer ease-in hover:translate-x-0.25 hover:-translate-y-0.25 relative">Sitemap</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default NewFooter;
