require('dotenv').config();
const app = require('./app/app.js');
const port = process.env.PORT || 8000;
// console.log(process);
// Server
app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});

