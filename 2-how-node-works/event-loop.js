const fs = require("fs");
const crypto = require("crypto");

const currDate = Date.now();
process.env.UV_THREADPOOL_SIZE = 3; //Setting this, we force the node application to run in a single thread.

setTimeout(() => {
  console.log("Timer 1 finished");
}, 0);
setImmediate(() => {
  console.log("Immediate 1 finished.");
});

setTimeout(() => {
  console.log("Timer 2 finished");
}, 3000);

fs.readFile("test-file.txt", () => {
  console.log("I/O 1 finished.");
  console.log("------------------");
  setTimeout(() => {
    console.log("---I/O-1----Timer 3 finished");
  }, 0);
  setTimeout(() => {
    console.log("---I/O-1----Timer 4 finished");
  }, 3000);
  setImmediate(() => {
    console.log("---I/O-1----Immediate 2 finished.");
  });

  process.nextTick(() => {
    console.log("---I/O-1----Process.nextTick 1 finished");
  });

  //Demonstrating thread pools - they all take same times as they get allocated to separate threads
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - currDate, "Password encrypted...");

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - currDate, "Password encrypted...");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - currDate, "Password encrypted...");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - currDate, "Password encrypted...");
  });
});

console.log("Hello from top-level code.");
