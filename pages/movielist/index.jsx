'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Img, Text } from "../../components";
import Link from "next/link";

const MovielistPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/movie/movielist");
        setMovies(response.data.data);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };

    fetchMovies();
  }, []);


  return (
    <>
      <div className="h-lvh bg-homebg flex flex-col font-montserrat items-center justify-start mx-auto pt-[121px] w-full">
        <div className=" bg-homebg flex flex-col md:gap-10 gap-[109px] items-center justify-start w-full">
          <div className="flex flex-col items-center justify-start max-w-[1200px] mx-auto md:px-5 w-full">
            <div className="flex lg:flex-row  sm:flex-col md:gap-10 items-center  justify-between w-full">
              <div className="flex sm:flex-1 flex-row gap-3 items-center  w-[26%] sm:w-full">
                <Text
                  className=" sm:text-3xl md:text-[44px] text-center font-montserrat text-4xl font-semibold leading-14 text-white"
                  size="txtMontserratSemiBold48"
                >
                  My movies
                </Text>
                <Img
                  className="h-8 w-8"
                  src="images/img_addcircleoutlineblack24dp.svg"
                  alt="addcircleoutlin"
                />
              </div>
              <div className="flex sm:flex-1 flex-row gap-3  items-center justify-end  w-[9%] sm:w-full">
                <a
                  href="javascript:"
                  className="text-white text-center font-montserrat text-lg font-bold leading-6"
                >
                  <Text size="txtMontserratBold16">Logout</Text>
                </a>
                <Img
                  className="h-8 w-8"
                  src="images/img_logoutblack24dp.svg"
                  alt="logoutblack24dp"
                />
              </div>
            </div>
            <div className="md:gap-5 lg:gap-6 grid sm:grid-cols-1 md:grid-cols-4 grid-cols-4 justify-center min-h-[auto] mt-[115px] w-full">
              {movies.map((movie) => (
                <React.Fragment key={movie._id}>
                   <Link
                    className="pt-[8px] pb-[16px] pl-[8px] pr-[8px] rounded-lg bg-counterColor backdrop-filter backdrop-blur-md inline-flex flex-col items-start gap-4"
                    href={`/edit/${movie._id}`}
                  >
                    <img src={movie.image} alt={movie.title} />
                    <h2 className="text-white font-montserrat text-lg font-medium leading-8">
                      {movie.title}
                    </h2>
                    <p className="mt-[-8px] text-white font-montserrat text-sm font-normal leading-6">
                      {movie.publishYear}
                    </p>
                  </Link>
                </React.Fragment>
              ))}
            </div>
            <div className="mt-[124px] gap-[8px] flex flex-row items-center justify-center w-[16%] md:w-full">
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
              <Button
                className="pt-[4px] pl-[12px] pb-[4px] pr-[12px] w-[32px] h-[32px] flex-shrink-0 rounded-md bg-counterColor text-white text-center font-montserrat text-base font-bold leading-6"
                color="blue_gray_900"
                size="xs"
              >
                2
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
          className="bg-homebg sm:h-[111px] lg:w-full "
          src="images/img_vectors.svg"
          alt="vectors"
        />
      </div>
    </>
  );
};

export default MovielistPage;
