import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsAndConditionsPage() {
  return (
    <main className="container px-4 py-12 md:px-6">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-[#d4a373]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Terms and Conditions</h1>
        <div className="prose max-w-none">
          <h2>Introduction</h2>
          <p>
            Welcome to Nutra Nexus. These Terms and Conditions govern your use of our website and the purchase and use
            of our products. By accessing our website or purchasing our products, you agree to be bound by these Terms
            and Conditions and our Privacy Policy.
          </p>
          <p>
            Please read these terms carefully before using our services. If you do not agree with any part of these
            terms, please do not use our website or purchase our products.
          </p>

          <h2>1. Use of the Website</h2>
          <ul>
            <li>
              You must be at least 18 years old or accessing the site under the supervision of a parent or guardian.
            </li>
            <li>You agree to use the website for lawful purposes only.</li>
            <li>
              Any use of automated systems or software to extract data from this website for commercial purposes is
              prohibited.
            </li>
            <li>
              We reserve the right to restrict access to certain areas of the website, or the entire website, at our
              discretion without notice.
            </li>
          </ul>

          <h2>2. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is the property of Nutra
            Nexus and protected by applicable copyright and trademark laws.
          </p>
          <p>You may not reproduce, distribute, or exploit any content without our prior written permission.</p>

          <h3>Permitted Use</h3>
          <p>
            You may view, download, and print content from our website for your personal, non-commercial use only,
            provided that:
          </p>
          <ul>
            <li>You do not remove any copyright or other proprietary notices</li>
            <li>You do not modify the content</li>
            <li>
              You do not use the content in a way that suggests an association with our products, services, or brand
            </li>
          </ul>

          <h2>3. User Accounts</h2>
          <p>When you create an account with us, you must provide accurate information.</p>
          <p>
            You are responsible for safeguarding your account login credentials and for all activity under your account.
          </p>

          <h3>Account Security</h3>
          <p>You agree to:</p>
          <ul>
            <li>Maintain the confidentiality of your password</li>
            <li>Update your information promptly if there are any changes</li>
            <li>Notify us immediately of any unauthorized use of your account or any other breach of security</li>
          </ul>
          <p>
            We reserve the right to disable any user account at any time if, in our opinion, you have failed to comply
            with any of the provisions of these Terms and Conditions.
          </p>

          <h2>4. Product/Service Information</h2>
          <p>
            We make every effort to display accurate information about our products/services, but we do not guarantee
            that descriptions, prices, or availability are free of errors.
          </p>
          <p>We reserve the right to modify or discontinue any product or service without notice.</p>

          <h3>Product Quality and Safety</h3>
          <p>
            While we strive to ensure the highest quality of our products, individual results may vary. Our products are
            not intended to diagnose, treat, cure, or prevent any disease. Always consult with a healthcare professional
            before using our products if you have any medical conditions or concerns.
          </p>

          <h2>5. Payments and Billing</h2>
          <p>All payments must be made through secure and authorized payment gateways.</p>
          <p>We reserve the right to refuse or cancel any order at our discretion.</p>

          <h3>Cancellation Policy:</h3>
          <ul>
            <li>
              If you cancel your order within 1–2 days of placing it, you will be eligible for a refund within 6–7
              working days to the original payment method. To cancel your order, please contact us or email us directly.
            </li>
            <li>
              If you cancel your order after 1–2 days of placing it, you will not be eligible for an automatic refund.
              In such cases, you must contact our customer service team for assistance and further clarification.
            </li>
          </ul>

          <h3>Pricing</h3>
          <p>
            All prices are in Indian Rupees (₹) and include applicable taxes unless otherwise stated. Shipping costs are
            calculated at checkout based on your delivery location.
          </p>
          <p>We reserve the right to change prices at any time without prior notice.</p>

          <h2>6. Returns and Refunds</h2>
          <p>Please note that returns are not accepted.</p>
          <p>Refunds will be issued to the original method of payment after inspection.</p>

          <h3>Damaged Products</h3>
          <p>
            If your product arrives damaged or defective, please contact our customer service team within 24 hours of
            receiving your order. We will require photographic evidence of the damage before processing any refund or
            replacement.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential damages arising out of your use of the
            website.
          </p>
          <p>
            Our total liability is limited to the amount you paid to us, if any, for the services/products purchased.
          </p>

          <h3>Disclaimers</h3>
          <p>
            Our website and products are provided on an "as is" and "as available" basis without any representations or
            warranties, express or implied.
          </p>
          <p>We do not warrant that:</p>
          <ul>
            <li>The website will always be available or uninterrupted</li>
            <li>The information on our website is complete, true, accurate, or non-misleading</li>
            <li>The website or any content will be secure or free from bugs or viruses</li>
          </ul>

          <h2>8. Third-Party Links</h2>
          <p>
            This website may contain links to third-party websites. We are not responsible for the content or privacy
            practices of these sites.
          </p>
          <p>
            These links are provided for your convenience only. We have no control over the contents of those sites and
            accept no responsibility for them or for any loss or damage that may arise from your use of them.
          </p>

          <h2>9. Privacy Policy</h2>
          <p>
            Please refer to our Privacy Policy for information on how we collect, use, and protect your personal
            information.
          </p>
          <p>Our Privacy Policy is incorporated into these Terms and Conditions by reference.</p>

          <h2>10. Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. Changes will be posted on this page with the
            updated effective date.
          </p>
          <p>
            Your continued use of our website after we post any modifications to the Terms and Conditions will
            constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified
            Terms and Conditions.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about these Terms and Conditions, you can contact us at:</p>
          <p>
            Nutra Nexus
            <br />
            1-84/A, street no.1, Kakatiya Nagar
            <br />
            Habsiguda, Hyderabad, 500007
            <br />
            India
          </p>
          <p>
            Email: organicnutranexus@gmail.com
            <br />
            Phone: +91 9121794768
          </p>

          <p className="text-sm text-muted-foreground mt-8">Last Updated: March 15, 2023</p>
        </div>
      </div>
    </main>
  )
}
