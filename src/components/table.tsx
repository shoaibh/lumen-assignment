import { Row } from "./Row";
import { RowData } from "../types";

export const Table = ({
  rowData,
  setRowData,
}: {
  rowData: RowData[];
  setRowData: React.Dispatch<React.SetStateAction<RowData[]>>;
}) => {
  return (
    <table className="w-full border-collapse border border-gray-800">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Label</th>
          <th className="border p-2">Value</th>
          <th className="border p-2">Input</th>
          <th className="border p-2">Allocation %</th>
          <th className="border p-2">Allocation Val</th>
          <th className="border p-2">Variance %</th>
        </tr>
      </thead>
      <tbody>
        {rowData.map((row) => (
          <Row
            key={row.id}
            row={row}
            setRowData={setRowData}
            label={row.label}
          />
        ))}
      </tbody>
    </table>
  );
};
