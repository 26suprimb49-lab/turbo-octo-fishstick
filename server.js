const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/search", async (req, res) => {

    const q = req.query.q || "";

    try{

        const response = await fetch(
            "https://api.duckduckgo.com/?q=" +
            encodeURIComponent(q) +
            "&format=json"
        );

        const data = await response.json();

        res.json({
            answer:
            data.AbstractText ||
            data.Heading ||
            "No web answer found."
        });

    }catch(err){

        res.json({
            answer:"Search failed."
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
