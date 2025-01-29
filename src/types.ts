export type RowData = {
  id: string;
  label: string;
  value: number;
  initialValue: number;
  children?: RowData[];
};
