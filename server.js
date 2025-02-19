const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

const messages = [
    {
        "code":"0000",
        "texts": [

        ]
    }
];

app.use(cors());

app.use(express.json());

app.get("/data", (req, res) => {
    res.json(messages);
})

app.post("/data", (req, res) => {
    const { code, texts } = req.body;

    const newMessage = {code, texts: texts || []};
    messages.push(newMessage);
    res.json(newMessage);
    
})


app.listen(port, () => {
    console.log(`server hosted on ${port}`);
})