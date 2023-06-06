import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

function getTodos(){
  return prisma.todo.findMany()
}

// run code on server to update our actual todo code
async function toggleTodo(id:string, complete: boolean) {
  "use server"

  // deletes checked off todos upon refresh
  await prisma.todo.delete({where: {id} })
}

export default async function Home(){
  const todos =  await prisma.todo.findMany() 
  // await prisma.todo.create({data:{title: "test", complete: false } })
  return <>
  <header className="flex justify-between items-center mb-4 ">
    <h1 className="text-2xl">Todos</h1>  
    <Link 
      className="border border-slate-300
      text-slate-300 px-2 py-1 rounded 
      hover:bg-slate-700 focus-within:bg-slate-700
      outline-none" 
      href="/new">New</Link>
  </header>
  <ul className="pl-4">
    {todos.map(todo =>( 
      <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
    ))}
  </ul>
 </>
} 