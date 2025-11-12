// Is this a comment in JavaScript?
// Passphrase Generator with Salt and Random Number
// November 11, 2025 - Patrick Celedio

browser.theme.getCurrent().then(theme => {
  console.log(theme.colors);
});

// Return a random word
function randomWord(){
    
    // Create array object to hold word
    const array = new Uint32Array(1);

    // Use crypto to generate random values to choose words
    crypto.getRandomValues(array);

    const idx = array[0] % WORDS.length;

    return WORDS[idx];
}

// Return a phrase
function generatePassphrase(count, salt, capitalize){
    
    // Declare constant array called words
    const words = [];

    // For each random word
    for (let i=0; i<count; i++){
        let w = randomWord();
        if (capitalize) {
            w = w.charAt(0).toUpperCase() + w.slice(1);
        }
        words.push(w);
    }
    const base = words.join(salt);
    const endNum = (crypto.getRandomValues(new Uint8Array(1))[0] % 100)
        .toString().padStart(2,"0");
    
    return base + salt + endNum;
    
}

document.addEventListener("DOMContentLoaded", () =>{
    const wordCountEl = document.getElementById("wordCount");
    const saltEl = document.getElementById("salt");
    const capitalizeEl = document.getElementById("capitalize");
    const resultEl = document.getElementById("result");
    const generateBtn = document.getElementById("generate");
    const copyBtn = document.getElementById("copy");
    const copyStatus = document.getElementById("copyStatus");

    function doGenerate(){
        const count = parseInt(wordCountEl.value, 10) || 4;
        const sep = saltEl.value !== "" ? saltEl.value : "#"; 
        const cap = capitalizeEl.checked;
        const pass = generatePassphrase(count, sep, cap);
        resultEl.value = pass;
    }

    generateBtn.addEventListener("click", doGenerate);
    copyBtn.addEventListener("click", async () => {
        try{
            await navigator.clipboard.writeText(resultEl.value);
            copyStatus.textContent = "Passphrase copied!";
            setTimeout(() => {
                copyStatus.textContent = "";
             }, 1500);
        } catch(e){
            copyStatus = "Error: Couldn't copy.";
        }
    });

    // Generate on open
    doGenerate();
});