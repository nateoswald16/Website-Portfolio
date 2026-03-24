export default function StatCard({ title, value }) {
  return (
    <div className="stat-card" role="region" aria-label={`${title}: ${value}`}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}