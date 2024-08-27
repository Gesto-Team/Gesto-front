import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table"
import {
  TabsContent,
} from "@/components/ui/tabs"
import { ProductTableBody } from "./ProductTableBody"
import { useState } from "react"
import { number } from "zod"


export function ProductTable() {
  const [productsCount, setProductsCount] = useState(0);

  return (
    <TabsContent value="all">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Produits</CardTitle>
          <CardDescription>
            Gestion des produits en stock
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
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
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ProductTableBody onProductsCountUpdate={(productsCount: number) => { setProductsCount(productsCount) }} />
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Total : <strong>{productsCount}</strong> produits
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  )

}
