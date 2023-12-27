import React, { useState } from "react";
import { Button, Img, Text } from "../../components";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.email === "admin@gmail.com" && formData.password === "admin") {
      router.push("/emptystate");
    } else {
      alert("Invalid credentials. Please try again.");
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
              name="email"
              placeholder="Email"
              className="pt-[11px] pr-0 pb-2.5 pl-4 mb-6 placeholder-white rounded-[10px] min-h-[45px] bg-customColor  text-white text-left font-montserrat text-sm font-normal leading-6 focus:outline-none w-full "
              wrapClassName="w-full"
              type="email"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              name="password"
              placeholder="Password"
              className="pt-[11px] pr-0 pb-2.5 pl-4 mb-6 placeholder-white rounded-[10px] min-h-[45px] bg-customColor  text-white text-left font-montserrat text-sm font-normal leading-6 focus:outline-none w-full "
              wrapClassName="mt-6 w-full"
              type="password"
              onChange={handleChange}
              value={formData.password}
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
              className="w-full rounded-[10px] pt-[15px] pb-[15px]  pr-[126px] pl-[126px] bg-primaryColor text-white cursor-pointer font-bold min-w-[300px] mt-[27px] text-base text-center"
              type="button"
              shape="round"
              onClick={handleSubmit}
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
