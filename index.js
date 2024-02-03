const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/user", async (req, res) => {
  console.log("GET /user");
  const userEmail = req.query.email;
  const user = await prisma.user.findUnique({
    where: { email: String(userEmail) },
  });
  res.json(user);
});

app.post("/user", async (req, res) => {
  const userEmail = req.body.email;
  const user = await prisma.user.create({
    data: { email: String(userEmail) },
  });
  res.json(user);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
