"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-32 pt-24">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-4xl font-semibold text-black">
              Hardware work, shown as an interface <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Product Design
              </span>
            </h2>
          </>
        }
      >
        <img
          src="/assets/img/portfolio/branding-2.jpg"
          alt="Bone density measurement product design preview"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
