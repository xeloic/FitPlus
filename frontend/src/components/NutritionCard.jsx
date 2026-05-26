import { useEffect, useState } from "react";
import api from "../api/api";

function NutritionCard() {

    const [nutrition, setNutrition] =
        useState(null);

    useEffect(() => {

        async function loadNutrition() {

            try {

                const response =
                    await api.get(
                        "/nutrition/targets"
                    );

                setNutrition(
                    response.data
                );

            } catch(error) {

                console.log(error);
            }
        }

        loadNutrition();

    }, []);

    if(!nutrition){

        return <h2>Loading nutrition...</h2>;
    }

    return (

        <div
            style={{
                border:"1px solid black",
                padding:"15px",
                marginTop:"20px"
            }}
        >

            <h2>Nutrition 🍎</h2>

            <p>
                Calories:
                {nutrition.calories}
            </p>

            <p>
                Protein:
                {nutrition.protein}
            </p>

            <p>
                Carbs:
                {nutrition.carbs}
            </p>

            <p>
                Fat:
                {nutrition.fat}
            </p>

        </div>
    );
}

export default NutritionCard;