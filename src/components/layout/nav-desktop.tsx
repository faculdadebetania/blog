"use client";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Icon from "@components/ui/icon";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";
import { cn } from "@utils/cn";
import Link from "next/link";
import { Fragment, useState } from "react";

export function NavDesktop() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="https://faculdadebetania.com.br/" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-inherit h-auto")}>
                INÍCIO
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="https://faculdadebetania.com.br/#cursos" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-inherit h-auto")}>
                CURSOS
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="https://faculdadebetania.com.br/vestibular" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-inherit h-auto")}>
                VESTIBULAR
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="https://faculdadebetania.com.br/republica-estudantil" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-inherit h-auto")}>
                REPÚBLICA ESTUDANTIL
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                onMouseEnter={() => setOpen(true)}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex gap-1 bg-transparent hover:bg-inherit h-auto focus:bg-inherit data-[active]:bg-inherit data-[state=open]:bg-inherit"
                )}
              >
                INSTITUCIONAL
                <Icon name="ChevronDown" size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-primary/95 border-white/25" onMouseLeave={() => setOpen(false)}>
                <DropdownMenuItem className="opacity-90 group">
                  <Link
                    href="https://faculdadebetania.com.br/corpo-docente"
                    className="flex items-center gap-2 w-full group-hover:text-neutral-300"
                  >
                    <Icon name="UsersRound" strokeWidth={1} /> Corpo Docente
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neutral-700 mx-2" />
                <DropdownMenuItem className="opacity-90 group">
                  <Link
                    href="https://faculdadebetania.com.br/documentos"
                    className="flex items-center justify gap-2 w-full group-hover:text-neutral-300"
                  >
                    <Icon name="Files" strokeWidth={1} /> Documentos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neutral-700 mx-2" />
                <DropdownMenuItem className="opacity-90 group">
                  <Link
                    href="https://faculdadebetania.com.br/ouvidoria"
                    className="flex items-center gap-2 w-full group-hover:text-neutral-300"
                  >
                    <Icon name="MessagesSquare" strokeWidth={1} /> Ouvidoria
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neutral-700 mx-2" />
                <DropdownMenuItem className="opacity-90 group">
                  <Link
                    href="https://faculdadebetania.com.br/diplomas"
                    className="flex items-center gap-2 w-full group-hover:text-neutral-300"
                  >
                    <Icon name="GraduationCap" strokeWidth={1} /> Diplomas
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button
        asChild
        className="hidden lg:inline-flex bg-primary text-white hover:opacity-50 rounded-full p-4 font-semibold transition-opacity duration-300"
      >
        <Link href="http://educacional.usecerbrum.net/">Portal Acadêmico</Link>
      </Button>
    </Fragment>
  );
}
