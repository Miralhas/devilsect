/* eslint-disable react/no-unescaped-entities */
import PageHeader from "@/components/page-header";
import { generateBreadcrumbJsonLDSchema } from "@/lib/json-ld/bread-crumb-schema";
import { FlagOff } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA",
  description: "Dmca terms of our webiste",
};

const DmcaPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLDSchema("DMCA", "/dmca")).replace(/</g, '\\u003c'),
        }}
      />
      <PageHeader
        icon={FlagOff}
        title="DMCA"
        description="Important, please read these dmca terms carefully."
        descriptionClassName="text-sm md:text-base max-w-3xl"
      />
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Copyright Protection</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="font-semibold text-red-800">DevilSect</span> respects the intellectual property rights
              of others, and we require our users to do the same. When we receive notices of alleged copyright
              infringement that meet the requirements of the Digital Millennium Copyright Act (DMCA) and applicable
              laws, we will take prompt action.
            </p>
            <p className="text-sm md:text-base mt-4 leading-relaxed text-zinc-300">
              If you believe that content on <span className="font-semibold text-red-800">DevilSect</span> violates
              your copyright, you may file a proper DMCA takedown notice as outlined below.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Filing a DMCA Takedown Notice</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base mb-4 leading-relaxed text-zinc-300">
              If you are the copyright owner (or authorized to act on behalf of one) and believe your copyrighted work
              has been used without authorization, please send us a written notification including the following
              details:
            </p>
            <ul className="text-sm md:text-base ml-6 list-disc space-y-3 text-zinc-300">
              <li className="leading-relaxed">
                Identification of the copyrighted work that you claim has been infringed.
              </li>
              <li className="leading-relaxed">
                Identification of the infringing material, including enough detail for us to locate it on our site
                (preferably a direct URL).
              </li>
              <li className="leading-relaxed">
                A statement that you believe, in good faith, that the material is not authorized by the copyright
                owner, its agent, or the law.
              </li>
              <li className="leading-relaxed">
                A statement, made under penalty of perjury, that the information in your notice is accurate and that
                you are the copyright holder or authorized to act on behalf of the copyright holder.
              </li>
              <li className="leading-relaxed">
                Your full legal name, mailing address, telephone number, and email address.
              </li>
              <li className="leading-relaxed">Your physical or electronic signature.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">DMCA Agent</h2>
          <div className="rounded-lg border border-primary/80 bg-primary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base mb-2 font-semibold text-white">Send the completed DMCA notice to our designated agent:</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm md:text-base text-zinc-300">
                <span className="font-semibold text-red-800">DevilSect</span>
              </p>
              <p className="text-sm md:text-base text-zinc-300">
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:contact@devilsect.com" className="text-red-800 underline hover:text-red-900">
                  contact@devilsect.com
                </a>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Counter-Notice Procedure</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base mb-4 leading-relaxed text-zinc-300">
              If you believe that material removed or disabled as a result of a DMCA notification was taken down in
              error, or if you are otherwise authorized to use the material, you may submit a counter-notification. A
              valid counter-notice must include:
            </p>
            <ul className="text-sm md:text-base ml-6 list-disc space-y-3 text-zinc-300">
              <li className="leading-relaxed">
                Identification of the material that was removed and its prior location before removal.
              </li>
              <li className="leading-relaxed">
                A statement, under penalty of perjury, that you believe in good faith that the material was removed or
                disabled as a result of mistake or misidentification.
              </li>
              <li className="leading-relaxed">
                Your full name, mailing address, telephone number, and email address.
              </li>
              <li className="leading-relaxed">
                A statement that you consent to the jurisdiction of the courts in your locality and agree to accept
                service of process from the party who submitted the original DMCA notice.
              </li>
              <li className="leading-relaxed">Your physical or electronic signature.</li>
            </ul>
            <p className="text-sm md:text-base mt-4 leading-relaxed text-zinc-300">
              Once a valid counter-notice is received, <span className="font-semibold text-red-800">DevilSect</span>{" "}
              may restore the content unless the original complainant files legal action to prevent re-posting.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Repeat Infringers</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              In accordance with the DMCA, <span className="font-semibold text-red-800">DevilSect</span> may suspend
              or terminate accounts of users who are identified as repeat infringers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Important Notice</h2>
          <div className="rounded-lg border border-primary/80 bg-primary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              Submitting false information in a DMCA notice or counter-notice may result in legal liability, including
              damages, court costs, and attorney's fees. For this reason, we strongly encourage you to seek legal
              advice if you are unsure about your rights before filing a notice.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

export default DmcaPage;