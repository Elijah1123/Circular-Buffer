let buffer = [null, null, null];
        let pointer = 0;

        function addToBuffer() {
            const val = document.getElementById('bufferInput').value;
            if(!val) return;

            // LOGIC: Circular overwrite
            buffer[pointer] = val;
            
            // Visual feedback: Highlight the slot being written to
            document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
            const currentSlot = document.getElementById(`s${pointer}`);
            currentSlot.innerText = val;
            currentSlot.classList.add('active');

            pointer = (pointer + 1) % buffer.length; // Wrap back to 0
        }
    