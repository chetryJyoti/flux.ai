"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import { sidebarOptions } from "@/lib/constant";
import clsx from "clsx";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";
type Props = {};

const SidebarComp = (props: Props) => {
  const pathName = usePathname();
  return (
    <div>
      <nav className="dark:bg-black h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2">
        <div className="flex items-center justify-center flex-col gap-8">
          <Link
            className="flex font-bold flex-row justify-center items-center"
            href="/"
          >
            <Image
              src="/fluxLogo.png"
              width={40}
              height={40}
              alt="Flux.ai Logo"
              className="shadow-sm"
              priority={true}
            />
            <p className="text-xl font-bold ml-[-12px]">lux.ai</p>
          </Link>
          <TooltipProvider>
            {sidebarOptions.map((sidebarOption) => (
              <ul key={sidebarOption.name}>
                <Tooltip delayDuration={1}>
                  <TooltipTrigger>
                    <li>
                      <Link
                        href={sidebarOption.href}
                        className={clsx(
                          "group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer",
                          {
                            "dark:bg-[#2F006B] bg-[#EEE0FF]":
                              sidebarOption.href === pathName,
                          }
                        )}
                      >
                        <sidebarOption.Component
                          selected={pathName === sidebarOption.href}
                        />
                      </Link>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent side={"right"}>
                    <p className="bg-black/10 backdrop-blur-xl">
                      {sidebarOption.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </ul>
            ))}
          </TooltipProvider>
          <Separator />
          {/* <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px]">
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <LucideMousePointerClick className="dark:text-white" size={18} />
              <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <GitBranch className="text-muted-foreground" size={18} />
              <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <Database className="text-muted-foreground" size={18} />
              <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <GitBranch className="text-muted-foreground" size={18} />
            </div>
          </div> */}
        </div>
        <div className="flex items-center justify-center flex-col gap-8">
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

export default SidebarComp;
