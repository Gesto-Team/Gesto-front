// import {
//   File,
//   ListFilter,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  // TabsList,
  // TabsTrigger,
} from "@/components/ui/tabs"
import { DashboardTableBody } from "./DashboardTableBody"
import { Product } from "@/Types/Product"
import { useEffect, useState } from "react"
// import { useEffect, useState } from "react"

type DashBoardTableProps = {
  isPending: boolean;
  error: Error | null;
  data: Product[] | undefined;
  onRowClick: (product: Product) => void;
}

export function DashboardTable(props: DashBoardTableProps) {
  const [clickedProduct, setClickedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (clickedProduct) {
      props.onRowClick(clickedProduct);
    }
  }, [clickedProduct, props])


  return (
    <Tabs defaultValue="week">
      {/* <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-sm"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Declined
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Refunded
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-sm"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div> */}
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Expiration imminente</CardTitle>
            <CardDescription>
              Les produits suivants sont sur le point d'expirer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du produit</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Prix
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Quantité
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Unité
                  </TableHead>
                  <TableHead>
                    Date d'éxpiration
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <DashboardTableBody isPending={props.isPending} error={props.error} data={props.data} onRowClick={(product: Product) => { setClickedProduct(product) }} />
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )

}
