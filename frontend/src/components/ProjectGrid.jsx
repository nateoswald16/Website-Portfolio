import { useNavigate } from "react-router-dom";
import "./ProjectGrid.css";

export default function ProjectGrid({ items = [] }) {
  const navigate = useNavigate();
  
  // Generate placeholder tiles if less than 4 projects
  const placeholderCount = Math.max(0, 4 - items.length);
  const placeholders = Array.from({ length: placeholderCount }, (_, i) => ({
    id: `placeholder-${i}`,
    isPlaceholder: true,
  }));

  const handleTileClick = (githubLink) => {
    if (githubLink) {
      window.open(githubLink, "_blank");
    }
  };

  return (
    <div className="project-grid">
      {items.map((item) => (
        <div
          key={item.id}
          className="project-tile"
          onClick={() => handleTileClick(item.github_link)}
          style={{ cursor: item.github_link ? "pointer" : "default" }}
        >
          {item.cover_image ? (
            <img
              src={`/${item.cover_image}`}
              alt={item.title}
              className="project-tile-image"
            />
          ) : (
            <div className="project-tile-placeholder"></div>
          )}
          <div className="project-tile-title">{item.title}</div>
        </div>
      ))}
      {placeholders.map((placeholder) => (
        <div
          key={placeholder.id}
          className="project-tile project-tile-coming-soon"
          style={{ cursor: "default" }}
        >
          <div className="project-tile-placeholder"></div>
          <div className="project-tile-title">Coming Soon</div>
        </div>
      ))}
    </div>
  );
}
