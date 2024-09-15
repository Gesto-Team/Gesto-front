import react from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DeleteProduct } from "./DeleteProduct"
import { EditProduct } from "./EditProduct"
import { Product } from "@/Types/Product";


export function TableAction(props: { 'product': Product }) {
  const [isEdit, setIsEdit] = react.useState(false)

  function handleMenuItemSelect(action: any) {
    if (action.target.innerText === 'Edit') {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={handleMenuItemSelect}>
              <span>Edit</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={handleMenuItemSelect}>
              <span>Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        {isEdit ? <EditProduct product={props.product} /> : <DeleteProduct product={props.product} />}
      </DialogContent>
    </Dialog>
  )
}