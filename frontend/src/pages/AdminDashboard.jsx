import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StatCard from "../components/StatCard";
import SidebarItem from "../components/SidebarItem";
import { getProjects, createProject, updateProject, deleteProject } from "../services/api";

/* ============================= */
/* PAGE CONSTANTS */
/* ============================= */

const PAGES = {
  OVERVIEW: "overview",
  PROJECTS: "projects",
  NEW: "new",
};

const pageTitles = {
  [PAGES.OVERVIEW]: "Overview",
  [PAGES.PROJECTS]: "Projects",
  [PAGES.NEW]: "Create Project",
};

function AdminDashboard() {
  const [activePage, setActivePage] = useState(PAGES.OVERVIEW);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialFormState = {
    id: null,
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    coverImage: null,
    currentCoverImage: null,
    deleteCoverImage: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadProjects();
  }, []);

  const navigate = useNavigate();

  async function loadProjects() {
    setLoading(true);
    setError(null);
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

  async function handleSubmit(data) {
    setLoading(true);
    setError(null);
    try {
      // Auto-add http:// if no protocol provided
      let githubUrl = data.githubUrl;
      if (githubUrl && !githubUrl.startsWith('http://') && !githubUrl.startsWith('https://')) {
        githubUrl = 'http://' + githubUrl;
      }

      if (data.id) {
        const res = await updateProject(data.id, {
          title: data.title,
          description: data.description,
          techStack: data.techStack,
          githubUrl: githubUrl,
          coverImage: data.coverImage,
          deleteCoverImage: data.deleteCoverImage,
        });

        if (res.status === 401) return navigate("/admin");
        if (!res.ok) throw new Error("Update failed");

        toast.success("Project updated");
      } else {
        const res = await createProject({
          title: data.title,
          description: data.description,
          techStack: data.techStack,
          githubUrl: githubUrl,
          coverImage: data.coverImage,
        });

        if (res.status === 401) return navigate("/admin");
        if (!res.ok) throw new Error("Create failed");

        toast.success("Project created");
      }
      setFormData(initialFormState);
      setActivePage(PAGES.PROJECTS);
      loadProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await deleteProject(id);
      if (res.status === 401) return navigate("/admin");
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Project deleted");
      loadProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    } finally {
      setLoading(false);
    }
  }

  const pages = {
    [PAGES.OVERVIEW]: <Overview projects={projects} />,
    [PAGES.PROJECTS]: (
      <Projects
        projects={projects}
        onEdit={(p) => {
          setFormData({
            id: p.id,
            title: p.title,
            description: p.description,
            techStack: p.tech_stack || "",
            githubUrl: p.github_link || "",
            coverImage: null,
            currentCoverImage: p.cover_image || null,
            deleteCoverImage: false,
          });
          setActivePage(PAGES.NEW);
        }}
        onDelete={handleDelete}
        loading={loading}
        error={error}
      />
    ),
    [PAGES.NEW]: (
      <NewProjectForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={() => {
          setFormData(initialFormState);
          setActivePage(PAGES.PROJECTS);
        }}
      />
    ),
  };

  return (
    <div className="dashboard">
      <div className="dashboard-layout">

        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <div className="sidebar-header">
              <h3 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Portfolio</h3>
            </div>

            <nav className="sidebar-nav">
              <SidebarItem
                label="Overview"
                active={activePage === PAGES.OVERVIEW}
                onClick={() => setActivePage(PAGES.OVERVIEW)}
              />
              <SidebarItem
                label="Projects"
                active={activePage === PAGES.PROJECTS}
                onClick={() => setActivePage(PAGES.PROJECTS)}
              />
              <SidebarItem
                label="New Project"
                active={activePage === PAGES.NEW}
                onClick={() => setActivePage(PAGES.NEW)}
              />
            </nav>
          </div>
        </aside>

        {/* Main Area */}
        <div className="dashboard-main">
          <header className="topbar">
            <h2>{pageTitles[activePage]}</h2>
          </header>

          <div className="dashboard-content">
            {pages[activePage]}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================= */
/* PAGES */
/* ============================= */

function Overview({ projects = [] }) {
  const getRecentActivity = () => {
    if (projects.length === 0) {
      return "No projects yet";
    }
    
    // Find the most recent project by updated_at or created_at
    const mostRecent = projects.reduce((latest, current) => {
      const currentTime = new Date(current.updated_at || current.created_at);
      const latestTime = new Date(latest.updated_at || latest.created_at);
      return currentTime > latestTime ? current : latest;
    });
    
    if (!mostRecent.updated_at && !mostRecent.created_at) {
      return "No activity yet";
    }
    
    const timestamp = new Date(mostRecent.updated_at || mostRecent.created_at);
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    let timeAgo;
    if (diffMins < 1) {
      timeAgo = "just now";
    } else if (diffMins < 60) {
      timeAgo = `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
    } else if (diffHours < 24) {
      timeAgo = `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    } else if (diffDays < 30) {
      timeAgo = `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    } else {
      timeAgo = timestamp.toLocaleDateString();
    }
    
    return `Last project updated: ${mostRecent.title} - ${timeAgo}`;
  };

  const getUniqueLanguages = () => {
    if (projects.length === 0) return 0;
    
    const allTechs = new Set();
    projects.forEach((p) => {
      if (p.tech_stack) {
        // Split by comma and trim whitespace
        const techs = p.tech_stack
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech.length > 0);
        techs.forEach((tech) => allTechs.add(tech));
      }
    });
    
    return allTechs.size;
  };

  return (
    <>
      <div className="stats-grid">
        <StatCard title="Total Projects" value={projects.length.toString()} />
        <StatCard title="Languages Used" value={getUniqueLanguages().toString()} />
      </div>

      <div className="dashboard-content-grid">
        <div className="panel">
          <h3>Recent Activity</h3>
          <p>{getRecentActivity()}</p>
        </div>
      </div>
    </>
  );
}

function Projects({ projects = [], onEdit, onDelete, loading, error }) {
  if (loading) return <div className="panel"><p>Loading projects...</p></div>;
  if (error) return <div className="panel"><p className="text-muted">{error}</p></div>;

  return (
    <div className="panel">
      <h3>Your Projects</h3>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.6rem",
                borderRadius: "8px",
                background: "var(--bg-app)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div>
                <strong>{p.title}</strong>
                <div style={{ fontSize: "0.9rem" }}>
                  {p.description}
                </div>
                {p.tech_stack && (
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                    <strong>Tech:</strong> {p.tech_stack}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="btn-secondary"
                  onClick={() => onEdit && onEdit(p)}
                  aria-label={`Edit ${p.title} project`}
                >
                  Edit
                </button>
                <button
                  className="btn-primary"
                  onClick={() => onDelete && onDelete(p.id)}
                  aria-label={`Delete ${p.title} project`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NewProjectForm({ formData, setFormData, onSubmit, onCancel }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, coverImage: file }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <div className="panel">
      <h3>{formData && formData.id ? "Edit Project" : "Create New Project"}</h3>

      <form className="project-form" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            aria-required="true"
            aria-label="Project title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            aria-required="true"
            aria-label="Project description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="techStack">Tech Stack (comma separated)</label>
          <input
            id="techStack"
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            aria-label="Tech stack used in the project"
          />
        </div>

        <div className="form-group">
          <label htmlFor="githubUrl">GitHub URL</label>
          <input
            id="githubUrl"
            type="text"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            aria-label="GitHub repository URL"
            placeholder="e.g., github.com/username/repo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <div className="file-input-wrapper">
            <input
              id="coverImage"
              type="file"
              name="coverImage"
              accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
              onChange={handleFileChange}
              aria-label="Project cover image"
            />
            <label htmlFor="coverImage" className="file-input-label">
              {formData.coverImage ? "Change Image" : "Choose Image"}
            </label>
          </div>
          {formData.coverImage && (
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Selected: {formData.coverImage.name}
            </p>
          )}
          {formData.currentCoverImage && !formData.coverImage && (
            <div style={{ marginTop: "0.5rem" }}>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                Current image: {formData.currentCoverImage.split('/').pop()}
              </p>
              <button
                type="button"
                className="btn-secondary"
                style={{ fontSize: "0.9rem", padding: "0.4rem 0.8rem" }}
                onClick={() => setFormData((prev) => ({ ...prev, currentCoverImage: null, deleteCoverImage: true }))}
                aria-label="Delete current cover image"
              >
                Delete Current Image
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <motion.button type="submit" className="btn-primary" whileHover={{ scale: 1.03 }}>
            {formData && formData.id ? "Update Project" : "Create Project"}
          </motion.button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Settings() {
  return (
    <div className="panel">
      <h3>Settings</h3>
      <p>Theme toggles, profile settings, and integrations go here.</p>
    </div>
  );
}

export default AdminDashboard;