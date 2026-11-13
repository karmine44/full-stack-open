const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => (
    <>
        {course.parts.map(part => <Part part={part} key={part.id} />)}
    </>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Total = ({ total }) => <p><b>Total of {total} Exercises</b></p>

const Course = ({ course, total }) => (
    <>
        <Header course={course} />
        <Content course={course} />
        <Total total={total} />
    </>
)

export default Course;