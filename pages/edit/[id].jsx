import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Img, Text } from "../../components";
import { useRouter, useParams } from "next/navigation";

const ImageUploader = ({ onImageUpload, src, alt }) => {
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        setImage(imageData);

        // Pass the image data to the parent component
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
      {src ? (
       <img
       src={src}
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
        </>
      )}
    </div>
  );
};

const EditPage = () => {
  const router = useRouter();
  const param = useParams();
  // console.log("searchParams", param);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`/api/movie/${param?.id}`);
        const fetchedMovie = response.data.data;
        // console.log("response", response);
        setMovie({
          title: fetchedMovie.title,
          publishYear: fetchedMovie.publishYear,
          image: fetchedMovie.image,
        });
      } catch (error) {
        console.error("Error fetching movie data", error);
      }
    };

    fetchMovieData();
  }, [param?.id]);

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

  const handleUpdateClick = async () => {
    try {
      const response = await axios.put(`/api/movie/update/${param?.id}`, movie);

      console.log("Movie updated:", response.data.data);

      router.push("/movielist");
    } catch (error) {
      console.error("Error updating movie", error);
    }
  };

  return (
    <>
      <div className="bg-teal-900 flex flex-col font-montserrat items-center justify-end mx-auto pt-[117px] w-full">
        <div className="flex flex-col md:gap-10 gap-[89px] justify-start w-full">
          <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between max-w-[962px] mx-auto md:px-5 w-full">
            <div className="flex md:flex-1 flex-col md:gap-10 gap-[119px] items-center justify-start w-[52%] md:w-full">
              <Text
                className="text-5xl sm:text-[38px] md:text-[44px] text-center text-white-A700"
                size="txtMontserratSemiBold48"
              >
                Edit
              </Text>
              <div className="bg-cover bg-no-repeat flex flex-col h-[504px] items-center justify-center p-[166px] md:px-10 sm:px-5 w-[97%] md:w-full">
                <div className="flex flex-col gap-3 items-center justify-start my-[58px] w-full">
                  <ImageUploader
                    onImageUpload={handleImageUpload}
                    src={movie.image}
                    alt={movie.title}
                  />
                </div>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start md:mt-0 mt-[178px] w-[38%] md:w-full">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={movie.title}
                onChange={handleChange}
                className="p-0 placeholder:text-white-A700 text-center text-sm w-full"
                wrapClassName="w-full"
              />
              <input
                name="publishYear"
                placeholder="Publishing year"
                value={movie.publishYear}
                onChange={handleChange}
                className="p-0 placeholder:text-white-A700 text-center text-sm w-full"
                wrapClassName="mt-6 w-3/5"
              />
              <div className="flex flex-row gap-4 items-center justify-between mt-16 w-full">
                <Button
                  className="cursor-pointer font-bold min-w-[167px] text-base text-center"
                  shape="round"
                  color="white_A700"
                  variant="outline"
                  onClick={() => router.push("/movielist")}
                >
                  Cancel
                </Button>
                <Button
                  className="cursor-pointer font-bold min-w-[179px] text-base text-center"
                  shape="round"
                  onClick={handleUpdateClick}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
          <Img className="w-full" src="images/img_vectors.svg" alt="vectors" />
        </div>
      </div>
    </>
  );
};

export default EditPage;
