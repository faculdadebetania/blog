import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import Icon from "@components/ui/icon";
import { Separator } from "@components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import Link from "next/link";

export default function NavMobile() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Icon name="Menu" />
      </SheetTrigger>
      <SheetContent className="py-8 bg-primary flex flex-col text-gray-50">
        <Link href="https://faculdadebetania.com.br/">INÍCIO</Link>
        <Separator />
        <Link href="https://faculdadebetania.com.br/#cursos">CURSOS</Link>
        <Separator />
        <Link href="https://faculdadebetania.com.br/vestibular">VESTIBULAR</Link>
        <Separator />
        <Link href="https://faculdadebetania.com.br/republica-estudantil">REPÚBLICA ESTUDANTIL</Link>
        <Separator />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="institucional" className="border-b-border">
            <AccordionTrigger className="pt-0 pb-4 hover:no-underline font-normal font-nunito">INSTITUCIONAL</AccordionTrigger>
            <AccordionContent className="space-y-4 pl-2 pt-2">
              <Link href="https://faculdadebetania.com.br/corpo-docente" className="flex items-center gap-2 w-full">
                <Icon name="UsersRound" strokeWidth={1} /> Corpo Docente
              </Link>
              <Separator />
              <Link href="https://faculdadebetania.com.br/documentos" className="flex items-center justify gap-2 w-full">
                <Icon name="Files" strokeWidth={1} /> Documentos
              </Link>
              <Separator />
              <Link href="https://faculdadebetania.com.br/ouvidoria" className="flex items-center gap-2 w-full">
                <Icon name="MessagesSquare" strokeWidth={1} /> Ouvidoria
              </Link>
              <Separator />
              <Link href="https://faculdadebetania.com.br/diplomas" className="flex items-center gap-2 w-full">
                <Icon name="GraduationCap" strokeWidth={1} /> Diplomas
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button asChild className="mt-2 bg-white text-primary hover:bg-white/25 hover:text-white rounded-full p-6 font-bold">
          <Link href="http://educacional.usecerbrum.net/">Portal Acadêmico</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
