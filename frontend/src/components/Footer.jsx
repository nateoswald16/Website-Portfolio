import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      id="contact"
      className="footer-custom"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-content">
        {/* Contact Section */}
        <motion.div
          className="footer-contact-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="footer-contact-heading">Get In Touch</h2>
          <p className="footer-contact-text">
            I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to reach out!
          </p>
          <motion.a
            href="mailto:nateoswald16@gmail.com"
            className="footer-contact-button"
            whileTap={{ scale: 0.95 }}
            aria-label="Send email to Nate Oswald"
          >
            nateoswald16@gmail.com
          </motion.a>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="footer-copyright"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="footer-text">
            © {currentYear} Nate Oswald. All rights reserved.
          </p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.div
          className="footer-back-to-top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.a
            href="#hero"
            className="footer-link"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Return to top of page"
          >
            <span>Back to top</span>
            <ExternalLink size={16} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
}
