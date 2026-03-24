import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="app-container section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <h1 className="display-4 fw-bold">
        About <span style={{ color: "var(--primary-color)" }}>Me</span>
      </h1>

      {/* About Me Section */}
      <div className="mt-5" style={{ maxWidth: "65%", paddingRight: "0" }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p style={{ color: "var(--text-primary)", textAlign: "left", lineHeight: "1.8", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
            I am an aspiring full-stack developer with a background in hospitality and sales, bringing a unique perspective to building software that prioritizes both user experience and business impact. Through my experience in customer-focused industries, I developed a strong understanding of how products and services generate revenue and deliver value to users. I aim to apply that insight when designing and developing applications that are not only functional but strategically aligned with business goals.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p style={{ color: "var(--text-primary)", textAlign: "left", lineHeight: "1.8", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
            I approach development with a competitive and solution-driven mindset, constantly challenging myself to overcome technical obstacles and improve my skills. This mentality drives me to iterate, learn quickly, and deliver high-quality results even when facing complex problems.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p style={{ color: "var(--text-primary)", textAlign: "left", lineHeight: "1.8", fontSize: "1.1rem" }}>
            From a young age, I taught myself graphic design and 3D modeling, which continues to influence my development work today. This creative foundation allows me to design interfaces that are both aesthetically engaging and highly functional, ensuring that the products I build deliver an intuitive and polished user experience.
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="custom-card p-4">
            <h5>Background</h5>
            <p className="lead mt-3" style={{ color: "var(--text-muted)" }}>
              I'm a full-stack developer with a passion for clean code and
              intuitive user interfaces.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="custom-card p-4">
            <h5>Skills</h5>
            <p className="lead mt-3" style={{ color: "var(--text-muted)" }}>
              Frontend: React, JavaScript, CSS. Backend: Python, Flask, SQL.
              Always learning and improving.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="custom-card p-4">
            <h5>Vision</h5>
            <p className="lead mt-3" style={{ color: "var(--text-muted)" }}>
              To build impactful applications that solve real problems and
              provide excellent user experiences.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
