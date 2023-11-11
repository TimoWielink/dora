const express = require('express');
const axios = require('axios');
const multer = require('multer');
const { transcribe } = require('../public/javascripts/stt.js');
const fs = require('fs');
const pool = require('../db.js');  // Adjust the path if necessary

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Endpoint to render the map page (assuming you have an 'map.ejs' view)
router.get('/', (req, res) => {
    res.render('map');
});


// // Audio Endpoint for Google STT
// router.post('/transcribe', upload.single('audio'), async (req, res) => {
//     if (!req.file) {
//         res.status(400).send('No audio file uploaded');
//         return;
//     } else {
//         console.log("Audio file uploaded");


//     }

//     const audioBuffer = req.file.buffer;
//     console.log("Size of received audioBuffer:", audioBuffer.length);

//     fs.writeFileSync('debug_audio_2.wav', audioBuffer);


//     // Introduce a delay of 2 seconds before making the transcription request
//     setTimeout(async () => {
//         try {
//             const transcription = await transcribe(audioBuffer);
//             if (transcription) {
//                 res.send(transcription);
//             } else {
//                 res.status(500).send('Failed to transcribe audio');
//             }
//         } catch (error) {
//             console.error("Error during transcription:", error);
//             res.status(500).send('Internal Server Error');
//         }
//     }, 2000);

// Endpoint for sending data to Zapier OpenAI API


router.post('/sendToZapier', async (req, res) => {
    const userInput = req.body.text;

    // Insert the userInput into the database
    const insertQuery = `
        INSERT INTO users_prompts (user_name)
        VALUES ($1)
        RETURNING id;
    `;

    const values = [userInput];
    try {
        const result = await pool.query(insertQuery, values);

        if (result.rows[0] && result.rows[0].id) {
            console.log(`User input inserted with ID: ${result.rows[0].id}`);
        }
    } catch (error) {
        console.error("Error inserting data into database:", error.message);
    }

    try {
        // Send data to Zapier OpenAI API
        const response = await axios.post('https://hooks.zapier.com/hooks/catch/10533227/38ryhrh/', {
            data: userInput
        });

        // Handle the API response as needed
        const apiResponse = response.data;

        // Send response back to frontend
        res.json({
            success: true,
            data: apiResponse
        });

        console.log("Request Sent to Zapier");

    } catch (error) {
        console.error("Error sending data to Zapier:", error.message);
        res.json({
            success: false,
            message: "Failed to send data to Zapier."
        });
    }
});



router.post('/receiveFromZapier', (req, res) => {
    // Check if the request body exists and is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
        console.error("No data received from Zapier.");
        return res.status(400).json({ success: false, message: "No data received." });
    }

    // If data is present, reformat it
    let formattedData = {
        content: req.body[''] || 'No content provided'
    };
    zapierData = formattedData;
    console.log("Received data from Zapier:", zapierData);

    // Send a success response
    res.json({ success: true });
});

let zapierData = {}; // This ensures the variable is accessible throughout your JS file

router.get('/getZapierData', (req, res) => {
    res.json(zapierData);
});



module.exports = router;
