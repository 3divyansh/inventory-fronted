import React, { useState } from "react";
import Auth from "../Auth/Auth";
import InputBox from "../../components/InputBox/InputBox";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";

// icons
import productIcon from "../../assets/icons/product.svg";
import listIcon from "../../assets/icons/list.svg";
import qrCodeICon from "../../assets/icons/qrCode.svg";
import rupesIcon from "../../assets/icons/rupes.svg";
import { validateProduct } from "../../Validation/product";
import toast from "react-hot-toast";
import axios from "axios";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Redux/index";
import { createProduct, fetchProducts } from "../../Api/product";
import Transition from "@/components/Transition/Transition";



function Products() {
  const [brand, setBrandName] = useState("");
  const [sku, setSkuCode] = useState("");
  const [category, setCategory] = useState("");
  const [inventory, setInventory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [caseMaterial, setCaseMaterial] = useState("");
  const [dialColor, setDialColor] = useState("");
  const [waterResistance, setWaterResistance] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [movement, setMovement] = useState("");
  const [gender, setGender] = useState("");
  const [caseSize, setCaseSize] = useState("");

  // redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);

  function handleAddProduct() {
    const user = localStorage.getItem("userId");
    if (!user) return toast.error("User not authenticated");

    let data = {
      user,
      brand,
      sku,
      category,
      inventory: Number(inventory), // Convert to number
      price: Number(price),  
      description,
      metafields: {
        caseMaterial,
        dialColor,
        waterResistance,
        warrantyPeriod,
        movement,
        gender,
        caseSize,
      },
    };

    const { error } = validateProduct(data);
    if (error) return toast.error(error.message);

    toast.promise(createProduct(data), {
      loading: "Sending...",
      success: () => {
        fetchProducts(dispatch);
        return "Product Added Successfully";
      },
      error: "Server Error",
    });
  }

  return (
    <div className="w-full h-full">
      <div className="title w-full text-center mb-6 -mt-3">
        <h3 className="text-2xl font-bold">Add Products</h3>
      </div>
      <div className="card w-full h-full grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3">
        <InputBox
          name={"Brand Name"}
          placeholder={"ex: Seiko"}
          icon={productIcon}
          value={brand}
          setValue={setBrandName}
        />
        
        <InputBox
          name={"SKU Code"}
          placeholder={"ex: SKU12345"}
          icon={qrCodeICon}
          value={sku}
          setValue={setSkuCode}
        />
        
        <InputBox
          name={"Category"}
          placeholder={"ex: Luxury"}
          icon={listIcon}
          value={category}
          setValue={setCategory}
        />
        <InputBox
          name={"Inventory"}
          placeholder={"ex: 50"}
          icon={listIcon}
          value={inventory}
          setValue={setInventory}
        />
        <InputBox
          name={"Price"}
          placeholder={"ex: 35000"}
          icon={rupesIcon}
          value={price}
          setValue={setPrice}
        />
        <InputBox
          name={"Case Material"}
          placeholder={"ex: Stainless Steel"}
          
          value={caseMaterial}
          setValue={setCaseMaterial}
        />
        <InputBox
          name={"Dial Color"}
          placeholder={"ex: Black"}
          value={dialColor}
          setValue={setDialColor}
        />
        <InputBox
          name={"Water Resistance"}
          placeholder={"ex: 50m"}
          icon={listIcon}
          value={waterResistance}
          setValue={setWaterResistance}
        />
        <InputBox
          name={"Warranty Period"}
          placeholder={"ex: 2 Years"}
          
          value={warrantyPeriod}
          setValue={setWarrantyPeriod}
        />
        <InputBox
          name={"Movement"}
          placeholder={"ex: Quartz"}
          value={movement}
          setValue={setMovement}
        />
        <InputBox
          name={"Gender"}
          placeholder={"ex: Unisex"}
          value={gender}
          setValue={setGender}
        />
        <InputBox
          name={"Case Size"}
          placeholder={"ex: 42mm"}
          value={caseSize}
          setValue={setCaseSize}
        />
        <TextArea
          name={"Description"}
          nLines={9}
          value={description}
          setValue={setDescription}
        />
        <div />
        <div>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>
      </div>
    </div>
  );
}

export default Auth(Products);
