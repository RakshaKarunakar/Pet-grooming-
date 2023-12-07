const express = require('express');
const cors = require('cors')

const connectTomongo = require('./database');
connectTomongo();

const app = express();
app.use(express.json());
app.use(cors ());


app.use('/api/petregister',require('./router/registerrouter'));
app.use('/api/petuserregister',require('./router/userregisterrouter'));

app.use('/api/petappointment',require('./router/appointmentrouter'));
app.use('/api/petcategory',require('./router/petcategoryrouter'));
app.use('/api/petfeedback',require('./router/feedbackrouter'));
app.use('/api/petservice',require('./router/servicerouter'));

app.use('/uploadscategory',express.static('./uploadscategory'));
app.use('/uploadadminphoto',express.static('./uploadadminphoto'));
app.use('/uploaduserphotos',express.static('./uploaduserphotos'));

const port = 7000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });
