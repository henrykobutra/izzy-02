import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Last Updated: April 2025
            </p>

            <div className="mt-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p>
                  This Privacy Policy explains how Izzy AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects information as part of our educational preview. Izzy AI is a student project developed for the Spring 2025 Deep Learning course at Houston Community College System (HCCS).
                </p>
                <p className="mt-4 text-muted-foreground">
                  Effective Date: April 18, 2025. Izzy AI (&quot;Izzy,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (the &quot;Services&quot;). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
                <p className="mt-4">
                  As an educational project, I prioritize transparency and ethical handling of user data. This project is developed and maintained solely by Henry Kobutra as coursework for Prof. Patricia McManus&apos;s Deep Learning class at HCCS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Educational Nature of This Project</h2>
                <p>
                  Izzy AI is an <strong>Educational Preview</strong> created as part of coursework. As such:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>This project may not be maintained beyond the Spring 2025 term</li>
                  <li>We do not guarantee the same level of data protection as commercial services</li>
                  <li>The service will remain available only until allocated AI credits are depleted</li>
                  <li>Users should not share highly sensitive personal information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <h3 className="text-xl font-medium mt-6 mb-3">Account Information</h3>
                <p>
                  When you create an account, we may collect:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Email address</li>
                  <li>Username or display name</li>
                  <li>Authentication information (password hash)</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">Profile Information</h3>
                <p>
                  To provide personalized interview preparation, we may collect:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Professional background</li>
                  <li>Skills and experience</li>
                  <li>Career goals</li>
                  <li>Job preferences</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">Usage Data</h3>
                <p>
                  We collect information about how you interact with our service:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Interview practice sessions</li>
                  <li>Feedback and responses</li>
                  <li>Feature usage patterns</li>
                  <li>Time spent on platform</li>
                </ul>
                <p>
                  We may collect information about you in a variety of ways. The information we may collect via the Services depends on the content and materials you use, and includes basic user data provided through the sign-up process (e.g., name, email) and any information you voluntarily provide during interviews, such as your resume details or answers to questions. We don&apos;t store audio or video recordings, only the transcribed text and associated feedback.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
                <p>
                  We use the collected information for:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Providing personalized interview preparation</li>
                  <li>Improving our AI models and educational content</li>
                  <li>Understanding user needs and system performance</li>
                  <li>Academic research and project evaluation</li>
                  <li>Course demonstration and assessment</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
                <p>
                  As an educational project, we may share certain data:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>With HCCS faculty for educational assessment</li>
                  <li>With service providers that help operate our platform</li>
                  <li>As required by law or to protect rights</li>
                </ul>
                <p className="mt-4">
                  We do not sell or rent your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
                <p>
                  We will retain your information only for as long as necessary for the purposes outlined in this Privacy Policy, and as required for educational evaluation. Given this is a student project, we anticipate retaining data until the conclusion of the Spring 2025 term, after which data may be deleted.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Security</h2>
                <p>
                  While we implement reasonable security measures to protect your information, as an educational project, our security measures may not be as robust as commercial services. Users should consider this limitation when deciding what information to share.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of your personal information</li>
                  <li>Request deletion of your account and associated data</li>
                  <li>Opt out of certain data collection or processing</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact me (Henry Kobutra) at{" "}
                  <Link href="https://github.com/henrykobutra" className="text-primary hover:underline">
                    GitHub
                  </Link>{" "}
                  or{" "}
                  <Link href="https://www.linkedin.com/in/henrykobutra/" className="text-primary hover:underline">
                    LinkedIn
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                <p>
                  Our service may use third-party services for:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Authentication (e.g., OAuth providers)</li>
                  <li>Cloud infrastructure and hosting</li>
                  <li>AI processing capabilities</li>
                </ul>
                <p className="mt-4">
                  These services have their own privacy policies and terms of service. Users should review these policies before using our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy periodically. We will notify users of any significant changes by posting the new Privacy Policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Educational Disclaimer</h2>
                <p>
                  This Privacy Policy is part of an educational project and should not be considered a legally binding document equivalent to commercial service privacy policies. The primary purpose of this document is to demonstrate understanding of privacy considerations in application development as part of educational coursework.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact the sole developer of this project:
                </p>
                <div className="mt-4 pl-6">
                  <strong>Henry Kobutra</strong> (Student Developer)
                  <br />
                  <Link href="https://github.com/henrykobutra" className="text-primary hover:underline">
                    GitHub
                  </Link>{" "}
                  |{" "}
                  <Link href="https://www.linkedin.com/in/henrykobutra/" className="text-primary hover:underline">
                    LinkedIn
                  </Link>
                </div>
                <p className="mt-4">
                  Note: Prof. Patricia McManus serves as the academic advisor for this project as part of the Spring 2025 Deep Learning course at HCCS, but is not a point of contact for privacy inquiries.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}