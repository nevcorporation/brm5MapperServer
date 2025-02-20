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
                "top": "50px",
                "left": "1000px"
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

// Post data (update or create)
app.post("/data", (req, res) => {
    const { code, texts, markers } = req.body;

    let found = messages.find(entry => entry.code === code);

    if (found) {
        if (texts && texts.length > 0) {
            found.texts.push(...texts);
        }
        if (markers && markers.length > 0) { // FIXED: Append new markers
            found.markers.push(...markers);
        }
        res.json({ message: "Updated existing session", updatedEntry: found });
    } else {
        if (!code) {
            return res.status(400).json({ error: "Code is required" }); // FIXED: Handle missing code
        }
        const newMessage = { code: code, texts: texts || [], markers: markers || [] };
        messages.push(newMessage);
        res.json({ message: "Created new session", newEntry: newMessage });
    }
});

app.listen(port, () => {
    console.log(`Server hosted on port ${port}`);
});
