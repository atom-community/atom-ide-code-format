import type { TextEditor, TextChange, Disposable } from "atom";
declare type AggregatedTextChange = {
    changes: Array<TextChange>;
};
import type { TextEdit } from "@atom-ide-community/nuclide-commons-atom/text-edit";
import type { BusySignalService } from "atom-ide-base";
import type { FileCodeFormatProvider, OnSaveCodeFormatProvider, OnTypeCodeFormatProvider, RangeCodeFormatProvider } from "./types";
import { Range } from "atom";
import ProviderRegistry from "@atom-ide-community/nuclide-commons-atom/ProviderRegistry";
import UniversalDisposable from "@atom-ide-community/nuclide-commons/UniversalDisposable";
import { Observable } from "rxjs-compat/bundles/rxjs-compat.umd.min.js";
import type { Subscription } from "rxjs";
export declare const SAVE_TIMEOUT = 2500;
declare type FormatEvent = {
    type: "command" | "save" | "new-save";
    editor: TextEditor;
} | {
    type: "type";
    editor: TextEditor;
    edit: AggregatedTextChange;
};
export default class CodeFormatManager {
    _subscriptions: UniversalDisposable;
    _rangeProviders: ProviderRegistry<RangeCodeFormatProvider>;
    _fileProviders: ProviderRegistry<FileCodeFormatProvider>;
    _onTypeProviders: ProviderRegistry<OnTypeCodeFormatProvider>;
    _onSaveProviders: ProviderRegistry<OnSaveCodeFormatProvider>;
    _busySignalService: BusySignalService | undefined | null;
    constructor();
    /**
     * Subscribe to all formatting events (commands, saves, edits) and dispatch formatters as necessary. By handling all
     * events in a central location, we ensure that no buffer runs into race conditions with simultaneous formatters.
     */
    _subscribeToEvents(): Subscription;
    _handleEvent(event: FormatEvent): Observable<unknown>;
    _formatCodeInTextEditor(editor: TextEditor, range?: Range): Observable<Array<TextEdit>>;
    _formatCodeOnTypeInTextEditor(editor: TextEditor, aggregatedEvent: AggregatedTextChange): Observable<Array<TextEdit>>;
    _onWillSaveProvider(): {
        priority: number;
        timeout: number;
        callback: (editor: TextEditor) => any;
    };
    _formatCodeOnSaveInTextEditor(editor: TextEditor): Observable<TextEdit>;
    _reportBusy<T>(editor: TextEditor, promise: Promise<T>, revealTooltip?: boolean): Promise<T>;
    addRangeProvider(provider: RangeCodeFormatProvider): Disposable;
    addFileProvider(provider: FileCodeFormatProvider): Disposable;
    addOnTypeProvider(provider: OnTypeCodeFormatProvider): Disposable;
    addOnSaveProvider(provider: OnSaveCodeFormatProvider): Disposable;
    consumeBusySignal(busySignalService: BusySignalService): Disposable;
    dispose(): void;
}
export {};
