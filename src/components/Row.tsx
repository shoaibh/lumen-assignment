import { useState } from "react";
import { RowData } from "../types";
import { toast } from "sonner";
import { Button } from "./Button";
import { Input } from "./Input";

export const Row = ({
  row,
  setRowData,
  label,
}: {
  row: RowData;
  setRowData: React.Dispatch<React.SetStateAction<RowData[]>>;
  label: string;
}) => {
  const [inputVal, setInputVal] = useState("");

  const variance = ((row.value - row.initialValue) / row.initialValue) * 100;

  const onDataChange = (type: "perc" | "val", id: string) => {
    if (!inputVal) {
      toast.error("Please enter a value");
      return;
    }
    if (type === "perc") {
      const percentage = parseFloat(inputVal) / 100;
      setRowData((prevData) =>
        updateValue(prevData, id, (val: number) => val + val * percentage),
      );
    } else {
      setRowData((prevData) =>
        updateValue(prevData, id, () => Number(inputVal)),
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
      <tr className="border  hover:bg-gray-100">
        <td className="border p-2">{label}</td>
        <td className="border p-2">{row.value.toFixed(2)}</td>
        <td className="border p-2">
          <Input type="number" value={inputVal} setInputVal={setInputVal} />
        </td>
        <td className="border p-2">
          <Button
            onClick={() => onDataChange("perc", row.id)}
            label="Allocate %"
          />
        </td>
        <td className="border p-2">
          <Button
            onClick={() => onDataChange("val", row.id)}
            label="Allocate Val"
          />
        </td>
        <td className="border p-2">{variance.toFixed(2)}</td>
      </tr>
      {row?.children?.map((rowChild) => (
        <Row
          key={rowChild.id}
          row={rowChild}
          setRowData={setRowData}
          label={`-- ${rowChild.label}`}
        />
      ))}
    </>
  );
};
