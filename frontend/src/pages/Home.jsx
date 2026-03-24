import { motion } from "framer-motion";
import { memo, useState, useEffect } from "react";
import TextType from "../components/TextType";
import LiquidEther from "../components/LiquidEther";
import Footer from "../components/Footer";
import ProjectGrid from "../components/ProjectGrid";
import { getProjects } from "../services/api";

const MemoizedLiquidEther = memo(LiquidEther);

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoadingProjects(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* LiquidEther Background - Fixed */}
      <div 
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
        aria-hidden="true"
      >
        <MemoizedLiquidEther
          mouseForce={20}
          cursorSize={150}
          colors={["#242424", "#747474", "#d6d6d6"]}
          autoDemo={false}
          autoSpeed={0.15}
          autoIntensity={2.2}
          resolution={0.30}
          BFECC={false}
          iterationsPoisson={16}
          iterationsViscous={16}
          dt={0.018}
        />
      </div>

      {/* Scrollable Content */}
      <div style={{ position: "relative", zIndex: 10, marginLeft: "12rem", marginRight: "12rem" }}>
        {/* Hero Section */}
        <motion.div
          id="hero"
          className="app-container section"
          style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ textAlign: "center" }}>
            <TextType
              text="Nate Oswald"
              as="h1"
              style={{ marginBottom: "0.5rem", fontSize: "4rem", fontWeight: "500" }}
              typingSpeed={100}
              showCursor={true}
              cursorCharacter="_"
              loop={false}
              initialDelay={500}
            />
            <motion.p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                margin: "0.5rem 0 2rem 0",
                letterSpacing: "1px",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Full-stack developer & digital craftsman
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="social-links-container"
            >
              <a href="https://x.com/NaitoZ_" target="_blank" rel="noreferrer" className="social-link" aria-label="Visit my X profile (opens in new tab)">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"/>
                </svg>
              </a>
              <a href="https://github.com/nateoswald16" target="_blank" rel="noreferrer" className="social-link" aria-label="Visit my GitHub profile (opens in new tab)">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M16,2.345c7.735,0,14,6.265,14,14-.002,6.015-3.839,11.359-9.537,13.282-.7,.14-.963-.298-.963-.665,0-.473,.018-1.978,.018-3.85,0-1.312-.437-2.152-.945-2.59,3.115-.35,6.388-1.54,6.388-6.912,0-1.54-.543-2.783-1.435-3.762,.14-.35,.63-1.785-.14-3.71,0,0-1.173-.385-3.85,1.435-1.12-.315-2.31-.472-3.5-.472s-2.38,.157-3.5,.472c-2.677-1.802-3.85-1.435-3.85-1.435-.77,1.925-.28,3.36-.14,3.71-.892,.98-1.435,2.24-1.435,3.762,0,5.355,3.255,6.563,6.37,6.913-.403,.35-.77,.963-.893,1.872-.805,.368-2.818,.963-4.077-1.155-.263-.42-1.05-1.452-2.152-1.435-1.173,.018-.472,.665,.017,.927,.595,.332,1.277,1.575,1.435,1.978,.28,.787,1.19,2.293,4.707,1.645,0,1.173,.018,2.275,.018,2.607,0,.368-.263,.787-.963,.665-5.719-1.904-9.576-7.255-9.573-13.283,0-7.735,6.265-14,14-14Z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/nate-oswald-550563267/" target="_blank" rel="noreferrer" className="social-link" aria-label="Visit my LinkedIn profile (opens in new tab)">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fill-rule="evenodd"/>
                </svg>
              </a>
              <a href="https://www.behance.net/nateoswald" target="_blank" rel="noreferrer" className="social-link" aria-label="Visit my Behance portfolio (opens in new tab)">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M10.144,7.203c.808,0,1.554,.062,2.238,.249,.684,.124,1.243,.373,1.741,.684s.87,.746,1.119,1.306c.249,.56,.373,1.243,.373,1.989,0,.87-.187,1.616-.622,2.176-.373,.56-.995,1.057-1.741,1.43,1.057,.311,1.865,.87,2.362,1.616s.808,1.679,.808,2.735c0,.87-.187,1.616-.497,2.238s-.808,1.181-1.368,1.554c-.56,.373-1.243,.684-1.989,.87-.746,.187-1.492,.311-2.238,.311H2V7.203H10.144Zm-.497,6.963c.684,0,1.243-.187,1.679-.497s.622-.87,.622-1.554c0-.373-.062-.746-.187-.995s-.311-.435-.56-.622c-.249-.124-.497-.249-.808-.311s-.622-.062-.995-.062h-3.606v4.041h3.854Zm.187,7.336c.373,0,.746-.062,1.057-.124s.622-.187,.87-.373c.249-.187,.435-.373,.622-.684,.124-.311,.249-.684,.249-1.119,0-.87-.249-1.492-.746-1.927-.497-.373-1.181-.56-1.989-.56H5.792v4.787h4.041Zm11.998-.062c.497,.497,1.243,.746,2.238,.746,.684,0,1.306-.187,1.803-.497,.497-.373,.808-.746,.933-1.119h3.046c-.497,1.492-1.243,2.549-2.238,3.233-.995,.622-2.176,.995-3.606,.995-.995,0-1.865-.187-2.673-.497s-1.43-.746-1.989-1.368c-.56-.56-.995-1.243-1.243-2.052-.311-.808-.435-1.679-.435-2.673,0-.933,.124-1.803,.435-2.611s.746-1.492,1.306-2.114c.56-.56,1.243-1.057,1.989-1.368,.808-.311,1.616-.497,2.611-.497,1.057,0,1.989,.187,2.798,.622s1.43,.933,1.927,1.679c.497,.684,.87,1.492,1.119,2.362,.124,.87,.187,1.741,.124,2.735h-9.014c0,.995,.373,1.927,.87,2.425Zm3.917-6.528c-.435-.435-1.119-.684-1.927-.684-.56,0-.995,.124-1.368,.311-.373,.187-.622,.435-.87,.684-.249,.249-.373,.56-.435,.87s-.124,.56-.124,.808h5.595c-.124-.933-.435-1.554-.87-1.989Zm-5.471-6.528h6.963v1.679h-6.963v-1.679Z"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          id="about"
          className="app-container section"
          style={{ minHeight: "100vh", paddingTop: "4rem", paddingBottom: "4rem" }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="display-4 fw-bold">
              About <span style={{ color: "var(--primary-color)" }}>Me</span>
            </h1>
          </motion.div>

          {/* About Me Content */}
          <div style={{ marginTop: "2rem", maxWidth: "65%", paddingRight: "0" }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p style={{ color: "var(--text-primary)", textAlign: "left", lineHeight: "1.8", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
                I am an aspiring full-stack developer with a background in hospitality and sales, bringing a unique perspective to building software that prioritizes both user experience and business impact. Through my experience in customer-focused industries, I developed a strong understanding of how products and services generate revenue and deliver value to users. I aim to apply that insight when designing and developing applications that are not only functional but strategically aligned with business goals.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p style={{ color: "var(--text-primary)", textAlign: "left", lineHeight: "1.8", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
                I approach development with a competitive and solution-driven mindset, constantly challenging myself to overcome technical obstacles and improve my skills. This mentality drives me to iterate, learn quickly, and deliver high-quality results even when facing complex problems.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p style={{ color: "var(--text-primary)", textAlign: "left", lineHeight: "1.8", fontSize: "1.1rem" }}>
                From a young age, I taught myself graphic design and 3D modeling, which continues to influence my development work today. This creative foundation allows me to design interfaces that are both aesthetically engaging and highly functional, ensuring that the products I build deliver an intuitive and polished user experience.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          id="projects"
          className="app-container section"
          style={{ minHeight: "100vh", paddingTop: "4rem", paddingBottom: "4rem" }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{ textAlign: "center" }}
          >
            <h1 className="display-4 fw-bold">
              Latest <span style={{ color: "var(--primary-color)" }}>Projects</span>
            </h1>
          </motion.div>

          {loadingProjects ? (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <p>No projects available yet.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.2 }}
              style={{ marginTop: "3rem" }}
            >
              <ProjectGrid items={projects} />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer - Full Width on Top of Background */}
      <div style={{ position: "relative", zIndex: 10, width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        <Footer />
      </div>
    </div>
  );
}