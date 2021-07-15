import featureConfig from '@atom-ide-community/nuclide-commons-atom/feature-config';

export function getFormatOnSave(editor: atom$TextEditor): boolean {
  const formatOnSave = (featureConfig.get('atom-ide-code-format.formatOnSave', {
    scope: editor.getRootScopeDescriptor(),
  }): any);
  return formatOnSave == null ? false : formatOnSave;
}

export function getFormatOnType(): boolean {
  return featureConfig.getWithDefaults(
    'atom-ide-code-format.formatOnType',
    false,
  );
}
