import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/Types/Product";
import "./CustomTooltip.css";

const chartConfig = {
  quantity: {
    label: "quantity",
    color: "#e33b46",
  },
  price: {
    label: "price",
    color: "#ed7a51",
  },
} satisfies ChartConfig;

import { TooltipProps } from "recharts";

const QuantityTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const product = payload[0].payload;
    // const totalPrice = product.price * product.quantity;

    return (
      <div className="custom-tooltip">
        {/* <p className="label">{"Quantité"}</p> */}
        <p className="intro">{`Quantité: ${product.quantity} ${product.unit}`}</p>
        {/* <p className="desc">{`Prix total: ${totalPrice} €`}</p> */}
      </div>
    );
  }

  return null;
};

const PriceTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const product = payload[0].payload;
    const totalPrice = product.price * product.quantity;

    return (
      <div className="custom-tooltip">
        {/* <p className="label">{"Prix total"}</p> */}
        {/* <p className="intro">{`Quantité: ${product.quantity} ${product.unit}`}</p> */}
        <p className="desc">{`Prix total: ${totalPrice} €`}</p>
      </div>
    );
  }

  return null;
};

export function Charts() {
  const { isPending, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "products")
        .then((res) => res.data),
  });

  const currentDate = new Date();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>
                    Quantité d'aliments périmés avant la fin du mois - Kg
                  </CardTitle>
                  <CardDescription>
                    Label des aliments - Quantité des aliments{" "}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="min-h-[200px] w-full"
                  >
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <BarChart
                        accessibilityLayer
                        data={data.filter((product: Product) => {
                          const expiration = new Date(product.expirationDate);
                          const timeDiff =
                            expiration.getTime() - currentDate.getTime();
                          const daysDiff = timeDiff / (1000 * 3600 * 24);
                          return (
                            daysDiff <= 30 &&
                            daysDiff > 0 &&
                            product.unit === "kg"
                          );
                        })}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <ChartTooltip content={<QuantityTooltip />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                          dataKey="quantity"
                          fill="var(--color-quantity)"
                          radius={4}
                        />
                        {/* <Bar dataKey="price" fill="var(--color-price)" radius={4} /> */}
                      </BarChart>
                    )}
                  </ChartContainer>
                </CardContent>
              </Card>{" "}
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>
                    Quantité d'aliments périmés avant la fin du mois - Pièce
                  </CardTitle>
                  <CardDescription>
                    Label des aliments - Quantité des aliments{" "}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="min-h-[200px] w-full"
                  >
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <BarChart
                        accessibilityLayer
                        data={data.filter((product: Product) => {
                          const expiration = new Date(product.expirationDate);
                          const timeDiff =
                            expiration.getTime() - currentDate.getTime();
                          const daysDiff = timeDiff / (1000 * 3600 * 24);
                          return (
                            daysDiff <= 30 &&
                            daysDiff > 0 &&
                            product.unit === "pièce"
                          );
                        })}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <ChartTooltip content={<QuantityTooltip />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                          dataKey="quantity"
                          fill="var(--color-quantity)"
                          radius={4}
                        />
                        {/* <Bar dataKey="price" fill="var(--color-price)" radius={4} /> */}
                      </BarChart>
                    )}
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>
                    Prix total des aliments périmés avant la fin du mois
                  </CardTitle>
                  <CardDescription>
                    Label des aliments - Prix total des aliments{" "}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="min-h-[200px] w-full"
                  >
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <BarChart
                        accessibilityLayer
                        data={data.filter((product: Product) => {
                          const expiration = new Date(product.expirationDate);
                          const timeDiff =
                            expiration.getTime() - currentDate.getTime();
                          const daysDiff = timeDiff / (1000 * 3600 * 24);
                          return daysDiff <= 30 && daysDiff > 0;
                        })}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <ChartTooltip content={<PriceTooltip />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                          dataKey="price"
                          fill="var(--color-price)"
                          radius={4}
                        />
                      </BarChart>
                    )}
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Charts;
