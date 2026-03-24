import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./CircularGallery.css";

export default function CircularGallery({
  items = [],
  bend = 0,
  borderRadius = 0.05,
  scrollSpeed = 1.5,
  scrollEase = 0.05,
  minItems = 6,
}) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef(0);

  const radius = 300;
  const baseRadius = 400; // Base radius for straight line calculation
  
  // Create placeholder items to fill the gallery
  const displayItems = [...items];
  while (displayItems.length < minItems) {
    displayItems.push({
      id: `placeholder-${displayItems.length}`,
      title: "Coming Soon",
      description: "New project",
      isPlaceholder: true,
    });
  }
  
  const itemCount = displayItems.length;
  const anglePerItem = itemCount > 0 ? 360 / itemCount : 0;
  const itemSpacing = baseRadius * 2 * Math.sin((anglePerItem * Math.PI) / 360); // Spacing for straight line

  // Handle drag
  useEffect(() => {
    const handleMouseDown = (e) => {
      setIsDragging(true);
      dragStartRef.current = e.clientX;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartRef.current;
      setTargetRotation((prev) => prev + delta * (bend === 0 ? 0.6 : 1.0));
      dragStartRef.current = e.clientX;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, bend]);

  // Smooth rotation animation
  useEffect(() => {
    const animate = () => {
      setRotation((prev) => prev + (targetRotation - prev) * scrollEase);
    };

    const interval = setInterval(animate, 1000 / 60);
    return () => clearInterval(interval);
  }, [targetRotation, scrollEase]);

  return (
    <div ref={containerRef} className="circular-gallery-container" style={{ userSelect: "none" }}>
      <div
        className="circular-gallery"
        style={{
          position: "relative",
          width: radius * 2,
          height: radius * 2,
          margin: "0 auto",
        }}
      >
        {displayItems.map((item, index) => {
          // Calculate position based on bend value
          let x, y, scale, zIndex;
          
          if (bend === 0) {
            // Straight line mode
            const centerOffset = (itemCount - 1) / 2;
            const positionIndex = index - centerOffset + rotation / itemSpacing;
            x = positionIndex * itemSpacing;
            y = 0;
            // Scale based on horizontal distance from center
            const distance = Math.abs(positionIndex);
            scale = Math.max(0.5, 1 - distance * 0.15);
            zIndex = Math.round((1 - Math.abs(positionIndex) / itemCount) * 100 + 50);
          } else {
            // Circular mode with bend interpolation
            const angle = (index * anglePerItem + rotation) * (Math.PI / 180);
            const circleRadius = bend < 1 ? radius * (2 - bend) : radius;
            x = Math.cos(angle) * circleRadius;
            y = Math.sin(angle) * circleRadius;
            scale = 0.7 + 0.3 * Math.cos(angle - Math.PI / 2);
            zIndex = Math.round(Math.cos(angle - Math.PI / 2) * 100 + 100);
          }

          return (
            <motion.div
              key={item.id || index}
              className={`gallery-item ${item.isPlaceholder ? "gallery-item-placeholder-card" : ""}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                width: "180px",
                height: "220px",
                borderRadius: `${borderRadius * 100}%`,
                cursor: isDragging ? "grabbing" : "grab",
                zIndex: zIndex,
                pointerEvents: isDragging ? "none" : "auto",
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="gallery-item-content">
                {item.cover_image ? (
                  <img
                    src={`/${item.cover_image}`}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: `${borderRadius * 100}%`,
                      pointerEvents: "none",
                    }}
                  />
                ) : (
                  <div className="gallery-item-placeholder">
                    <div className="placeholder-content">
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                )}
                {!item.isPlaceholder && (
                  <div className="gallery-item-overlay">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    {item.github_link && (
                      <a href={item.github_link} target="_blank" rel="noopener noreferrer" className="github-link" onClick={(e) => e.stopPropagation()}>
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="gallery-controls">
        <p className="scroll-hint">Click and drag to rotate</p>
      </div>
    </div>
  );
}
