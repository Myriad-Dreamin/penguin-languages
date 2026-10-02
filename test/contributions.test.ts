/**
 * Every plugin under plugins/: its grammar, its exported metadata and its generated manifest
 * agree. The server lists a language from the manifest alone, so an alias or extension that only
 * the grammar or the code carries never reaches the App.
 */
import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = new URL("../plugins/", import.meta.url);
const dirs = readdirSync(root).filter((d) => d.startsWith("language-"));

type Grammar = { name: string; scopeName: string; aliases?: string[]; fileTypes?: string[] };
type Entry = { id: string; language: string; aliases?: string[]; extensions?: string[] };

describe.each(dirs)("%s", (dir) => {
  const id = dir.slice("language-".length);

  it("ships one grammar, named after the language", async () => {
    const all = (await import(`@shikijs/langs/${id}`)).default as Grammar[];
    expect(all).toHaveLength(1);
    expect(all[0]!.name).toBe(id);
    expect(all[0]!.scopeName).toBeTruthy();
  });

  it("covers every alias and extension the grammar declares, and the manifest says the same", async () => {
    const mod = (await import(`../plugins/${dir}/src/index.ts`)) as {
      language: Omit<Entry, "id">;
      grammar: Grammar;
    };
    expect(mod.language.language).toBe(id);
    expect(mod.language.aliases ?? []).toEqual(expect.arrayContaining(mod.grammar.aliases ?? []));
    expect(mod.language.extensions ?? []).toEqual(
      expect.arrayContaining(mod.grammar.fileTypes ?? []),
    );
    const table = JSON.parse(readFileSync(new URL(`${dir}/ifaces.json`, root), "utf8")) as {
      modules: Record<string, { contributes: Record<string, Entry[]> }>;
    };
    const [manifest] = Object.values(table.modules);
    const [entry, ...rest] = manifest!.contributes["LanguagesModule.grammars"]!;
    expect(rest).toEqual([]);
    const { id: contributionId, ...data } = entry!;
    expect(contributionId).toBe(`language.${id}`);
    expect(data).toEqual(mod.language);
  });
});
