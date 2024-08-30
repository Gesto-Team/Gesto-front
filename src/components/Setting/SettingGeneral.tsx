import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function SettingGeneral() {

  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Nom et prénom</CardTitle>
          <CardDescription>
            Modifier votre nom et prénom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Nom" />
            <br />
            <Input placeholder="Prénom" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Enregistrer</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Adresse email</CardTitle>
          <CardDescription>
            Modifier votre adresse email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input
              placeholder="Adresse email"
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Enregistrer</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
