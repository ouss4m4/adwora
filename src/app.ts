import express from "express";
import path from "path";
import routes from "./routes";
import expressLayouts from "express-ejs-layouts";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);

app.set("layout", "layout");

app.use(express.static(path.join(__dirname, "../public")));

// Use routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
