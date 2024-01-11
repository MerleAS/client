const ProductDetail = ({ product }) => {
  return (
    <>
      {product.description && (
        <div className="space-y-4 mt-8">
          <h3>Beskrivelse:</h3>
          <p className="leading-5 font-light">{product.description}</p>
        </div>
      )}

      {product.condition && (
        <div className="space-y-4">
          <h4>Tilstand: </h4>
          <p className="leading-5 font-light">{product.condition}</p>
        </div>
      )}

      {product.characteristics && (
        <div className="space-y-4">
          <h5>Egenskaper: </h5>
          <ul className="list-disc pl-3">
            {product.characteristics.map((char, index) => (
              <li className="leading-5 font-light" key={index}>{char}</li>
            ))}
          </ul>
        </div>
      )}

      {product.measurements && (
        <div className="space-y-4">
          <h6>Mål: </h6>
          <div>
            <p className="leading-5 font-light tracking-wide">
              Høyde: {product.measurements.height}
            </p>
            <p className="leading-5 font-light tracking-wide">
              Bredde: {product.measurements.width}
            </p>
            <p className="leading-5 font-light tracking-wide">
              Dybde: {product.measurements.depth}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
