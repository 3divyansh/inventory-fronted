import Button from "@/components/Button/Button";
import editIcon from "../../assets/icons/edit.svg";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputBox from "../InputBox/InputBox";
import toast from "react-hot-toast";
import { fetchProducts, updateProduct } from "@/Api/product";
import { validateProduct } from "@/Validation/product";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export function EditProduct({ id }) {
  const [productData, setProductData] = useState({
    brand: "",
    sku: "",
    category: "",
    inventory: "",
    price: "",
    description: "",
    metafields: {
      caseMaterial: "",
      dialColor: "",
      waterResistance: "",
      warrantyPeriod: "",
      movement: "",
      gender: "",
      caseSize: "",
    },
    image: {
      url: "",
      altText: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);

  const handleEdit = () => {
    const product = products.find((p) => p?._id === id);
    if (product) {
      setProductData({
        ...product,
        metafields: product.metafields || {
          caseMaterial: "",
          dialColor: "",
          waterResistance: "",
          warrantyPeriod: "",
          movement: "",
          gender: "",
          caseSize: "",
        },
        image: product.image || { url: "", altText: "" },
      });
      setIsOpen(true);
    } else {
      toast.error("Product not found");
    }
  };

  const handleChange = (field, value, nestedField = null) => {
    if (nestedField) {
      setProductData((prevData) => ({
        ...prevData,
        [field]: {
          ...(prevData[field] || {}),
          [nestedField]: value,
        },
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleUpdate = () => {
    const { error } = validateProduct(productData);
    if (error) return toast.error(error.message);

    const update = updateProduct(id, productData);
    toast.promise(update, {
      loading: "Updating product...",
      success: () => {
        fetchProducts(dispatch);
        setIsOpen(false);
        return "Product updated successfully!";
      },
      error: "Failed to update product. Please try again.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <DialogTrigger asChild>
        <img
          src={editIcon}
          className="w-4 h-4 cursor-pointer text-white"
          onClick={handleEdit}
        />
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-[1000px] max-h-[600px] overflow-y-auto bg-appBg-dark">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-6">
          {/* First Table */}
          <div className="flex-1 flex flex-col gap-4 py-4">
            <InputBox
              name="Brand"
              value={productData?.brand}
              setValue={(value) => handleChange("brand", value)}
            />
            <InputBox
              name="SKU"
              value={productData?.sku}
              setValue={(value) => handleChange("sku", value)}
            />
            <InputBox
              name="Category"
              value={productData?.category}
              setValue={(value) => handleChange("category", value)}
            />
            <InputBox
              name="Inventory"
              value={productData?.inventory}
              setValue={(value) => handleChange("inventory", value)}
              type="number"
            />
            <InputBox
              name="Price"
              value={productData?.price}
              setValue={(value) => handleChange("price", value)}
              type="number"
            />
            <InputBox
              name="Description"
              value={productData?.description}
              setValue={(value) => handleChange("description", value)}
            />
          </div>
          {/* Second Table */}
          <div className="flex-1 flex flex-col gap-4 py-4">
            {Object.keys(productData.metafields || {}).map((field) => (
              <InputBox
                key={field}
                name={field?.charAt(0).toUpperCase() + field.slice(1)}
                value={productData?.metafields[field]}
                setValue={(value) =>
                  handleChange("metafields", value, field)
                }
              />
            ))}
            <InputBox
              name="Image URL"
              value={productData?.image?.url}
              setValue={(value) => handleChange("image", value, "url")}
            />
            <InputBox
              name="Alt Text"
              value={productData?.image?.altText}
              setValue={(value) => handleChange("image", value, "altText")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
