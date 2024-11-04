import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ContactPage = () => {
  return (
    <>
      <div className="flex justify-between items-center">
          <h1 className="p-5 text-6xl font-extrabold leading-14 tracking-tight text-slate-800">Contact</h1>
          <div aria-hidden="true" className="h-1 bg-slate-800 flex-grow ml-4 mr-10"></div>
      </div>
      <div className="text-slate-800">
          <div className="p-5">
              <div className="bg-white justify-between p-12 shadow-lg rounded-2xl border-2">
                  <div className="flex-col justify-between space-y-6 py-6">
                      <div className="">
                          <h2 className="text-lg ">Hello, I am</h2>
                          <h1 className="pt-1 text-4xl  md:text-5xl font-bold">
                              He Quanjie Boey
                          </h1>
                          <p className="pt-5">A Full-Stack Developer working with .Net Core and React/NextJS</p>
                      </div>
                      <div className="inline-flex text-xl text-slate-800 space-x-5">
                          <Link href="https://www.linkedin.com/in/quanjie-boey-he-301599181"><Linkedin /></Link>
                          <Link href="https://github.com/hqjb91"><Github /></Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </>
  )
}

export default ContactPage