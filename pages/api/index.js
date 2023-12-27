import dbConnect from "../../utils/dbConnect";

const Main = async (req, res) => {
  const {method} = req


  await dbConnect()

  if (method === "GET") {
    try {
      return res.send("OK")
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
};

export default Main;
