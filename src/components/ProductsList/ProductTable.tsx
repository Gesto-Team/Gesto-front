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
import { TabsContent } from "@/components/ui/tabs";
import { ProductTableBody } from "./ProductTableBody";
import { useState } from "react";
import { FiltredProductTable } from "./FiltredProductTable";

export function ProductTable() {
  const [productsCount, setProductsCount] = useState(0);

  return (
    <>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Produits</CardTitle>
            <CardDescription>Gestion des produits en stock</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du produit</TableHead>
                  <TableHead className="hidden md:table-cell">Prix</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Quantité
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Unité</TableHead>
                  <TableHead>Date d'expiration</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <ProductTableBody
                  onProductsCountUpdate={(productsCount: number) => {
                    setProductsCount(productsCount);
                  }}
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
      </TabsContent>

      <TabsContent value="valide">
        <FiltredProductTable
          cardTitle="Produits valides"
          cardDescription="La liste des produits valides en stock"
          filter="valide"
        />
      </TabsContent>
      <TabsContent value="imminent">
        <FiltredProductTable
          cardTitle="Produits imminents d'expiration"
          cardDescription="La liste des produits expirant dans moins de 30 jours"
          filter="imminent"
        />
      </TabsContent>
      <TabsContent value="expired">
        <FiltredProductTable
          cardTitle="Produits expirés"
          cardDescription="La liste des produits expirés"
          filter="expired"
        />
      </TabsContent>
    </>
  );
}
