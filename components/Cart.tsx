import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import AltCart from "./AltCart";
import { format, formatDate } from "date-fns";
import { Button } from "./ui/button";

//@ts-ignore
function Cart(props) {
  return (
    <div className="flex w-[90%] m-auto gap-10">
      <div className="flex-grow basis-full ">
        <Card>
          <CardHeader className="flex-grow basis-full">
            <CardTitle className="text-3xl">Cart</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="mt-4 overflow-y-scroll h-[15rem]">
            <ul className="grid gap-10">
              {/* @ts-ignore */}

              {props.cart.map((order, index) => (
                <li key={index}>
                  <div>{`Date: ${formatDate(order.date, "dd/MM/yy")}`}</div>
                  <div>{`Item Selected: ${order.itemSelected}`}</div>
                  <div>{`Number of Items: ${order.numberOfItems}`}</div>
                  <div>{`Category: ${order.category}`}</div>
                </li>
              ))}
            </ul>
          </CardContent>
          {props.cart.length > 0 && (
            <>
              <Separator />
              <Button className="m-5" onClick={props.handleOrder}>
                Order
              </Button>
            </>
          )}
        </Card>
      </div>
      {props.altCartVisible && (
        <AltCart
          setAltCartVisible={props.setAltCartVisible}
          // @ts-ignore
          parts={props.parts}
          // @ts-ignore
          setParts={props.setParts}
          cart={props.cart}
          setCart={props.setCart}
          date={props.date}
        />
      )}
    </div>
  );
}

export default Cart;
