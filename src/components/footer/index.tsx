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
    { href: "/library", name: "Library" },
    { href: "/genres", name: "Genres" },
    { href: "/tags", name: "Tags" },
  ],
  legals: [
    { href: "/terms-of-service", name: "Terms of Service" },
    { href: "/cookies-policy", name: "Cookies Policy" },
    { href: "/privacy-policy", name: "Privacy Policy" },
    { href: "/dmca", name: "DMCA" },
  ],
}

const Footer = () => {
  return (
    <div className="w-full bg-zinc-950 border-y-2 border-zinc-50/15 shadow-2xl">
      <div className="max-w-[1280px] mx-auto px-4">
        <footer className="space-y-2 py-3 pt-5 md:py-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch md:justify-between w-full gap-5 md:gap-0">
            <Link href="/" className="transition-opacity items-center ease-in duration-200 flex gap-1.5 hover:opacity-80">
              <LogoImage
                width={40}
                height={40}
                className="w-auto h-18"
              />
              <div>
                <span className="text-base md:text-3xl uppercase tracking-widest font-tilt-warp text-accent-foreground/85">
                  DevilSect
                </span>
                <p className="text-xs md:text-[13px] text-zinc-300/90 leading-none">Free webnovel digital library</p>
              </div>
            </Link>
            <div className="flex md:justify-start lg:gap-24 w-full md:w-auto flex-wrap text-lg gap-x-12 gap-y-6 pl-6 md:pl-0">
              {Object.entries(links).map(([k, v], i) => (
                <div className="space-y-1 text-muted-foreground" key={i}>
                  <p className="text-foreground/90 capitalize ml-3 md:ml-0">{k}</p>
                  <div className="ml-3 md:ml-0 flex flex-col gap-0.5 font-light text-base">
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
        </footer>
      </div>
      <Separator orientation="horizontal" />
      <div className="mx-auto max-w-[1280px] p-4">
        <div className="flex text-sm text-[13px] items-center text-muted-foreground gap-4">
          <p className="text-xs md:text-sm text-zinc-500 italic font-medium leading-none mt-auto hidden md:block">Copyright {CURRENT_YEAR} © Devil Sect</p>
          <Link href="/contact-us" className="text-sm text-[13px] text-muted-foreground transition-all hover:text-zinc-200 duration-200 cursor-pointer ease-in hover:translate-x-0.25 hover:-translate-y-0.25 relative mr-auto md:mr-0 md:ml-auto">
            Contact Us
          </Link>
          <Link href="/sitemap.xml" className="text-sm text-[13px] text-muted-foreground transition-all hover:text-zinc-200 duration-200 cursor-pointer ease-in hover:translate-x-0.25 hover:-translate-y-0.25 relative">
            Sitemap
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer;
