"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"

const formSchema = z.object({
  prompt: z.string().min(7,{message:"Prompt must be atleast 7 characters long!"}),
})

export default function Page() {
  const [outputImg, setOutputImg] = useState<string | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    const response = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log(data.url);
    setOutputImg(data.url);
  }

  // JSX should be inside the component body
  return (
    <div className='w-full p-3 h-dvh flex justify-start items-center pt-[72px] flex-col'>
      <div className='w-full border border-red-500 p-3'>
        <h1 className='text-center font-bold text-white text-4xl'>Create</h1>
        <p className='text-white/60 text-center'>
          Generate Stunning Images from Text for FREE
        </p>
      </div>
      <div className='flex border border-green-500 w-full gap-3 h-full'>
        <div className='__form flex-[2] gap-2  flex justify-center items-start flex-col'>
          <p className='text-left text-sm text-white/80'>Type your prompt below to create any image you can imagine!</p>
          <div className='flex gap-2 w-full '>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  flex gap-2">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="w-full max-w-[70%]">
                     
                      <FormControl>
                        <Input placeholder='a cat sitting over a sofa...' className=' transition-all border-white' {...field} />
                      </FormControl>
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Generate</Button>
              </form>
            </Form>
           
          </div>
        </div>
        <div className='__output flex-[1] bg-white/5 rounded-lg relative'>
       {outputImg && <Image alt="output" className="w-full h-full object-contain" src={outputImg} width={300} height={300} />}
        </div>
      </div>
    </div>
  )
}
