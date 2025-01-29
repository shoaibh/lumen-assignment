import { useState } from "react";
import "./App.css";
import data from "./assets/data.json";
import { Table } from "./components/table";
import { RowData } from "./types";

function App() {
  const [rowData, setRowData] = useState(
    data.rows.map((row) => ({ ...row, initialValue: row.value })) as RowData[],
  );

  return (
    <div className="text-center">
      <h1>Lumel Assessment</h1>
      <Table rowData={rowData} setRowData={setRowData} />
    </div>
  );
}

export default App;
