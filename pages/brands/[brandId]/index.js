import axios from "axios";

const Brand = (props) => {
    const {brand} = props;
    console.log(brand)
    return (<div></div>)
};

export async function getStaticPaths() {
    const brands = await axios.get("http://localhost:8080/brands");
    const queries = brands.data.brands.map((brand) => {
      return { params: { brandId: brand._id } };
    });
    return {
      fallback: false,
      paths: queries,
    };
  }
  
  export async function getStaticProps(context) {
    const brandId = context.params.brandId;
    const brand = await axios.get(
      "http://localhost:8080/brands/" + brandId
    );
    return {
      props: {
        brand: brand.data.brand,
      },
    };
  }

export default Brand;