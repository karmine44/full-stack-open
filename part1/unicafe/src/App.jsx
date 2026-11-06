import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const Statistics = (props) => {
  if (props.total === 0) return (
    <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </>
  )

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <StatisticsLine type="Good" value={props.good} />
        <StatisticsLine type="Neutral" value={props.neutral} />
        <StatisticsLine type="Bad" value={props.bad} />
        <StatisticsLine type="Average" value={props.average} />
        <StatisticsLine type="Positive" value={props.positive} isPercentage />
      </table>
    </>
  )
}

const StatisticsLine = (props) => {
  if (props.isPercentage) return (
    <>
      <tr>
        <td>{props.type}</td>
        <td>{props.value} %</td>
      </tr>
    </>
  )

  return (
    <>
      <tr>
        <td>{props.type}</td>
        <td>{props.value}</td>
      </tr>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : good / total * 100;

  const addGood = () => {
    setGood(good + 1);
  }

  const addNeutral = () => {
    setNeutral(neutral + 1);
  }

  const addBad = () => {
    setBad(bad + 1);
  }

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <Button onClick={addGood} text="Good" />
        <Button onClick={addNeutral} text="Neutral" />
        <Button onClick={addBad} text="Bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} total={total} />
    </>
  )
}

export default App