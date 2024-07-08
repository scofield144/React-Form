
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Nome invalido" })
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  email: z.string().email({ message: "Formato de email invalido" }).toLowerCase().refine(email => {
    return email.endsWith('@sco.com')
  }, { message: "Precisa terminar com @sco.com" }),
  password: z.string().min(6, { message: "Senha invalida minimo 6 carateres" })
})

type formData = z.infer<typeof schema>;

function App() {

  const [output, setOutput] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(schema)
  })
  function createUser(data: formData) {
    setOutput(JSON.stringify(data, null, 2))
  }
  return (
    <main className='h-screen bg-zinc-950 flex flex-col gap-5 items-center text-zinc-300 justify-center'>
      <form
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-4 w-full max-w-xs'>

        <div className='flex flex-col gap-1'>
          <label htmlFor="">Nome</label>
          <input type="text" className='border border-zinc-800 shadow-sm
            rounded h-10 bg-zinc-900 px-3'
            {...register('name')}
          />
          {errors.name && <span> {errors.name.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor=""> E-mail</label>
          <input type="email" className='border border-zinc-800 shadow-sm
            rounded h-10 px-3 bg-zinc-900 text-white'
            {...register('email')}
          />
          {errors.email && <span> {errors.email.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor=""> Senha</label>
          <input type="password" className='border border-zinc-800 shadow-sm
            rounded h-10 bg-zinc-900 px-3'
            {...register('password')}
          />
          {errors.password && <span> {errors.password.message}</span>}
        </div>

        <button type="submit"
          className="bg-emerald-500 rounded font-semibold text-white">Salvar</button>
      </form>

      <pre>
        {output}
      </pre>

    </main>
  )
}

export default App