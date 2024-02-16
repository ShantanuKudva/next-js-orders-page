"use client";

import Cart from "@/components/Cart";
import ProductSelector from "@/components/product-selector";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

function Order() {
  const [value, setValue] = React.useState("");
  const [date, setDate] = React.useState<Date>();
  const [number, setNumber] = useState(1);
  const [cart, setCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [altCartVisible, setAltCartVisible] = useState(false);
  const [parts, setParts] = useState([]);
  const [partsInventory, setPartsInventory] = useState([]);
  // const [quantity, setQuantity] = useState(1);
  const [requiredParts, setRequiredParts] = useState({});

  const handleProductSubmit = (orderData: any) => {
    // @ts-ignore
    setCart((prevCart) => [...prevCart, orderData]);
    setAltCartVisible(false);
  };

  const handleOrder = async () => {
    const orderData: { [key: string]: number } = {}; // Define orderData as an object with string keys and number values

    // Iterate over each item in the cart
    for (const item of cart) {
      const { itemSelected, numberOfItems, category } = item;

      if (category === "Product") {
        // If the category is a product, fetch its parts
        const productParts = await fetchProductParts(itemSelected);
        console.log(productParts);
        productParts.forEach((p) => {
          if (orderData[p.part_name] == undefined) {
            orderData[p.part_name] = 0;
          }
          orderData[p.part_name] += p.inventory_quantity * numberOfItems;
        });
      } else if (category === "Part") {
        if (orderData[itemSelected] == undefined) {
          orderData[itemSelected] = 0;
        }
        orderData[itemSelected] += numberOfItems;
      }
    }

    // Convert orderData to an array of objects
    const orderArray = Object.entries(orderData).map(
      ([part_name, quantity]) => ({
        part_name,
        part_quantity_ordered: quantity,
      })
    );
    // const partsArray = Object.entries(partsInventory).map()
    const normalizePartName = (name) => {
      // Convert name to lowercase and remove spaces
      return name.toLowerCase().replace(/\s+/g, "");
    };

    // Iterate over each item in the ordersArray
    orderArray.forEach((order) => {
      const { part_name, part_quantity_ordered } = order;

      // Normalize the part name
      const normalizedPartName = normalizePartName(part_name);

      // Find the corresponding part in the partsInventory array
      const inventoryItem = partsInventory.find(
        (item) => normalizePartName(item.part_name) === normalizedPartName
      );

      // If the part is found in the partsInventory array
      if (inventoryItem) {
        const { inventory_quantity } = inventoryItem;

        // Compare the part_quantity_ordered with the inventory_quantity
        if (part_quantity_ordered <= inventory_quantity) {
          console.log(
            `${part_name}: Quantity available, in orderArray - ${part_quantity_ordered}, Quantity available in partsInventory - ${inventory_quantity}`
          );
        } else {
          console.log(
            `${part_name}: Quantity not available, in orderArray - ${part_quantity_ordered}, Quantity available in partsInventory - ${inventory_quantity}`
          );
        }
      } else {
        console.log(`${part_name}: Part not found in inventory`);
      }
    });
  };

  const fetchProductParts = async (productName: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/product/${productName}/parts`
      );
      return response.data.parts_required;
    } catch (error) {
      console.error("Error fetching product parts:", error);
      return [];
    }
  };

  useEffect(() => {
    // Fetch parts inventory from the API when the component mounts
    const fetchPartsInventory = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/parts");
        const inventory = response.data;
        inventory.forEach((item) => {
          // Check if the item has a "part_name" property
          if (item.hasOwnProperty("part_name")) {
            // Remove spaces from the "part_name" value and convert to lowercase
            item.part_name = item.part_name.toLowerCase().replace(/\s+/g, "");
          }
        });
        // console.log(inventory);
        setPartsInventory(inventory);
      } catch (error) {
        console.error("Error fetching parts inventory:", error);
      }
    };
    fetchPartsInventory();
  }, []);

  return (
    <div className="mt-2 grid gap-10 ">
      <h1 className=" text-3xl text-center">Create a new Order</h1>
      {/* @ts-ignore */}
      <ProductSelector
        value={value}
        setValue={setValue}
        date={date}
        setDate={setDate}
        number={number}
        setNumber={setNumber}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        handleProductSubmit={handleProductSubmit}
        altCartVisible={altCartVisible}
        setAltCartVisible={setAltCartVisible}
        parts={parts}
        setParts={setParts}
        partsInventory={partsInventory}
        setPartsInventory={setPartsInventory}
      />

      <Cart
        cart={cart}
        setCart={setCart}
        setAltCartVisible={setAltCartVisible}
        altCartVisible={altCartVisible}
        parts={parts}
        setParts={setParts}
        value={value}
        date={date}
        handleOrder={handleOrder}
      />
    </div>
  );
}

export default Order;
