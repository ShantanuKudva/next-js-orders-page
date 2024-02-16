// "use client";

// import * as React from "react";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// //@ts-ignore
// export function DatePicker({ date, setDate }) {
//   //   const [date, setDate] = React.useState<Date>();

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, "dd/Mm/yy") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }

import * as React from "react";
import { format, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ date, setDate }) {
  const today = new Date();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            // Check if selected date is before today's date
            if (isBefore(selectedDate, today)) {
              // If selected date is before today's date, set it to today's date
              setDate(today);
            } else {
              setDate(selectedDate);
            }
          }}
          initialFocus
          minDate={today} // Set minimum selectable date to today
        />
      </PopoverContent>
    </Popover>
  );
}

// // import * as React from "react";
// // import { format } from "date-fns";
// // import { Calendar as CalendarIcon } from "lucide-react";

// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import { Calendar } from "@/components/ui/calendar";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";

// // export function DatePicker({ date, setDate }) {
// //   const today = new Date();

// //   return (
// //     <Popover>
// //       <PopoverTrigger asChild>
// //         <Button
// //           variant={"outline"}
// //           className={cn(
// //             "w-[280px] justify-start text-left font-normal",
// //             !date && "text-muted-foreground"
// //           )}
// //         >
// //           <CalendarIcon className="mr-2 h-4 w-4" />
// //           {date ? format(date, "dd/MM/yy") : <span>Pick a date</span>}
// //         </Button>
// //       </PopoverTrigger>
// //       <PopoverContent className="w-auto p-0">
// //         <Calendar
// //           mode="single"
// //           selected={date}
// //           onSelect={(selectedDate) => {
// //             // console.log(typeof selectedDate);
// //             setDate(selectedDate);
// //           }}
// //           initialFocus
// //           minDate={today}
// //         />
// //       </PopoverContent>
// //     </Popover>
// //   );
// // }
