import {FaSearch} from 'react-icons/fa';
import styles from './SearchBar.module.css'
import {useState} from 'react'
// import axios from 'axios';
export default function SearchBar(){
    const [input,setInput] = useState('')

// const fetchData = (value)=>{
//     axios
//     .get("https://fakestoreapi.com/products")
//     .then((response) => {
//       const result = response.data.filter((prod)=>{
//             return value && prod && prod.title && prod.title.toLowerCase().includes(value)
//       })
//       setSearchResults(result)
//     })
//     .catch((error) => {
//     });
// }

    // const onSearchClick = () =>{
    //     fetchData(input)
    //     setIsSearched(true)
       
    // }
    const handleSearchInput = (value)=>{
            setInput(value)
    }
    return(
        <div className = {styles.inputWrapper}>
        <input className = {styles.input}placeholder = "Search Problems" value = {input} onChange = {(e)=>{handleSearchInput(e.target.value)}}/>
        <FaSearch  className = {styles.searchIcon}/>
        </div>
    )
}