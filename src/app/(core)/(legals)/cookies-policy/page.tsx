/* eslint-disable react/no-unescaped-entities */
import PageHeader from "@/components/page-header";
import { CookieIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "Cookies policy of our website",
};


const CookiesPolicyPage = () => {
  return (
    <>
      <PageHeader
        icon={CookieIcon}
        title="Cookies Policy"
        description="Important, please read these cookies policy terms carefully."
        descriptionClassName="text-sm md:text-base max-w-3xl"
      />
      <div className="space-y-8">
        <section className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
          <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
            This Cookies Policy describes the use of cookies and related technologies by{" "}
            <span className="font-semibold text-red-800">DevilSect</span> to recognize you during your visit to our
            site, enhance your experience, and display relevant advertising.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">What Are Cookies?</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
              Cookies are small text files that are placed on your computer, phone, or other device when you access a
              website. They help websites keep track of your preferences, understand how visitors interact with the
              site, and provide personalized information or advertisements.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">How We Use Cookies</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="mb-4 leading-relaxed text-zinc-300 text-sm md:text-base">
              At <span className="font-semibold text-red-800">DevilSect</span>, cookies are used in several ways to
              improve your browsing experience:
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li className="leading-relaxed">• To maintain smooth and secure operation of the site</li>
              <li className="leading-relaxed">• To understand how people visit and how to enhance performance</li>
              <li className="leading-relaxed">
                • To store user preferences, such as login sessions or language choices
              </li>
              <li className="leading-relaxed">
                • To provide advertising, including customized ads via Google AdSense and other third-party networks
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Third-Party Cookies</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="mb-4 leading-relaxed text-zinc-300 text-sm md:text-base">
              We work with trusted advertisers, such as Google, who may place their own cookies in your browser when
              you visit <span className="font-semibold text-red-800">DevilSect</span>. These cookies are typically
              used to:
            </p>
            <ul className="mb-4 space-y-2 text-zinc-300">
              <li className="leading-relaxed">• Measure the effectiveness of advertisements</li>
              <li className="leading-relaxed">• Deliver targeted advertising based on your browsing behavior</li>
              <li className="leading-relaxed">• Prevent you from seeing the same ads repeatedly</li>
            </ul>
            <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
              Google, as a third-party provider, uses the DoubleClick DART cookie to deliver personalized ads. You can
              learn more or opt out of personalized advertising at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-800 underline transition-colors hover:text-red-900"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Your Choices</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="mb-4 leading-relaxed text-zinc-300 text-sm md:text-base">
              You have control over how cookies are used on your device. Most browsers allow you to accept or reject
              cookies, remove them, or set alerts when cookies are placed.
            </p>
            <div className="mb-4 rounded-lg border border-primary bg-primary/10 p-4">
              <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                <strong className="text-red-800">Please note:</strong> enabling cookies ensures the best browsing
                experience, while disabling them may limit certain features of{" "}
                <span className="font-semibold text-red-800">DevilSect</span>.
              </p>
            </div>
            <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
              You can also opt out of personalized advertising from Google and other networks through recognized
              industry platforms such as{" "}
              <a
                href="https://optout.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-800 underline transition-colors hover:text-red-900"
              >
                YourAdChoices
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Updates to This Policy</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
              We may revise this Cookies Policy to reflect new technologies, advertising practices, or legal
              requirements. When updates are made, the "Last Updated" date at the top of this page will be changed
              accordingly.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Questions About Cookies?</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
              If you have any questions about how we use cookies, please contact us at{" "}
              <a
                href="mailto:contact@devilsect.com"
                className="font-semibold text-red-800 underline transition-colors hover:text-red-900"
              >
                contact@devilsect.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

export default CookiesPolicyPage;
