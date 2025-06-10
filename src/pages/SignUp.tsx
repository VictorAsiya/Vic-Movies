// import React from "react";
// import { CustomInput } from "../components/input";
// import { CustomButton } from "../components/button";
// import { EyeOff, Eye, ArrowLeft } from "lucide-react";
// import * as SC from "../../style";
// import { Link } from "react-router-dom";

// import API from "../../api/axios";

// export default function SignUp() {
//   const [Username, setUsername] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleRegister = async () => {
//     try {
//       const res = await API.post("/auth/register", {
//         username: "johnDoe",
//         email: "john@example.com",
//         password: "secret123",
//       });
//       console.log(res.data); // Success message
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//     }

//     const handleLogin = async () => {
//       try {
//         const res = await API.post("/auth/login", {
//           email: "john@example.com",
//           password: "secret123",
//         });
//         localStorage.setItem("token", res.data.token);
//       } catch (error) {
//         console.error(error.response?.data || error.message);
//       }
//     };
//   };

//   return (
//     <SC.Main className="min-h-screen flex items-center justify-center bg-background">
//       <div className="bg-container text-light-text py-8 px-3  lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top">
//         <span className="flex gap-[31%]">
//           <Link to="/log_In">
//             <ArrowLeft size={20} />
//           </Link>
//           <h2 className="text-[16px] font-semibold mb-8">Vic Movies Zone</h2>
//         </span>
//         <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//         <form className="space-y-4">
//           <CustomInput
//             name={"name"}
//             placeholder="Username / Email"
//             value={Username}
//             onChange={(e) => setUsername(e.target.value)}
//             rightIcon={null}
//           />

//           <CustomInput
//             name="password"
//             placeholder="Create Password"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             rightIcon={
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             }
//           />

//           <CustomInput
//             name="password"
//             placeholder="Confirm Password"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             rightIcon={
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             }
//           />

//           <CustomButton
//             type={"submit"}
//             title={"Sign Up"}
//             className="w-full p-3"
//           />

//           <span className="flex justify-between mt-2"></span>
//         </form>
//       </div>
//     </SC.Main>
//   );
// }

import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { CustomButton } from "../components/button";
import { EyeOff, Eye, ArrowLeft } from "lucide-react";
import * as SC from "../../style";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrorMsg("Passwords do not match.");
    }

    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
      });

      // Automatically login user
      const loginRes = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", loginRes.data.token);
      navigate("/home"); // Replace with your dashboard/home route
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <SC.Main className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 px-3 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center">
        <span className="flex gap-[19vh] items-center mb-4">
          <Link to="/log_In">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-[16px] font-semibold">Vic Movies Zone</h2>
        </span>

        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <CustomInput
            name="username"
            placeholder="User-Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="email"
            placeholder="Username / Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="password"
            placeholder="Create Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <CustomInput
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <CustomButton type="submit" title="Sign Up" className="w-full p-3" />
        </form>
      </div>
    </SC.Main>
  );
}
