
import {
  // ChevronLeft,
  // ChevronRight,
  Copy,
  MoreVertical,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,

  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/Types/Product"
import { useEffect, useState } from "react"

type DashboardProductDetailsProps = {
  clickedProduct: Product | null;
}

export function DashboardProductDetails(props: DashboardProductDetailsProps) {
  const [daysDiff, setDaysDiff] = useState<number>(0);

  useEffect(() => {
    if (props.clickedProduct) {
      const currentDate = new Date();
      const expiration = new Date(props.clickedProduct?.expirationDate || '');
      const timeDiff = expiration.getTime() - currentDate.getTime();
      setDaysDiff(timeDiff / (1000 * 3600 * 24));
    }
  }, [props.clickedProduct]);


  return (
    <Card
      className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
    >
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {props.clickedProduct?.name}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>{props.clickedProduct?.expirationDate
            ? "Date d'expiration : " + new Date(props.clickedProduct.expirationDate).toLocaleDateString('en-GB')
            : ''}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Modifier</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Détails du produit</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Unité de mesure
              </span>
              <span>{props.clickedProduct?.unit}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Prix unitaire</span>
              <span>{props.clickedProduct?.price} €</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Quantité</span>
              <span>{props.clickedProduct?.quantity}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{props.clickedProduct?.price && props.clickedProduct?.quantity && props.clickedProduct?.price * props.clickedProduct?.quantity} €</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">État du produit</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Expiration dans : </dt>
              <dd>{Math.round(daysDiff)} jours</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter> */}
    </Card>
  )
}