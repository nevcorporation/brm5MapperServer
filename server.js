const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

const messages = ['heydude','cool'];

app.use(cors());

app.use(express.json());

app.get("/data", (req, res) => {
    res.json(messages);
})

app.post("/data", (req, res) => {
    const { message } = req.body;
    if(message && message.trim()) {
        messages.push(message);
        res.json(message);
    } else {
        res.status(200).send('ERROR');
    }
    
})


app.listen(port, () => {
    console.log(`server hosted on ${port}`);
})