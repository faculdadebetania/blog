import { Button } from "@components/ui/button";
import Icon from "@components/ui/icon";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container !pb-0 border-t-[1px]">
      <section className="grid gap-8 md:gap-16 lg:gap-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center">
          <Link href="/" className="relative min-h-[96px] w-[196px]">
            <Image
              priority
              fill
              src="/imagens/logo.png"
              alt="logo"
              quality={100}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
          <div className="w-full flex gap-4 justify-center">
            <Button className="bg-white text-primary h-10 w-10 hover:opacity-50 hover:bg-white hover:text-primary transition">
              <Link href="https://www.instagram.com/faculdadebetania/">
                <Icon name="Instagram" />
              </Link>
            </Button>
            <Button className="bg-white text-primary h-10 w-10 hover:opacity-50 hover:bg-white hover:text-primary transition">
              <Link href="https://www.facebook.com/faculdadebetania">
                <Icon name="Facebook" />
              </Link>
            </Button>
            <Button className="bg-white text-primary h-10 w-10 hover:opacity-50 hover:bg-white hover:text-primary transition">
              <Link href="https://www.youtube.com/c/FaculdadeTeol%C3%B3gicaBet%C3%A2nia">
                <Icon name="Youtube" />
              </Link>
            </Button>
          </div>
        </div>
        <section className="flex flex-col justify-start items-start gap-[2px]">
          <h3 className="font-bold uppercase">CURSOS</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="https://faculdadebetania.com.br/cursos/teologia">
                Teologia
              </Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/cursos/aconselhamento-e-gestao-de-pessoas">
                Aconselhamento e Gestão de Pessoas
              </Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/cursos/capelania">
                Capelania
              </Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/cursos/comunicacao-que-transforma">
                Comunicação que transforma
              </Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.brcursos/biblia-e-teologia">
                Bíblia e Teologia
              </Link>
            </li>
          </ul>
        </section>
        <section className="flex flex-col justify-start items-start gap-[2px]">
          <h3 className="font-bold uppercase">INSTITUIÇÃO</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="https://faculdadebetania.com.br/corpo-docente">
                Corpo Docente
              </Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/vestibular">
                Vestibular
              </Link>
            </li>
            <li>
              <Link href="https://faculdadebetania.com.br/republica-estudantil">
                República Estudantil
              </Link>
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
      <section className="text-zinc-700 text-center px-2 py-8 lg:px-8 lg:py-12">
        © {new Date().getFullYear()} Faculdade Teológica Betânia. Todos Direitos
        Reservados.
      </section>
    </footer>
  );
}
