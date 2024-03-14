import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5050;
const app = express();

const corsOrigin = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOrigin));
app.use(express.json());
app.use("/record", records);

app.use(bodyParser.json({ limit: "16mb" }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
