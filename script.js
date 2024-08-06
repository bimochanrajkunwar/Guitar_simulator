document.addEventListener('DOMContentLoaded', () => {
    // Select all key elements and fret elements
    const keys = document.querySelectorAll('.key');
    const frets = document.querySelectorAll('.fret');

    // Function to play sound
    function playSound(keyCode) {
        const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
        if (audio) {
            audio.currentTime = 0; // Rewind to the start
            audio.play();
        } else {
            console.error(`Audio element not found for keyCode: ${keyCode}`);
        }
    }

    // Function to highlight frets on the fretboard
    function highlightFrets(keyCode) {
        // Remove highlight from all frets
        frets.forEach(fret => fret.classList.remove('highlight'));

        // Add highlight to frets with the same note value
        const note = getNoteFromKeyCode(keyCode);
        frets.forEach(fret => {
            if (fret.textContent.trim() === note) {
                fret.classList.add('highlight');
            }
        });
    }

    // Function to map keyCode to note
    function getNoteFromKeyCode(keyCode) {
        const notes = {
            67: 'C',
            68: 'D',
            69: 'E',
            70: 'F',
            71: 'G',
            65: 'A',
            66: 'B',
            72: 'C'
        };
        return notes[keyCode];
    }

    // Function to map note to keyCode
    function getKeyCodeFromNote(note) {
        const noteCodes = {
            'C': 67,
            'D': 68,
            'E': 69,
            'F': 70,
            'G': 71,
            'A': 65,
            'B': 66
        };
        return noteCodes[note];
    }

    // Function to add active class
    function addActiveClass(key) {
        key.classList.add('active');
        setTimeout(() => {
            key.classList.remove('active');
        }, 100);
    }

    // Function to remove active class
    function removeActiveClass(key) {
        key.classList.remove('active');
    }

    // Add click event listeners to each key
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const keyCode = key.dataset.key;
            playSound(keyCode);
            highlightFrets(keyCode);
            addActiveClass(key);
        });
    });

    // Add click event listeners to each fret
    frets.forEach(fret => {
        fret.addEventListener('click', () => {
            const note = fret.textContent.trim();
            const keyCode = getKeyCodeFromNote(note);
            const key = document.querySelector(`.key[data-key="${keyCode}"]`);
            if (key) {
                playSound(keyCode);
                highlightFrets(keyCode);
                addActiveClass(key);
            }
        });
    });

    // Add keydown event listener to play sounds using keyboard keys
    document.addEventListener('keydown', (e) => {
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        if (key) {
            playSound(e.keyCode);
            highlightFrets(e.keyCode);
            addActiveClass(key);
        }
    });

    // Add keyup event listener to remove active class
    document.addEventListener('keyup', (e) => {
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        if (key) {
            removeActiveClass(key);
        }
    });

    // Add click event listener to stop all sounds and remove highlights when clicking elsewhere
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.key') && !event.target.closest('.fret')) {
            // Stop all sounds
            document.querySelectorAll('audio').forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });

            // Remove all highlights and active classes
            frets.forEach(fret => fret.classList.remove('highlight'));
            keys.forEach(key => key.classList.remove('active'));
        }
    });
});