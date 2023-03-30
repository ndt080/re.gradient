export interface Layout {
  template: string[];
  columnsSize: string;
  rowsSize: string;
  gap: string;
}

export const DEFAULT_LAYOUT = {
  template: [
    '. . . . .',
    'play volume time . fullscreen',
    'timeline timeline timeline timeline timeline',
  ],
  columnsSize: 'auto auto auto 1fr auto',
  rowsSize: '1fr auto auto',
  gap: '14px',
} as Layout;

export function mapLayoutToStyle({ template, columnsSize, rowsSize, gap }: Layout) {
  // @TODO: add checks
  return {
    gridTemplateAreas: `"${template.join('" "')}"`,
    gridTemplateColumns: columnsSize,
    gridTemplateRows: rowsSize,
    gap,
  };
}
