import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { TypeAnimation } from "react-type-animation";

function LandingPage() {

    const [authMode, setAuthMode] = useState(null);

    return (

        <div
            style={{
                minHeight:"100vh",
                background:
                "radial-gradient(circle at center,#2d1f4f,#090909 60%)",
                color:"white",
                overflow:"hidden",
                position:"relative"
            }}
        >

            {/* Navbar */}

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    padding:"25px 60px"
                }}
            >

                <h2>FitPlus</h2>

                <div
                    style={{
                        display:"flex",
                        gap:"15px"
                    }}
                >

                    <button
                        onClick={() => setAuthMode("login")}
                        style={{
                            background:"#111",
                            color:"white",
                            border:"none",
                            padding:"10px 25px",
                            borderRadius:"30px",
                            cursor:"pointer"
                        }}
                    >
                        Login
                    </button>


                    <button
                        onClick={() => setAuthMode("register")}
                        style={{
                            background:"white",
                            color:"black",
                            border:"none",
                            padding:"10px 25px",
                            borderRadius:"30px",
                            cursor:"pointer"
                        }}
                    >
                        Sign Up
                    </button>

                </div>

            </div>


            {/* Hero */}

            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    textAlign:"center",
                    marginTop:"70px"
                }}
            >

                <h1
                    style={{
                        fontSize:"80px",
                        maxWidth:"700px",
                        marginBottom:"30px"
                    }}
                >

                    Elevate Your
                    <br/>
                    Fitness Experience

                </h1>


                <p
                    style={{
                        width:"500px",
                        color:"rgba(255,255,255,0.7)",
                        fontSize:"18px",
                        weight:"bold"
                    }}
                >

                    Track workouts, monitor nutrition,
                    visualize progress and reach your
                    goals with FitPlus.

                </p>


                <button
                    onClick={() =>
                        setAuthMode("register")
                    }
                    style={{
                        marginTop:"30px",
                        padding:"14px 35px",
                        border:"none",
                        borderRadius:"30px",
                        cursor:"pointer",
                        fontWeight:"bold"
                    }}
                >
                    Start Training 
                </button>

            </div>


            {/* Typewriter */}

            <div
                style={{
                    marginTop:"100px",
                    textAlign:"center",
                    fontSize:"30px",
                    fontWeight:"bold",
                    minHeight:"50px"
                }}
            >

                <TypeAnimation

                    sequence={[

                        " Workout Tracking",
                        1500,

                        " Nutrition Targets",
                        1500,

                        " Progress Charts",
                        1500,

                        "Smart Scheduling",
                        1500,

                        " Rest Timers",
                        1500,

                        

                    ]}

                    speed={50}
                    repeat={Infinity}

                />

            </div>


            {authMode && (

                <AuthModal
                    mode={authMode}
                    closeModal={() =>
                        setAuthMode(null)
                    }
                />

            )}

        </div>

    );

}

export default LandingPage;