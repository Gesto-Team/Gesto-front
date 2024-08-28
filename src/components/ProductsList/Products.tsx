import {
  File,
  ListFilter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AddProduct } from "./AddProduct"
import { Navbar } from "../Navbar/Navbar"
import { MobileHeader } from "../Navbar/MobileHeader"
import { ProductTable } from "./ProductTable"

export function Products() {

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Navbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <MobileHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">

              <TabsList>
                <TabsTrigger value="all">Tout</TabsTrigger>
                <TabsTrigger value="valide">Valide</TabsTrigger>
                <TabsTrigger value="imminent">Imminent</TabsTrigger>
                <TabsTrigger value="expired">Expiré</TabsTrigger>
              </TabsList>

              <div className="ml-auto flex items-center gap-2">
                <AddProduct />
              </div>
            </div>
            <ProductTable />
          </Tabs>
        </main>
      </div>
    </div>
  )
}
