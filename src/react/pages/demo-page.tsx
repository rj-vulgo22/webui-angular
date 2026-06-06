import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

export function DemoPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center gap-4 px-4">
          <h1 className="text-lg font-semibold tracking-tight">webui-angular</h1>
          <div className="ml-auto flex items-center gap-2">
            <Badge>shadcn</Badge>
            <Badge variant="secondary">Base UI</Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Angular + shadcn</h1>
            <p className="text-muted-foreground">
              Híbrido React + Angular com shadcn Base UI.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="default">Default</Button>
            <Button size="lg">LG</Button>
            <Button size="icon">
              <Plus />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/angular.png" />
                    <AvatarFallback>NG</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Angular</CardTitle>
                    <CardDescription>v22.0.0</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Framework de aplicações web mantido pelo Google.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Saiba mais</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/reactjs.png" />
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>React</CardTitle>
                    <CardDescription>v19.2.7</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Biblioteca para interfaces de usuário.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Saiba mais</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        shadcn Base UI &middot; Tailwind v4 &middot; Angular 22
      </footer>
    </div>
  );
}
