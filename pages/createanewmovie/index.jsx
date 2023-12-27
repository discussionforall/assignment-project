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
      style={{
        width: "300px",
        height: "300px",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {image ? (
        <img
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
        <p>Drag & drop an image here</p>
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
      router.push("/movielist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-homebg flex flex-col font-montserrat items-center justify-end mx-auto pt-[117px] w-full">
        <div className="flex flex-col md:gap-10 gap-[89px] justify-start w-full">
          <div className="flex md:flex-col lg:flex-row md:gap-10 items-start justify-between max-w-[80%] mx-auto md:px-5 w-full">
            <div className="flex md:flex-1 flex-col md:gap-10 gap-[119px] items-start justify-start w-[52%] md:w-full">
              <Text
                className="text-white text-center font-montserrat text-4xl font-semibold leading-14"
                size="txtMontserratSemiBold48"
              >
                Create a new movie{" "}
              </Text>
              <div className="bg-cover bg-no-repeat flex flex-col items-center justify-center lg:p-[0px] md:px-10 sm:px-5 lg:w-[97%] md:w-full">
                <div className="flex flex-col gap-3 items-start justify-start my-[60px] w-full">
                  <ImageUploader onImageUpload={handleImageUpload} />
                </div>
              </div>
            </div>
            <div className="pt-[140px] flex md:flex-1 flex-col items-start justify-start md:mt-0 mt-[178px] w-[38%] md:w-full">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={movie.title}
                onChange={handleChange}
                className="pt-[11px] pr-0 pb-2.5 pl-4 mb-6 placeholder-white rounded-[10px] min-h-[45px] bg-customColor  text-white text-left font-montserrat text-sm font-normal leading-6 focus:outline-none lg:w-[362px]"
                wrapClassName="w-full"
              />
              <input
                name="publishYear"
                placeholder="Publishing year"
                value={movie.publishYear}
                onChange={handleChange}
                className="pt-[11px] pr-0 pb-2.5 pl-4 mb-6 placeholder-white rounded-[10px] min-h-[45px] bg-customColor  text-white text-left font-montserrat text-sm font-normal leading-6 focus:outline-none lg:w-[216px]"
                wrapClassName="mt-6 w-3/5"
              />
              <div className="flex flex-row gap-4 items-center justify-between mt-16 w-full">
                <button
                  className="border border-solid border-white p-4 w-[179px] rounded-[10px] pt-[16px] pb-[16px]  pr-[55px] pl-[55px] bg-transparent text-white cursor-pointer font-bold  text-base text-center"
                  shape="round"
                  color="white_A700"
                  variant="outline"
                  onClick={() => router.push("/movielist")}
                >
                  Cancel
                </button>
                <button
                  className="w-[167px] rounded-[10px] pt-[16px] pb-[16px]  pr-[55px] pl-[55px] bg-primaryColor text-white cursor-pointer font-bold   text-base text-center"
                  shape="round"
                  onClick={addMovie}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <Img className="w-full" src="images/img_vectors.svg" alt="vectors" />
        </div>
      </div>
    </>
  );
};

export default withAuth(CreateANewMoviePage);
