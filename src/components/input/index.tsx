"use client"

import { FormEvent, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { useRouter } from "next/navigation"

export function Input (){

    const [input, setInput] = useState("")
     const router = useRouter()

    function handleSearch(event: FormEvent) {
        event.preventDefault()
       

        if(input === "") return
        router.push(`/game/search/${input}`)

    }
    return (
        <form className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
        onSubmit={handleSearch}>
            <input  className="bg-slate-200 outline-none w-11/12 "
            
            type="text"
            placeholder="Procurando algum jogo?..." 
            value={input} 
            onChange={(event) => setInput(event.target.value)}
            />
            <button className="cursor-pointer bg-slate-200 p-2 rounded-lg hover:bg-slate-300 transition-all duration-300"
             type="submit">
                <BsSearch size={24} color="#EA580C" />
            </button>
    
        </form>
    )
}