import React from 'react'
import Card from 'react-bootstrap/Card';

function CardComponent({title,count,content}) {
  return (
    <div>
        <Card className='leave text-center border-secondary mb-2 mb-md-0'>
            <Card.Body className='p-0 h-100'>
                <div class="leave_heading p-2 heading-bg-color heading-font">
                    <h5 class="fs-6 fw-bolder font-color mb-0 ">{title}</h5>
                </div>
                <div className='h-75 d-flex flex-column align-items-center justify-content-center'>
                    <p className='fs-2 mb-0'>{count}</p>
                    <p className='days-font font-color fw-semibold on-leave mb-0'>{content}</p>
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CardComponent