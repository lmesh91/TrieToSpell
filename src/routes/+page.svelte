<script lang="ts">
  import { onMount } from "svelte";

  // Setup editor TipTap
  import {
    createEditor,
    Editor,
    EditorContent,
    BubbleMenu,
  } from "svelte-tiptap";
  import StarterKit from "@tiptap/starter-kit";
  import { Extension } from "@tiptap/core";
  import { Plugin } from "@tiptap/pm/state"
  import { Decoration, DecorationSet } from '@tiptap/pm/view';

  // trie
  import { Trie } from "$lib/trie/trie.ts";
  let props = $props();
  let trie = new Trie(props.data.content);

  // Custom trie editor extension for detecting incorrect words
  const HighlightTyposExtension = Extension.create({
    name: "highlightTypos",

    addProseMirrorPlugins() {
        const typoPlugin = new Plugin({
          state: {
            init(_, { doc }) {
                return createTypos(doc);
            },
            apply(tr, set) {
                if (tr.docChanged) {
                    return createTypos(tr.doc);
                }

                return set.map(tr.mapping, tr.doc);
            },
          },
          props: {
            decorations(state) {
              return typoPlugin.getState(state);
            },
          },
        })

        function createTypos(doc) {
            let typos = [];
              let wordIndices = splitIntoWords(doc.textContent);
              for (let {startIndex, endIndex} of wordIndices) {
                typos.push(
                  Decoration.inline(startIndex + 1, endIndex + 1, {
                    style: "background: red",
                  }),
                );
              }
              return DecorationSet.create(doc, typos);
        }
        return [typoPlugin];
    },
  });

  /**
   * Returns the number of different characters between two strings.
   * @param a
   * @param b
   */
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
    });

    mapB.forEach((value, key, map) => {
      if (!mapA.has(key)) {
        count += value;
      }
    });

    return count;
  }

  let trieEditor = $state();
  let kdEditor = $state();

  let trieText = $state("");
  let KdText = $state("");

  onMount(() => {
    trieEditor = createEditor({
      extensions: [
        StarterKit,
        HighlightTyposExtension
      ],
      onUpdate: ({ editor }) => {
        trieText = editor.getText();
        handleTrieInput();
      },
      content: "Hello, world!",
      editorProps: {
        attributes: {
          spellcheck: "false",
          autocomplete: "off",
          autocapitalize: "off",
        },
      },
    });

    kdEditor = createEditor({
      extensions: [StarterKit],
      onUpdate: ({ editor }) => {
        KdText = editor.getText();
        handleKdInput();
      },
      content: "Hello, world!",
      editorProps: {
        attributes: {
          spellcheck: "false",
          autocomplete: "off",
          autocapitalize: "off",
        },
      },
    });
  });

  let trieTimer;
  let kdTimer;

  function handleTrieInput() {
    clearTimeout(trieTimer);

    trieTimer = setTimeout(() => {
      console.log("User stopped typing. Checking trie..");
    //   let words = splitIntoWords(trieText);
    //   for (let word of words) {
        // word = word.toLowerCase();
        // const correct = [...new Set(trie.autocorrect(word))];
        // correct.sort((a, b) => Math.abs(word.length - a.length) - Math.abs(word.length - b.length));
        // correct.sort(
        //   (a, b) => numDifferentChars(word, a) - numDifferentChars(word, b),
        // );
        // if (!correct.includes(word)) {
        //   const adjustedSuggestions = correct.filter((word) => word.length > 1);
        //   console.log(adjustedSuggestions);
        // }
    //   }
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
   function splitIntoWords(inputString: string) {
    let startIndex = 0;
    let wordIndices = [];
    const hasAlphaAhead = /^[^ ]*\w/;
    for (let c = 0; c < inputString.length; c++) {
      let isPunctuation = /[.,;:!??\-_]/.test(inputString[c]);
      let isSpace = inputString[c] === " ";

      const nextChar = inputString[c+1];
      const isTerminal = !nextChar || nextChar === " ";
      let isWordBreak = isSpace || (isPunctuation && (isTerminal || !hasAlphaAhead.test(inputString.slice(c))));
      
      if (isWordBreak) {
        if (c > startIndex) {
            wordIndices.push({
                startIndex,
                endIndex: c,
                word: inputString.slice(startIndex, c)
            })
        }
        startIndex = c + 1;

        if (isPunctuation && nextChar === " ") {
            c++; 
            startIndex = c + 1;
        }
      }
    }

    if (startIndex < inputString.length) {
        const lastWord = inputString.slice(startIndex);
        // Ensure the last "word" isn't just trailing dots
        if (/\w/.test(lastWord)) {
            wordIndices.push({
                startIndex,
                endIndex: inputString.length,
                word: lastWord
            });
        }
    }

    console.log(wordIndices)
    return wordIndices;
  }
</script>

<section id="body">
  <div class="impl">
    <h2>Trie</h2>
    {#if $trieEditor}
      <EditorContent class="editor" editor={$trieEditor} />
      <BubbleMenu class="autocorrect-menu" editor={$trieEditor}>
        <p>Suggestions:</p>
        <button> S1 </button>
        <button> S2 </button>
      </BubbleMenu>
    {/if}
  </div>
  <div class="impl">
    <h2>K-d Tree</h2>
    {#if $kdEditor}
      <EditorContent class="editor" editor={$kdEditor} />
      <BubbleMenu editor={$kdEditor} />
    {/if}
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

  :global(.editor) {
    width: clamp(45vw, 500px, 80vw);
    height: clamp(40vh, 500px, 60vh);
    border: solid rgba(0, 0, 0, 0.8) 1px;
    border-radius: 7px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
    padding: 10px;
    overflow-y: auto;
    font-family: monospace;
  }

  :global(.tiptap:focus) {
    outline: none;
  }

  :global(.tiptap) {
    height: 100%;
    font-size: 1rem;
  }

  :global(.autocorrect-menu) {
    border: solid 1px black;
    border-radius: 4px;
    background: white;
    padding: 2px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>
