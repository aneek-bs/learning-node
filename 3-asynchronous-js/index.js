//1 - Read the text from dog.txt
//2 - Do a HTTP Request to get an image for the dog of thar breed
//3 - Save that image in another file

//Hit  https://dog.ceo/api/breed/hound/images/random

const fs = require('fs');
const superagent = require('superagent');

//Callback Helll!
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   if (err) return console.log(err.message);
//   console.log(`Breed : ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);
//       fs.writeFile('dog-image.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Dog image saved to the file..');
//       });
//     });
// });

//Solution - Use promise,,

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    //Creating the buzzer..
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file!!'); //make the buzzer vibrate red!
      resolve(data); //make the buzzer vibrate green!
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write the file!!');
      resolve('Success...');
    });
  });
};

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    //Buzzer 1 vibrates green (file is read). We get 'data'.
    console.log(`Breed : ${data}`);

    //We return a new promise (an API call)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    //Buzzer 2 vibrates green (API called and response received). We get 'res'.
    console.log(res.body.message);

    return writeFilePro('dog-image.txt', res.body.message);
  })
  .then(() => {
    //Buzzer 3 vibrates Green (file written)
    console.log('Dog image saved to the file..');
  })
  .catch((err) => {
    console.log(err.message);
  });
  */

//Using async await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);
    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-image.txt', imgs.join('\n'));
    console.log('Dog image saved to the file..');
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return '2: Ready!';
};

/*
console.log('1: Will get dog pics!');
getDogPic().then((x) => console.log(x));
console.log('3: Done getting dog pics!');
*/

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log(err.message);
  }
})();
