import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

/* this API_KEY is generic for each user, after signup in openweathermap it will generate a new generic id
this is unique for each user and device */
const API_KEY = "0437dfb758f8011ff4149069db5a045d";     //"3585775f387b0d0cba6c5b3dc41b8167";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    //debugger;
    console.log(e.target.elements);
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    /*Await will stop the execution of the below lines of code untill we get response from the endpoint */
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    //console.log('await fetch after');
    //console.log('await json before');
    
    /*parse the data as json data */
    const data = await api_call.json();
    console.log('await json after: '+ JSON.stringify(data));
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
