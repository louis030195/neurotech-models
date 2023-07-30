const { Neurosity } = require("@neurosity/sdk");
const fs = require('fs');
const dotenv = require("dotenv");
const say = require('say');
dotenv.config();

const words = [
    "Trace",
    "Date",
    "Right",
    "Spring",
    "Bark",
    "Table",
    "Change",
    "Light",
    "Novel",
    "Bear",
    "Check",
    "Bat",
    "Rock",
    "Bank",
    "Match",
    "Pound",
    "Wave",
    "Jam",
    "Ring",
    "Band",
    "Type",
    "Mean",
    "Fall",
    "Leaves",
    "Park",
    "Bow",
    "Scale",
    "Cool",
    "Well",
    "Point",
    "Rose",
    "Model",
    "Pitch",
    "Page",
    "Club",
    "Plane",
    "Crane",
    "Plant",
    "Line",
    "Current",
    "Draw",
    "Strike",
    "Sink",
    "Charge",
    "Field",
    "Lie",
    "Spare",
    "Face",
    "Spot",
    "Court",
    "Order",
    "Post",
    "Master",
    "Cast",
    "Mine",
    "Express",
    "Seal",
    "Lead",
    "Capital",
    "Draft",
    "Card",
    "Mark",
    "Chest",
    "Root",
    "Sign",
    "Screen",
    "Head",
    "Fly",
    "Handle",
    "March",
    "Minute",
    "Sound",
    "Drop",
    "Race",
    "Clip",
    "Star",
    "Round",
    "Break",
    "Set",
    "Board",
    "Volume",
    "Turn"
];

main();

const intro = `I will read a word out loud.

You will need to repeat the word in your mind until I say the next word.

This will repeat for many words.`
async function main() {
    const neurosity = new Neurosity();

    await neurosity.login({
        email: process.env.NEUROSITY_EMAIL,
        password: process.env.NEUROSITY_PASSWORD
    })
        .catch(error => {
            console.log("error", error);
        });

    console.log("logged in");

    // Create a directory named by the current date
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`;
    if (!fs.existsSync(formattedDate)) {
        fs.mkdirSync(formattedDate);
    }

    // Say "procedure starting"
    say.speak('Procedure starting.\nHere is how it will go:\n' + intro, undefined, 0.8, (err) => {
        if (err) {
            return console.error('Text to speech failed:', err);
        }
        sayWordsFromList(words, neurosity, formattedDate);
    });
}

// Function that says a word from the list every 5 seconds and writes brainwaves to a file named after the word
function sayWordsFromList(words, neurosity, dirName) {
    let index = 0;
    setInterval(() => {
        const word = words[index % words.length];
        say.speak(word, undefined, 0.9, (err) => {
            if (err) {
                return console.error('Text to speech failed:', err);
            }

            const fileName = `${dirName}/${word}-${Date.now()}.jsonl`; // File named as the word in the created directory
            const logStream = fs.createWriteStream(fileName, { flags: 'a' });

            // Subscribe to brainwaves and keep a reference to the subscription
            const { unsubscribe } = neurosity.brainwaves("powerByBand").subscribe((brainwaves) => {
                const json = JSON.stringify(brainwaves);
                logStream.write(json + '\n');
            });

            // Unsubscribe 6 seconds later
            setTimeout(unsubscribe, 6000);

        });
        index++;
    }, 7000);
}
