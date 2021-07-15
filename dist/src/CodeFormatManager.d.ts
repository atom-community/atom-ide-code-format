import { Range, CompositeDisposable, TextEditor, Disposable, BufferStoppedChangingEvent } from "atom";
import type { TextEdit, BusySignalService } from "atom-ide-base";
import type { FileCodeFormatProvider, OnSaveCodeFormatProvider, OnTypeCodeFormatProvider, RangeCodeFormatProvider } from "./types";
import { ProviderRegistry } from "atom-ide-base/commons-atom/ProviderRegistry";
export declare const SAVE_TIMEOUT = 2500;
export default class CodeFormatManager {
    _subscriptions: CompositeDisposable;
    _rangeProviders: ProviderRegistry<RangeCodeFormatProvider>;
    _fileProviders: ProviderRegistry<FileCodeFormatProvider>;
    _onTypeProviders: ProviderRegistry<OnTypeCodeFormatProvider>;
    _onSaveProviders: ProviderRegistry<OnSaveCodeFormatProvider>;
    _busySignalService: BusySignalService | undefined;
    constructor();
    _formatCodeInTextEditor(editor: TextEditor, range?: Range): Promise<Array<TextEdit>>;
    _formatCodeOnTypeInTextEditor(editor: TextEditor, aggregatedEvent: BufferStoppedChangingEvent): Promise<Array<TextEdit>>;
    _formatCodeOnSaveInTextEditor(editor: TextEditor): Promise<TextEdit[]>;
    _reportBusy<T>(editor: TextEditor, promise: Promise<T>, revealTooltip?: boolean): Promise<T>;
    addRangeProvider(provider: RangeCodeFormatProvider): Disposable;
    addFileProvider(provider: FileCodeFormatProvider): Disposable;
    addOnTypeProvider(provider: OnTypeCodeFormatProvider): Disposable;
    addOnSaveProvider(provider: OnSaveCodeFormatProvider): Disposable;
    consumeBusySignal(busySignalService: BusySignalService): Disposable;
    dispose(): void;
}
