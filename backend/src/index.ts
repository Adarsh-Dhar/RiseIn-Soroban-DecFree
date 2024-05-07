const express = require('express');
const app = express();

import { Request, Response } from 'express';

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});