type TLocation = {
    lat: number,
    lng: number
}

export const openWeatherImageUrl = (image:string) =>  `https://openweathermap.org/img/wn/${image}@4x.png`

export async function openWeatherRequestBuilder(coords: any, apiKey:any, unit:string='metric'){
    const {lat, lng} = coords
    const forecastRequest = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${unit}&appid=${apiKey}`)
    const response = await forecastRequest.json();
    return response
}


export async function GetCoordsFromCityName(city:string, mapsApiKey:string) {
    const request = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${mapsApiKey}`)
    const response = await request.json()
    return response.results[0].geometry.location as TLocation
}