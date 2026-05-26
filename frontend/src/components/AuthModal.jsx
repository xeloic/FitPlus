import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function AuthModal({mode, closeModal}) {

    const navigate = useNavigate();

    const [formData,setFormData] = useState({

        name:"",
        email:"",
        password:""

    });

    async function handleSubmit() {

    try {

        if(mode==="register"){

            const response =
                await api.post(
                    "/auth/register",
                    {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    }
                );

            console.log(
                "REGISTER:",
                response.data
            );

            alert(
                "Registration successful 🎉"
            );

            closeModal();

            return;
        }


        const response =
            await api.post(
                "/auth/login",
                {
                    email: formData.email,
                    password: formData.password
                }
            );

        console.log(
            "LOGIN:",
            response.data
        );

        if(response.data){

    localStorage.setItem(
        "token",
        response.data
    );

    navigate("/dashboard");
}

        navigate(
            "/dashboard"
        );

    }

    catch(error){

        console.log(
            "AUTH ERROR:",
            error.response?.data
        );

        alert(
            `${mode} failed`
        );

    }

}


    return(

        <div
            style={{
                position:"fixed",
                top:0,
                left:0,
                width:"100%",
                height:"100%",
                background:"rgba(0,0,0,0.7)",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}
        >

            <div
                style={{
                    width:"350px",
                    background:"#181818",
                    padding:"30px",
                    borderRadius:"20px",
                    border:"1px solid white",
                    color:"white"
                }}
            >

                <h2>

                    {

                    mode==="login"

                    ?

                    "Login"

                    :

                    "Create Account"

                    }

                </h2>

                {

                mode==="register"

                &&

                <input

                    placeholder="Name"

                    onChange={(e)=>

                        setFormData({

                            ...formData,
                            name:e.target.value

                        })

                    }

                    style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"15px"
                    }}
                />

                }


                <input

                    placeholder="Email"

                    onChange={(e)=>

                        setFormData({

                            ...formData,
                            email:e.target.value

                        })

                    }

                    style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"15px"
                    }}
                />



                <input

                    type="password"

                    placeholder="Password"

                    onChange={(e)=>

                        setFormData({

                            ...formData,
                            password:e.target.value

                        })

                    }

                    style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"20px"
                    }}
                />



                <button

                    onClick={handleSubmit}

                    style={{
                        width:"100%",
                        padding:"12px",
                        border:"none",
                        borderRadius:"30px",
                        cursor:"pointer"
                    }}
                >

                    {

                    mode==="login"

                    ?

                    "Login"

                    :

                    "Register"

                    }

                </button>


                <button

                    onClick={closeModal}

                    style={{
                        width:"100%",
                        marginTop:"10px",
                        background:"transparent",
                        color:"white",
                        border:"none"
                    }}
                >

                    Close

                </button>

            </div>

        </div>

    );

}

export default AuthModal;