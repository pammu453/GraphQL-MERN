import { Container } from 'react-bootstrap';
import AddClientModel from './components/AddClientModel';
import Clients from './components/Clients';
import Header from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Projects from './components/Projects';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Container className='col gap-2'>
        <Header />
        <AddClientModel />
        <Projects />
        <Clients />
      </Container>
    </ApolloProvider>
  )
}

export default App
