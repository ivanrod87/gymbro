// Exercise Card Component (Placeholder)
export interface ExerciseCardProps {
  name: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  weight: number;
  rest: number;
  priority: 1 | 2 | 3;
}

export default function ExerciseCard({
  name,
  muscleGroup,
  sets,
  reps,
  weight,
  rest,
  priority,
}: ExerciseCardProps) {
  const priorityColors = {
    1: 'bg-red-900',
    2: 'bg-yellow-900',
    3: 'bg-blue-900',
  };

  return (
    <div className="card-base">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-base">{name}</h3>
          <p className="text-sm text-gray-400">{muscleGroup}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[priority]}`}>
          L{priority}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="bg-dark-700 rounded p-2 text-center">
          <p className="text-gray-400 text-xs">Sets</p>
          <p className="font-semibold">{sets}</p>
        </div>
        <div className="bg-dark-700 rounded p-2 text-center">
          <p className="text-gray-400 text-xs">Reps</p>
          <p className="font-semibold">{reps}</p>
        </div>
        <div className="bg-dark-700 rounded p-2 text-center">
          <p className="text-gray-400 text-xs">Weight</p>
          <p className="font-semibold">{weight}kg</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-dark-700 text-sm">
        <p className="text-gray-400">Rest: <span className="text-gray-50 font-medium">{rest}s</span></p>
      </div>
    </div>
  );
}
