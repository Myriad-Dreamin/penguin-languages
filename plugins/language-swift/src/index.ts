/**
 * @myriad-dreamin/penguin-language-swift: Swift syntax highlighting for PenguinHarness.
 *
 * One TextMate grammar, contributed through the `LanguagesModule.grammars` slot. The server
 * lists the language from the manifest below without importing this package, and the Web App
 * fetches the grammar the first time a conversation shows Swift. A grammar is data: Shiki's
 * JavaScript regex engine interprets it, and nothing here is evaluated in the browser.
 *
 * The grammar is `@shikijs/langs/swift`, the document the App's bundled path would load.
 */
import grammars from "@shikijs/langs/swift";
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
  language: "swift",
  displayName: "Swift",
  extensions: ["swift"],
};

/** `@shikijs/langs` exports a grammar plus what it embeds; this one embeds nothing. */
export const grammar: LanguageGrammar = grammars[0];

@Component({
  contributes: {
    "LanguagesModule.grammars": [
      { id: "language.swift", language: "swift", displayName: "Swift", extensions: ["swift"] },
    ],
  },
})
export class SwiftLanguage {
  @Bind("language.swift") grammar!: LanguageGrammar;

  setup() {
    this.grammar = grammar;
  }
}

const plugin: Plugin = { modules: [SwiftLanguage] };
export default plugin;
