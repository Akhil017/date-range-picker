import "./app.scss";
import RangePicker, {
  type SelectedRangeWithWeekend,
  type PredefinedRange,
} from "./components/range-picker";

export default function App() {
  const handleOk = (selectedRange: SelectedRangeWithWeekend) => {
    console.log(selectedRange);
  };

  const predefinedBottomRanges: PredefinedRange[] = [
    {
      label: "Today",
      value: [new Date(), new Date()],
    },
    {
      label: "Last 7 days",
      value: [
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 7
        ),
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 1
        ),
      ],
    },
    {
      label: "This year",
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    },
    {
      label: "Last year",
      value: [
        new Date(new Date().getFullYear() - 1, 0, 1),
        new Date(new Date().getFullYear(), 0, 0),
      ],
    },
    {
      label: "All time",
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    },
  ];

  return (
    <div className="container">
      <RangePicker onOk={handleOk} predefinedRange={predefinedBottomRanges} />
    </div>
  );
}
