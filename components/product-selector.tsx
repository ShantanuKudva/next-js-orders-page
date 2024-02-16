import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DatePicker } from "./date-picker";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { MinusIcon } from "lucide-react";
import { Combobox } from "./combobox";
import { Separator } from "./ui/separator";
import axios from "axios";
import { Input } from "./ui/input";
function ProductSelector({
  //@ts-ignore
  number,
  //@ts-ignore
  setNumber,
  //@ts-ignore
  value,
  //@ts-ignore
  setValue,
  //@ts-ignore
  date,
  //@ts-ignore
  setDate,
  //@ts-ignore
  handleProductSubmit,
  // @ts-ignore
  errorMessage,
  // @ts-ignore
  setErrorMessage,
  // @ts-ignore
  altCartVisible,
  // @ts-ignore
  setAltCartVisible,
  // @ts-ignore
  parts,
  // @ts-ignore
  setParts,
  // @ts-ignore
  partsInventory,
  // @ts-ignore
  setPartsInventory,
}) {
  const handleSubmit = async () => {
    if (!value || !date) {
      alert("Please select the item and date before adding to the cart.");
      return;
    }
    try {
      const productName = value.replace(" ", "").toLowerCase();
      const response = await axios.get(
        `http://localhost:8001/api/product/${productName}/${number}/parts`
      );
      const partsRequired = response.data;

      if (partsRequired.message?.startsWith("Not enough")) {
        alert(partsRequired.message);
        setAltCartVisible(true);

        try {
          const response = await axios.get(
            `http://localhost:8001/api/product/${productName}/parts`
          );
          const partsRequired = response.data.parts_required;
          // console.log(partsRequired.parts_required);
          setParts(partsRequired);
        } catch (e) {
          console.log(e);
        }
      } else if (partsRequired.parts_required) {
        // Check if there are enough parts available in the inventory
        const insufficientParts = partsRequired.parts_required.filter(
          // @ts-ignore
          (part) => partsInventory[part.part_name] < part.quantity * number
        );

        if (insufficientParts.length > 0) {
          // Display an alert if any part is insufficient
          alert(
            "There are insufficient parts available in the inventory. Please adjust your order."
          );
          return;
        }

        handleProductSubmit({
          date: date,
          itemSelected: value,
          numberOfItems: number,
          category: "Product",
        });
        // const updatedInventory = { ...partsInventory };
        // // Update the inventory for each part used by the product
        // partsRequired.parts_required.forEach((part) => {
        //   const currentQuantity = updatedInventory[part.part_name] || 0; // Get current quantity or default to 0
        //   const quantityToSubtract = parseInt(part.quantity * number); // Parse the calculated quantity as an integer
        //   updatedInventory[part.part_name] =
        //     currentQuantity - quantityToSubtract; // Subtract the quantity
        // });

        // // Update the state with the updated inventory
        // setPartsInventory(updatedInventory);
        // console.log(updatedInventory); // Log the updated inventory
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSubmit = async () => {
  //   if (!value || !date) {
  //     alert("Please select the item and date before adding to the cart.");
  //     return;
  //   }
  //   try {
  //     const productName = value.replace(" ", "").toLowerCase();
  //     const response = await axios.get(
  //       `http://localhost:8001/api/product/${productName}/${number}/parts`
  //     );
  //     const partsRequired = response.data;

  //     if (partsRequired.message?.startsWith("Not enough")) {
  //       alert(partsRequired.message);
  //       setAltCartVisible(true);

  //       try {
  //         // Fetch parts used by the product
  //         const productPartsResponse = await axios.get(
  //           `http://localhost:8001/api/product/${productName}/parts`
  //         );
  //         const productParts = productPartsResponse.data.parts_required;

  //         // Update partsInventory by subtracting the quantities of the product parts
  //         const updatedPartsInventory = { ...partsInventory };
  //         productParts.forEach((part) => {
  //           updatedPartsInventory[part.part_id] -= part.quantity * number;
  //         });

  //         // Set the updated partsInventory
  //         setPartsInventory(updatedPartsInventory);
  //         alert(partsInventory);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     } else if (partsRequired.parts_required) {
  //       handleProductSubmit({
  //         date,
  //         itemSelected: value,
  //         numberOfItems: number,
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Card className="w-[90%] m-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Create an Order</CardTitle>
        <CardDescription>
          Create an order and add it to your cart
        </CardDescription>
      </CardHeader>
      <Separator />
      <div className="mt-10 mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-5 justify-between">
        <CardContent>
          <div className="grid gap-5">
            <CardTitle>Select the Item Required</CardTitle>

            <Combobox value={value} setValue={setValue} />
          </div>
        </CardContent>
        <CardContent>
          <div className="grid gap-5">
            <CardTitle>Select a Date for Your Order</CardTitle>
            <DatePicker date={date} setDate={setDate} />
          </div>
        </CardContent>
        <CardContent>
          <div className="grid gap-5">
            <CardTitle>Number of Products Required</CardTitle>
            <div className="flex items-center gap-2">
              {/* <Button
                onClick={() => setNumber((prevNumber: any) => prevNumber + 1)}
              >
                <PlusIcon />
              </Button> */}
              <div className="text-center p-2 rounded-md w-[40%]">
                <Input
                  className="w-[100%] text-center focus:outline-none appearance-none"
                  value={number}
                  type="number"
                  onChange={(e) => {
                    e.target.valueAsNumber < 1
                      ? setNumber(1)
                      : setNumber(e.target.valueAsNumber);
                  }}
                />
              </div>
              {/* <Button
                onClick={() =>
                  setNumber((prevNumber: any) => Math.max(prevNumber - 1, 1))
                }
              >
                <MinusIcon />
              </Button> */}
            </div>
          </div>
        </CardContent>
      </div>
      <Separator />
      <CardFooter className="mt-10">
        {/* on click, it should check with the database to see if the parts used by the product is sufficient. if not, it should pop up another card */}
        <Button onClick={handleSubmit}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

export default ProductSelector;
