import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./terms.css";

function Terms() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" className='tiny termsBtn' onClick={handleShow}>
        Terms and Conditions
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Please read these Terms and Conditions carefully before using the LBnB Version 1.0 web application operated by LBnB. These Terms govern your access to and use of the Application. By accessing or using the Application, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Application.
            
            <br/><br/>
            1. Privacy Policy<br/>
            By using the Application, you acknowledge that you have read, understood, and agree to the terms outlined in our Privacy Policy. Please review the Privacy Policy to understand how we collect, use, and protect your personal information.

            <br/><br/>
            2. User Accounts<br/>
            2.1 Account Creation
            To access certain features of the Application, you may need to create a user account. You are responsible for providing accurate and complete information during the account creation process. You must promptly update your account information to keep it accurate and current.

            <br/><br/>
            2.2 Account Security<br/>
            You are responsible for maintaining the security and confidentiality of your account credentials. You agree not to share your account credentials with others or allow unauthorized access to your account. You are solely responsible for all activities that occur under your account.

            <br/><br/>
            3. User Conduct<br/>
            When using the Application, you agree to:
            - Comply with all applicable laws and regulations
            - Respect the rights of other users and LBnB
            - Use the Application for lawful purposes only
            - Refrain from engaging in any harmful or malicious activities, including but not limited to hacking, spreading malware, or attempting to gain unauthorized access to the Application or other users' accounts

            <br/><br/>
            4. Fair Use Policy<br/>
            LBnB implements a Fair Use Policy to ensure fair and equitable usage of the Application's resources. Excessive or abusive usage that negatively impacts the performance or availability of the Application for other users may result in temporary or permanent account suspension or termination. LBnB reserves the right to determine what constitutes excessive or abusive usage.
    
            <br/><br/>
            5. Intellectual Property<br/>
            All intellectual property rights related to the Application, including but not limited to copyrights, trademarks, and patents, belong to LBnB or its licensors. You may not reproduce, modify, distribute, or create derivative works of the Application without our prior written consent.

            <br/><br/>
            6. Limitation of Liability<br/>
            LBnB and its affiliates, officers, directors, employees, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with your use of the Application. This limitation of liability applies to the fullest extent permitted by applicable law.

            <br/><br/>
            7. Indemnification<br/>
            You agree to indemnify and hold LBnB harmless from any claims, losses, damages, liabilities, and expenses arising out of or in connection with your use of the Application, violation of these Terms, or infringement of any rights of third parties.

            <br/><br/>
            8. Modification and Termination<br/>
            LBnB reserves the right to modify, suspend, or terminate the Application or these Terms at any time without prior notice. We may also suspend or terminate your access to the Application if you violate these Terms or engage in any unauthorized activities.

            <br/><br/>
            9. Governing Law and Jurisdiction<br/>
            These Terms shall be governed by and construed in accordance with the laws of Philippines. Any dispute arising out of or in connection with these Terms shall be submitted to the exclusive jurisdiction of the courts of [insert jurisdiction].

            <br/><br/>
            10. Severability<br/>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.

            <br/><br/>
            11. Entire Agreement<br/>
            These Terms, including the Privacy Policy and Fair Use Policy, constitute the entire agreement between you and LBnB regarding your use of the Application and supersede any prior agreements or understandings.

            <br/><br/>
            If you have any questions or concerns about these Terms, please contact us at 09123789456.

            <br/><br/>
            Last updated: June 4, 2023

            <br/><br/><br/>
            PRIVACY POLICY

            <br/><br/>
            This Privacy Policy describes how LBnB Version 1.0 collects, uses, and protects the personal information you provide while using the LBnB web application. By accessing or using the Application, you consent to the collection, use, and storage of your personal information as outlined in this Policy.

            <br/><br/>
            1. Information We Collect<br/>
            1.1 Personal Information<br/>
            When you create a user account or use certain features of the Application, we may collect personal information, including but not limited to:<br/>
            - Your name<br/>
            - Email address<br/>
            - Contact information (phone number, address)<br/>
            - Profile photo<br/>
            - Payment information (if applicable)<br/>
            1.2 Usage Data<br/>
            We may collect non-personal information about your use of the Application, including:<br/>
            - IP address<br/>
            - Device information (type, operating system, browser)<br/>
            - Log files (pages visited, date and time of access)<br/>
            - Cookies and similar technologies<br/>

            <br/><br/>
            2. Use of Information<br/>
            2.1 Personal Information<br/>
            We may use your personal information to:<br/>
            - Provide and improve the Application's services and features<br/>
            - Facilitate communication between users<br/>
            - Process transactions and payments (if applicable)<br/>
            - Send you important notifications and updates<br/>
            - Respond to your inquiries or requests for support<br/>
            - Customize and personalize your experience with the Application<br/>
            - Enforce our terms and conditions and protect our rights and the rights of other users<br/>
            2.2 Usage Data<br/>
            We may use non-personal information for analytical purposes, such as:<br/>
            - Monitoring and analyzing usage patterns and trends<br/>
            - Improving the performance and functionality of the Application<br/>
            - Enhancing user experience and optimizing content<br/>

            <br/><br/>
            3. Data Security<br/>
            We employ industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no data transmission over the internet or electronic storage method is 100% secure. Therefore, we cannot guarantee absolute security of your information.

            <br/><br/>
            4. Data Retention<br/>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required or permitted by law. We will securely delete or anonymize your information when it is no longer needed.

            <br/><br/>
            5. Third-Party Disclosure<br/>
            We do not sell, trade, or transfer your personal information to third parties without your consent, except as necessary for the operation and maintenance of the Application or when required by law.

            <br/><br/>
            6. Cookies and Tracking Technologies<br/>
            We use cookies and similar technologies to enhance your experience, analyze usage patterns, and personalize content. You can manage your cookie preferences through your browser settings.

            <br/><br/>
            7. Children's Privacy<br/>
            LBnB is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to remove the information from our systems.

            <br/><br/>
            8. Changes to the Privacy Policy<br/>
            LBnB reserves the right to modify or update this Privacy Policy at any time. We will notify you of any material changes by posting the updated Policy on the Application. Your continued use of the Application after the changes signifies your acceptance of the revised Privacy Policy.

            <br/><br/>
            9. Contact Us<br/>
            If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us at 09123789456.

            <br/><br/>
            Last updated: June 4, 2023<br/>

            <br/><br/>
            FAIR USE POLICY

            <br/><br/>
            LBnB implements a Fair Use Policy to ensure fair and equitable usage of the Application's resources. By using the Application, you agree to adhere to the following guidelines:

            <br/><br/>
            1. Prohibited Activities<br/>
            1.1 Excessive Usage: Engaging in activities that consume an excessive amount of Application resources, including but not limited to excessive data requests or storage usage, which may impact the performance or availability of the Application for other users.
            1.2 Abuse: Engaging in any activity that compromises the integrity, security, or functionality of the Application or its underlying infrastructure, including but not limited to hacking, unauthorized access attempts, or the distribution of malware.

            <br/><br/>
            2. Usage Monitoring<br/>
            LBnB may monitor your usage of the Application to ensure compliance with the Fair Use Policy. This may include tracking the volume of data requests, storage usage, or other parameters relevant to the fair usage of the Application.

            <br/><br/>
            3. Consequences of Violation<br/>
            If LBnB determines, at its sole discretion, that a user has violated the Fair Use Policy, LBnB may take appropriate action, including but not limited to:<br/>
            3.1 Warning: Issuing a warning to the user, highlighting the violation and providing guidance on appropriate usage.<br/>
            3.2 Temporary Suspension: Temporarily suspending the user's access to the Application for a specific period to rectify the violation.<br/>
            3.3 Account Termination: Terminating the user's account and permanently revoking access to the Application in cases of severe or repeated violations.

            <br/><br/>
            4. Policy Amendments<br/>
            LBnB reserves the right to amend the Fair Use Policy at any time without prior notice. It is your responsibility to review the Fair Use Policy periodically and ensure compliance with the latest version.

            <br/><br/>
            Last updated: June 4, 2023</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Terms;