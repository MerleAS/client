import { useContext, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { StateContext } from "../../context/stateContext";

import SideModal from "../UI/sideModal";

import classes from "../../styles/components/layout/search.module.css";

const Search = () => {
  const { setSearchIsActive, searchIsActive, serverUrl } =
    useContext(StateContext);

  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  /* const [brands, setBrands] = useState([]); */

  const searchHandler = async (e) => {
    const query = e.target.value;
    setSearchInput(query);
    try {
      if (query.length > 1) {
        const prods = await axios.get(
          `${serverUrl}/second-hand/products?query=${query}`
        );
        setProducts(prods.data.products);
        /* const brandsList = []
        prods.data.products.forEach(prod => {
          const b = { brandId: prod.brandId, brand: prod.brand };
          const brandExists = brandsList.find(br => br.brandId === b.brandId)
          if (!brandExists) {
            brandsList.push(b)
          }
        });
        setBrands(brandsList) */
      } else {
        setProducts([]);
        setBrands([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const routeHandler = (param) => {
    setSearchIsActive(false);
    router.push(param);
  };

  const headerContent = (
    <div className={classes.inputContainer}>
      <input
        className={classes.input}
        onChange={searchHandler}
        placeholder="Search"
        value={searchInput}
      />
    </div>
  );

  const bodyContent = (
    <div className={classes.menuOptions}>
      {/* {brands.length > 0 &&
        brands.map((brand, index) => {
          return (
            <p
              key={index}
              className={classes.menuOption}
              onClick={() => routeHandler(`/brands/${brand.brandId}`)}
            >
              <strong>{brand.brand}</strong>
            </p>
          );
        })} */}
      {products.length > 0 &&
        products.map((product, index) => {
          return (
            <p
              key={index}
              className={classes.menuOption}
              onClick={() => routeHandler(`/products/${product._id}`)}
            >
              {product.brand} {product.type} - {product.title}
            </p>
          );
        })}
    </div>
  );

  return (
    <SideModal
      isActive={searchIsActive}
      setIsActive={setSearchIsActive}
      title="Search"
      headerContent={headerContent}
      bodyContent={bodyContent}
    />
  );
};

export default Search;
