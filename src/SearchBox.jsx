import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from "react";

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "YOUR_API_KEY"; {* Due to privacy I did not provide mine*}.

    let getWeatherInfo = async (city) => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("City not found!");
            }
            let jsonResponse = await response.json();
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    let handleChange = (event) => {
        setCity(event.target.value)
    }

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo(city);
            updateInfo(newInfo);
            setError(false);  // ✅ Reset error when a valid city is found
        } catch(err) {
            setError(true);
        }
    }
    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City name" variant="outlined" required value={city} onChange={handleChange}/> <br/><br/>
                <Button variant="contained" type="submit">Search</Button>
                {error && <p style={{color: "red"}}><b>No such place exists!</b></p>}
            </form>
        </div>

    )
}
