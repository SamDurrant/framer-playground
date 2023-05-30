/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as d3 from 'd3'
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  isSameMonth,
  parse,
  parseISO,
  startOfMonth,
} from 'date-fns'
import useMeasure from 'react-use-measure'
import { motion } from 'framer-motion'
// import estimatedMax from "~/utils/estimated-max";

function Chart({ entries }) {
  let [ref, bounds] = useMeasure()

  if (
    !entries
      .flatMap((entry) => entry.sets)
      .some((set) => set.reps > 0 && set.tracked)
  ) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm italic text-gray-400">
          Add a tracked set to see a chart!
        </p>
      </div>
    )
  }

  let data = [...entries]
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((entry) => {
      let setWithHighestEstimatedMax = entry.sets
        .filter((set) => set.reps > 0 && set.tracked)
        .sort((a, b) => d3.max(b) - d3.max(a))[0]

      return {
        date: parseISO(entry.date),
        estimatedMax: setWithHighestEstimatedMax
          ? setWithHighestEstimatedMax.reps
          : null,
      }
    })
    .filter((s) => s.estimatedMax)

  return (
    <div className="relative h-full w-full text-sky-400" ref={ref}>
      {bounds.width > 0 && (
        <ChartInner data={data} width={bounds.width} height={bounds.height} />
      )}
    </div>
  )
}

function ChartInner({ data, width, height }) {
  let margin = {
    top: 10,
    right: 10,
    bottom: 20,
    left: 24,
  }

  // get first day of first month in dataset
  let startDay = startOfMonth(data.at(0).date)
  // get last day of last month in dataset
  let endDay = endOfMonth(data.at(-1).date)
  // get months between first and last months
  let months = eachMonthOfInterval({ start: startDay, end: endDay })

  // domain -> min + max of input values
  // range -> min + max of output values
  let xScale = d3
    .scaleTime()
    // .domain(d3.extent(data.map((d) => d.date)))
    .domain([startDay, endDay])
    .range([margin.left, width - margin.right])

  let yScale = d3
    .scaleLinear()
    .domain(
      d3.extent(
        data.map((d) => {
          return d.estimatedMax
        })
      )
    )
    .range([height - margin.bottom, margin.top]) // flipping the range here inverts the chart

  let line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.estimatedMax))

  let d = line(data)

  return (
    <>
      <svg
        className="bg-slate-200 text-cyan-500"
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* X axis */}
        {months.map((month, i) => (
          <g
            key={month}
            className="text-stone-600"
            transform={`translate(${xScale(month)},0)`}
            fill="currentColor"
          >
            {i % 2 === 1 && (
              <rect
                width={xScale(endOfMonth(month)) - xScale(month)}
                height={height - margin.bottom}
                fill="currentColor"
                className="text-slate-300"
              />
            )}
            <text
              y={height - 5}
              textAnchor="middle"
              x={(xScale(endOfMonth(month)) - xScale(month)) / 2}
              className="text-[10px]"
            >
              {format(month, 'MMM')}
            </text>
          </g>
        ))}

        {/* Y axis */}
        {yScale.ticks(5).map((max) => (
          <g
            transform={`translate(5,${yScale(max)})`}
            className="text-stone-600"
            key={max}
          >
            {/* horizontal lines */}
            <line
              x1={margin.left}
              x2={width - margin.right}
              stroke="currentColor"
              strokeDasharray="1,5"
            />
            <text
              alignmentBaseline="middle"
              className="text-[10px]"
              fill="currentColor"
            >
              {max}
            </text>
          </g>
        ))}

        {/* Line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, type: 'spring' }}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        
        {/* Circles */}
        {data.map((d, i) => (
          <motion.circle
          initial={{ opacity: 0, scale: 0, cy: height - margin.bottom }}
          animate={{ opacity: 1, scale: 1, cy: yScale(d.estimatedMax) }}
          transition={{ duration: .5, delay: 0.1 * i, type: 'spring' }}
            key={d.date}
            r="5"
            cx={xScale(d.date)}
            // cy={yScale(d.estimatedMax)}
            className="text-cyan-500"
            fill="currentColor"
            strokeWidth={2}
            stroke={
              months.findIndex((m) => isSameMonth(m, d.date)) % 2 === 1
                ? '#f5f5f4'
                : 'white'
            }
          />
        ))}
      </svg>
    </>
  )
}

function LineChart() {
  // could also pass this a key if we had multiple tabs with different charts on each tab and wanted the animation to play every time we moved between tabs
  return <Chart entries={entries} />
}

export { LineChart }

const entries = [
  {
    sets: [{ reps: 40, tracked: true }],
    date: new Date(2023, 4, 6).toISOString(),
    estimatedMax: 10,
  },
  {
    sets: [{ reps: 10, tracked: true }],
    date: new Date(2023, 6, 22).toISOString(),
    estimatedMax: 10,
  },
  {
    sets: [{ reps: 52, tracked: true }],
    date: new Date(2023, 5, 4).toISOString(),
    estimatedMax: 50,
  },
  {
    sets: [{ reps: 34, tracked: true }],
    date: new Date(2023, 4, 16).toISOString(),
    estimatedMax: 43,
  },
  {
    sets: [{ reps: 12, tracked: true }],
    date: new Date(2023, 8, 7).toISOString(),
    estimatedMax: 76,
  },
  {
    sets: [{ reps: 10, tracked: true }],
    date: new Date(2023, 8, 17).toISOString(),
    estimatedMax: 130,
  },
  {
    sets: [{ reps: 22, tracked: true }],
    date: new Date(2023, 7, 23).toISOString(),
    estimatedMax: 35,
  },
]
