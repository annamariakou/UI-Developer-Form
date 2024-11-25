import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "public", "userData.json");

app.get("/api/users", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error reading file" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post("/api/users", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error reading file" });
    } else {
      const users = JSON.parse(data);
      const newUser = req.body;
      users.push(newUser);
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          res.status(500).json({ error: "Error writing file" });
        } else {
          res.status(201).json(newUser);
        }
      });
    }
  });
});

app.put("/api/users/:email", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error reading file" });
    } else {
      let users = JSON.parse(data);
      const updatedUser = req.body;
      users = users.map((user) =>
        user.email === req.params.email ? updatedUser : user
      );
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          res.status(500).json({ error: "Error writing file" });
        } else {
          res.status(200).json(updatedUser);
        }
      });
    }
  });
});

app.delete("/api/users/:email", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error reading file" });
    } else {
      let users = JSON.parse(data);
      users = users.filter((user) => user.email !== req.params.email);
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          res.status(500).json({ error: "Error writing file" });
        } else {
          res.status(200).json({ message: "User deleted" });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
