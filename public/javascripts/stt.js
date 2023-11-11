let recognition;
let isListening = false;

function startTranscription() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
    } else {
        console.error('Your browser does not support Web Speech API');
        return;
    }

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        isListening = true;
        console.log('Transcription started...');
    };

    recognition.onresult = function(event) {
        let interim_transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                document.getElementById('transcriptionOutput').textContent = event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        document.getElementById('transcriptionOutput').textContent += interim_transcript; // Append interim results
    };

    recognition.onerror = function(event) {
        console.error('Error occurred:', event.error);
    };

    if (!isListening) {
        recognition.start();
    } else {
        recognition.stop();
        isListening = false;
    }
}


// const fs = require('fs');
// const speech = require('@google-cloud/speech').v1p1beta1;


// const client = new speech.SpeechClient({
//   keyFilename: 'stt-google-api-key.json',
//   timeout: 60000,
//   languageCode: 'en-US',
//   enableAutomaticPunctuation: true,
//   model: 'video'
// });

// async function transcribe(audioBuffer) {
//   const request = {
//     audio: { content: audioBuffer.toString('base64') },
//     config: {
//       encoding: 'LINEAR16',
//       sampleRateHertz: 48000,
//       languageCode: 'en-US',
//     },
//   };

//   console.log('Starting transcription...');

//   try {
//     const [response] = await client.recognize(request);
    
//     // Enhanced Logging
//     console.log('Raw response from Google Cloud API:', JSON.stringify(response, null, 2));
    
//     if (response && response.results && Array.isArray(response.results)) {
//       const transcription = response.results.map(result => 
//         (result.alternatives && result.alternatives[0] && result.alternatives[0].transcript) || ''
//       ).join('\n');
//       console.log('Transcription result:', transcription);
//       return transcription;
//     } else {
//       throw new Error("Unexpected response format from Google Cloud API");
//     }
//   } catch (error) {
//     console.error('Error during transcription:', error);
//     return 'Error during transcription. Please try again.';
//   }
// }

// module.exports = { transcribe };
