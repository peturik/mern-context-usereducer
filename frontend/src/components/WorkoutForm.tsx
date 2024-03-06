import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEptyfields] = useState<any>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEptyfields(data.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEptyfields([]);
      console.log("New workout added", data);
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label htmlFor="title">Excersize Title:</label>
      <input
        id="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label htmlFor="load">Load (in kg)</label>
      <input
        id="load"
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label htmlFor="reps">Reps: </label>
      <input
        id="reps"
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
