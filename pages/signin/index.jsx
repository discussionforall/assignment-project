import React, { useState } from "react";
import { Img, Text } from "../../components";
import { useRouter } from "next/navigation";
import axios from "axios";

const SigninPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <div className="bg-homebg flex pb flex-col font-montserrat sm:gap-10 md:gap-10 gap-[109px] items-center justify-end mx-auto h-lvh w-full ">
        <div className="flex flex-col gap-[35px] items-center justify-start md:px-5 w-300">
          <Text
            className="sm:text-4xl	 text-white text-center font-montserrat lg:text-6xl font-semibold leading-20"
            size="txtMontserratSemiBold64"
          >
            Sign in
          </Text>
          <div className="flex flex-col items-center justify-start w-full pb-[109px]">
            <input
              type="text"
              placeholder="Username"
              className="pt-[11px] pr-0 pb-2.5 pl-4 mb-6 placeholder-white rounded-[10px] min-h-[45px] bg-customColor  text-white text-left font-montserrat text-sm font-normal leading-6 focus:outline-none w-full "
              wrapClassName="w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="pt-[11px] pr-0 pb-2.5 pl-4 mb-6 placeholder-white rounded-[10px] min-h-[45px] bg-customColor  text-white text-left font-montserrat text-sm font-normal leading-6 focus:outline-none w-full "
              wrapClassName="mt-6 w-full"
            />

            <div>
              <label className="flex items-center text-white text-center font-montserrat text-sm font-normal leading-6">
                <input
                  type="checkbox"
                  className="mr-[8px] custom-checkbox-style"
                />
                Remember me
              </label>
            </div>
            <button
              className="w-full rounded-[10px] pt-[15px] pb-[15px]  lg:pr-[126px] lg:pl-[126px] bg-primaryColor text-white cursor-pointer font-bold min-w-[300px] mt-[27px] text-base text-center"
              type="button"
              shape="round"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
        <Img className="w-full" src="images/img_vectors.svg" alt="vectors" />
      </div>
    </>
  );
};

export default SigninPage;
