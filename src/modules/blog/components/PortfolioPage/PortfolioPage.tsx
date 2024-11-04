import React from 'react'
import Projects from './Projects'

const PortfolioPage = () => {
  return (
    <>
      <div className="flex justify-between items-center">
          <h1 className="p-5 text-6xl font-extrabold leading-14 tracking-tight text-slate-800">Portfolio</h1>
          <div aria-hidden="true" className="h-1 bg-slate-800 flex-grow ml-4 mr-10"></div>
      </div>   
      <div className="p-5">
          <Projects />
      </div>
  </>
  )
}

export default PortfolioPage