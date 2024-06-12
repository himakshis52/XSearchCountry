// import axios from "axios";
import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar } from "@mui/material"




const Search = () => {

    const[countries, setCountries] = useState([])
    const[ searchCountry, setSearchCountry ] = useState("");

    const URL = "https://restcountries.com/v3.1/all";
    

    // const fetchData = async() => {
    //     try {
    //         const response = await axios.get(URL);
    //         console.log("data", response.data)

    //         setCountries(response.data);

    //     } catch (error) {
    //         console.log("Error in fetching data", error)
    //     }
    // }
  
    useEffect(()=>{
        // fetchData()

        fetch(URL)
            .then((res) => res.json())
            .then((data) => setCountries(data))
            .catch((e) => console.error("Error in fetching data", e))
    },[])


    const filterCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{background: "white", alignItems: "center" }}>
                    <Toolbar>
                        
                            <input
                            placeholder="Search for countries"
                            value={searchCountry}
                            onChange={(e) => setSearchCountry(e.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                            style={{ width: "60vw" }}
                            />
                        
                    </Toolbar>
                </AppBar>
            </Box>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}>
                { filterCountries.length > 0 ?
                        (filterCountries.map((country)=>(
                        <div
                            key={country.name.common} 
                            style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            padding: "10px",
                            margin: "10px",
                            border: "1px solid black",
                            borderRadius: "8px"
                        }}>
                            <img src={country.flags.png} alt= {`Flag of ${country.name.common}`} style={{ width: "100px", height: "100px" }} />
                            <h3>{country.name.common}</h3>
                        </div>  
                        ))  
                    ) : (
                        <p>No countries found....</p>
                    )    
                }
                
            </div>
        </>
   
    )
}

export default Search;