import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
            Terms of Service
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Last Updated: April 2025
            </p>

            <div className="mt-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p>
                  Welcome to Izzy AI. These Terms of Service ("Terms") govern your use of the Izzy AI platform, a student-developed educational preview project.
                </p>
                <p className="mt-4">
                  By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the service.
                </p>
                <p className="mt-4">
                  <strong>Important:</strong> Izzy AI is an educational project developed by Henry Kobutra as part of the Spring 2025 Deep Learning course at Houston Community College System (HCCS), and is not a commercial service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Educational Project Disclaimer</h2>
                <p>
                  Izzy AI is developed as an <strong>Educational Preview</strong> for academic purposes. This has several important implications:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>The service is provided "as is" without any warranties of any kind</li>
                  <li>Service availability is limited to the duration of the educational project and AI credit allocation</li>
                  <li>Features may be experimental and subject to change or termination without notice</li>
                  <li>The system is not intended to replace professional career advice or official interview preparation</li>
                  <li>Maintenance of the service beyond the Spring 2025 term is not guaranteed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
                <p>
                  Izzy AI provides AI-powered interview preparation assistance including:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Profile analysis to understand your background and skills</li>
                  <li>Interview strategy development based on your career goals</li>
                  <li>Mock interview practice sessions</li>
                  <li>Feedback and performance evaluation</li>
                  <li>Iterative improvement suggestions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
                <p>
                  When you create an account with Izzy AI, you agree to:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account and password</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <p className="mt-4">
                  I reserve the right to terminate accounts or refuse service at my discretion, particularly in cases of abuse, violation of these Terms, or behavior that could harm the platform or other users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
                <p>
                  When using Izzy AI, you agree not to:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Use the service for any illegal purposes</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Attempt to gain unauthorized access to any part of the service</li>
                  <li>Upload or transmit malware or harmful code</li>
                  <li>Interfere with or disrupt the integrity of the service</li>
                  <li>Collect user data without permission</li>
                  <li>Use the service to generate harmful or unethical content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p>
                  The Izzy AI platform, including but not limited to its code, design, functionality, and AI models, is developed as an academic project. All intellectual property rights related to the platform itself are retained by the developer.
                </p>
                <p className="mt-4">
                  Content you create or upload to the platform (such as your profile information and interview responses) remains your property. However, you grant me a license to use, process, and analyze this content for the purposes of providing and improving the service as part of the educational project.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p>
                  As an educational project:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Izzy AI is provided "as is" without warranties of any kind</li>
                  <li>I am not liable for any damages arising from your use of the service</li>
                  <li>I do not guarantee that the service will be uninterrupted, secure, or error-free</li>
                  <li>The advice, feedback, and content generated by the AI system should not be considered professional career advice</li>
                  <li>I am not responsible for any career decisions made based on interactions with the platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Service Modifications</h2>
                <p>
                  As an educational project, I reserve the right to:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Modify or discontinue the service at any time without notice</li>
                  <li>Change features as part of the learning and development process</li>
                  <li>Terminate the service when AI credits are depleted or at the end of the academic term</li>
                </ul>
                <p className="mt-4">
                  I will strive to notify users of significant changes when possible, but as a student project, this cannot be guaranteed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
                <p>
                  I may update these Terms from time to time as the educational project evolves. The most current version will always be posted on this page. Your continued use of the service after any changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Connection to Educational Course</h2>
                <p>
                  Izzy AI is developed as part of the Spring 2025 Deep Learning course at HCCS, instructed by Prof. Patricia McManus. This project demonstrates the practical application of deep learning concepts for educational assessment. The service is provided as a learning experience and may be evaluated as part of course requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p>
                  If you have any questions about these Terms, please contact me:
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
                  Note: Prof. Patricia McManus serves as the academic advisor for this project as part of the course, but is not a point of contact for service inquiries.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Acknowledgment</h2>
                <p>
                  By using Izzy AI, you acknowledge that you have read and understood these Terms and agree to be bound by them. You also acknowledge that this is an educational project with limitations inherent to its nature as coursework, and you use the service with these limitations in mind.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}