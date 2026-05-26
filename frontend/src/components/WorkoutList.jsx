import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function WorkoutList() {

    const [workouts, setWorkouts] =
        useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        async function loadWorkouts() {

            try {

                const response =
                    await api.get(
                        "/workouts"
                    );

                setWorkouts(
                    response.data
                );

            } catch(error) {

                console.log(error);
            }
        }

        loadWorkouts();

    }, []);


    async function deleteWorkout(
        workoutId
    ) {

        try {

            await api.delete(
                `/workouts/${workoutId}`
            );

            setWorkouts(
                workouts.filter(
                    workout =>
                        workout.id !== workoutId
                )
            );

            alert(
                "Workout deleted 🗑️"
            );

        } catch(error){

            console.log(error);

            alert(
                "Could not delete workout"
            );
        }
    }

    return (

        <div>

            <h2>
                My Workouts
            </h2>

            {
                workouts.map(
                    workout => (

                        <div
                            key={workout.id}
                            style={{
                                border:"1px solid black",
                                padding:"10px",
                                marginBottom:"10px"
                            }}
                        >

                            <h3
                                style={{
                                    cursor:"pointer"
                                }}
                                onClick={() =>
                                    navigate(
                                        `/workout/${workout.id}`
                                    )
                                }
                            >
                                {workout.name}
                            </h3>

                            <p>
                                Day:
                                {workout.dayOfWeek}
                            </p>

                            <button
                                onClick={() =>
                                    deleteWorkout(
                                        workout.id
                                    )
                                }
                            >
                                Delete 🗑️
                            </button>

                        </div>
                    )
                )
            }

        </div>
    );
}

export default WorkoutList;