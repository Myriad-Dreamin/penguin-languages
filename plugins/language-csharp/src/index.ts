/**
 * @myriad-dreamin/penguin-language-csharp: C# syntax highlighting for PenguinHarness.
 *
 * One TextMate grammar, contributed through the `LanguagesModule.grammars` slot. The server
 * lists the language from the manifest below without importing this package, and the Web App
 * fetches the grammar the first time a conversation shows C#. A grammar is data: Shiki's
 * JavaScript regex engine interprets it, and nothing here is evaluated in the browser.
 *
 * The grammar is `@shikijs/langs/csharp`, the document the App's bundled path would load.
 */
import grammars from "@shikijs/langs/csharp";
import { Bind, Component } from "@prismshadow/penguin-core/plugin";
import type {
  LanguageContribution,
  LanguageGrammar,
  Plugin,
} from "@prismshadow/penguin-core/plugin";

/**
 * What the App needs before the grammar loads: every alias and extension the grammar declares,
 * plus those it does not. The manifest below states the same; the repository's test compares
 * the two, and both with the grammar.
 */
export const language: LanguageContribution = {
  language: "csharp",
  displayName: "C#",
  aliases: ["c#", "cs"],
  extensions: ["cs", "csx"],
};

/** `@shikijs/langs` exports a grammar plus what it embeds; this one embeds nothing. */
export const grammar: LanguageGrammar = grammars[0];

@Component({
  contributes: {
    "LanguagesModule.grammars": [
      {
        id: "language.csharp",
        language: "csharp",
        displayName: "C#",
        aliases: ["c#", "cs"],
        extensions: ["cs", "csx"],
      },
    ],
  },
})
export class CSharpLanguage {
  @Bind("language.csharp") grammar!: LanguageGrammar;

  setup() {
    this.grammar = grammar;
  }
}

const plugin: Plugin = { modules: [CSharpLanguage] };
export default plugin;
