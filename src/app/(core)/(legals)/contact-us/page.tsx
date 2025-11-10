import PageHeader from "@/components/page-header";
import { Label } from "@/components/ui/label";
import { generateBreadcrumbJsonLDSchema } from "@/lib/json-ld/bread-crumb-schema";
import { Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to provide feedback, please feel free to reach out to us.",
};

const ContactUsPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLDSchema("Contact Us", "/contact-us")).replace(/</g, '\\u003c'),
        }}
      />
      <PageHeader
        icon={Users}
        description="We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to provide feedback, please feel free to reach out to us."
        title="Contact Us"
        descriptionClassName="text-sm md:text-base max-w-3xl"
      />
      <div className="border border-zinc-50/10 bg-secondary/10 p-7 rounded-lg flex flex-col relative space-y-1">
        <div className="space-y-1">
          <Label className="text-lg md:text-2xl">Email:</Label>
          <p className="text-sm md:text-base">
            For general inquiries and support, please email us at: {" "}
            <a href="mailto:victorsouza.miralhas@gmail.com" target="_blank" aria-label="Mail" className="underline text-accent/80 font-semibold md:text-lg ">contact@devilsect.com</a>
          </p>
        </div>
        <div className="mt-6">
          <p className="text-sm md:text-base">
            For DMCA-related matters, please email us at: {" "}
            <a href="mailto:victorsouza.miralhas@gmail.com" target="_blank" aria-label="Mail" className="underline text-accent/80 font-semibold md:text-lg ">dmca@devilsect.com</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default ContactUsPage;
