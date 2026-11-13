import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonNote from './components/PersonNote'
import Numbers from './components/Numbers'
import numberService from './services/numbers'

const Notification = ({ message, isError }) => {
  if (message === '') {
    return null;
  }

  if (isError) {
    return (
      <div className='error'>
        {message}
      </div>
    );
  } else {
    return (
      <div className='notif'>
        {message}
      </div>
    )
  }

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    numberService
      .getAll()
      .then(response => {
        console.log('Promise Fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const addNumber = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        window.alert(`${newName} is already added to phonebook`)
      } else {
        if (window.confirm(`${existingPerson.name} is already added to phonebook, replace old number with a new one?`)) {
          numberService
            .updateNumber(
              existingPerson.id,
              { ...existingPerson, number: newNumber }
            )
            .then(response => {
              setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person));
              const name = newName;
              const number = newNumber;
              setIsError(false);
              setMessage(`Changed ${name}'s number to ${number}`);
              setNewNumber('');
              setNewName('');
            })
        }
      }

    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      numberService
        .createNumber(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          const name = newName;
          setIsError(false);
          setMessage(`Added ${name}`);
          setNewNumber('');
          setNewName('');
        })
    }
  }

  const deleteNumber = (id) => {
    const name = persons.find(person => person.id === id).name;

    numberService
      .deleteNumber(id)
      .then(() => {
        setIsError(false);
        setMessage(`Removed ${name}`);
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        setIsError(true);
        setMessage(`Information of ${name} has already been removed from server`);
        setPersons(persons.filter(person => person.id !== id));

        console.log(error);
      })
  }

  const personsToShow = newFilter === ('') ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter
        newFilter={newFilter}
        onChange={handleFilterChange}
      />

      <h2>Add a New</h2>
      <PersonNote
        onSubmit={addNumber}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Numbers persons={personsToShow} onClick={deleteNumber} />
    </div>
  )
}

export default App