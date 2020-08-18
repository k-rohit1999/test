import React, {useState, useEffect} from 'react';
import {Card, CardTitle, CardBody, Container, Row, Col} from 'reactstrap';
import Success from './SuccessComponent';

function App() {

  useEffect(() => {
    fetchDate();
  }, []);

  const [success, setSuccess] = useState(true);

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


  const fetchDate = async () => {
    const fetchDate = await fetch(`https://apidev.gobaskt.com/consumerApi/book-appointment/BPTNR47854843750210?serviceName=Facial%20Cupping`, {
      method: 'GET'
    });
    let item = await fetchDate.json();
    setDate(item.responseData[0].serviceDates);
  };

  const postData = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json'
      },
      body: {"apptDate":`${selectedDate}`,
      "apptTime":`${selectedTime}`,
      "bookingTimeSlot":`${selectedDate}`,
      "bpId":"BPTNR165920563018216",
      "bpName":"Merchant Name",
      "bpServiceCatogery":"Skincare",
      "bpServiceSubCatogery":"Facial",
      "price":"0",
      "serviceCatogery":"Facial Cupping",
      "serviceName":"Facial Cupping",
      "staffName":`${staffName}`,
      "userId":"CONS110819219070736"
    }
  };
  fetch('https://apidev.gobaskt.com/consumerAppointmentsApi/gobaskt/createUserApppointment', requestOptions)
      .then(response => response.json());
}

  const showtime = (date, timeslots) => {
    setSelectedDate(date);
    setVisible(true);
    setTime(timeslots);
  }

  const timeAndName = (time, name) => {
    setSelectedTime(time);
    setStaffName(name);
  }

  const postAndSuccess=()=>{
    setSuccess(false);
    postData();
  }

  const dateSlots = dates.map((date) => {

    let dt = new Date(`${date.date}`);
    let d = dt.toDateString().split(' ').slice(1).join(' ');

    return(
              <Col xs="auto" className={`ml-2 mb-4 p-1 border border-secondary rounded`} key={date.date}>
                <button className="btn btn-light" onClick={() => showtime(date.date, date.timeslots)}>{d}</button>
              </Col>
    );
  });

  const timeSlots = times.map((time) => {
    return(
        <Col xs="auto" className="ml-2 mb-4 pl-4 pr-4 pt-2 pb-2 border border-secondary rounded" key={time.time}>
          <button className="btn btn-light" onClick={() => timeAndName(time.time, time.staffName)}>{time.time}</button>
        </Col>
    );
});

  console.log('selected date', selectedDate);
  console.log('selected time', selectedTime);
  console.log('selected staff', staffName);

  return (
    <>
    {
      (success) ? (
        <>
            <nav style={{backgroundColor:'#0079ff'}}>
            <h5 style={{color: '#ffffff'}} className="pt-3 pb-3 ml-2">Schedule Appointment</h5>
            </nav>
            <Container>
              <p style={{fontWeight:'bold', fontSize:'20px'}}>Schedule Appointment at Merchant Name</p>
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
                <CardTitle>Available Time Slots</CardTitle>
                {(visible) ? (
                  <CardBody>
                    <Container>
                      <Row>
                        {timeSlots}
                      </Row>
                    </Container>
                  </CardBody>
                ):(
                  <CardBody>Select a date</CardBody>
                )}
              </Card>
                <div className="col-12 mt-5">
                  <button style={{backgroundColor:'#f67300', color:'white'}} className="btn btn-block pt-3 pb-3"
                    onClick={postAndSuccess}
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
