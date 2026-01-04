import React from "react";
import Header from "./header";
import Link from "next/link";

interface ResourcesCardsProps {
  color: string;
  title: string;
  description: string;
  href: string;
}

export default function ResourcesCards({
  color,
  title,
  description,
  href,
}: ResourcesCardsProps) {
  return (
    <li className="w-full max-w-md md:w-auto lg:w-[25vh] xl:w-[30vh] h-[25vh] relative mx-0 lg:mx-4 pt-10 px-6 group flex flex-col gap-4 pb-6 bg-[#F5F5F5] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110">
      <span
        style={{
          backgroundColor: color,
          boxShadow: `4px 4px 12px ${color}80`,
        }}
        className="w-12 h-12 rounded-full block absolute -top-3 left-6"
      />
      <Header variant="card">{title}</Header>
      <span className="text-stone-500">{description}</span>
      <Link href={href} className="font-bold underline">
        Saiba mais
      </Link>
    </li>
  );
}
