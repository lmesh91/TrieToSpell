<script lang="ts">
    import { Trie } from "$lib/trie/trie.ts";

    let props = $props();
    let trie = new Trie(props.data.content);
    let trieText = $state("");
    let KdText = $state("");

    function numDifferentChars(a, b) {
        const mapA = new Map<string, number>();
        const mapB = new Map<string, number>();

        for (let c = 0; c < a.length; c++) {
            const char = a[c];
            mapA.set(char, (mapA.get(char) ?? 0) + 1);
        }

        for (let c = 0; c < b.length; c++) {
            const char = b[c];
            mapB.set(char, (mapB.get(char) ?? 0) + 1);
        }

        let count = 0;

        mapA.forEach((value, key, map) => {
            const bValue = mapB.get(key) ?? 0;
            count += Math.abs(value - bValue);
        })

        mapB.forEach((value, key, map) => {
            if (!mapA.has(key)) {
                count += value;
            }
        })

        return count;
    }

    let trieTimer;
    let kdTimer;

    function handleTrieInput() {
        clearTimeout(trieTimer);

        trieTimer = setTimeout(() => {
            console.log("User stopped typing. Checking trie..");
            let words = splitIntoWords(trieText);
            for (let word of words) {
                word = word.toLowerCase();
                const correct = [...new Set(trie.autocorrect(word))];
                //correct.sort((a, b) => Math.abs(word.length - a.length) - Math.abs(word.length - b.length));
                correct.sort(
                    (a, b) =>
                        numDifferentChars(word, a) - numDifferentChars(word, b),
                );
                if (!correct.includes(word)) {
                    const adjustedSuggestions = correct.filter(word => 
                        word.length > 1
                    )
                    console.log(adjustedSuggestions);
                }
            }
        }, 300);
    }

    function handleKdInput() {
        clearTimeout(kdTimer);

        kdTimer = setTimeout(() => {
            console.log("User stopped typing. Checking k-D tree..");
            let words = splitIntoWords(KdText);
            console.log(words);
        }, 300);
    }

    /**
     * For a given input string, splits into an array of words.
     * Words are delimited by spaces.
     * Words can contain punctuation marks, UNLESS they are the last character;
     * e.g.: "The r.ed fox" 'r.ed' is a word
     * but in "The red. Fox" 'red.' is not the word; 'red' is.
     * This helps correctly identify typos.
     * @param inputString
     */
    function splitIntoWords(inputString) {
        let words = inputString.split(" ");
        for (let c = 0; c < words.length; c++) {
            let endsInPeriod = words[c].endsWith(".");
            let endsInComma = words[c].endsWith(",");
            let endsInSemicolon = words[c].endsWith(";");
            let endsInColon = words[c].endsWith(":");
            let endsInQuestionMark = words[c].endsWith("?");
            let endsInExclamationMark = words[c].endsWith("!");

            let endsInPunctuation =
                endsInPeriod ||
                endsInComma ||
                endsInSemicolon ||
                endsInColon ||
                endsInQuestionMark ||
                endsInExclamationMark;
            if (endsInPunctuation) {
                words[c] = words[c].slice(0, -1);
            }

            // First period already cut out... (or just a .. ellipsis)
            let endsInEllipses = words[c].endsWith("..");
            if (endsInEllipses) {
                words[c] = words[c].slice(0, -2);
            }
        }
        return words;
    }
</script>

<section id="body">
    <div class="impl">
        <h2>Trie</h2>
        <textarea
            bind:value={trieText}
            spellcheck="false"
            autocomplete="off"
            autocapitalize="off"
            oninput={handleTrieInput}
        ></textarea>
    </div>
    <div class="impl">
        <h2>K-d Tree</h2>
        <textarea
            bind:value={KdText}
            spellcheck="false"
            autocomplete="off"
            autocapitalize="off"
            oninput={handleKdInput}
        ></textarea>
    </div>
</section>

<style>
    #body {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
    }

    h2 {
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
        font-weight: bold;
    }

    textarea {
        resize: none;
        width: clamp(45vw, 500px, 80vw);
        height: clamp(40vh, 500px, 60vh);
        border: solid rgba(0, 0, 0, 0.8) 1px;
        border-radius: 7px;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
        transition: 0.3s;
        padding: 10px;
        font-size: 1rem;
    }

    textarea:hover {
        box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.5);
    }
</style>
