const express = require("express");
const app = express();
require("dotenv").config();
require("./libs/mongodbLib").connect();
const routes = require("./routes");
const helmet = require("helmet");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swagger = require("./libs/swagger");


require('./utils/auth/strategies/basic');
require("./utils/auth/strategies/jwt");

const { PORT } = process.env;

app.use(express.json())

app.use(helmet())
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://finance.freddybarrios.com',
    'https://finance.freddybarrios.com'
  ],
  credentials: true,
}))
app.use(cookieParser())
routes(app);
swagger(app);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
