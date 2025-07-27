import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <main className="container px-4 py-12 md:px-6">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-[#d4a373]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="lead">
            At Nutra Nexus, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or make a purchase.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you register for an account, make a purchase,
            sign up for our newsletter, respond to a survey, fill out a form, or otherwise communicate with us.
          </p>
          <p>The personal information we collect may include:</p>
          <ul>
            <li>Name, email address, postal address, phone number, and other contact information</li>
            <li>Billing information and payment details</li>
            <li>Account credentials</li>
            <li>Order history and preferences</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide, maintain, and improve our services</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Communicate with you about products, services, offers, and promotions</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize your experience and deliver content relevant to your interests</li>
          </ul>

          <h2>Sharing Your Information</h2>
          <p>We may share your personal information in the following situations:</p>
          <ul>
            <li>With third-party service providers who perform services on our behalf</li>
            <li>With business partners with whom we jointly offer products or services</li>
            <li>
              In connection with, or during negotiations of, any merger, sale of company assets, financing, or
              acquisition
            </li>
            <li>To comply with applicable laws and regulations</li>
            <li>To protect the rights, property, and safety of Nutra Nexus, our customers, and others</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the
            security of any personal information we process. However, please also remember that we cannot guarantee that
            the internet itself is 100% secure.
          </p>

          <h2>Your Choices</h2>
          <p>You have certain choices about how we use your information:</p>
          <ul>
            <li>You can opt out of receiving promotional emails by following the instructions in those emails</li>
            <li>You can update your account information by logging into your account</li>
            <li>You can request access to, correction of, or deletion of your personal information</li>
          </ul>

          <h2>Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain
            information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
            information from children.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            Email: <a href="mailto:organicnutranexus@gmail.com">organicnutranexus@gmail.com</a>
            <br />
            Address: 123 Wellness Way, Mumbai, 400001, India
          </p>

          <p className="text-sm text-muted-foreground mt-8">Last Updated: May 2, 2023</p>
        </div>
      </div>
    </main>
  )
}
