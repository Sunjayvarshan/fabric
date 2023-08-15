import { useFormik } from "formik";
import { basicSchema } from "./../schema/ProductSchema";
import styles from "./../styles/CreateProduct.module.css";
import DashNav from "./../components/DashNav";
import toast, { Toaster } from "react-hot-toast";

const onSubmit = async (values, actions) => {
  console.log(values);
  const { name, price, description, quantity } = values;
  console.log(name);
  const response = await fetch("http://localhost:8000/api/addproduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      description,
      quantity,
    }),
  });
  const data = await response.json();

  if (data.status === "ok") {
    console.log("success");
  }
  toast.success("successfully added");
  actions.resetForm();
  setTimeout(function () {
    window.location.href = "/dashboard";
  }, 1000);
};

const Product = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
      description: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <>
      <DashNav />
      <div className={styles.App}>
        <h1>Add your Product</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="name">Name</label>
          <input
            value={values.name}
            onChange={handleChange}
            id="name"
            type="name"
            placeholder="Enter the product's name"
            onBlur={handleBlur}
            className={errors.name && touched.name ? "input-error" : ""}
          />
          {errors.name && touched.name && (
            <p className={styles.error}>{errors.name}</p>
          )}

          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Enter the price of the product"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.price && touched.price ? "input-error" : ""}
          />
          {errors.price && touched.price && (
            <p className={styles.error}>{errors.price}</p>
          )}

          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            placeholder="How many do you want to sell"
            value={values.quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.quantity && touched.quantity ? "input-error" : ""}
          />
          {errors.quantity && touched.quantity && (
            <p className={styles.error}>{errors.quantity}</p>
          )}

          <label htmlFor="description">Description</label>
          <input
            id="description"
            placeholder="Tell us about your product"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.description && touched.description ? "input-error" : ""
            }
          />
          {errors.description && touched.description && (
            <p className={styles.error}>{errors.description}</p>
          )}
          <button disabled={isSubmitting} type="submit">
            Add my Product
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
};
export default Product;
