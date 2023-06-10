import React from "react";
import Head from "next/head";
import Link from "next/link";
import { NextRouter } from "next/router";
import Image from "next/image";
import { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "../../coponent/column";
import Bar from "../../coponent/Bar";

interface Pokemon {
  name: string;
  image: string;
  type: string[];
  stats: { name: string; value: number }[];
}

interface DetailsProps {
  pokemon: Pokemon;
}
interface data {
  id: number;
  name: string;
  image: string;
}

export async function getStaticPaths() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon: data[] = await resp.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: NextRouter["query"];
}) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Details({ pokemon }: DetailsProps) {
  const { stats } = pokemon;
  const columns: any = useMemo(() => COLUMNS, []);
  const data = useMemo(() => stats, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const firstTwoElements = pokemon.type.slice(0, 2);

  const getBackgroundColor = (normalizedType: string): string => {
    switch (normalizedType) {
      case "grass":
        return "bg-green-500";
      case "poison":
        return "bg-purple-500";
      case "fire":
        return "bg-red-500";
      case "water":
        return "bg-blue-500";
      case "electric":
        return "bg-yellow-500";
      case "bug":
        return "bg-green-300";
      case "normal":
        return "bg-gray-500";
      case "flying":
        return "bg-indigo-500";
      case "fighting":
        return "bg-red-700";
      case "psychic":
        return "bg-pink-500";
      case "rock":
        return "bg-gray-700";
      case "ground":
        return "bg-yellow-700";
      case "ice":
        return "bg-blue-300";
      case "steel":
        return "bg-gray-400";
      case "ghost":
        return "bg-purple-700";
      case "dragon":
        return "bg-indigo-700";
      case "dark":
        return "bg-gray-800";
      case "fairy":
        return "bg-pink-300";
      default:
        return "bg-gray-500";
    }
  };

  // Get the background color classes

  return (
    <div className="flex flex-col items-center  ">
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <Image
        src={
          "https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
        }
        alt={"PokemDex"}
        width={200}
        height={200}
        className="w-1/4 my-10  mx-auto"
      />
      <div className="flex flex-col items-center">
        <div className="bg-blue-500 inline-block text-white p-4 rounded-xl hover:bg-orange-500 my-3">
          <Link href="/">
            <h1>Back to Home</h1>
          </Link>
        </div>
        <div className="">
          <div>
            <Image
              className="w-1/2 mx-auto  my-10"
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
              alt={pokemon.name}
              width={200}
              height={200}
            />
          </div>
          <div>
            <div className="text-center font-bold text-4xl my-3">
              {pokemon.name}
            </div>
            <div className="my-3 mx-auto text-center">
              {firstTwoElements.map((type) => (
                <div
                  key={type}
                  className={`inline-block p-4 shadow text-white px-2 py-1 rounded-md mr-2 ${getBackgroundColor(
                    type.toLowerCase()
                  )}`}
                >
                  {type}
                </div>
              ))}
            </div>
            <div className="mx-auto">
              <table
                {...getTableProps()}
                className="mx-auto rounded-xl border-2 border-gray-200 sm:w-4/5 lg:w-4/5  "
              >
                <thead className="bg-slate-200  p-5 ">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="text-center"
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="text-center px-3 py-1"
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="px-3 border-b-2 border-gray-200 py-1"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-80 sm:w-fit  mx-auto overflow-x-scroll scroll-0 ">
              <Bar data={stats} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
