import React from "react";
import { Img, Text } from "../../components";

const MovieListColumnOne = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="bg-blue_gray-900 flex flex-col gap-4 h-[504px] md:h-auto items-start justify-start pb-4 pt-2 px-2 rounded-[12px] w-auto md:w-full">
          <div className="flex flex-col items-center justify-start w-full">
            <Img
              className="h-[400px] md:h-auto object-cover rounded-bl-[12px] rounded-br-[12px] w-full"
              alt="rectangleTwentyFour"
              src={props?.userimage}
            />
          </div>
          <div className="flex flex-col gap-[15px] items-start justify-start">
            <Text
              className="text-white-A700 text-xl"
              size="txtMontserratMedium20"
            >
              {props?.movietitle}
            </Text>
            <Text
              className="text-sm text-white-A700"
              size="txtMontserratRegular14"
            >
              {props?.releaseyear}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

MovieListColumnOne.defaultProps = {
  userimage: "images/img_rectangle24.png",
  movietitle: "Movie 1",
  releaseyear: "2021",
};

export default MovieListColumnOne;
