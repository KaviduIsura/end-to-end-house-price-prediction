const express = require('express');
const app = express();

app.use(express.json());

const predictRoute = require('./src/routes/predict.routes');
app.use('/api', predictRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
