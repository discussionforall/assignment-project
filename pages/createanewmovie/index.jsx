import React, { useState } from "react";
import axios from "axios";
import withAuth from "@/utils/withAuth";
import { Img, Text } from "../../components";
import { useRouter } from "next/navigation";

const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        setImage(imageData);
        onImageUpload(imageData);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="md:w-[400px] sm:w-[275px]  md:h-[372px] sm:h-[372px] lg:w-[473px] lg:h-[504px] border-2 border-dashed border-gray-300 rounded-8 flex items-center justify-center cursor-pointer "
    >
      {image ? (
        <Img
          src={image}
          alt="Uploaded"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ) : (
        <>
          <div className="flex items-center flex-col">
            <Img
              className="rotate-90 lg:h-8 lg:w-8 sm:w-6	sm:h-6 md:w-6	md:h-6"
              src="images/img_logoutblack24dp.svg"
              alt="logoutblack24dp"
            />
            <p className="text-white text-center font-montserrat text-sm font-normal leading-6">
              Drag & drop an image here
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const CreateANewMoviePage = () => {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({ title: "", publishYear: "", image: "" });

  const handleChange = (e) => {
    const input = e.target;
    if (input) {
      setMovie((prev) => ({ ...prev, [input.name]: input.value }));
    }
  };

  const handleImageUpload = (imageData) => {
    setMovie((prev) => ({ ...prev, image: imageData }));
  };

  const addMovie = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/movie", movie);
      setMovies((prev) => [...prev, data.data]);
      setMovie({ title: "", publishYear: "", image: "" });
      console.log("Movie data created:", data.data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-homebg flex flex-col font-montserrat items-center justify-end mx-auto lg:pt-[120px] sm:px-6	md:px-6	 lg:px-[120px] sm:pt-[80px] md:pt-[80px] w-full">
        <div className="w-full">
          <Text
            className="lg:pl-[130px] sm:text-[32px] md:text-[32px] md:font-semibold sm:font-semibold text-white text-left font-montserrat lg:text-4xl font-semibold leading-14"
            size="txtMontserratSemiBold48"
          >
            Create a new movie{" "}
          </Text>
          <div className="grid lg:grid-rows-3 lg:grid-flow-col gap-4 lg:my-[120px]">
            <div className=" lg:row-span-3 lg:order-1 md:order-2 sm:order-2 mx-auto">
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
            <div className="lg:col-span-2 lg:order-2 md:order-1 sm:order-1 md:items-center md:mt-[80px] sm:mt-[80px] lg:mt-[0px]  sm:items-center lg:items-baseline md:items-center	 flex flex-col">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={movie.title}
                onChange={handleChange}
                className=" pt-[11px] pr-0 pb-2.5 pl-4 mb-6 placeholder-white rounded-[10px] lg:min-h-[45px] bg-customColor  text-white text-left font-montserrat text-sm font-normal leading-6 focus:outline-none sm:w-full md:w-full lg:w-[362px]"
                wrapClassName="w-full"
              />
              <input
                name="publishYear"
                placeholder="Publishing year"
                value={movie.publishYear}
                onChange={handleChange}
                className=" pt-[11px] pr-0 pb-2.5 pl-4 mb-6 placeholder-white rounded-[10px] min-h-[45px] bg-customColor  text-white text-left font-montserrat text-sm font-normal leading-6 focus:outline-none lg:w-[216px] sm:w-full md:w-full"
                wrapClassName="mt-6 w-3/5"
              />
            </div>
            <div className="lg:row-span-2 lg:col-span-2 lg:order-3 lg:block md:order-3 sm:order-3 md:flex  sm:flex md:gap-4 lg:mb-6 sm:mb-[83px]	md:mb-[83px] sm:gap-4	">
              <button
                className="md:pl-[40px] md:pr-[40px] sm:pr-[40px] sm:pl-[40px] lg:mr-[24px]  md:pt-[16px] sm:pt-[16px] md:pb-[16px] sm:pb-[16px] md:w-full sm:w-full border border-solid border-white p-4 lg:w-[179px] rounded-[10px] pt-[16px] pb-[16px]  pr-[55px] pl-[55px] bg-transparent text-white cursor-pointer font-bold  text-base text-center"
                shape="round"
                color="white_A700"
                variant="outline"
                onClick={() => router.push("/")}
              >
                Cancel
              </button>
              <button
                className=" md:pl-[40px] md:pr-[40px] sm:pr-[40px] sm:pl-[40px]  md:pt-[16px] sm:pt-[16px] md:pb-[16px] sm:pb-[16px] md:w-full sm:w-full lg:w-[167px] rounded-[10px] pt-[16px] pb-[16px]  pr-[55px] pl-[55px] bg-primaryColor text-white cursor-pointer font-bold   text-base text-center"
                shape="round"
                onClick={addMovie}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Img
        className="bg-homebg w-full lg:block md:block sm:hidden "
        src="/images/img_vectors.svg"
        alt="vectors"
      />
      <Img
        className="bg-homebg w-full lg:hidden md:hidden sm:block "
        src="/images/mVectors.png"
        alt="vectors"
      />
    </>
  );
};

export default withAuth(CreateANewMoviePage);
