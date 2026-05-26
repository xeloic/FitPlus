import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name:"",
        email:"",
        password:""

    });

    async function handleRegister() {

        try{

            await api.post(

                "/auth/register",

                formData

            );

            alert(
                "Registration successful 🎉"
            );

            navigate(
                "/login"
            );

        }

        catch(error){

            console.log(error);

            alert(
                "Registration failed"
            );
        }
    }

    return(

        <div
            style={{
                minHeight:"100vh",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                background:"#111",
                color:"white"
            }}
        >

            <h1>
                Create Account 🚀
            </h1>

            <input

                placeholder="Name"

                value={formData.name}

                onChange={(e)=>

                    setFormData({

                        ...formData,
                        name:e.target.value

                    })

                }

                style={{
                    padding:"10px",
                    width:"250px",
                    margin:"10px"
                }}
            />

            <input

                placeholder="Email"

                value={formData.email}

                onChange={(e)=>

                    setFormData({

                        ...formData,
                        email:e.target.value

                    })

                }

                style={{
                    padding:"10px",
                    width:"250px",
                    margin:"10px"
                }}
            />

            <input

                type="password"

                placeholder="Password"

                value={formData.password}

                onChange={(e)=>

                    setFormData({

                        ...formData,
                        password:e.target.value

                    })

                }

                style={{
                    padding:"10px",
                    width:"250px",
                    margin:"10px"
                }}
            />

            <button

                onClick={handleRegister}

                style={{
                    padding:"10px 30px",
                    marginTop:"20px",
                    cursor:"pointer"
                }}
            >

                Register

            </button>

        </div>

    );
}

export default Register;