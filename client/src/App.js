import { Container } from 'react-bootstrap';
import Header from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import ProjectDetail from './components/ProjectDetail';
import NotFound from './pages/NotFound';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Container className='col gap-2'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path='/projects/:id' element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ApolloProvider>
  )
}

export default App
