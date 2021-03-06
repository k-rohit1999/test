import React, {useState, useEffect} from 'react';
import {Card, CardTitle, CardBody, Container, Row, Col} from 'reactstrap';
import Success from './SuccessComponent';
import './App.css'
function App() {

  useEffect(() => {
    fetchDate();
  }, []);

  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [datesArray, setDatesArray] = useState([])
  const [dates, setDate] = useState([]);
  const [times, setTime] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [staffName, setStaffName] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const bpId = urlParams.get('bpId');
  const bpName = urlParams.get('bpName');
  const bpServiceCatogery = urlParams.get('bpServiceCatogery');
  const bpServiceSubCatogery = urlParams.get('bpServiceSubCatogery');
  const serviceCatogery = urlParams.get('serviceCatogery');
  const serviceName = urlParams.get('serviceName');
  const userId = urlParams.get('userId');


  const fetchDate = async () => {
    // const fetchDate = await fetch(`https://apidev.gobaskt.com/consumerApi/book-appointment/${bpId}?serviceName=${serviceName}`, {
      const fetchDate = await fetch(`https://apidev.gobaskt.com/consumerApi/book-appointment/BPTNR47854843750210?serviceName=Facial%20Cupping`, {
      method: 'GET'
    });
    let item = await fetchDate.json();
  
    setDate(item.responseData[0].serviceDates);
    let arr = [];
    for( let i = 0; i < item.responseData[0].serviceDates.length;i++){
      arr[i] = false;
    }
    setDatesArray(arr);

  };

  const postData = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({"apptDate":`${selectedDate}`,
      "apptTime":`${selectedTime}`,
      "bookingTimeSlot":`${selectedDate}`,
      "bpId":`${bpId}`,
      "bpName":`${bpName}`,
      "bpServiceCatogery":`${bpServiceCatogery}`,
      "bpServiceSubCatogery":`${bpServiceSubCatogery}`,
      "price":"0",
      "serviceCatogery":`${serviceCatogery}`,
      "serviceName":`${serviceName}`,
      "staffName":`${staffName}`,
      "userId":`${userId}`
  })
  };
  fetch('https://apidev.gobaskt.com/consumerAppointmentsApi/gobaskt/createUserApppointment', requestOptions)
  .then(async response => {
    const data = await response.json();

    // check for error response
    if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }

    setSuccess(data.success);
  })
  .catch(error => {
    setErrorMsg(error.toString());
    console.error('There was an error!', errorMsg);
  });
};

  const showtime = (e,date, timeslots) => {
    let id = e.target.id;
    console.log("id," + id);
    console.log("arr", datesArray)
    setDatesArray(preVal => {
      return preVal.map((item ,i) => {
        
        if(i == id){
          console.log("id",i)
          return true
        }
        return false
      })
    })

    setSelectedDate(date);
    setVisible(true);
    setTime(timeslots);
  }

  const timeAndName = (time, name) => {
    setSelectedTime(time);
    setStaffName(name);
  }

  const dateSlots = dates.map((date, i) => {

    let dt = new Date(`${date.date}`);
    let d = dt.toDateString().split(' ').slice(1).join(' ').substr(0,6);

    return(
              <Col xs="auto" className={`ml-2 mb-4 p-1 border border-secondary rounded`} key={i}>
                <button className={datesArray[i] ? `selected`: ''} id={i} onClick={(e) => showtime(e,date.date, date.timeslots)}>{d}</button>
              </Col>
    );
  });

  const timeSlots = times.map((time, i) => {
    return(
        <Col xs="auto" className="ml-2 mb-4 pl-2 pr-2 pt-1 pb-1 border border-secondary rounded" key={i}>
          <button className="btn btn-light" onClick={() => timeAndName(time.time, time.staffName)}>{time.time}</button>
        </Col>
    );
});

  console.log('selected date', selectedDate);
  console.log('selected time', selectedTime);
  console.log('selected staff', staffName);

  const properDate = new Date(`${selectedDate}`).toDateString();

  return (
    <>
    {
      !(success) ? (
        <>
            <nav style={{backgroundColor:'#0079ff'}}>
            <h5 style={{color: '#ffffff'}} className="pt-3 pb-3 ml-2">Schedule Appointment</h5>
            </nav>
            <Container>
              <p style={{fontWeight:'bold', fontSize:'20px'}}>Schedule Appointment at {bpName}</p>
              <Row className="justify-content-around">
                <Col className="d-flex flex-column align-items-center border border-warning rounded p-2 m-2">
                  <img src="/calendar.png" alt="calender icon" style={{width:'20px', height:'20px' }} />
                  <p>By Date</p>
                </Col>
                <Col className="d-flex flex-column align-items-center border border-warning rounded p-2 m-2">
                  <img src="/Clock.png" alt="clock icon" style={{width:'20px', height:'20px' }} />
                  <p>By Time</p>
                </Col>
                <Col className="d-flex flex-column align-items-center border border-warning rounded p-2 m-2">
                  <img src="/calendar.png" alt="calender icon" style={{width:'20px', height:'20px' }} />
                  <p>By Day</p>
                </Col>
                <Col className="d-flex flex-column align-items-center border border-warning rounded p-2 m-2">
                  <img src="/calendar.png" alt="calender icon" style={{width:'20px', height:'20px' }} />
                  <p>By Month</p>
                </Col>
              </Row>
              <Card className="p-1">
                <CardTitle>Available Date Slots</CardTitle>
                <CardBody>
                  <Container fluid="sm">
                    <Row>
                    {dateSlots}
                    </Row>
                  </Container>
                </CardBody>
              </Card>
              <Card className="p-1">
                {(visible) ? (
                  <>
                  <CardTitle>Available Time Slots on <b>{properDate}</b></CardTitle>
                  <CardBody>
                    <Container>
                      <Row>
                        {timeSlots}
                      </Row>
                    </Container>
                  </CardBody>
                  </>
                ) : null}
              </Card>
                <div className="col-12 mt-5">
                  <button style={{backgroundColor:'#f67300', color:'white'}} className="btn btn-block pt-3 pb-3"
                    onClick={postData}
                  >BOOK APPOINTMENTS</button>
                </div>
          </Container>
        </>
      ) : <Success 
              serviceName={serviceName}
              date={selectedDate}
              time={selectedTime}
              bpName={bpName}
          />
    }
  </>
  );
}

export default App;
