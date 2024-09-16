import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { useState } from "react";
import { ProductTableBodyFiltred } from "./ProductTableBodyFiltred";

interface ChildProps {
  cardTitle: string;
  cardDescription: string;
  filter: string;
}
export function FiltredProductTable(props: ChildProps) {
  const [productsCount, setProductsCount] = useState(0);

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>{props.cardTitle}</CardTitle>
        <CardDescription>{props.cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du produit</TableHead>
              <TableHead className="hidden md:table-cell">Prix</TableHead>
              <TableHead className="hidden md:table-cell">Quantité</TableHead>
              <TableHead className="hidden md:table-cell">Unité</TableHead>
              <TableHead>Date d'expiration</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ProductTableBodyFiltred
              onProductsCountUpdate={(productsCount: number) => {
                setProductsCount(productsCount);
              }}
              filter={props.filter}
            />
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Total : <strong>{productsCount}</strong> produits
        </div>
      </CardFooter>
    </Card>
  );
}
