import React from "react";
import { Img, Text } from "../../components";
import { useRouter } from "next/navigation";

const EmptystatePage = () => {
  const router = useRouter();
  const addMovie = () => {
    router.push("/createanewmovie");
  };

  return (
    <>
      <div className="bg-homebg  flex pb flex-col font-montserrat sm:gap-10 md:gap-10 gap-[109px] justify-center items-center mx-auto h-lvh w-full">
        <div className="flex flex-col pt-[324px] pb-[213px] gap-[40px] items-center justify-start md:px-5 w-300">
          <Text
            className="text-white font-montserrat text-4xl font-semibold leading-14 sm:text-[32px] md:text-[44px] text-center text-white-A700 sm:font-semibold"
            size="txtMontserratSemiBold48"
          >
            Your movie list is empty
          </Text>
          <button
            className=" rounded-[10px] pt-[16px] pb-[16px]  pr-[28px] pl-[28px] bg-primaryColor text-white cursor-pointer font-bold md:w-auto lg:w-auto min-w-[202px] sm:w-[97%] text-base text-center"
            shape="round"
            onClick={addMovie}
          >
            Add a new movie
          </button>
        </div>
        <Img
          className="absolute bottom-0 w-full"
          src="images/img_vectors.svg"
          alt="vectors"
        />
      </div>
    </>
  );
};

export default EmptystatePage;
