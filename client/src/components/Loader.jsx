import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='col-1 mt-5 mx-auto'> 
        <Spinner animation="border" variant="dark" />
    </div>
  )
}

export default Loader
