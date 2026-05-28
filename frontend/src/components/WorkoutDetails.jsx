import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function WorkoutDetails() {

    const { id } = useParams();

    const [exercises, setExercises] =
        useState([]);

    const [exerciseName, setExerciseName] =
        useState("");

    const [muscleGroup, setMuscleGroup] =
        useState("");

    const [targetSets, setTargetSets] =
        useState("");

    const [targetReps, setTargetReps] =
        useState("");

    const [targetWeight, setTargetWeight] =
        useState("");

    useEffect(() => {

        loadWorkout();

    }, [id]);



    async function loadWorkout() {

        try {

            const response =
                await api.get(
                    `/workouts/${id}`
                );

            setExercises(
                response.data
            );

        }
        catch(error){

            console.log(error);

            alert(
                "Failed to load workout"
            );
        }
    }



    async function addExercise() {

        try {

            const exerciseResponse =
                await api.post(

                    "/exercises/create",

                    {
                        name: exerciseName,
                        muscleGroup
                    }

                );

            const exerciseId =
                exerciseResponse.data.id;


            await api.post(

                `/workouts/${id}/exercise`,

                {

                    exerciseId,

                    exerciseOrder:
                        exercises.length + 1,

                    targetSets:
                        Number(targetSets),

                    targetReps:
                        Number(targetReps),

                    targetWeight:
                        Number(targetWeight)

                }

            );


            alert(
                "Exercise Added "
            );


            await loadWorkout();


            setExerciseName("");
            setMuscleGroup("");
            setTargetSets("");
            setTargetReps("");
            setTargetWeight("");

        }
        catch(error){

            console.log(error);

            alert(
                "Could not add exercise"
            );
        }

    }

    



    async function deleteExercise(
        exerciseId
    ){

        try{

            await api.delete(

                `/workouts/exercise/${exerciseId}`

            );

            await loadWorkout();

        }
        catch(error){

            console.log(error);

            alert(
                "Could not delete exercise"
            );
        }
    }



    async function editExercise(
        item
    ){

        const newSets =
            prompt(
                "Sets",
                item.targetSets
            );

        const newReps =
            prompt(
                "Reps",
                item.targetReps
            );

        const newWeight =
            prompt(
                "Weight",
                item.targetWeight
            );


        try{

            await api.put(

                `/workouts/exercise/${item.id}`,

                {

                    targetSets:
                        Number(newSets),

                    targetReps:
                        Number(newReps),

                    targetWeight:
                        Number(newWeight)

                }

            );

            await loadWorkout();

        }
        catch(error){

            console.log(error);

            alert(
                "Could not update"
            );
        }

    }



    return (

        <div
            style={{
                padding:"30px"
            }}
        >

            <h1>
                Workout Details 🏋️
            </h1>

            <h2>
                Exercises
            </h2>

            {

                exercises.length===0 ?

                (

                    <p>
                        No exercises yet
                    </p>

                )

                :

                (

                    exercises.map(

                        item => (

                            <div

                                key={item.id}

                                style={{

                                    border:
                                        "1px solid black",

                                    padding:
                                        "15px",

                                    marginBottom:
                                        "10px"

                                }}

                            >

                                <h3>
                                    {item.exercise?.name}
                                </h3>

                                <p>
                                    Muscle:
                                    {" "}
                                    {item.exercise?.muscleGroup}
                                </p>

                                <p>
                                    Sets:
                                    {" "}
                                    {item.targetSets}
                                </p>

                                <p>
                                    Reps:
                                    {" "}
                                    {item.targetReps}
                                </p>

                                <p>
                                    Weight:
                                    {" "}
                                    {item.targetWeight}kg
                                </p>

                                <button

                                    onClick={()=>{

                                        editExercise(
                                            item
                                        )

                                    }}

                                >

                                    Edit ✏️

                                </button>

                                <button

                                    style={{
                                        marginLeft:
                                        "10px"
                                    }}

                                    onClick={()=>{

                                        deleteExercise(
                                            item.id
                                        )

                                    }}

                                >

                                    Delete 🗑️

                                </button>

                            </div>

                        )

                    )

                )

            }


            <hr/>


            <h2>
                Add Exercise
            </h2>

            <input

                placeholder=
                "Exercise Name"

                value=
                {exerciseName}

                onChange={(e)=>{

                    setExerciseName(
                        e.target.value
                    )

                }}

            />

            <br/><br/>


            <input

                placeholder=
                "Muscle Group"

                value=
                {muscleGroup}

                onChange={(e)=>{

                    setMuscleGroup(
                        e.target.value
                    )

                }}

            />

            <br/><br/>


            <input

                placeholder=
                "Sets"

                value=
                {targetSets}

                onChange={(e)=>{

                    setTargetSets(
                        e.target.value
                    )

                }}

            />

            <br/><br/>


            <input

                placeholder=
                "Reps"

                value=
                {targetReps}

                onChange={(e)=>{

                    setTargetReps(
                        e.target.value
                    )

                }}

            />

            <br/><br/>


            <input

                placeholder=
                "Weight"

                value=
                {targetWeight}

                onChange={(e)=>{

                    setTargetWeight(
                        e.target.value
                    )

                }}

            />

            <br/><br/>


            <button
                onClick={addExercise}
            >

                Add Exercise 

            </button>

        </div>

    );
}

export default WorkoutDetails;