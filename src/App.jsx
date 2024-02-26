import { useState, useEffect } from "react";
import Card from "./components/Card";

const App = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesName, setCategoreisName] = useState("");

  const handleChangeProduct = (event) => {
    setSearchProduct(event.target.value);
    const productName = event.target.value;
    const searchResult = product?.filter((productItem) =>
      productName
        ? productItem.title.toLowerCase().includes(productName)
        : productItem
    );

    setSearchResult(searchResult);
  };

  // fetch product list
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        const categoriesProuct = result?.filter((productItem) => {
          return productItem.category === categoriesName
            ? productItem
            : productItem;
        });
        setProduct(categoriesProuct);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [categoriesName]);

  // fetch category of product
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const result = await response.json();
        setCategories(result);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  console.log("categoriesName: ", categoriesName)

  return (
    <div className="mx-20 my-5">
      {/* header */}
      <nav className="flex items-center justify-between">
        <h1 className="font-bold text-lg">E-store</h1>
        <ul className="flex items-center gap-4 cursor-pointer ">
          {categories?.map((categoriesList, index) => {
            return (
              <li
                onClick={() => setCategoreisName(categoriesList)}
                key={index}
                className="text-teal-700 hover:text-teal-500 hover:underline"
              >
                {categoriesList}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* search bar */}

      <div className="flex items-center justify-center my-4">
        <input
          type="search"
          value={searchProduct}
          onChange={handleChangeProduct}
          placeholder="Search for products..."
          className="border-2 rounded-md px-3 py-2 outline-none border-teal-800"
        />
      </div>

      {/* product list */}
      {loading ? (
        <>loading...</>
      ) : (
        <>
          {product?.length === 0 ? (
            <>
              <p>No Products Found!</p>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                {searchResult?.length === 0 ? (
                  <>
                    {product?.map((productItem) => {
                      return (
                        <Card key={productItem.id} productItem={productItem} />
                      );
                    })}
                  </>
                ) : (
                  <>
                    {searchResult?.map((productItem) => (
                      <Card key={productItem.id} productItem={productItem} />
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
