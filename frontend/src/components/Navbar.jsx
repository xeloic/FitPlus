import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    function logout(){

        localStorage.removeItem("token");

        navigate("/");

    }

    const navStyle = ({isActive})=>({

        color:
            isActive
            ? "#7B61FF"
            : "rgba(255,255,255,0.85)",

        textDecoration:"none",

        fontWeight:
            isActive
            ? "600"
            : "400",

        transition:"all .3s ease",

        cursor:"pointer"
    });

    return(

        <div
            style={{

                width:"100%",

                display:"flex",

                justifyContent:"center",

                position:"fixed",

                top:"20px",

                zIndex:1000

            }}
        >

            <div
                style={{

                    display:"flex",

                    alignItems:"center",

                    gap:"40px",

                    padding:"18px 42px",

                    borderRadius:"50px",

                    background:
                        "rgba(255,255,255,0.05)",

                    backdropFilter:
                        "blur(30px)",

                    border:
                        "1px solid rgba(255,255,255,0.08)",

                    boxShadow:
                        `
                        0 0 25px rgba(123,97,255,.08),
                        inset 0 0 20px rgba(255,255,255,.03)
                        `,

                    minWidth:"600px"

                }}
            >

                <NavLink
                    to="/dashboard"
                    style={navStyle}
                >
                    Dashboard
                </NavLink>


                <NavLink
                    to="/training"
                    style={navStyle}
                >
                    Training
                </NavLink>


                <NavLink
                    to="/progress"
                    style={navStyle}
                >
                    Progress
                </NavLink>


                <NavLink
                    to="/history"
                    style={navStyle}
                >
                    History
                </NavLink>


                <span

                    onClick={logout}

                    style={{

                        color:"#ff6767",

                        cursor:"pointer",

                        transition:"0.3s"

                    }}

                    onMouseEnter={(e)=>
                        e.target.style.opacity=".7"
                    }

                    onMouseLeave={(e)=>
                        e.target.style.opacity="1"
                    }

                >

                    Logout

                </span>

            </div>

        </div>

    );

}

export default Navbar;