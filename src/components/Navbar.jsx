import { useState } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

export default function Navbar() {
 

  return (
    <>
      <nav
        className="nav-root relative w-full"
        style={{
          background: "linear-gradient(180deg, #e8d5a8 0%, #d9c390 55%, #c8af7a 100%)",
          borderBottom: "2px solid #b89a6a",
          boxShadow: "0 4px 18px rgba(60,35,10,0.25), inset 0 1px 0 rgba(255,245,210,0.6)",
        }}
      >
        
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.2'/%3E%3C/filter%3E%3Crect width='400' height='100' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />

        <div className="relative flex items-center justify-between px-6 py-3 gap-4">

       
          <div className="flex items-center gap-5 flex-shrink-0">
            <button className="brand-text border-none bg-transparent cursor-pointer p-0">
              crave<span className="brand-dot" />
            </button>

            <div className="divider-v hidden sm:block" />
          </div>

          
          <div className="flex items-center gap-3 flex-shrink-0">

            <Link to='/liked' className="liked-btn hidden sm:flex">
                <span className="heart">♡</span>
              Chef's Picks
            </Link>

            <Link to='/'className="liked-btn hidden sm:flex">
              
              Kitchen
            </Link>

          </div>

        </div>

      </nav>
    </>
  );
}