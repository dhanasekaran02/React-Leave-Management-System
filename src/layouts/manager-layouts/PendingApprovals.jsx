import React from 'react'
import Container from 'react-bootstrap/esm/Container';

function PendingApprovals({children}) {
  return (
    <Container fluid className="container-fluid carousel border-1 overflow-x-scroll body-bg-color ms-0 rounded-3" id="carousel-example">
      <Container  className="container-fluid m-0 d-flex w-100 column-gap-4 ps-sm-4 ps-0 p-3 " id="notify-card" >
        {children}
      </Container>
      {/* <div class="button d-flex justify-content-center w-100 mb-2">
          <button type="button" class="btn font-bg-color text-white mx-3 carousel-btn" id="previous">Previous</button>
          <button type="button" class="btn font-bg-color text-white mx-3 acceptReject carousel-btn" id="next">Next</button>
      </div> */}
    </Container>
  )
}

export default PendingApprovals