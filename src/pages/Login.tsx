// import React, { useState } from "react";
// import { CustomInput } from "../components/input";
// import { CustomButton } from "../components/button";
// import { EyeOff, Eye } from "lucide-react";
// import * as SC from "../../style";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../../api/axios";
// import { jwtDecode } from "jwt-decode";

// export default function LogIn() {
//   const [identifier, setIdentifier] = useState(""); // username or email
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await API.post("/auth/login", {
//       email: identifier,
//       password,
//     });

//     const token = res.data.token;
//     localStorage.setItem("token", token);

//     // Decode the token
//     const decoded = jwtDecode<{ isAdmin?: boolean }>(token);

//     // Debug output
//     console.log("Decoded Token:", decoded);

//     // Navigate based on role
//     if (decoded.isAdmin) {
//       navigate("/admin");
//     } else {
//       navigate("/home");
//     }

//   } catch (error) {
//     setErrorMsg(error.response?.data?.message || "Login failed.");
//   }
// };

//   return (
//     <SC.Main className="min-h-screen flex items-center justify-center bg-background">
//       <div className="bg-container text-light-text py-8 px-3 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center">
//         <h2 className="text-[16px] text-left font-semibold mb-10 mt-5">
//           Vic Movies Zone
//         </h2>
//         <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <CustomInput
//             name="email"
//             placeholder="Email"
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//             rightIcon={null}
//           />

//           <CustomInput
//             name="password"
//             placeholder="Password"
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

//           {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

//           <p className="text-btn-text text-left cursor-pointer">
//             Forgot Password?
//           </p>

//           <CustomButton
//             type="submit"
//             title="Log In"
//             className="w-full p-3"
//           />

//           <span className="flex justify-between mt-2">
//             <Link to="/sign_Up" className="w-[42%]">
//               <CustomButton
//                 type="button"
//                 title="Sign Up"
//                 className="w-full bg-input p-[6px]"
//               />
//             </Link>

//             <CustomButton
//               type="button"
//               title="Continue as guest"
//               className="w-[56%] bg-input"
//             />
//           </span>
//         </form>
//       </div>
//     </SC.Main>
//   );
// }

import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { CustomButton } from "../components/button";
import { EyeOff, Eye } from "lucide-react";
import * as SC from "../../style";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import logo from "/logo.png";

export default function LogIn() {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email: identifier,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      // Decode the token
      const decoded = jwtDecode<{ isAdmin?: boolean }>(token);
      console.log("Decoded Token:", decoded);

      // Navigate based on role
      if (decoded.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <SC.Main className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 px-3 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center">
        <span className=" flex justify-between items-center p-4 mb-5">
          <h2 className="text-[16px] text-left font-semibold">
            Vic Movies Zone
          </h2>
          <Link to="/home">
            <img src={logo} alt="" className="h-10" />
          </Link>
        </span>
        <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <CustomInput
            name="email"
            placeholder="Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="password"
            placeholder="Password"
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

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <p className="text-btn-text text-left cursor-pointer">
            Forgot Password?
          </p>

          <CustomButton type="submit" title="Log In" className="w-full p-3" />

          <span className="flex justify-between mt-2">
            <Link to="/sign_Up" className="w-[42%]">
              <CustomButton
                type="button"
                title="Sign Up"
                className="w-full bg-input p-[6px]"
              />
            </Link>

            <CustomButton
              type="button"
              title="Continue as guest"
              className="w-[56%] bg-input"
            />
          </span>
        </form>
      </div>
    </SC.Main>
  );
}
