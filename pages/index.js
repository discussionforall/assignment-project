import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Img, Text } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("token");
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      className="text-white text-center font-montserrat text-lg font-bold leading-6"
      size="txtMontserratBold16"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

const Home = ({ movies }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="h-lvh bg-homebg flex flex-col font-montserrat items-center justify-start mx-auto sm:pt-[80px] md:pt-[80px] lg:pt-[121px] w-full">
        <div className="lg:px-0 md:px-6	 sm:px-6	 bg-homebg flex flex-col md:gap-10 gap-[109px] items-center justify-start w-full">
          <div className="flex flex-col items-center justify-start max-w-[1200px] mx-auto md:px-5 w-full">
            <div className="flex lg:flex-row  md:gap-10 items-center  justify-between w-full">
              <div className="flex sm:flex-1 flex-row gap-3 items-center  w-[26%] sm:w-full">
                <Text
                  className=" sm:text-3xl md:text-[44px] text-center font-montserrat text-4xl font-semibold leading-14 text-white"
                  size="txtMontserratSemiBold48"
                >
                  My movies
                </Text>
                {isLoggedIn ? (
                  <Img
                    className="cursor-pointer h-8 w-8 sm:w-6	sm:h-6 md:w-6	md:h-6"
                    src="images/img_addcircleoutlineblack24dp.svg"
                    alt="addcircleoutlin"
                    onClick={() => router.push("/createanewmovie")}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="flex sm:flex-1 flex-row gap-3  items-center justify-end  w-[9%] sm:w-full">
                {isLoggedIn ? (
                  <Logout />
                ) : (
                  <button
                    className="text-white text-center font-montserrat text-lg font-bold leading-6 lg:block md:hidden sm:hidden"
                    size="txtMontserratBold16"
                    onClick={() => router.push("/signin")}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
            <div className="min-h-80 sm:pb-[94px] md:pb-[94px] lg:pb-[0] md:gap-x-5	sm:gap-x-5 md:gap-y-10 sm:gap-y-10 lg:gap-6 grid md:grid-cols-2 sm:grid-cols-2  lg:grid-cols-4 justify-center  sm:pt-[80px] md:pt-[80px] lg:mt-[115px] w-full">
              {movies && movies.length > 0 ? (
                movies.map((movie) => (
                  <React.Fragment key={movie._id}>
                    <Link
                      className="pt-[8px] pb-[16px] pl-[8px] pr-[8px] rounded-lg bg-counterColor backdrop-filter backdrop-blur-md inline-flex flex-col items-start gap-4"
                      href={`/edit/${movie._id}`}
                    >
                      <Img src={movie.image} alt={movie.title} />
                      <h2 className="text-white font-montserrat text-lg font-medium leading-8">
                        {movie.title}
                      </h2>
                      <p className="mt-[-8px] text-white font-montserrat text-sm font-normal leading-6">
                        {movie.publishYear}
                      </p>
                    </Link>
                  </React.Fragment>
                ))
              ) : (
                <p>No movies available</p>
              )}
            </div>
            <div className=" sm:hidden md:hidden mt-[124px] gap-[8px] lg:flex flex-row items-center justify-center w-[16%] md:w-full">
              <Text
                className="mr-[10px] text-white text-center font-montserrat text-lg font-bold leading-6"
                size="txtMontserratBold16"
              >
                Prev
              </Text>
              <Button
                className="pt-[4px] pl-[12px] pb-[4px] pr-[12px] w-[32px] h-[32px] flex-shrink-0 rounded-md bg-primaryColor text-white text-center font-montserrat text-base font-bold leading-6"
                size="xs"
              >
                1
              </Button>
              <Text
                className="ml-[10px] text-white text-center font-montserrat text-lg font-bold leading-6"
                size="txtMontserratBold16"
              >
                Next
              </Text>
            </div>
          </div>
        </div>
        <Img
          className="bg-homebg h-full lg:w-full "
          src="images/img_vectors.svg"
          alt="vectors"
        />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  try {
    const host = req.headers.host;
    console.log("host", host)
    let apiUrl
    if(host == 'localhost:3000'){
      apiUrl = `http://${host}`; // for localhost
    }else {
      apiUrl = `https://${host}`; //for live
    }
    const response = await axios.get(`${apiUrl}/api/movie/movielist`);
    console.log(response,"response");
    const movies = response.data.data;
    return {
      props: {
        movies,
      },
    };
  } catch (error) {
    console.error("Error fetching movies", error);

    return {
      props: {
        movies: [],
      },
    };
  }
};

export default Home;
