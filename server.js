const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

const messages = [
    {
        "code": "0000",
        "texts": ["hey"],
        "markers": [
            {
                "name":"sigma",
                "top":"10%",
                "left":"10%"
            }
        ]
    }
];

app.use(cors());
app.use(express.json());

// Get all messages
app.get("/data", (req, res) => {
    res.json(messages);
});

app.post("/data", (req, res) => {
    const { code, texts, markers } = req.body;

    let found = messages.find(entry => entry.code === code);

    if (found) {
        if (texts && texts.length > 0) {
            found.texts.push(...texts);
        }
        res.json({ message: "Updated existing session", updatedEntry: found });
    } else {
        const newMessage = { code: code, texts: texts || [], markers: markers || []  }; // Ensure "code" is included
        messages.push(newMessage);
        res.json({ message: "Created new session", newEntry: newMessage });
    }
});


app.listen(port, () => {
    console.log(`Server hosted on port ${port}`);
});


