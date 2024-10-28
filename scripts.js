// Cache DOM elements for better performance
const output = document.getElementById('output');
const input = document.getElementById('commandInput');

// Event Listener for input command (Enter key)
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processCommand(input.value);
        input.value = ''; // Clear input field
    }
});

/**
 * Processes the input command by the user.
 * @param {string} command - The command entered by the user.
 */
function processCommand(command) {
    const lowerCommand = command.toLowerCase().trim();

    // Display user command in the terminal
    displayOutput(`user@parthadokar:~$ ${command}`);
    
    // Handle the special 'clear' command
    if (lowerCommand === 'clear') {
        clearTerminal(); // Clear the terminal
        displayHelpMessage(); // Keep the help command on the screen
    } else if (lowerCommand !== 'help') {
        // Prevent the user from entering the 'help' command manually
        const response = generateResponse(lowerCommand);
        if (response) displayOutput(response); // Display the command output
    } else {
        displayOutput(`'${command}' is not allowed. Type another command.`);
    }
}

/**
 * Returns the response based on the command entered by the user.
 * @param {string} command - The command entered by the user.
 * @returns {string} - Response for the command.
 */
function generateResponse(command) {
    const commands = {
        about: 'I am a Cybersecurity fresher with skills in network security, ctf and scripting',
        skills: 'Skills: Python, Network Security, Understanding of Windows, Linux, and UNIX operating systems ',
        projects: 'Projects: <a href="https://github.com/parthadokar/Maya.io" target="_blank">Maya.io</a>',
        contact: 'Contact me at parthadokar@duck.com.',
        clear: ''
    };

    return commands[command] || `'${command}' is not recognized. Type another command.`;
}

/**
 * Displays output in the terminal.
 * @param {string} text - The text to display in the terminal.
 */
function displayOutput(text) {
    const newLine = document.createElement('div');
    newLine.classList.add('command-output');
    newLine.innerHTML = `<span>${text}</span>`;
    output.appendChild(newLine);
    scrollToBottom();
}

/**
 * Displays the help message at the top of the terminal.
 */
function displayHelpMessage() {
    displayOutput('Available commands: about, skills, projects, contact, clear');
}

/**
 * Clears the terminal output.
 */
function clearTerminal() {
    output.innerHTML = '';
}

/**
 * Scrolls the terminal output to the bottom when new content is added.
 */
function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
}

// Automatically display the 'help' message when the page loads
window.onload = function () {
    displayHelpMessage(); // Display the help message on load
};
