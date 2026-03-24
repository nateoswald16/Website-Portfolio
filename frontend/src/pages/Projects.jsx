import { useState, useEffect } from "react";
import { getProjects } from "../services/api";
import ProjectGrid from "../components/ProjectGrid";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to load projects", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading projects...</p></div>;
  if (error) return <div className="container mt-5"><p className="text-muted">{error}</p></div>;

  return (
    <div className="container mt-5">
      <h1 style={{ marginBottom: "2rem", textAlign: "center" }}>Projects</h1>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ProjectGrid items={projects} />
      )}
    </div>
  );
}