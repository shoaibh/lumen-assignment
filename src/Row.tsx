import { useState } from "react";
import { RowData } from "./types";

export const Row = ({
  row,
  setParentVal,
  setRowData,
}: {
  row: RowData;
  parentVal?: number;
  setParentVal?: React.Dispatch<React.SetStateAction<number>>;
  setRowData: React.Dispatch<React.SetStateAction<RowData[]>>;
}) => {
  const [inputVal, setInputVal] = useState("");
  const [variance, setVariance] = useState("0");

  const onDataChange = (type: "perc" | "val", id: string) => {
    if (type === "perc") {
      const percentage = parseFloat(inputVal) / 100;
      setRowData((prevData) =>
        updateValue(prevData, id, (val: number) => val + val * percentage),
      );
    } else {
      setVariance(
        (((Number(inputVal) - row.value) / row.value) * 100).toFixed(2),
      );
      setParentVal?.((prev) =>
        prev ? prev + Number(inputVal) - row.value : Number(inputVal),
      );
    }
  };

  const updateValue = (
    data: RowData[],
    id: string,
    updateFunc: (val: number) => number,
  ) => {
    return data.map((item) => {
      if (item.id === id) {
        const updatedValue = updateFunc(item.value);
        if (item.children) {
          const totalChildren = item.children.reduce(
            (sum, child) => sum + child.value,
            0,
          );
          item.children = item.children.map((child) => ({
            ...child,
            value: (child.value / totalChildren) * updatedValue,
          }));
        }
        return { ...item, value: updatedValue };
      }
      if (item.children) {
        item.children = updateValue(item.children, id, updateFunc);
        item.value = item.children.reduce((sum, child) => sum + child.value, 0);
      }
      return item;
    });
  };

  return (
    <>
      <tr className="hover:bg-gray-100">
        <td className="border p-2">
          {!row?.children && "-- "}
          {row.label}
        </td>
        <td className="border p-2">{row.value}</td>
        <td className="border p-2">
          <input
            type="number"
            className="w-full"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </td>
        <td className="border p-2">
          <button onClick={() => onDataChange("perc", row.id)}>
            Allocate %
          </button>
        </td>
        <td className="border p-2">
          <button onClick={() => onDataChange("val", row.id)}>
            Allocate Val
          </button>
        </td>
        <td className="border p-2">{variance}</td>
      </tr>
      {row?.children?.map((rowChild) => (
        <Row row={rowChild} setRowData={setRowData} />
      ))}
    </>
  );
};
