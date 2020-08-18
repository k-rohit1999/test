import React from 'react'

const SuccessComponent = (...props) => {
    const item = props[0];
    const dt = new Date(`${item.date}`).toDateString();
    console.log('selectedSuccesDate', props[0]);
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{marginTop:'20%', marginBottom:'20%'}}>
            <img src="/success.png" style={{height:'70px', width:'70px'}} />
            <div className="col-auto col-md-8 mt-2 mb-4" style={{fontSize:'20px'}}><b>Appointment Booking Confirmed!</b></div>
            <div className="col-auto col-md-8 mb-4" style={{fontSize:'18px', fontWeight:'600'}}>Your Appointment for {item.serviceName} at {item.bpName} is booked for {dt} at {item.time}</div>
            <div className="col-auto col-md-8" style={{fontSize:'15px'}}>Please reach the store 15 mins before the scheduled Appointment</div>
            <div className="col-12 col-md-4 mt-5">
                <button style={{backgroundColor:'white', color:'#18a0fb'}} className="btn btn-block pt-3 pb-3 border border-primary"
                ><b style={{fontSize:'15px'}}>GO BACK TO </b><span><img src="/image 1.png" style={{height:'30px', width:'30px'}} /></span></button>
            </div>
        </div>
    )   
}

export default SuccessComponent