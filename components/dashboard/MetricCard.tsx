// Dashboard Metric Card Component (Placeholder)
interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
}

export default function MetricCard({
  title,
  value,
  unit,
  trend,
  description,
  icon,
}: MetricCardProps) {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-400',
  };

  return (
    <div className="card-base">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {unit && <p className="text-gray-400">{unit}</p>}
      </div>

      {description && (
        <p className={`text-sm mt-2 ${trend ? trendColors[trend] : 'text-gray-400'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
