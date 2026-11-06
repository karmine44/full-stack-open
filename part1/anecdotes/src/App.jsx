import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <>
    <button onClick={onClick}>{text}</button>
  </>
)

const AnecdoteOfTheDay = ({ anecdote, votes, onVoteClick, onNextAnecdoteClick }) => {

  return (
    <>
      <h1>Anecdote of the Day</h1>
      <span>{anecdote}</span>
      <br />
      <span>has {votes} votes</span>
      <br />
      <Button onClick={onVoteClick} text="Vote" />
      <Button onClick={onNextAnecdoteClick} text="Next Anecdote" />
    </>
  )

}

const AnecdoteWithMostVotes = ({ anecdote, votes }) => {
  return (
    <>
      <h1>Anecdote With Most Votes</h1>
      <span>{anecdote}</span>
      <br />
      <span>has {votes} votes</span>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(999).fill(0));
  const [selected, setSelected] = useState(0);

  const topAnecdote = votes.indexOf(Math.max(...votes));

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
    console.log("Current Anecdote:", selected);
  }

  const addVote = () => {
    const tempVotes = [...votes];
    tempVotes[selected] += 1;
    setVotes(tempVotes);
  }

  return (
    <div>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]} votes={votes[selected]} onVoteClick={addVote} onNextAnecdoteClick={nextAnecdote} />
      <AnecdoteWithMostVotes anecdote={anecdotes[topAnecdote]} votes={votes[topAnecdote]} />
    </div>
  )
}

export default App