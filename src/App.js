import React, {useState} from 'react';
import styled from 'styled-components'
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [time, setTime] = useState();
  const [timezone, setTimezone] = useState();

  const _handleClick = () => {
    setLoading(true);
    axios.post('https://warm-hamlet-03110.herokuapp.com/', {
      time: time,
      timezone: timezone
    })
    .then(function (response) {
      setLoading(false);
      console.log(response);
      setResult(response.data.response)
    })
    .catch(function (error) {
      setLoading(false);
      setResult({error: true})
    });
  }

  const changeTime = (e) => {
    setTime(e.target.value+":00")
  }
  
  const changeTimezone = (e) => {
    setTimezone(e.target.value >= 0 ? "+"+e.target.value : e.target.value)
  }

  return (
    <div>
      <Banner />
      <Form>
        <FormCard>
          <Title>UTC</Title>
          <Label>Hora:</Label>
          <Input type="time" onChange={changeTime} />
          <Label>Timezone:</Label>
          <Input type="number" max="11" min="-11" onChange={changeTimezone} />
          {loading ? <Form>Consultando...</Form> : <Button onClick={_handleClick}>Enviar</Button>}

          {result && !loading && !result.error ? <div>
          <div><strong>Timezone:</strong> {result.timezone} </div>
          <div><strong>Time:</strong> {result.time} </div>
          </div>: null}

          {result && result.error && !loading ? <div>
          <div>Ha ocurrido un error!</div>
          </div>: null}

        </FormCard>
      </Form>

    </div>
  );
}

const Button = styled.div`
  border: none;
  outline: none;
  background-color:  #1A60CA;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  margin-top: 15px;
  color: #FFF;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  hover: {
    opacity: .7;
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #1A60CA;
`

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 10px;
  width: 300px;
  height: 100%;
  margin-top: -50px;
  background-color: #FFF;
  padding: 15px;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`

const Banner = styled.div`
  height: 200px;
  background-color: #1A60CA;
`

export default App;
