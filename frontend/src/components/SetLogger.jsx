import { useState } from "react";
import api from "../api/api";

function SetLogger({sessionId, exerciseId}) {

    const [weight,setWeight] =
        useState("");

    const [reps,setReps] =
        useState("");

    async function saveSet() {

    try {

        await api.post(
            `/sessions/${sessionId}/set`,
            {
                exerciseId,
                setNumber:1,
                weight:Number(weight),
                reps:Number(reps)
            }
        );

        alert(
            "Set saved 🔥"
        );

    } catch(error){

        console.log(error);

        alert(
            error.response?.data ||
            error.message
        );
    }
}

    return(

        <div>

            <input
                placeholder="Weight"
                value={weight}
                onChange={(e)=>
                    setWeight(
                        e.target.value
                    )
                }
            />

            <input
                placeholder="Reps"
                value={reps}
                onChange={(e)=>
                    setReps(
                        e.target.value
                    )
                }
            />

            <button
                onClick={saveSet}
            >
                Save Set
            </button>

        </div>

    );
}

export default SetLogger;