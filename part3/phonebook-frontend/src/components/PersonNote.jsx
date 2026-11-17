import FormInput from './FormInput'

const PersonNote = ({ onSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <FormInput text='Name:' value={newName} onChange={handleNameChange} />
            </div>
            <div>
                <FormInput text='Number:' value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonNote