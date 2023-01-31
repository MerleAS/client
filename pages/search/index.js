import axios from "axios";
import { useState, useContext } from "react";
import { useRouter } from 'next/router';

import classes from "../../styles/pages/search.module.css";
import useIsMobile from "../../components/util/useIsMobile";
import { StateContext } from '../../context/stateContext';

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import Cart from '../../components/layout/cart';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const isMobile = useIsMobile();

  const router = useRouter();
  const { serverUrl } = useContext(StateContext);

  const searchHandler = async (e) => {
    const query = e.target.value;
    try {
      if (query.length > 1) {
        const prods = await axios.get(
          `${serverUrl}second-hand/products?query=${query}`
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
      router.push(param)
  };

  return (
    <>
      <Header color="black" className={classes.header} />
      <div className={classes.container}>
        <div className={classes.searchContainer}>
          {!isMobile && (
            <div className={classes.logoContainer}>
              <svg
                className={classes.logo}
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37.923 36.0148L29.1886 27.2805H29.0946C31.7867 24.1062 33.1472 20.0139 32.8914 15.8595C32.6356 11.7052 30.7833 7.81073 27.722 4.99073C24.6608 2.17072 20.6277 0.643661 16.4663 0.728978C12.305 0.814295 8.33789 2.50538 5.39478 5.44849C2.45167 8.3916 0.760584 12.3587 0.675267 16.5201C0.58995 20.6814 2.11701 24.7145 4.93702 27.7758C7.75702 30.837 11.6515 32.6893 15.8058 32.9451C19.9602 33.2009 24.0525 31.8404 27.2268 29.1483C27.2268 29.1483 27.2268 29.2155 27.2268 29.2423L35.9611 37.9767C36.086 38.1027 36.2347 38.2026 36.3984 38.2709C36.5622 38.3391 36.7378 38.3742 36.9152 38.3742C37.0926 38.3742 37.2682 38.3391 37.432 38.2709C37.5957 38.2026 37.7443 38.1027 37.8693 37.9767C38.007 37.8547 38.1183 37.7058 38.1961 37.539C38.2739 37.3723 38.3167 37.1914 38.3217 37.0074C38.3268 36.8235 38.294 36.6405 38.2254 36.4698C38.1568 36.299 38.0539 36.1442 37.923 36.0148ZM16.8127 30.2502C14.155 30.2502 11.557 29.4621 9.34722 27.9855C7.13743 26.509 5.41512 24.4103 4.39806 21.955C3.38101 19.4996 3.1149 16.7978 3.63339 14.1911C4.15188 11.5845 5.43168 9.19018 7.31095 7.31091C9.19022 5.43164 11.5845 4.15184 14.1912 3.63335C16.7978 3.11487 19.4996 3.38097 21.955 4.39803C24.4104 5.41508 26.509 7.1374 27.9856 9.34718C29.4621 11.557 30.2502 14.155 30.2502 16.8127C30.2502 18.5773 29.9026 20.3247 29.2273 21.955C28.552 23.5853 27.5622 25.0666 26.3144 26.3144C25.0667 27.5622 23.5853 28.552 21.955 29.2273C20.3247 29.9026 18.5773 30.2502 16.8127 30.2502Z"
                  fill="black"
                />
              </svg>
            </div>
          )}
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="search"
              onChange={searchHandler}
              placeholder="Search"
            />
            <div className={classes.menuOptions}>
              {brands.length > 0 && brands.map((brand, index) => {
                return (
                  <p key={index} className={classes.menuOption} onClick={() => routeHandler(`/brands/${brand.brandId}`)}>
                    <strong>{brand.brand}</strong>
                  </p>
                )
              })}
              {products.length > 0 &&
                products.map((product, index) => {
                  return (
                    <p key={index} className={classes.menuOption} onClick={() => routeHandler(`/products/${product._id}`)}>
                      {product.brand} {product.type} - {product.title}
                    </p>
                  );
                })}
            </div>
          </div>
          {!isMobile && <div className={classes.logoContainer}></div>}
        </div>
      </div>
      <Cart/>
      <Footer />
    </>
  );
};

export default Search;
