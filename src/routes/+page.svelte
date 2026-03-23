<script>
    let trieText = $state("");
    let KdText = $state("");

    let trieTimer;
    let kdTimer;

    function handleTrieInput() {
        clearTimeout(trieTimer);

        trieTimer = setTimeout(() => {
            console.log("User stopped typing. Checking trie..")
        }, 500)
    };

    function handleKdInput() {
        clearTimeout(kdTimer);
        
        kdTimer = setTimeout(() => {
            console.log("User stopped typing. Checking k-D tree..")
        }, 500)
    };
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
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
