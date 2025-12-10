const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app'); //Why this is mandatory to place after dotenv? If placed before, we were getting NODE_ENV as udndefined

//START THE SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
