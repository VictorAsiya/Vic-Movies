import React from "react";
import { CustomInput } from "../components/input";
import { CustomButton } from "../components/button";
import { EyeOff, Eye } from "lucide-react";
import * as SC from "../../style";

export default function Register() {
  const [Username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <SC.Main className="min-h-screen flex items-center justify-center bg-background">
      
      <div className="bg-container text-light-text p-8 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top">
        <h2 className="text-[16px] text-left font-semibold mb-10 mt-5">
          Vic Movies Zone
        </h2>
        <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
        <form className="space-y-4">
          <CustomInput
            name={"name"}
            placeholder="Username / Email"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
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
          <p className="text-btn-text text-left">Forgot Password?</p>

          <CustomButton
            type={"submit"}
            title={"Sign In"}
            className="w-full p-3"
          />

          <span className="flex justify-between mt-2">
            <CustomButton
              type={"submit"}
              title={"Sign Up"}
              className="w-[42%] bg-input p-[6px]"
            />
            <CustomButton
              type={"submit"}
              title={"Continue as guest"}
              className="w-[56%]  bg-input"
            />
          </span>
        </form>
      </div>
    </SC.Main>
  );
}
