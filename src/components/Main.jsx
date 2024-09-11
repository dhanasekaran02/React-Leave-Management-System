import React from 'react';
import Container from 'react-bootstrap/Container';

function Main({children}) {
  return (
    <main className='h-auto pt-3'>
        <Container fluid className=' main-content ms-1 ms-sm-0 justify-content-between'>
            {children}
        </Container>
    </main>
  )
}

export default Main