import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const data = [
  {
    hour: 0,
    January: 75,
    February: 52,
    March: 56,
    April: 57,
    May: 50,
    June: 46,
    July: 77,
    August: 74,
    September: 76,
    October: 67,
    November: 90,
    December: 101,
  },
  {
    hour: 1,
    January: 49,
    February: 31,
    March: 33,
    April: 34,
    May: 30,
    June: 25,
    July: 40,
    August: 33,
    September: 31,
    October: 38,
    November: 43,
    December: 63,
  },
  {
    hour: 2,
    January: 40,
    February: 20,
    March: 21,
    April: 22,
    May: 19,
    June: 18,
    July: 22,
    August: 19,
    September: 19,
    October: 22,
    November: 28,
    December: 47,
  },
  {
    hour: 3,
    January: 29,
    February: 15,
    March: 13,
    April: 14,
    May: 11,
    June: 12,
    July: 15,
    August: 12,
    September: 12,
    October: 18,
    November: 23,
    December: 29,
  },
  {
    hour: 4,
    January: 23,
    February: 9,
    March: 11,
    April: 13,
    May: 10,
    June: 11,
    July: 12,
    August: 13,
    September: 10,
    October: 17,
    November: 16,
    December: 24,
  },
  {
    hour: 5,
    January: 30,
    February: 8,
    March: 14,
    April: 12,
    May: 11,
    June: 12,
    July: 12,
    August: 11,
    September: 12,
    October: 21,
    November: 23,
    December: 30,
  },
  {
    hour: 6,
    January: 35,
    February: 16,
    March: 20,
    April: 21,
    May: 21,
    June: 15,
    July: 17,
    August: 19,
    September: 17,
    October: 29,
    November: 33,
    December: 40,
  },
  {
    hour: 7,
    January: 52,
    February: 23,
    March: 29,
    April: 24,
    May: 23,
    June: 21,
    July: 25,
    August: 21,
    September: 25,
    October: 35,
    November: 45,
    December: 57,
  },
  {
    hour: 8,
    January: 51,
    February: 26,
    March: 31,
    April: 28,
    May: 27,
    June: 23,
    July: 29,
    August: 28,
    September: 28,
    October: 41,
    November: 53,
    December: 82,
  },
  {
    hour: 9,
    January: 61,
    February: 31,
    March: 41,
    April: 36,
    May: 30,
    June: 27,
    July: 33,
    August: 33,
    September: 33,
    October: 50,
    November: 61,
    December: 79,
  },
  {
    hour: 10,
    January: 71,
    February: 36,
    March: 47,
    April: 41,
    May: 34,
    June: 36,
    July: 43,
    August: 36,
    September: 34,
    October: 51,
    November: 71,
    December: 82,
  },
  {
    hour: 11,
    January: 72,
    February: 37,
    March: 44,
    April: 39,
    May: 39,
    June: 40,
    July: 48,
    August: 40,
    September: 40,
    October: 51,
    November: 68,
    December: 83,
  },
  {
    hour: 12,
    January: 68,
    February: 39,
    March: 49,
    April: 43,
    May: 40,
    June: 35,
    July: 51,
    August: 39,
    September: 43,
    October: 56,
    November: 70,
    December: 87,
  },
  {
    hour: 13,
    January: 70,
    February: 45,
    March: 45,
    April: 43,
    May: 33,
    June: 38,
    July: 47,
    August: 40,
    September: 38,
    October: 54,
    November: 61,
    December: 84,
  },
  {
    hour: 14,
    January: 77,
    February: 42,
    March: 42,
    April: 41,
    May: 37,
    June: 39,
    July: 45,
    August: 41,
    September: 46,
    October: 53,
    November: 63,
    December: 83,
  },
  {
    hour: 15,
    January: 67,
    February: 38,
    March: 48,
    April: 41,
    May: 41,
    June: 35,
    July: 45,
    August: 45,
    September: 51,
    October: 53,
    November: 65,
    December: 78,
  },
  {
    hour: 16,
    January: 70,
    February: 42,
    March: 43,
    April: 38,
    May: 39,
    June: 35,
    July: 47,
    August: 41,
    September: 42,
    October: 55,
    November: 63,
    December: 76,
  },
  {
    hour: 17,
    January: 66,
    February: 35,
    March: 39,
    April: 37,
    May: 40,
    June: 40,
    July: 49,
    August: 42,
    September: 41,
    October: 55,
    November: 64,
    December: 79,
  },
  {
    hour: 18,
    January: 76,
    February: 40,
    March: 44,
    April: 41,
    May: 39,
    June: 38,
    July: 49,
    August: 44,
    September: 45,
    October: 58,
    November: 70,
    December: 88,
  },
  {
    hour: 19,
    January: 88,
    February: 46,
    March: 47,
    April: 45,
    May: 44,
    June: 40,
    July: 55,
    August: 53,
    September: 53,
    October: 66,
    November: 82,
    December: 99,
  },
  {
    hour: 20,
    January: 91,
    February: 51,
    March: 54,
    April: 51,
    May: 48,
    June: 44,
    July: 55,
    August: 51,
    September: 61,
    October: 78,
    November: 94,
    December: 117,
  },
  {
    hour: 21,
    January: 111,
    February: 53,
    March: 62,
    April: 52,
    May: 54,
    June: 45,
    July: 58,
    August: 56,
    September: 64,
    October: 77,
    November: 104,
    December: 122,
  },
  {
    hour: 22,
    January: 92,
    February: 54,
    March: 54,
    April: 51,
    May: 47,
    June: 44,
    July: 58,
    August: 50,
    September: 51,
    October: 65,
    November: 85,
    December: 124,
  },
  {
    hour: 23,
    January: 56,
    February: 37,
    March: 37,
    April: 43,
    May: 34,
    June: 36,
    July: 43,
    August: 45,
    September: 38,
    October: 48,
    November: 60,
    December: 94,
  },
];

const chartConfig = {
  January: {
    label: "January",
  },
  February: {
    label: "February",
  },
  March: {
    label: "March",
  },
  April: {
    label: "April",
  },
  May: {
    label: "May",
  },
  June: {
    label: "June",
  },
  July: {
    label: "July",
  },
  August: {
    label: "August",
  },
  September: {
    label: "September",
  },
  October: {
    label: "October",
  },
  November: {
    label: "November",
  },
  December: {
    label: "December",
  },
} satisfies ChartConfig;

export default function ForecastsPatternChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[500px] w-full"
    >
      <ComposedChart
        accessibilityLayer
        margin={{
          top: 62,
          bottom: 22,
          left: 12,
          right: 12,
        }}
        data={data}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="hour"
          tickMargin={10}
          minTickGap={32}
          tickFormatter={(hour) => hour.toString().padStart(2, "0")}
          label={{
            value: "Time (Hours)",
            position: "insideBottom",
            offset: -15,
          }}
          opacity={0.75}
        />

        <YAxis
          tickMargin={10}
          minTickGap={32}
          label={{
            value: "Page Views (Count)",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
          opacity={0.75}
        />

        <ChartTooltip
          content={<ChartTooltipContent labelFormatter={(_) => ""} />}
        />

        {/* Define a Line for each month */}
        <Line type="monotone" dataKey="January" stroke="#8886d8" />
        <Line type="monotone" dataKey="February" stroke="#84ca9d" />
        <Line type="monotone" dataKey="March" stroke="#ffc660" />
        <Line type="monotone" dataKey="April" stroke="#ff7302" />
        <Line type="monotone" dataKey="May" stroke="#387910" />
        <Line type="monotone" dataKey="June" stroke="#8886d8" />
        <Line type="monotone" dataKey="July" stroke="#ff71b4" />
        <Line type="monotone" dataKey="August" stroke="#ba70c8" />
        <Line type="monotone" dataKey="September" stroke="#6dd0e1" />
        <Line type="monotone" dataKey="October" stroke="#d34f2f" />
        <Line type="monotone" dataKey="November" stroke="#9b1fa2" />
        <Line type="monotone" dataKey="December" stroke="#05a9f4" />
      </ComposedChart>
    </ChartContainer>
  );
}
