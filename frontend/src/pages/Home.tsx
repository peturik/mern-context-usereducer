import { useEffect } from "react";
import { WorkoutDetails } from "../components/WorkoutDetails";
import type { Workout } from "../types/types";
import { WorkoutForm } from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export const Home = () => {
  // const [workouts, setWorkouts] = useState([]);
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const data: Workout = await response.json();

      if (response.ok) {
        // setWorkouts(json);
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout: Workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};
