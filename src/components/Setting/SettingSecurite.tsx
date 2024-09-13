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

export function SettingSecurite() {

  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Mot de passe</CardTitle>
          <CardDescription>
            Modifier votre mot de passe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Nouveau mot de passe" />
            <br />
            <Input placeholder="Confirmation de mot de passe" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Enregistrer</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
