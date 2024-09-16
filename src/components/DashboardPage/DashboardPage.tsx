import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { DashboardTable } from "./DashboardTable";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/Types/Product";
import { DashboardProductDetails } from "./DashboardProductDetails";

export function DashboardPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "products")
        .then((res) => res.data),
  });

  const [productsStatistics, setProductsStatistics] = useState({
    productsExpiringThisMonthCount: 0,
    productsExpiringThisWeekCount: 0,
    productsExpiringThisMonthTotal: 0,
    productsExpiringThisWeekTotal: 0,
    productsExpiringThisMonthPercentage: 0,
    productsExpiringThisWeekPercentage: 0,
  });

  const [clickedProduct, setClickedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (data) {
      const currentDate = new Date();

      const validProducts = data.filter((product: Product) => {
        const expiration = new Date(product.expirationDate);
        const timeDiff = expiration.getTime() - currentDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff > 0;
      });
      const validProductsCount = validProducts.length;

      const productsExpiringThisMonth = data.filter((product: Product) => {
        const expiration = new Date(product.expirationDate);
        const timeDiff = expiration.getTime() - currentDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff <= 30 && daysDiff > 0;
      });
      const productsExpiringThisMonthCount = productsExpiringThisMonth.length;
      const productsExpiringThisMonthTotal = productsExpiringThisMonth.reduce(
        (sum: number, product: Product) =>
          sum + product.price * product.quantity,
        0
      );
      const productsExpiringThisMonthPercentage =
        (productsExpiringThisMonthCount / validProductsCount) * 100;

      const productsExpiringThisWeek = data.filter((product: Product) => {
        const expiration = new Date(product.expirationDate);
        const timeDiff = expiration.getTime() - currentDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff <= 7 && daysDiff > 0;
      });
      const productsExpiringThisWeekCount = productsExpiringThisWeek.length;
      const productsExpiringThisWeekTotal = productsExpiringThisWeek.reduce(
        (sum: number, product: Product) =>
          sum + product.price * product.quantity,
        0
      );
      const productsExpiringThisWeekPercentage =
        (productsExpiringThisWeekCount / validProductsCount) * 100;

      setProductsStatistics({
        productsExpiringThisMonthCount,
        productsExpiringThisWeekCount,
        productsExpiringThisMonthTotal,
        productsExpiringThisWeekTotal,
        productsExpiringThisMonthPercentage,
        productsExpiringThisWeekPercentage,
      });
    }
  }, [data]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>
                    Les produits arrivant à expiration ce mois-ci
                  </CardDescription>
                  <CardTitle className="text-4xl">
                    {productsStatistics.productsExpiringThisMonthCount}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {Math.round(
                      productsStatistics.productsExpiringThisMonthPercentage *
                        100
                    ) / 100}
                    % des produits valides
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={
                      productsStatistics.productsExpiringThisMonthPercentage
                    }
                    aria-label={
                      Math.round(
                        productsStatistics.productsExpiringThisMonthPercentage *
                          100
                      ) /
                        100 +
                      "% increase"
                    }
                  />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>
                    Les produits arrivant à expiration cette semaine
                  </CardDescription>
                  <CardTitle className="text-4xl">
                    {productsStatistics.productsExpiringThisWeekCount}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {Math.round(
                      productsStatistics.productsExpiringThisWeekPercentage *
                        100
                    ) / 100}
                    % des produits valides
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={
                      productsStatistics.productsExpiringThisWeekPercentage
                    }
                    aria-label={
                      productsStatistics.productsExpiringThisWeekPercentage +
                      "% increase"
                    }
                  />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="pb-2">
                  <CardDescription>
                    Total des produits arrivant à expiration ce mois-ci
                  </CardDescription>
                  <CardTitle className="text-4xl">
                    {Math.round(
                      productsStatistics.productsExpiringThisMonthTotal * 100
                    ) / 100}{" "}
                    €
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-4">
                <CardHeader className="pb-2">
                  <CardDescription>
                    Total des produits arrivant à expiration cette semaine
                  </CardDescription>
                  <CardTitle className="text-4xl">
                    {Math.round(
                      productsStatistics.productsExpiringThisWeekTotal * 100
                    ) / 100}{" "}
                    €
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <DashboardTable
              isPending={isPending}
              error={error}
              data={data}
              onRowClick={(product: Product) => {
                setClickedProduct(product);
              }}
            />
          </div>
          <div>
            {clickedProduct && (
              <DashboardProductDetails clickedProduct={clickedProduct} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
