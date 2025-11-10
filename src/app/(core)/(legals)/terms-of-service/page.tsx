/* eslint-disable react/no-unescaped-entities */
import PageHeader from "@/components/page-header";
import { generateBreadcrumbJsonLDSchema } from "@/lib/json-ld/bread-crumb-schema";
import { Scale } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service of our website",
};

const TermsOfServicePage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLDSchema("Terms Of Service", "/terms-of-service")).replace(/</g, '\\u003c'),
        }}
      />
      <PageHeader
        icon={Scale}
        title="Terms of Service"
        description="Important, please read these online terms of use carefully."
        descriptionClassName="text-sm md:text-base max-w-3xl"
      />
      <div className="space-y-8">
        <section className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
          <p className="text-sm md:text-base leading-relaxed text-zinc-300">
            Welcome to <span className="text-red-800 font-semibold">devilsect.com</span>.
            <span className="text-red-800 font-semibold"> DevilSect</span>(hereafter referred to as "<span className="text-red-800 font-semibold">DevilSect</span>", "we", "us", or "our") provides
            a platform for online courses (collectively, the "Services"), which Services are accessible at
            <span className="text-red-800 font-semibold"> devilsect.com</span> and any other websites through which <span className="text-red-800 font-semibold"><span className="text-red-800 font-semibold"> DevilSect</span></span> makes the Services available (collectively,
            the "Site").
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-zinc-300">
            The Site and Services are offered to you conditioned on your acceptance without modification of the terms,
            conditions, and notices contained herein (the "Terms"). Your use of the Site and Services constitutes your
            agreement to all such Terms. Please read these terms carefully, and keep a copy of them for your
            reference. We reserve the right to update or modify these Terms at any time without prior notice to you,
            and your continued use of the Site following <span className="text-red-800 font-semibold"> DevilSect</span>'s posting of any changes will constitute your
            acceptance of such changes or modifications. We encourage you to review these Terms whenever you use the
            Site.
          </p>
        </section>

        <section>
          <Link href="/privacy-policy"><h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Privacy</h2></Link>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              Your use of the Site and Services are subject to <Link href="/privacy-policy" className="text-red-800 font-semibold underline"> DevilSect 's Privacy Policy</Link>. Please review our Privacy
              Policy, which also governs the Site and informs users of our data collection practices. <span className="text-red-800 font-semibold"> DevilSect</span> does
              not knowingly collect, either online or offline, personal information from persons under the age of 13.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Eligibility</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              The Site and Services are intended solely for persons who are 18 or older. Any access to or use of the
              Site or Services by anyone under 18 is expressly prohibited. By accessing or using the Site or Services
              you represent and warrant that you are 18 or older. As a condition of your use of the Service, you agree
              to (a) provide <span className="text-red-800 font-semibold"> DevilSect</span> with true, accurate, current and complete information as prompted by the
              <span className="text-red-800 font-semibold"> DevilSect</span> registration forms, when registering for or using the Service and (b) update and maintain the
              truthfulness, accuracy and completeness of such information.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Your Account</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              If you use the Site or Services, you are responsible for maintaining the confidentiality of your account
              and password and for restricting access to your computer, and you agree to accept responsibility for all
              activities that occur under your account or password. You may not assign or otherwise transfer your
              account to any other person or entity. You acknowledge that <span className="text-red-800 font-semibold"> DevilSect</span> is not responsible for third-party
              access to your account that results from theft or misappropriation of your account. <span className="text-red-800 font-semibold"> DevilSect</span> and its
              associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit content
              in our sole discretion.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Links to Third Party Sites/Third Party Services</h2>
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              The Site and Services contain links to other websites ("Linked Sites"). The Linked Sites are not under
              the control of <span className="text-red-800 font-semibold"> DevilSect</span> and <span className="text-red-800 font-semibold"> DevilSect</span> assumes no responsibility for, the content, privacy policies, or
              practices of any third-party websites, and you access and use these websites solely at your own risk.
              <span className="text-red-800 font-semibold"> DevilSect</span> is providing these links to you only as a convenience, and the inclusion of any link does not
              imply endorsement by <span className="text-red-800 font-semibold"> DevilSect</span> of the site or any association with its operators. By using the Site or
              Services, you expressly relieve <span className="text-red-800 font-semibold"> DevilSect</span> from any and all liability arising from your use of any
              third-party website and from any loss or damage of any sort you may incur from dealing with any third
              party. It is up to you to take appropriate precautions to ensure that any website you visit is free of
              destructive items such as worms or viruses. We encourage you to be aware when you leave the Site and to
              read the terms and conditions of use for each other website that you visit.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              Certain services made available via the Site or Services are delivered by third-party sites and
              organizations. By using any product, service or functionality originating from the Site, you hereby
              acknowledge and consent that <span className="text-red-800 font-semibold"> DevilSect</span> may share such information and data with any third party with
              whom <span className="text-red-800 font-semibold"> DevilSect</span> has a contractual relationship to provide the requested product, service or functionality
              on behalf of users and customers of the Site or Services.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">No Unlawful or Prohibited Use/Intellectual Property</h2>
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              You are granted a non-exclusive, non-transferable, revocable license to access and use the Site and
              Services strictly in accordance with these terms of use. As a condition of your use of the Site, you
              warrant to <span className="text-red-800 font-semibold"> DevilSect</span> that you will not use the Site for any purpose that is unlawful or prohibited by
              these Terms.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              All content included as part of the Site and Services, such as text, graphics, logos, images, as well as
              the compilation thereof, and any software used on the Site or in the Application, is the property of
              <span className="text-red-800 font-semibold"> DevilSect</span>, its suppliers or third-parties and protected by trademark, copyright and other laws that
              protect intellectual property and proprietary rights. You agree to observe and abide by all trademark,
              copyright and other proprietary notices, legends or other restrictions contained in any such content and
              will not make any changes thereto, including without limitation altering any proprietary rights or
              attribution notices in any such content. Access to the Site and Services does not authorize anyone to
              use any of <span className="text-red-800 font-semibold"> DevilSect</span>'s names, logos or marks, including without limitation the <span className="text-red-800 font-semibold"> DevilSect</span> trademark or
              logo, or any other intellectual property in any manner. The content on the Site may be used only as an
              information resource, and <span className="text-red-800 font-semibold"> DevilSect</span> content is not for resale. You will use protected content solely for
              your personal, non-commercial use, and will make no other use of the content without the express written
              permission of <span className="text-red-800 font-semibold"> DevilSect</span> and the copyright owner. You agree that you do not acquire any ownership rights
              in any protected content. We do not grant you any licenses, express or implied, to the intellectual
              property of <span className="text-red-800 font-semibold"> DevilSect</span> or our licensors except as expressly authorized by these Terms. Any other use,
              including the reproduction, modification, distribution, transmission, republication, display, or
              performance, of the content on the Site is strictly prohibited.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              Further, in your use of the Site and Services, you may not:
            </p>
            <ul className="text-sm md:text-base ml-6 space-y-2 text-zinc-300">
              <li className="leading-relaxed">
                • modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative
                works, or in any way exploit any of the content, in whole or in part, found on the Site or the
                Application;
              </li>
              <li className="leading-relaxed">
                • use web crawlers, web robots, web scutters, ants, automatic indexers, bots, worms, and other such
                devices in connection with the Site; provided, however, that general purpose Internet search engines
                and non-commercial public archives that use tools to gather information for the sole purpose of
                displaying hyperlinks to the Site are granted a limited exception from the foregoing exclusion,
                provided that they do so from a stable IP address or range of IP addresses using an
                easily-identifiable agent;
              </li>
              <li className="leading-relaxed">
                • use the Site in any manner that could damage, disable, overburden, or impair the Site or interfere
                with any other party's use of the Site;
              </li>
              <li className="leading-relaxed">
                • obtain or attempt to obtain any content through any means not intentionally made available or
                provided for through the Site;
              </li>
              <li className="leading-relaxed">
                • remove, modify, disable, block, obscure or otherwise impair any advertising in connection with the
                Site;
              </li>
              <li className="leading-relaxed">
                • collect personally identifiable information of other users or visitors;
              </li>
              <li className="leading-relaxed">
                • harvest information about users for the purpose of sending, or to facilitate or encourage the
                sending of, unsolicited bulk or other communications; or
              </li>
              <li className="leading-relaxed">
                • post or transmit any worms, viruses, Trojans, or other harmful, disruptive, or destructive files,
                code, or programs to the Site.
              </li>
            </ul>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="text-red-800 font-semibold"> DevilSect</span> will fully cooperate with any law enforcement authorities or court order requesting or
              directing <span className="text-red-800 font-semibold"> DevilSect</span> to disclose the identity of anyone violating these Terms.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              In its sole discretion, in addition to any other rights or remedies available to and without any
              liability whatsoever, <span className="text-red-800 font-semibold"> DevilSect</span> may at any time and without notice may terminate or restrict your access
              to any component of the Site.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Electronic Communications/Notice</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              Visiting or using the Site or Services or sending emails to <span className="text-red-800 font-semibold"> DevilSect</span> constitutes electronic
              communications. You consent to receiving electronic communications, and you agree that all agreements,
              notices, disclosures and other communications that we provide to you electronically, via email or by
              posting the notices on the Site satisfy any legal requirement that such communications be in writing.
              All notices to <span className="text-red-800 font-semibold"> DevilSect</span> will be provided by sending an email to contact@devilsect.com. Such notices
              will be deemed delivered upon the earlier of the verification of delivery or two (2) business days after
              being sent.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Use of Communication Services</h2>
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              The Site may contain bulletin board services, blogs, chat areas, news groups, forums, communities,
              personal web pages, calendars, and/or other message or communication facilities designed to enable you
              to communicate with the public at large or with a group (collectively, "Communication Services"), you
              agree to use the Communication Services only to post, send and receive messages and material that are
              proper and related to the particular Communication Service.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              By way of example, and not as a limitation, you agree that when using a Communication Service, you will
              not:
            </p>
            <ul className="text-sm md:text-base ml-6 space-y-2 text-zinc-300">
              <li className="leading-relaxed">
                • defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as rights of
                privacy and publicity) of others;
              </li>
              <li className="leading-relaxed">
                • publish, post, upload, distribute or disseminate any inappropriate, profane, defamatory, infringing,
                obscene, indecent or unlawful topic, name, material or information;
              </li>
              <li className="leading-relaxed">
                • upload files that contain software or other material protected by intellectual property laws (or by
                rights of privacy of publicity) unless you own or control the rights thereto or have received all
                necessary consents;
              </li>
              <li className="leading-relaxed">
                • upload files that contain viruses, corrupted files, or any other similar software or programs that
                may damage the operation of another's computer;
              </li>
              <li className="leading-relaxed">
                • advertise or offer to sell or buy any goods or services for any business purpose, unless such
                Communication Service specifically allows such messages;
              </li>
              <li className="leading-relaxed">
                • conduct or forward surveys, contests, pyramid schemes or chain letters;
              </li>
              <li className="leading-relaxed">
                • download any file posted by another user of a Communication Service that you know, or reasonably
                should know, cannot be legally distributed in such manner;
              </li>
              <li className="leading-relaxed">
                • falsify or delete any author attributions, legal or other proper notices or proprietary designations
                or labels of the origin or source of software or other material contained in a file that is uploaded,
                restrict or inhibit any other user from using and enjoying the Communication Services;
              </li>
              <li className="leading-relaxed">
                • violate any code of conduct or other guidelines which may be applicable for any particular
                Communication Service;
              </li>
              <li className="leading-relaxed">
                • harvest or otherwise collect information about others, including e-mail addresses, without their
                consent; or
              </li>
              <li className="leading-relaxed">• violate any applicable laws or regulations.</li>
            </ul>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="text-red-800 font-semibold"> DevilSect</span> has no obligation to monitor the Communication Services. However, <span className="text-red-800 font-semibold"> DevilSect</span> reserves the right
              to review materials posted to a Communication Service and to remove any materials in its sole
              discretion. <span className="text-red-800 font-semibold"> DevilSect</span> reserves the right to terminate your access to any or all of the Communication
              Services at any time without notice for any reason whatsoever.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="text-red-800 font-semibold"> DevilSect</span> reserves the right at all times to disclose any information as necessary to satisfy any
              applicable law, regulation, legal process or governmental request, or to edit, refuse to post or to
              remove any information or materials, in whole or in part, in <span className="text-red-800 font-semibold"> DevilSect</span>'s sole discretion.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              Always use caution when giving out any personally identifying information about yourself or your
              children in any Communication Service. <span className="text-red-800 font-semibold"> DevilSect</span> does not control or endorse the content, messages or
              information found in any Communication Service and, therefore, <span className="text-red-800 font-semibold"> DevilSect</span> specifically disclaims any
              liability with regard to the Communication Services and any actions resulting from your participation in
              any Communication Service. Managers and hosts are not authorized <span className="text-red-800 font-semibold"> DevilSect</span> spokespersons, and their
              views do not necessarily reflect those of <span className="text-red-800 font-semibold"> DevilSect</span>.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              Materials uploaded to a Communication Service may be subject to posted limitations on usage,
              reproduction and/or dissemination. You are responsible for adhering to such limitations if you upload
              the materials.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">
            Materials Provided to DevilSect or Posted on Any DevilSect Web Page
          </h2>
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="text-red-800 font-semibold"> DevilSect</span> does not claim ownership of the materials you provide to <span className="text-red-800 font-semibold"> DevilSect</span> (including feedback and
              suggestions) or post, upload, input or submit to any <span className="text-red-800 font-semibold"> DevilSect</span> Site or our associated services
              (collectively "Submissions"). However, by posting, uploading, inputting, providing or submitting your
              Submissions you are granting <span className="text-red-800 font-semibold"> DevilSect</span>, our affiliated companies and necessary sublicensees an
              irrevocable, perpetual, non-exclusive, fully paid, worldwide license to use your Submissions in
              connection with the operation of the Site or Services or our affiliated companies' Internet businesses
              including, without limitation, the rights to: copy, distribute, transmit, publicly display, publicly
              perform, reproduce, edit, translate and reformat your Submissions; and to publish or refrain from
              publishing your name in connection with your Submissions.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              No compensation will be paid with respect to the use of your Submissions, as provided herein. <span className="text-red-800 font-semibold"> DevilSect</span>
              is under no obligation to post or use any Submissions you may provide and may remove any Submissions at
              any time in <span className="text-red-800 font-semibold"> DevilSect</span>'s sole discretion.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              By posting, uploading, inputting, providing or submitting your Submissions, you warrant and represent
              that you own or otherwise control all of the rights to your Submissions as described in this Section
              including, without limitation, all the rights necessary for you to provide, post, upload, input or
              submit the Submissions and the rights granted to <span className="text-red-800 font-semibold"> DevilSect</span> herein.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">No Endorsement</h2>
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="text-red-800 font-semibold"> DevilSect</span> does not endorse any of the courses about which information is provided via the Site or
              Services. You are responsible for determining the identity and suitability of others whom you contact
              via the Site or Services. We will not be responsible for any damage or harm resulting from your
              interactions with any online course providers. Your dealings with online course providers and any other
              terms, conditions, representations or warranties associated with such dealings, are between you and such
              online course providers exclusively and do not involve <span className="text-red-800 font-semibold"> DevilSect</span>. You should make whatever investigation
              or other resources that you deem necessary or appropriate before signing up for any online courses.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              By using the Site or Services, you agree that any legal remedy or liability that you seek to obtain for
              actions or omissions of any online course providers or other third parties will be limited to a claim
              against the particular online course providers or other third parties who caused you harm, and you agree
              not to attempt to impose liability on, or seek any legal remedy from <span className="text-red-800 font-semibold"> DevilSect</span> with respect to such
              actions or omissions and hereby release <span className="text-red-800 font-semibold"> DevilSect</span> from any and all liability for or relating to any
              interactions or dealings with online course providers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">International Users</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              The Site and Services are controlled, operated and administered by <span className="text-red-800 font-semibold"> DevilSect</span> from our offices within
              Brazil. If you access the Site or Services from a location outside Brazil, you are responsible for
              compliance with all local laws. You agree that you will not use the <span className="text-red-800 font-semibold"> DevilSect</span> content accessed through
              the Site or Services in any country or in any manner prohibited by any applicable laws, restrictions or
              regulations.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Delays</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              The Site or Services may be subject to limitations, delays and other problems inherent in the use of the
              Internet and electronic communications. <span className="text-red-800 font-semibold"> DevilSect</span> is not responsible for any delays, failures or other
              damage resulting from such problems.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Indemnification</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              You agree to indemnify, defend and hold harmless <span className="text-red-800 font-semibold"> DevilSect</span>, its officers, directors, employees, agents
              and third parties, for any losses, costs, liabilities and expenses (including reasonable attorneys'
              fees) relating to or arising out of your use of or inability to use the Site or Services; any user
              postings made by you; your violation of these Terms; your violation of any rights of a third party; or
              your violation of any applicable laws, rules or regulations. <span className="text-red-800 font-semibold"> DevilSect</span> reserves the right, at its own
              cost and sole discretion, to assume the exclusive defense and control of any matter otherwise subject to
              indemnification by you, in which event you will fully cooperate with <span className="text-red-800 font-semibold"> DevilSect</span> in asserting any
              available defenses.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Warranty and Liability Disclaimer</h2>
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              The information, software, products, and services included in or available through the Site or Services
              may include inaccuracies or typographical errors. Changes are periodically added to the information
              herein. <span className="text-red-800 font-semibold"> DevilSect</span> and/or its suppliers may make improvements and/or changes in the site at any time.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="text-red-800 font-semibold"> DevilSect</span> and/or its suppliers make no representations about the suitability, reliability, availability,
              timeliness, and accuracy of the information, software, products, services and related graphics contained
              on the site for any purpose. To the maximum extent permitted by applicable law, all such information,
              software, products, services and related graphics are provided "as is" without warranty or condition of
              any kind. <span className="text-red-800 font-semibold"> DevilSect</span> and/or its suppliers hereby disclaim all warranties and conditions with regard to
              this information, software, products, services and related graphics, including all implied warranties or
              conditions of merchantability, fitness for a particular purpose, title and non-infringement.
            </p>
            <div className="rounded-lg border border-accent/80 bg-primary/10 p-4">
              <p className="font-medium text-sm md:text-base leading-relaxed text-red-800">
                YOU EXPRESSLY UNDERSTAND AND AGREE THAT DEVILSECT WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT,
                INCIDENTAL, SPECIAL, PUNITIVE, COMPENSATORY, CONSEQUENTIAL OR EXEMPLARY DAMAGES (EVEN IF DEVILSECT HAS
                BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES) (COLLECTIVELY, "DAMAGES"), RESULTING FROM: (A) THE
                USE OR INABILITY TO USE THE SERVICE; (B) THE COST OF ANY GOODS AND/OR SERVICES PURCHASED OR OBTAINED
                AS A RESULT OF THE USE OF THE SERVICE; (C) DISCLOSURE OF, UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR
                INFORMATION OR CONTENT; (D) CONTENT YOU SUBMIT, RECEIVE, ACCESS, TRANSMIT OR OTHERWISE CONVEY THROUGH
                THE SERVICE; (E) STATEMENTS OR CONDUCT OF ANY ONLINE COURSE PROVIDERS OR OTHER THIRD PARTY THROUGH THE
                SERVICE; (F) ANY OTHER MATTER RELATING TO THE SERVICE; (G) ANY BREACH OF THIS AGREEMENT BY DEVILSECT
                OR THE FAILURE OF DEVILSECT TO PROVIDE THE SERVICE UNDER THIS AGREEMENT OR (H) ANY OTHER DEALINGS OR
                INTERACTIONS YOU HAVE WITH ANY ONLINE COURSE PROVIDERS (OR ANY OF THEIR REPRESENTATIVES OR AGENTS).
                THESE LIMITATIONS SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW.
              </p>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              In some jurisdictions, limitations of liability are not permitted. In such jurisdictions, some of the
              foregoing limitations may not apply to You.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Termination/Access Restriction</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="text-red-800 font-semibold"> DevilSect</span> reserves the right, in its sole discretion, to terminate your access to the Site and Services
              and the related services or any portion thereof at any time, without notice.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Governing Law/Dispute Resolution</h2>
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              To the maximum extent permitted by law, this agreement is governed by the laws of the State of
              Washington and you hereby consent to the exclusive jurisdiction and venue of courts in Washington in all
              disputes arising out of or relating to the use of the Site. Use of the Site and Services is unauthorized
              in any jurisdiction that does not give effect to all provisions of these Terms, including, without
              limitation, this Section. <span className="text-red-800 font-semibold"> DevilSect</span>'s performance of this agreement is subject to existing laws and
              legal process, and nothing contained in this agreement is in derogation of <span className="text-red-800 font-semibold"> DevilSect</span>'s right to comply
              with governmental, court and law enforcement requests or requirements relating to your use of the Site
              or Services or information provided to or gathered by <span className="text-red-800 font-semibold"> DevilSect</span> with respect to such use.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              Except for claims for injunctive or equitable relief or claims regarding intellectual property rights
              (which may be brought in any competent court without the posting of a bond), any dispute arising under
              these Terms shall be finally settled in accordance with the Comprehensive Arbitration Rules of the
              Judicial Arbitration and Mediation Service, Inc. ("JAMS") by a single arbitrator appointed in accordance
              with such Rules. The arbitration shall take place in King County, Washington, in the English language
              and the arbitral decision may be enforced in any court in any jurisdiction. The prevailing party in any
              action or proceeding to enforce these Terms shall be entitled to costs and attorneys' fees.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">No Joint Venture</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              You agree that no joint venture, partnership, employment, or agency relationship exists between you and
              <span className="text-red-800 font-semibold"> DevilSect</span> as a result of this agreement or use of the Site or Services.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Entire Agreement</h2>
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              Unless otherwise specified herein, this agreement constitutes the entire agreement between you and
              <span className="text-red-800 font-semibold"> DevilSect</span> with respect to the Site or Services and it supersedes all prior or contemporaneous
              communications and proposals, whether electronic, oral or written, between the user and <span className="text-red-800 font-semibold"> DevilSect</span> with
              respect to the Site. A printed version of this agreement and of any notice given in electronic form
              shall be admissible in judicial or administrative proceedings based upon or relating to this agreement
              to the same extent and subject to the same conditions as other business documents and records originally
              generated and maintained in printed form. It is the express wish to the parties that this agreement and
              all related documents be written in English.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law
              including, but not limited to, the warranty disclaimers and liability limitations set forth above, then
              the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that
              most closely matches the intent of the original provision and the remainder of the agreement shall
              continue in effect. These Terms will be binding upon and will inure to the benefit of the parties, their
              successors and permitted assigns.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Changes to Terms</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="text-red-800 font-semibold"> DevilSect</span> reserves the right, in its sole discretion, to change the Terms under which the Site and
              Services are offered, and such modification(s) will be effective immediately upon being posted on our
              Site (<span className="text-red-800 font-semibold">devilsect.com</span>). The most current version of the Terms will supersede all previous versions.
              <span className="text-red-800 font-semibold"> DevilSect</span> encourages you to periodically review the Terms to stay informed of our updates. Your
              continued use of the Site or Services after such modifications will be deemed to be your conclusive
              acceptance of all modifications to this Agreement. If you are dissatisfied as a result of such
              modification(s), your only recourse is to immediately discontinue use of the Site or Services.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg md:text-2xl font-bold text-white">Contact Us</h2>
          <div className="rounded-lg border border-zinc-800 bg-secondary/10 p-6 backdrop-blur-sm">
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="text-red-800 font-semibold"> DevilSect</span> welcomes your questions or comments regarding the Terms by emailing us at{" "}
              <a href="mailto:contact@devilsect.com" className="text-red-500 hover:text-red-400 transition-colors">
                contact@devilsect.com
              </a>
              .
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-accent/80 bg-primary/10 p-6">
          <p className="leading-relaxed text-red-800 text-sm md:text-base">
            IF YOU DO NOT AGREE TO ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU MUST NOT USE THE SERVICE. BY
            USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THE TERMS AND CONDITIONS OF THIS
            AGREEMENT AND YOU AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.
          </p>
        </section>
      </div>
    </>
  )
}

export default TermsOfServicePage;
