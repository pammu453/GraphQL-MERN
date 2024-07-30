import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <FaExclamationTriangle className='text-danger' size={"5rem"} />
            <h1>404</h1>
            <p>Sorry, this page was not found.</p>
            <Link to='/' className='btn btn-secondary'>Go Back Home</Link>
        </div>
    )
}

export default NotFound
