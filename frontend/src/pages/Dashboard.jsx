import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

import {
ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip
} from "recharts";

import "../styles/DashboardStyle.css";

function Dashboard(){

const [profile,setProfile]=useState(null);

const [nutrition,setNutrition]=useState({
calories:0,
protein:0,
carbs:0,
fats:0,
water:0
});

const [chartData,setChartData]=useState([]);

const [editing,setEditing]=useState(false);

const [selectedExercise,setSelectedExercise]=
useState("Bench Press");

const [timeFrame,setTimeFrame]=
useState("1 Month");


useEffect(()=>{

const fetchData=async()=>{

try{

const profileRes=
await api.get("/user/profile");

setProfile(
profileRes.data
);

try{

const nutritionRes=
await api.get(
"/nutrition/targets"
);

setNutrition(
nutritionRes.data
);

}
catch{

setNutrition({

calories:0,
protein:0,
carbs:0,
fats:0,
water:0

});

}

}
catch(error){

console.log(error);

setProfile({

name:"New User",

height:0,
weight:0,
age:0,

activityLevel:
"sedentary"

});

}

};

fetchData();

},[]);



useEffect(()=>{

const fetchProgress=async()=>{

try{

const response=
await api.get(
`/progress/${selectedExercise}`
);

const data=

response.data?.map(

(item)=>({

date:item.date ||
"Start",

weight:
item.weight ||
item.maxWeight ||
0

})

) || [];


setChartData(

data.length
? data
: [

{

date:"Start",

weight:0

}

]

);

}
catch(error){

console.log(error);

setChartData([

{

date:"Start",

weight:0

}

]);

}

};

fetchProgress();

},[selectedExercise,timeFrame]);



const saveProfile=async()=>{

try{

await api.put(

"/user/profile",

profile

);

const nutritionRes=

await api.get(
"/nutrition/targets"
);

setNutrition(
nutritionRes.data
);

setEditing(false);

}
catch(error){

console.log(error);

}

};



if(!profile){

return(

<div className="loading">

Loading Dashboard...

</div>

);

}



return(

<div className="dashboard">

<Navbar/>

<div className="blob purple"></div>
<div className="blob blue"></div>


<div style={{paddingTop:"120px"}}>

<h1>

Welcome back,
{profile?.name || "User"}

</h1>

<p className="subtitle">

Build strength with consistency

</p>



<div className="dashboard-grid">


<div className="left-column">


<div className="glass">

<div className="profile-avatar">

{profile?.name?.charAt(0) || "U"}

</div>

<h2>

{profile?.name}

</h2>

<p className="muted">

{profile?.activityLevel}

</p>


{

editing ?

(

<div className="edit-container">

<input

className="input"

value={profile.height ?? ""}

placeholder="Height"

onChange={(e)=>

setProfile({

...profile,

height:e.target.value

})

}

/>


<input

className="input"

value={profile.weight ?? ""}

placeholder="Weight"

onChange={(e)=>

setProfile({

...profile,

weight:e.target.value

})

}

/>


<input

className="input"

value={profile.age ?? ""}

placeholder="Age"

onChange={(e)=>

setProfile({

...profile,

age:e.target.value

})

}

/>


<select

className="input"

value={profile.activityLevel ?? ""}

onChange={(e)=>

setProfile({

...profile,

activityLevel:e.target.value

})

}

>

<option value="sedentary">
sedentary
</option>

<option value="light">
light
</option>

<option value="moderate">
moderate
</option>

<option value="active">
active
</option>

<option value="very_active">
very active
</option>

</select>


<button

className="primary-btn"

onClick={saveProfile}

>

Save

</button>

</div>

)

:

(

<>

<div className="profile-data">

<p>
Height: {profile.height} cm
</p>

<p>
Weight: {profile.weight} kg
</p>

<p>
Age: {profile.age}
</p>

</div>


<button

className="primary-btn"

onClick={()=>

setEditing(true)

}

>

Edit Profile

</button>

</>

)

}

</div>



<div className="glass">

<h3>

Quick Stats

</h3>

<div className="stats">

<p>
Current streak
</p>

<p>
Last workout
</p>

</div>

</div>


</div>





<div className="right-column">


<div className="glass chart-card">

<div className="chart-header">

<div>

<p className="muted">

PERFORMANCE CURVE

</p>

<h2>

{selectedExercise}

</h2>

</div>


<div className="dropdowns">

<select

className="input"

value={timeFrame}

onChange={(e)=>

setTimeFrame(
e.target.value
)

}

>

<option>1 Month</option>
<option>3 Months</option>
<option>6 Months</option>
<option>1 Year</option>

</select>


<select

className="input"

value={selectedExercise}

onChange={(e)=>

setSelectedExercise(
e.target.value
)

}

>

<option>Bench Press</option>
<option>Squats</option>
<option>Incline DB Press</option>

</select>

</div>

</div>


<ResponsiveContainer
width="100%"
height={320}
>

<LineChart
data={chartData}
>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line

type="monotone"

dataKey="weight"

stroke="#7B61FF"

strokeWidth={4}

dot={false}

/>

</LineChart>

</ResponsiveContainer>

</div>



<div className="nutrition-grid">

{[

{
name:"Calories",
value:`${nutrition.calories} kcal`
},

{
name:"Protein",
value:`${nutrition.protein} grams`
},

{
name:"Carbs",
value:`${nutrition.carbs} grams`
},

{
name:"Fat",
value:`${nutrition.fats} grams`
},

{
name:"Water",
value:`${nutrition.water} litres`
}

].map((item)=>(

<div
key={item.name}
className="glass nutrition-card"
>

<p className="muted">

{item.name}

</p>

<h2>

{item.value}

</h2>

</div>

))

}

</div>

</div>

</div>

</div>

</div>

);

}

export default Dashboard;