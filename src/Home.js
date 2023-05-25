
import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: 'https://cdn-icons-png.flaticon.com/512/6974/6974833.png'
    })
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const handleClick = () => {
        if (name !== '') {
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=03ac2f31bd9d571661a0e0fc367f577a`;
            axios.get(apiURL)
                .then(res => {
                    let imagePath = '';
                    if (res.data.weather[0].main == "Clear") {
                        imagePath = "https://cdn-icons-png.flaticon.com/512/6974/6974833.png"
                    } else if (res.data.weather[0].main == "Rain") {
                        imagePath = "https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
                    } else if (res.data.weather[0].main == "Snow") {
                        imagePath = "https://cdn-icons-png.flaticon.com/512/642/642102.png"
                    } else if (res.data.weather[0].main == "Clouds") {
                        imagePath = "https://cdn-icons-png.flaticon.com/512/414/414825.png"
                    } else if (res.data.weather[0].main == "Haze") {
                        imagePath = "https://cdn-icons-png.flaticon.com/512/1197/1197102.png"
                    } else if (res.data.weather[0].main == "Smoke") {
                        imagePath = "https://cdn-icons-png.flaticon.com/512/4380/4380458.png"
                    } else if (res.data.weather[0].main == "Mist") {
                        imagePath = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"
                    } else if (res.data.weather[0].main == "Drizzle") {
                        imagePath = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png"
                    } else {
                        imagePath = "https://cdn-icons-png.flaticon.com/512/6974/6974833.png"
                    }
                    setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath })
                    console.log(res.data)
                    setError('');
                })
                .catch(err => {
                    if (err.response.status == 404) {
                        setError("Invalid city Name")
                    } else {
                        setError('');
                    }
                    console.log(err)
                });
        }
    }
    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button><img src='https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-vector-black-magnifying-glass-with-transparent-background-png-image_1758357.jpg' alt='' onClick={handleClick}></img></button>
                </div>
                <div className='error'>
                    <p>{error}</p>
                </div>
                <div className='winfo'>
                    <img src={data.image} ></img>
                    <h1>{Math.round(data.celcius)}°c</h1>
                    <h2>{data.name}</h2>
                    <div className='details'>
                        <div className='col'>
                            <img src='https://tse2.mm.bing.net/th?id=OIP.1ZYsx909iSElh13IuNwEPAHaHa&pid=Api&P=0&h=180'></img>
                            <div className='hudmidity'>
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img src='https://tse3.mm.bing.net/th?id=OIP.qhUv05rI3gYA9AUyo99hLAHaHa&pid=Api&P=0&h=180'></img>
                            <div className='wind'>
                                <p>{Math.round(data.speed)}km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

