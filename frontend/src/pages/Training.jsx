import {useState,useEffect,useCallback} from "react";
import "../styles/Training.css";
import useEmblaCarousel from "embla-carousel-react";
import Navbar from "../components/Navbar";
import api from "../api/api";

export default function Training(){

const [emblaRef]=useEmblaCarousel({
align:"center",
loop:true
});

const [plans,setPlans]=useState([]);
const [selectedPlan,setSelectedPlan]=useState(null);
const [exerciseData,setExerciseData]=useState([]);
const [sessionId,setSessionId]=useState(null);

const [showCreateDay,setShowCreateDay]=useState(false);
const [newDayName,setNewDayName]=useState("");

const [workoutTime,setWorkoutTime]=useState(0);
const [timerRunning,setTimerRunning]=useState(false);



useEffect(()=>{

fetchPlans();

},[]);



useEffect(()=>{

let interval=null;

if(timerRunning){

interval=setInterval(()=>{

setWorkoutTime(
prev=>prev+1
);

},1000);

}

return ()=>clearInterval(interval);

},[timerRunning]);



async function fetchPlans(){

try{

const response=
await api.get(
"/workouts"
);

setPlans(
response.data
);

if(response.data.length>0){

setSelectedPlan(
response.data[0]
);

loadWorkoutDetails(
response.data[0].id
);

}

}
catch(error){

console.log(error);

}

}



async function loadWorkoutDetails(id){

try{

const response=
await api.get(
`/workouts/${id}`
);

const formatted=

response.data.map(
e=>({

exerciseId:e.exercise.id,

name:e.exercise.name,

sets:Array.from(
{
length:e.targetSets
},
()=>({

reps:
e.targetReps||0,

weight:
e.targetWeight||0

})

)

})

);

setExerciseData(
formatted
);

}
catch(error){

console.log(error);

}

}



async function createWorkoutDay(){

if(!newDayName.trim())
return;

try{

await api.post(

"/workouts/create",

{

name:newDayName,
dayOfWeek:plans.length+1

}

);

setNewDayName("");

setShowCreateDay(false);

fetchPlans();

}
catch(error){

console.log(error);

}

}


async function startWorkout(){

if(!selectedPlan){

alert(
"Select a workout day first"
);

return;

}

try{

const response=
await api.post(

"/sessions/start",

{

workoutPlanId:
selectedPlan.id

}

);

setSessionId(
response.data.id
);

setWorkoutTime(
0
);

setTimerRunning(
true
);

}
catch(error){

console.log(
error
);

}

}

const ensureSession=
useCallback(

async()=>{

if(sessionId)
return sessionId;

if(!selectedPlan)
return null;

try{

const response=
await api.post(

"/sessions/start",

{

workoutPlanId:
selectedPlan.id

}

);

setSessionId(
response.data.id
);

return response.data.id;

}
catch(error){

console.log(error);

return null;

}

},

[
sessionId,
selectedPlan
]

);



async function finishWorkout(){

const id=
await ensureSession();

if(!id)
return;

try{

for(let i=0;i<exerciseData.length;i++){

const exercise=
exerciseData[i];

for(
let j=0;
j<exercise.sets.length;
j++
){

const set=
exercise.sets[j];

await api.post(

`/sessions/${id}/set`,

{

exerciseId:
exercise.exerciseId,

setNumber:
j+1,

reps:
set.reps,

weight:
set.weight

}

);

}

}

setTimerRunning(false);

setSessionId(null);

alert(
"Workout Saved"
);

}
catch(error){

console.log(error);

}

}



function addSet(index){

const updated=
[...exerciseData];

updated[index]
.sets.push({

reps:0,
weight:0

});

setExerciseData(
updated
);

}



function updateSet(
exerciseIndex,
setIndex,
field,
value
){

const updated=
[...exerciseData];

updated[
exerciseIndex
]
.sets[
setIndex
][field]=
Number(value);

setExerciseData(
updated
);

}



const totalSets=

exerciseData.reduce(
(sum,e)=>
sum+e.sets.length,
0
);



return(

<div className="training-page">

<Navbar/>

<div className="blob blob1"/>
<div className="blob blob2"/>
<div className="blob blob3"/>



<div className="top-section">


<div className="split-card glass">

<h2>

Workout Split

</h2>

<select

value={
selectedPlan?.id||""
}

onChange={(e)=>{

const selected=

plans.find(
p=>
p.id===Number(
e.target.value
)
);

setSelectedPlan(
selected
);

loadWorkoutDetails(
selected.id
);

}}

>

<option value="">
Select Day
</option>

{

plans.map(
plan=>(

<option
key={plan.id}
value={plan.id}
>

{plan.name}

</option>

))

}

</select>


<button

onClick={()=>{

setShowCreateDay(
!showCreateDay
);

}}

>

+ Create Day

</button>

<button
onClick={startWorkout}

style={{
marginTop:"10px"
}}

>

Start Workout

</button>


{

showCreateDay &&

<div className="create-form">

<input

value={newDayName}

placeholder=
"Workout day name"

onChange={(e)=>

setNewDayName(
e.target.value
)

}

/>

<button
onClick={
createWorkoutDay
}
>

Save

</button>

</div>

}

</div>



<div className="hero-card glass">

<div>

<h1>

{

selectedPlan?.name
||
"Workout"

}

</h1>

<p>

Total Time:

{Math.floor(
workoutTime/60
)

.toString()

.padStart(2,"0")}

:

{(
workoutTime%60
)

.toString()

.padStart(2,"0")}

</p>

<p>

Sets:
{
totalSets
}

</p>

</div>


<div className="rest">

<h3>

Workout Timer

</h3>

<div
className=
"timer-circle"
>

{Math.floor(
workoutTime/60
)

.toString()

.padStart(2,"0")}

:

{(
workoutTime%60
)

.toString()

.padStart(2,"0")}

</div>

</div>

</div>

</div>




<div
className=
"carousel-container"
ref={emblaRef}
>

<div
className=
"embla__container"
>

{

exerciseData.map(
(
exercise,
index
)=>(

<div
className=
"exercise-card glass"
key={index}
>

<h2>

{
exercise.name
}

</h2>


<div
className=
"table-head"
>

<span>
Set
</span>

<span>
Reps
</span>

<span>
Weight
</span>

</div>



{

exercise.sets.map(
(
set,
i
)=>(

<div
className=
"set-row"
key={i}
>

<span>

{i+1}

</span>


<input

type="number"

value={
set.reps
}

onChange={(e)=>

updateSet(
index,
i,
"reps",
e.target.value
)

}

/>


<input

type="number"

value={
set.weight
}

onChange={(e)=>

updateSet(
index,
i,
"weight",
e.target.value
)

}

/>

</div>

)

)

}


<button

className=
"add-set"

onClick={()=>

addSet(
index
)

}

>

+ Add Set

</button>

</div>

)

)

}

</div>

</div>



<button
className=
"add-exercise"
>

+ Add Exercise

</button>


<button
className=
"finish"

onClick={
finishWorkout
}

>

Finish Workout

</button>

</div>

);

}