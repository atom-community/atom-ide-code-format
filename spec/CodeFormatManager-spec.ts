import { Range } from "atom"
import { observeTextEditors } from "@atom-ide-community/nuclide-commons-atom/FileEventHandlers"
import CodeFormatManager, { SAVE_TIMEOUT } from "../src/CodeFormatManager"
import UniversalDisposable from "@atom-ide-community/nuclide-commons/UniversalDisposable"
import temp from "temp"
import * as config from "../src/config"
import { waitFor, sleep } from "./utils"

jasmine.DEFAULT_TIMEOUT_INTERVAL = SAVE_TIMEOUT + 100
describe("CodeFormatManager", () => {
  let textEditor
  let manager
  let disposables
  beforeEach(async () => {
    manager = new CodeFormatManager()
    disposables = new UniversalDisposable(observeTextEditors())
    temp.track()
    const file = temp.openSync()
    textEditor = await atom.workspace.open(file.path)
  })
  afterEach(async () => {
    manager.dispose()
    disposables.dispose()
  })
  it("formats an editor on request", async () => {
    manager.addRangeProvider({
      grammarScopes: ["text.plain.null-grammar"],
      priority: 1,
      formatCode: () =>
        Promise.resolve([
          {
            oldRange: new Range([0, 0], [0, 3]),
            oldText: "abc",
            newText: "def",
          },
        ]),
    })
    textEditor.setText("abc")
    atom.commands.dispatch(atom.views.getView(textEditor), "code-format:format-code")
    await waitFor(() => textEditor.getText() === "def")
  })
  it("format an editor using formatEntireFile", async () => {
    manager.addFileProvider({
      grammarScopes: ["text.plain.null-grammar"],
      priority: 1,
      formatEntireFile: () =>
        Promise.resolve({
          formatted: "ghi",
        }),
    })
    textEditor.setText("abc")
    atom.commands.dispatch(atom.views.getView(textEditor), "code-format:format-code")
    await waitFor(() => textEditor.getText() === "ghi")
  })
  it("formats an editor on type", async () => {
    spyOn(config, "getFormatOnType").and.returnValue(true)
    const provider = {
      grammarScopes: ["text.plain.null-grammar"],
      priority: 1,
      formatAtPosition: () =>
        Promise.resolve([
          {
            oldRange: new Range([0, 0], [0, 3]),
            oldText: "abc",
            newText: "def",
          },
        ]),
      keepCursorPosition: false,
    }
    const spy = spyOn(provider, "formatAtPosition")
    manager.addOnTypeProvider(provider)
    textEditor.setText("a")
    textEditor.setCursorBufferPosition([0, 1])
    textEditor.insertText("b")
    textEditor.insertText("c")
    await waitFor(() => textEditor.getText() === "def")
    // Debouncing should ensure only one format call.
    expect(spy.calls.count()).toBe(1)
  })
  it("formats an editor on save", async () => {
    spyOn(config, "getFormatOnSave").and.returnValue(true)
    manager.addOnSaveProvider({
      grammarScopes: ["text.plain.null-grammar"],
      priority: 1,
      formatOnSave: () =>
        Promise.resolve([
          {
            oldRange: new Range([0, 0], [0, 3]),
            oldText: "abc",
            newText: "def",
          },
        ]),
    })
    textEditor.setText("abc")
    await textEditor.save()
    expect(textEditor.getText()).toBe("def")
  })
  it("should still save on timeout", async () => {
    spyOn(config, "getFormatOnSave").and.returnValue(true)
    manager.addRangeProvider({
      grammarScopes: ["text.plain.null-grammar"],
      priority: 1,
      formatCode: async () => {
        await sleep(SAVE_TIMEOUT + 1000)
        return []
      },
    })
    const spy = spyOn(textEditor.getBuffer(), "save")
    textEditor.save()
    // Wait until the buffer has been saved and verify it has been saved exactly
    // once.
    await waitFor(() => spy.calls.count() > 0)
    expect(spy.calls.count()).toBe(1)
  })
})
