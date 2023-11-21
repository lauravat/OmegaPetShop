import { useEffect, useState } from "react";
import "./searchbar.css";
import { GetProducts } from "../../api/product";

const SearchBar = ({ setFilterList }) => {

  const [Products, setProducts] = useState([])


  useEffect(() => {
      GetProducts()
        .then(response => {
          setProducts(response.data.data)
        })
        .catch(error => {
          console.error('Error al obtener usuarios:', error)
        })
    }, [])
  

  const [searchWord, setSearchWord] = useState(null);
  const handelChange = (input) => {
    setSearchWord(input.target.value);
    setFilterList(
      Products.filter((item) =>
        item.productName?.toLowerCase().includes(searchWord?.toLowerCase())
      )
    );
  };
  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." onChange={handelChange} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
