import fs from "fs";
import generate from "./generator.js";

const app = (filename) => {
  if (!filename) {
    console.log("Please input filename!!!");
    return;
  }

  const filePath = `./${filename}`;

  // Read the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    try {
      const obj = JSON.parse(data);
      const htmlStr = generate(obj);
      console.log(htmlStr);
    } catch(e) {
      console.error("Invalid JSON format");
    }
  });
}

app(process.argv[2]);
