import { Button } from "@components/ui/button";
import Icon from "@components/ui/icon";
import { Separator } from "@components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="container text-white !pb-0 bg-primary">
      <section className="grid gap-8 md:gap-16 lg:gap-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="https://faculdadebetania.com.br/" className="relative">
            <Image
              priority
              height={96}
              width={150}
              src="/imagens/logo-negative.png"
              alt="logo"
              quality={100}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
          <div className="text-sm flex flex-col gap-1">
            <div>Av. Iguaçu, 1700 - Água Verde, Curitiba/PR</div>
            <div>Atendimento de seg. a sex., das 14h às 22h</div>
            <div className="flex gap-2 items-center">
              <Icon name="Phone" size={14} /> (41) 3014-8376
            </div>
            <div className="flex gap-2 items-center">
              <FaWhatsapp size={14} /> (41) 99670-5657
            </div>
          </div>
        </div>
        <section className="flex flex-col justify-start items-start gap-[2px]">
          <h3 className="font-bold uppercase">CURSOS</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="https://faculdadebetania.com.br/cursos/teologia">Teologia</Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/cursos/aconselhamento-e-gestao-de-pessoas">
                Aconselhamento e Gestão de Pessoas
              </Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/cursos/capelania">Capelania</Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/cursos/comunicacao-que-transforma">Comunicação que transforma</Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.brcursos/biblia-e-teologia">Bíblia e Teologia</Link>
            </li>
          </ul>
        </section>
        <section className="flex flex-col justify-start items-start gap-[2px]">
          <h3 className="font-bold uppercase">INSTITUIÇÃO</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="https://faculdadebetania.com.br/a-faculdade">A Faculdade</Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/corpo-docente">Corpo Docente</Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/vestibular">Vestibular</Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/republica-estudantil">República Estudantil</Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/contato">Contato</Link>
            </li>
          </ul>
        </section>
        <section className="relative min-h-[128px] md:row-[1] md:col-[2] lg:row-auto lg:col-auto">
          <Image
            priority
            fill
            src="/imagens/e-mec.jpeg"
            alt="logo"
            quality={100}
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </section>
      </section>
      <Separator className="mb-2 mt-12" />
      <section className="text-zinc-700 flex flex-col md:flex-row items-center justify-between text-center pb-4 lg:pb-6">
        <div>© {new Date().getFullYear()} Faculdade Teológica Betânia.</div>
        <div className="flex gap-4 justify-center">
          <Button className="text-neutral-300 hover:opacity-50 hover:bg-neutral-100 h-10 w-10 hover:text-primary transition">
            <Link href="https://www.instagram.com/faculdadebetania/">
              <Icon name="Instagram" size={64} className="!w-[24px] !h-[24px]" />
            </Link>
          </Button>
          <Button className="text-neutral-300 hover:opacity-50 hover:bg-neutral-100 h-10 w-10 hover:text-primary transition">
            <Link href="https://www.facebook.com/faculdadebetania">
              <Icon name="Facebook" size={64} className="!w-[24px] !h-[24px]" />
            </Link>
          </Button>
          <Button className="text-neutral-300 hover:opacity-50 hover:bg-neutral-100 h-10 w-10 hover:text-primary transition">
            <Link href="https://www.youtube.com/c/FaculdadeTeol%C3%B3gicaBet%C3%A2nia">
              <Icon name="Youtube" size={64} className="!w-[24px] !h-[24px]" />
            </Link>
          </Button>
        </div>
      </section>
    </footer>
  );
}
