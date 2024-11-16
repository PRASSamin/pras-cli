"use client";
import MainContainer from "../../components/MainContainer";
import DocContainer from "../components/docContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function IntroductionPageView() {
  return (
    <MainContainer FooterClassName={'!mt-0'}>
      <DocContainer>
        <h1 id="introduction" data-id-name="Introduction" className="font-extrabold text-2xl">Introduction</h1>
        <p className="text-[15px] text-muted-foreground mt-2">
          PRAS CLI Tool is an all-in-one command-line tool that provides powerful commands and utilities for streamlining tasks. It&apos;s designed to simplify workflows, with an interactive shell that offers an accessible command interface.
        </p>

        <p className="text-[15px] mt-5 leading-7">
          Use PRAS CLI Tool as a base to build and expand your CLI needs, designed with the flexibility to adapt to your own projects.
        </p>

        <h2 id="faq" data-id-name="FAQ" className="font-extrabold text-2xl mt-10">FAQ</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Why does it offer an interactive shell?</AccordionTrigger>
            <AccordionContent>
              The interactive shell lets you run commands directly by name, enhancing usability and reducing the need to repeatedly type <strong>pras</strong>. Commands like <strong>django</strong> and <strong>netfetch</strong> can be run instantly, keeping your workflow fast and efficient. It also supports commonly used OS commands like <strong>ls</strong>, <strong>cd</strong>, and more.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Will there be more commands added?</AccordionTrigger>
            <AccordionContent>
              Yes, I plan to add additional commands to expand its functionality in future updates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>


      </DocContainer>
    </MainContainer>
  );
}