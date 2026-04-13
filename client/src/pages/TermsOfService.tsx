export default function TermsOfService() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 sm:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-h1:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10">
            <h1><b>Terms of Service</b></h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2><b>1. Agreement to Terms</b></h2>
            <p>
              By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2><b>2. User Accounts</b></h2>
            <p>
              When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>

            <h2><b>3. Intellectual Property</b></h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Outpro.India and its licensors.
            </p>

            <h2><b>4. Limitation of Liability</b></h2>
            <p>
              In no event shall Outpro.India, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2><b>5. Governing Law</b></h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>

            <h2><b>6. Contact Us</b></h2>
            <p>
              If you have any questions about these Terms, please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}