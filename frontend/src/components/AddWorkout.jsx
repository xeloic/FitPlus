import { useState } from "react";
import api from "../api/api";

function AddWorkout() {

    const [name, setName] =
        useState("");

    const [dayOfWeek, setDayOfWeek] =
        useState("");

    async function createWorkout() {

        try {

            await api.post(
                "/workouts/create",
                {
                    name,
                    dayOfWeek
                }
            );

            alert(
                "Workout created 🔥"
            );

            window.location.reload();

        } catch(error){

            console.log(error);

            alert(
                "Could not create workout"
            );
        }
    }

    return(

        <div
            style={{
                border:"1px solid black",
                padding:"15px",
                marginBottom:"20px"
            }}
        >

            <h2>
                Add Workout
            </h2>

            <input
                placeholder="Workout Name"
                value={name}
                onChange={(e)=>
                    setName(
                        e.target.value
                    )
                }
            />

            <br/><br/>

            <select
                value={dayOfWeek}
                onChange={(e)=>
                    setDayOfWeek(
                        e.target.value
                    )
                }
            >

                <option value="">
                    Select Day
                </option>

                <option value="1">
                    Monday
                </option>

                <option value="2">
                    Tuesday
                </option>

                <option value="3">
                    Wednesday
                </option>

                <option value="4">
                    Thursday
                </option>

                <option value="5">
                    Friday
                </option>

                <option value="6">
                    Saturday
                </option>

                <option value="7">
                    Sunday
                </option>

            </select>

            <br/><br/>

            <button
                onClick={createWorkout}
            >
                Create Workout
            </button>

        </div>
    );
}

export default AddWorkout;