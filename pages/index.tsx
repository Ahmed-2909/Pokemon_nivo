import Image from "next/image";
import { Inter } from "next/font/google";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import "../node_modules/d3-color";

// import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface Props {
  pokemon: Pokemon[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  const pokemon: Pokemon[] = await resp.json();

  return {
    props: {
      pokemon,
    },
  };
};

interface HomeProps {
  pokemon: Pokemon[];
}

export default function Home({ pokemon }: HomeProps) {
  return (
    <div className="m-auto">
      <Head>
        <title>Pokemon List</title>
      </Head>
      {/* <h2 className="font-bold text-3xl text-center m-10">Pokemon List</h2> */}
      <Image
        src={
          "https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
        }
        alt={"PokemDex"}
        width={200}
        height={200}
        className="w-1/4 my-10  mx-auto"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
        {pokemon.map((pokemon) => (
          <div className="" key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <Image
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
                width={200}
                height={200}
                className="w-4/5 h-4/5 mx-auto"
              />
              <h3 className="my-2  text-center sm:text-lg lg:text-3xl font-bold">
                {pokemon.name}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
