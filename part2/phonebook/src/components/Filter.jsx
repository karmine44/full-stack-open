import FormInput from './FormInput'

const Filter = ({ newFilter, onChange }) => {
    return (
        <form>
            <FormInput text='Filter shown with' value={newFilter} onChange={onChange} />
        </form>
    )
}

export default Filter