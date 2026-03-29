<script lang="ts">
  import { onMount, tick } from "svelte";

  // Setup editor TipTap
  import { createEditor, EditorContent } from "svelte-tiptap";
  import StarterKit from "@tiptap/starter-kit";
  import { Extension } from "@tiptap/core";
  import { Plugin, TextSelection } from "@tiptap/pm/state";
  import { Decoration, DecorationSet } from "@tiptap/pm/view";
  import { KDTree } from "$lib/kd-tree/kd.ts";
  import { Trie } from "$lib/trie/trie.ts";
  import { numDifferentChars, splitIntoWords } from "$lib/util.ts";
  import loading_icon from "$lib/assets/loading_icon.gif";

  let props = $props();
  let Kd = null;
  let trie = new Trie(props.data.content);
  let Kd_built = $state(false);

  // Custom trie editor extension for detecting incorrect words
  const HighlightTyposExtensionTrie = Extension.create({
    name: "highlightTyposTrie",

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
      });

      function createTypos(doc) {
        let typos = [];
        let wordIndices = splitIntoWords(doc.textContent);
        for (let { startIndex, endIndex, word } of wordIndices) {
          let wordSearch = trie.search(word.toLowerCase());
          if (wordSearch == undefined || wordSearch.isWord === false) {
            typos.push(
              Decoration.inline(startIndex + 1, endIndex + 1, {
                class: "typo",
              }),
            );
          }
        }
        return DecorationSet.create(doc, typos);
      }
      return [typoPlugin];
    },
  });

  // Custom kd tree extension for detecting incorrect words
  const HighlightTyposExtensionKd = Extension.create({
    name: "highlightTyposKd",

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
      });

      function createTypos(doc) {
        let typos = [];
        let wordIndices = splitIntoWords(doc.textContent);
        for (let { startIndex, endIndex, word } of wordIndices) {
          if (Kd_built && Kd.search(word.toLowerCase()) === false) {
            typos.push(
              Decoration.inline(startIndex + 1, endIndex + 1, {
                class: "typo",
              }),
            );
          }
        }
        return DecorationSet.create(doc, typos);
      }
      return [typoPlugin];
    },
  });

  // Custom extension for menu with suggestion opening
  const TypoMenuPlugin = Extension.create({
    name: "typoMenu",

    addProseMirrorPlugins() {
      return [
        new Plugin({
          state: {
            init() {
              return {
                active: false,
                pos: null,
                word: "",
                suggestions: [],
              };
            },
            apply(tr, value) {
              const openMeta = tr.getMeta("openTypoMenu");
              const closeMeta = tr.getMeta("closeTypoMenu");
              if (openMeta) {
                return { active: true, ...openMeta };
              }
              if (closeMeta || tr.docChanged)
                return { active: false, pos: null, word: "", suggestions: [] };
              return value;
            },
          },
          props: {
            decorations(state) {
              const { active, pos, word, suggestions } = this.getState(state);

              if (!active) return DecorationSet.empty;

              return DecorationSet.create(state.doc, [
                Decoration.widget(
                  pos,
                  (view) => {
                    const anchor = document.createElement("span");
                    anchor.style.position = "relative";
                    anchor.style.width = "0";
                    anchor.style.display = "inline-block";
                    anchor.setAttribute("contenteditable", "false");

                    const menu = document.createElement("div");
                    menu.classList.add("autocorrect-menu");
                    menu.setAttribute("contenteditable", "false");

                    const { left } = view.coordsAtPos(pos);
                    const editorWidth = view.dom.clientWidth;

                    if (left > editorWidth * 0.7) {
                      menu.style.right = "0";
                      menu.style.left = "auto";
                    } else {
                      menu.style.left = "0";
                      menu.style.right = "auto";
                    }

                    const addToDictBtn = document.createElement("button");
                    addToDictBtn.className = "addToDictButton";
                    addToDictBtn.innerText = "Add to Dictionary";
                    addToDictBtn.onmousedown = (e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      trie.insert(word);
                      if (Kd_built) {
                        Kd.insert(word);
                      }

                      view.dispatch(
                        view.state.tr
                          .insertText(word, pos - word.length, pos)
                          .setMeta("closeTypoMenu", true),
                      );
                      view.focus();
                    };

                    suggestions.forEach((suggestion) => {
                      const button = document.createElement("button");
                      button.className = "suggestion-button";
                      button.innerText = suggestion;

                      button.onmousedown = (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        const { tr } = view.state;
                        const from = pos - word.length;
                        const to = pos;

                        view.dispatch(
                          view.state.tr
                            .insertText(suggestion, from, to)
                            .setMeta("closeTypoMenu", true),
                        );
                        view.focus();
                      };
                      menu.appendChild(button);
                    });
                    menu.appendChild(addToDictBtn);
                    anchor.appendChild(menu);
                    return anchor;
                  },
                  {
                    side: 1,
                    stopEvent: () => true,
                  },
                ),
              ]);
            },
          },
        }),
      ];
    },
  });

  let trieEditor = $state();
  let kdEditor = $state();

  onMount(async () => {
    trieEditor = createEditor({
      extensions: [StarterKit, HighlightTyposExtensionTrie, TypoMenuPlugin],
      content: "Hello, world!",
      editorProps: {
        attributes: {
          spellcheck: "false",
          autocomplete: "off",
          autocapitalize: "off",
        },
        handleClick: (view, pos, event) => {
          const target = event.target as HTMLElement;

          if (target.classList.contains("typo")) {
            const word = target.innerText;

            const rawSuggestions = [
              ...new Set(trie.autocorrect(word.toLowerCase())),
            ];

            let suggestions = rawSuggestions
              .sort(
                (a, b) =>
                  numDifferentChars(word, a) - numDifferentChars(word, b),
              )
              .slice(0, 5);

            const startPos = view.posAtDOM(target, 0);
            const endPos = startPos + word.length;

            view.dispatch(
              view.state.tr.setMeta("openTypoMenu", {
                pos: endPos,
                word,
                suggestions,
              }),
            );

            return true;
          }

          return false;
        },
      },
    });

    kdEditor = createEditor({
      extensions: [StarterKit, HighlightTyposExtensionKd, TypoMenuPlugin],
      content: "Hello, world!",
      editorProps: {
        attributes: {
          spellcheck: "false",
          autocomplete: "off",
          autocapitalize: "off",
        },
        handleClick: (view, pos, event) => {
          const target = event.target as HTMLElement;

          if (Kd_built && target.classList.contains("typo")) {
            const word = target.innerText;

            const rawSuggestions = [
              ...new Set(Kd.autocorrect(word.toLowerCase())),
            ];

            let suggestions = rawSuggestions
              .sort((a, b) => a[1] - b[1])
              .slice(0, 5)
              .map(([suggestion]) => suggestion);

            const startPos = view.posAtDOM(target, 0);
            const endPos = startPos + word.length;

            view.dispatch(
              view.state.tr.setMeta("openTypoMenu", {
                pos: endPos,
                word,
                suggestions,
              }),
            );

            return true;
          }

          return false;
        },
      },
    });
    // Wait for the browser to finish loading, since
    // constructing the kd-tree takes a few seconds
    await new Promise((r) => setTimeout(r, 0));
    Kd = new KDTree(props.data.content);
    Kd_built = true;
  });
</script>

{#if Kd_built}
  <section id="body">
    <div class="impl">
      <h2>Trie</h2>
      {#if $trieEditor}
        <EditorContent class="editor" editor={$trieEditor} />
      {/if}
    </div>
    <div class="impl">
      <h2>K-d Tree</h2>
      {#if $kdEditor}
        <EditorContent class="editor" editor={$kdEditor} />
      {/if}
    </div>
  </section>
{:else}
  <div class="loadingText"><p>Loading...</p></div>
{/if}

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

  :global(.typo) {
    text-decoration: underline wavy red;
    border: solid 1px red;
    cursor: pointer;
    border-radius: 4px;
    background: rgba(255, 0, 0, 0.1);
    padding: 2px;
    position: relative;
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
    line-height: 2;
  }

  :global(.tiptap:focus) {
    outline: none;
  }

  :global(.tiptap) {
    height: 100%;
    font-size: 1rem;
  }

  :global(.autocorrect-menu) {
    position: absolute;
    top: 1em;
    border: solid 1px black;
    border-radius: 4px;
    background: white;
    padding: 2px;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
  }

  :global(button) {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    border-bottom: solid 1px black;
  }

  :global(.addToDictButton) {
    border-bottom: none;
  }

  .loadingText {
    width: 100vw;
    height: 100vh;
    font-size: 4rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
