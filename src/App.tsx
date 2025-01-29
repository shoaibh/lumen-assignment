import { useState } from "react";
import "./App.css";
import data from "./assets/data.json";
import { Row } from "./Row";
import { RowData } from "./types";

function App() {
  const [rowData, setRowData] = useState(data.rows as RowData[]);

  return (
    <div className="text-center">
      <h1>Lumel Assessment</h1>
      <table className="w-full border-collapse border border-gray-300">
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
            <Row key={row.id} row={row} setRowData={setRowData} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
