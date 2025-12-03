const fs = require("fs");

const server = require("http").createServer();

server.on("request", (req, res) => {
  //Solution 1 - Read entire file at once - Not appropriate for large files - took 4080 ms
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log("Error reading the file...");
  //     res.end(data);
  //   });
  //Solution 2 - Read and Write in chunks - Very fast - 238 ms
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("close", () => {
  //     res.end();
  //   });

  //Solution 3 - to tackle back pressure

  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to localhost:8000...");
});
