import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { formatDate } from "date-fns";
//@ts-ignore

function AltCart(props) {
  const handleVisibility = () => {
    if (
      confirm(
        "are you sure? you wont be able to select individual elements later on"
      )
    ) {
      props.setAltCartVisible(false);
    }
  };

  const addIntoCart = (part) => {
    console.log(typeof props.date);
    const newItem = {
      // date: formatDate(props.date, "dd/MM/yy"),
      date: props.date,
      itemSelected: part.part_name,
      numberOfItems: part.inventory_quantity,
      category: "Part",
    };

    // Add the newItem to the cart
    props.setCart((prevCart) => [...prevCart, newItem]);

    // Remove the corresponding part from the parts list
    const updatedParts = props.parts.filter((p) => p.part_id !== part.part_id);
    props.setParts(updatedParts);
  };

  return (
    <div className="flex-grow basis-full ">
      <Card>
        <CardHeader className="grid grid-flow-col items-center justify-between">
          <CardTitle className="text-3xl">Select Individual parts</CardTitle>
          <div onClick={handleVisibility}>
            <Cross1Icon />
          </div>
        </CardHeader>

        <Separator />
        <CardContent className="mt-4 overflow-y-scroll h-[15rem]">
          {/* {console.log(props.parts)} */}
          {props.parts &&
            props.parts.map((p, index) => {
              return (
                <ul key={index} className="mt-10">
                  <div className="flex justify-between items-center">
                    <li>{p.part_name}</li>
                    <li>Quantity - {p.inventory_quantity} Units each</li>
                    <Button onClick={() => addIntoCart(p)}>Add</Button>
                  </div>
                </ul>
              );
            })}
        </CardContent>
      </Card>
    </div>
  );
}

export default AltCart;
