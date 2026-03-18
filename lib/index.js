const CAPACITY = 5;
        let buffer = new Array(CAPACITY).fill(null);
        let writePtr = 0; // The "Head"
        let readPtr = 0;  // The "Tail"
        let currentSize = 0;

        // Initialize UI
        const ring = document.getElementById('ring');
        function initUI() {
            ring.innerHTML = '';
            for(let i=0; i < CAPACITY; i++) {
                ring.innerHTML += `
                    <div class="slot" id="slot-${i}">
                        <div class="label" id="label-${i}"></div>
                        <div class="val" id="val-${i}">-</div>
                    </div>
                `;
            }
            updateUI();
        }

        function enqueue() {
            const input = document.getElementById('dataInput');
            const val = input.value;
            if(!val) return;

            // Logical Write
            buffer[writePtr] = val;
            
            // If we are full and writing, the read pointer must push forward (overwrite)
            if (currentSize === CAPACITY && writePtr === readPtr) {
                readPtr = (readPtr + 1) % CAPACITY;
                document.getElementById('status-msg').innerText = "Overwrite Occurred!";
            } else {
                currentSize++;
                document.getElementById('status-msg').innerText = "Data Added";
            }

            writePtr = (writePtr + 1) % CAPACITY;
            input.value = '';
            updateUI();
        }

        function dequeue() {
            if (currentSize === 0) {
                document.getElementById('status-msg').innerText = "Nothing to read!";
                return;
            }

            // Logical Read
            const data = buffer[readPtr];
            buffer[readPtr] = null; // Clear data
            readPtr = (readPtr + 1) % CAPACITY;
            currentSize--;

            document.getElementById('status-msg').innerText = `Read: ${data}`;
            updateUI();
        }

        function updateUI() {
            for(let i=0; i < CAPACITY; i++) {
                const slot = document.getElementById(`slot-${i}`);
                const label = document.getElementById(`label-${i}`);
                const valDisp = document.getElementById(`val-${i}`);

                valDisp.innerText = buffer[i] || '-';
                
                // Reset classes
                slot.className = 'slot';
                if(buffer[i]) slot.classList.add('has-data');
                
                let tags = [];
                if(i === writePtr) {
                    slot.classList.add('is-head');
                    tags.push("WRITE");
                }
                if(i === readPtr && currentSize > 0) {
                    slot.classList.add('is-tail');
                    tags.push("READ");
                }
                label.innerText = tags.join(" & ");
            }
        }

        initUI();