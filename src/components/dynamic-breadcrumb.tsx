'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const DynamicBreadcrumb = () => {
  const pathname = usePathname()
  const pathNames = pathname.split('/').filter(path => path);

  if (pathNames.length <= 1) {
    return <Breadcrumb>
    </Breadcrumb>
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathNames.map((p, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`
          const isLast = index + 1 === pathNames.length;
          const formattedName = decodeURIComponent(p).replaceAll("-", " ");
          return (
            <Fragment key={index}>
              {!isLast ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={href} className="capitalize">{formattedName}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">{formattedName}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default DynamicBreadcrumb;
