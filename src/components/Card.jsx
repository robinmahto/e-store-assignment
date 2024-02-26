import { useState } from "react";
import ProductModal from "./ProductModal.jsx";

const Card = ({ productItem }) => {
  const [openModal, setOpenModal] = useState(false);
  const [singleProduct, setSingleProduct] = useState({});
  const handleOpenModal = async (productId) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      const result = await response.json();
      setSingleProduct(result);
      console.log("result: ", result)
      setOpenModal(true);
    } catch (error) {
      console.error("product error: ", error.message);
    }
  };

  return (
    <>
      <div
        onClick={() => handleOpenModal(productItem.id)}
        className="border-2 border-teal-700 p-2 flex flex-col gap-2 rounded-md cursor-pointer"
      >
        <div>
          <img
            src={productItem?.image}
            alt={productItem?.title}
            className="w-24 h-24"
          />
        </div>
        <div>
          <h1>{productItem?.title}</h1>
          <p>&#11088;&#11088; &#11088; &#11088; &#11088;</p>
          <span>${productItem?.price}</span>
        </div>
      </div>

      <ProductModal
        setOpen={setOpenModal}
        open={openModal}
        productDetails={singleProduct}
      />
    </>
  );
};

export default Card;
