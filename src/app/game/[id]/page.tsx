import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/container";
import { Label } from "./components/label";
import { GameCard } from "@/components/gameCard";
import { Metadata } from "next";


interface PropsParams {
    params: {
        id: string
    }
}
export async function generateMetadata({ params }: PropsParams): Promise<Metadata> {
     try {
        const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, {
            next: { revalidate: 60 },
        }).then((res) => res.json())
        .catch(()=>{
             return {
            title: "Descubras jogos Incirveis para se divertir"
            }
        })

        return {
            title: response.title,
            description: response.description,
            openGraph: {
                title: response.title,
                description: response.description,
                
            },
        }
        

    } catch (error) {
        return {
            title: "Descubras jogos Incirveis para se divertir",
            description: "Game not found",
            openGraph: {
                title: "Game not found",
                description: "Game not found",
                url: `${process.env.PROJECT_URL}/game/${params.id}`,
                images: [`${process.env.PROJECT_URL}/preview.png`],
            },
        }
    }

}

async function getData(id:string) {

    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {
            cache: "no-store",
        })
        return res.json();

    } catch (error) {
        throw new Error(error as string)
    }
    
}

async function getGameSorted() {

    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {
            cache: "no-store",})
        return res.json();
    } catch (error) {
        throw new Error(error as string)
        
    }
}


export default async function Game( {
    params: { id }
}: {
    params: { id: string }
}){
    const data: GameProps = await getData(id);
    const gameSorted: GameProps = await getGameSorted();

    
    if (!data) {
        redirect("/");
    }
   
    
    return (
        <main className="w-full text-black">
        <div className="bg-black h-80 w-full sm:h-96 relative">
           <Image 
           className="object-cover w-full sm:h-96 opacity-50 hover:opacity-100 transition-all duration-300"
           src={data.image_url} 
           alt={data.title}
           priority={true}
           fill={true}
           quality={100}
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw" />
         
        </div>

        <Container>
            <h1 className="font-bold text-xl my-4">{data.title} </h1>
            <p className=" text-gray-500 mb-4">{data.description}</p>	

            <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
            <div className="flex flex-wrap gap-2">
                {data.platforms.map((item) => (
                    <Label name={item} key={item}  />
                ))}
            </div>


                        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
            <div className="flex flex-wrap gap-2">
                {data.categories.map((item) => (
                    <Label name={item} key={item}  />
                ))}
            </div>

            <p className="mt-7 mb2"> <strong>Data de Lançamento:</strong> {data.release} </p>
            <h2 className="font-bold text-lg mt-7 mb-2">jogo recomendado</h2>
            <div className="flex">
                <div className="flex-grow">
                    <GameCard  data={gameSorted} />
                </div>
            </div>
        </Container>
        </main>
    )
}