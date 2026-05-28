
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import "../styles/Training.css";
import useEmblaCarousel from "embla-carousel-react";

function Training() {

const [emblaRef] = useEmblaCarousel({
align:"start",
loop:false
});




const [plans,setPlans]=useState([]);

const [selectedPlan,setSelectedPlan]=
useState(null);

const [exerciseData,setExerciseData]=
useState([]);

const [showCreateDay,setShowCreateDay]=
useState(false);

const [newDayName,setNewDayName]=
useState("");

const [showExerciseForm,setShowExerciseForm]=
useState(false);

const [exerciseName,setExerciseName]=
useState("");

const [muscleGroup,setMuscleGroup]=
useState("");

const [targetSets,setTargetSets]=
useState("");

const [targetReps,setTargetReps]=
useState("");

const [targetWeight,setTargetWeight]=
useState("");

const [timerRunning,setTimerRunning]=
useState(false);

const [workoutTime,setWorkoutTime]=
useState(0);

// eslint-disable-next-line no-unused-vars
const [sessionId,setSessionId]=
useState(null);



useEffect(()=>{

fetchPlans();

},[]);



useEffect(()=>{

let interval=null;

if(timerRunning){

interval=setInterval(()=>{

setWorkoutTime(prev=>prev+1);

},1000);

}

return()=>clearInterval(interval);

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

}
catch(error){

console.log(error);

}

}



async function loadWorkoutDetails(
workoutId
){

try{

const response=
await api.get(
`/workouts/${workoutId}`
);

setExerciseData(
response.data
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

dayOfWeek:
plans.length+1

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

setWorkoutTime(0);

setTimerRunning(true);

}
catch(error){

console.log(error);

}

}



async function addExercise(){

if(!selectedPlan)
return;

try{

const exerciseResponse=
await api.post(

"/exercises/create",

{

name:exerciseName,
muscleGroup

}

);

const exerciseId=
exerciseResponse.data.id;

await api.post(

`/workouts/${selectedPlan.id}/exercise`,

{

exerciseId,

exerciseOrder:
exerciseData.length+1,

targetSets:
Number(targetSets),

targetReps:
Number(targetReps),

targetWeight:
Number(targetWeight)

}

);

await loadWorkoutDetails(
selectedPlan.id
);

setExerciseName("");
setMuscleGroup("");
setTargetSets("");
setTargetReps("");
setTargetWeight("");

setShowExerciseForm(false);

}
catch(error){

console.log(error);

}

}



async function deleteExercise(
exerciseId
){

try{

await api.delete(

`/workouts/exercise/${exerciseId}`

);

await loadWorkoutDetails(
selectedPlan.id
);

}
catch(error){

console.log(error);

}

}

async function deleteWorkoutDay(){

if(!selectedPlan)
return;

const confirmDelete = window.confirm(
"Delete this workout day?"
);

if(!confirmDelete)
return;

try{

await api.delete(

`/workouts/${selectedPlan.id}`

);

setSelectedPlan(null);

setExerciseData([]);

fetchPlans();

}
catch(error){

console.log(error);

}

}

async function finishWorkout(){

try{

setTimerRunning(false);

setSessionId(null);

setWorkoutTime(0);

alert(
"Workout Finished"
);

}
catch(error){

console.log(error);

}

}



const formattedTime=

`${String(
Math.floor(workoutTime/60)
).padStart(2,"0")}:${String(
workoutTime%60
).padStart(2,"0")}`;



const totalSets=
exerciseData.reduce(

(sum,item)=>

sum + item.targetSets,

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
selectedPlan?.id || ""
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

plans.map(plan=>(

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
selectedPlan?.name ||
"Workout"
}

</h1>

<button

className="delete-day-btn"

onClick={deleteWorkoutDay}

>

Delete Day

</button>

<p>

Total Time:
{formattedTime}

</p>

<p>

Sets:
{totalSets}

</p>

</div>



<div className="rest">

<h3 className="timer-title">

Workout Timer

</h3>

<div className="timer-circle">

{formattedTime}

</div>

</div>

</div>

</div>




<div
className="carousel-container"
ref={emblaRef}
>

<div className="embla__container">

{

exerciseData.map(item=>(

<div
className="exercise-card glass"
key={item.id}
>

<div className="card-header">

<h2>

{
item.exercise?.name
}

</h2>

<button

className="delete-btn"

onClick={()=>{

deleteExercise(item.id);

}}

>

×

</button>

</div>



<div className="exercise-fields">

<div className="field-row">

<label>

Sets

</label>

<input
type="number"
value={item.targetSets}
/>

</div>



<div className="field-row">

<label>

Reps

</label>

<input
type="number"
value={item.targetReps}
/>

</div>



<div className="field-row">

<label>

Weight

</label>

<input
type="number"
value={item.targetWeight}
/>

</div>

</div>

</div>

))

}



<div className="exercise-card glass">

{

!showExerciseForm ?

<div

className="add-content"

onClick={()=>{

setShowExerciseForm(true);

}}

>

<p>

Add Exercise

</p>

<div className="plus-circle">

+

</div>

</div>

:

<>

<div className="card-header">

<input

className="exercise-name-input"

placeholder="Exercise Name"

value={exerciseName}

onChange={(e)=>{

setExerciseName(
e.target.value
);

}}

/>

<button

className="delete-btn"

onClick={()=>{

setShowExerciseForm(false);

}}

>

×

</button>

</div>



<div className="exercise-fields">

<div className="field-row">

<label>

Sets

</label>

<input

type="number"

value={targetSets}

onChange={(e)=>{

setTargetSets(
e.target.value
);

}}

/>

</div>



<div className="field-row">

<label>

Weight

</label>

<input

type="number"

value={targetWeight}

onChange={(e)=>{

setTargetWeight(
e.target.value
);

}}

/>

</div>



<div className="field-row">

<label>

Reps

</label>

<input

type="number"

value={targetReps}

onChange={(e)=>{

setTargetReps(
e.target.value
);

}}

/>

</div>

</div>



<button

className="save-exercise-btn"

onClick={addExercise}

>

Finish

</button>

</>

}

</div>

</div>

</div>







<button
className="finish"
onClick={finishWorkout}
>

Finish Workout

</button>

</div>

);

}

export default Training;

