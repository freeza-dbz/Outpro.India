export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 sm:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-h1:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10">
            <h1><b>Privacy Policy</b></h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2><b>1. Introduction</b></h2>
            <p>
              Welcome to Outpro.India. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2><b>2. Information We Collect</b></h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
            </p>
            <p>
              The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following: Name, Email Address, and Contact Data.
            </p>

            <h2><b>3. How We Use Your Information</b></h2>
            <p>
              We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul>
              <li>To facilitate account creation and logon process.</li>
              <li>To post testimonials.</li>
              <li>To manage user accounts.</li>
              <li>To send administrative information to you.</li>
            </ul>

            <h2><b>4. Will Your Information Be Shared With Anyone?</b></h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>

            <h2><b>5. Contact Us</b></h2>
            <p>
              If you have questions or comments about this policy, you may email us at the contact address provided on our contact page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}