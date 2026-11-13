const Number = ({ name, number, onClick, id }) => (<p>{name} {number} <button onClick={() => onClick(id)}>Delete</button></p>)

const Numbers = ({ persons, onClick }) => {
    return (
        <>
            {persons.map(person => <Number name={person.name} number={person.number} onClick={onClick} id={person.id} key={person.id} />)}
        </>
    )
}

export default Numbers