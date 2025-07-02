import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories";
import Food from "../../components/Food";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Home({categories,foodinf,addcart,cart,handeldelete,handelitem}){
  const[search,setsearch]=useState('')
  const[catfilter,setcatfilter]=useState('')
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', ''); 
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); 
      }
    }
  }, [location]);
  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h1>order your favourite food here</h1>
          <p>
            "Delicious meals, delivered fast! 🍽️ Order your favorite dishes and
            enjoy fresh flavors at your doorstep. Hassle-free and satisfying
            every time!"
          </p>
          <button>View Menu</button>
        </div>
        <div className="explore" id="menu">
          <h1>Explore our Menu</h1>
        </div>
        <div className="genre-map">
        <div className='genre-child'>
       <img onClick={()=>setcatfilter('')} src='https://sdmntprwestus.oaiusercontent.com/files/00000000-8658-5230-9c5e-8cecdb443786/raw?se=2025-03-30T07%3A26%3A31Z&sp=r&sv=2024-08-04&sr=b&scid=1cb9bff9-eb7f-5d74-8f61-dfca7de456c4&skoid=aa8389fc-fad7-4f8c-9921-3c583664d512&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-30T01%3A21%3A09Z&ske=2025-03-31T01%3A21%3A09Z&sks=b&skv=2024-08-04&sig=7uskak//ndv7W8sxlqM8MCaLRG6rKxLWBaSUE373QJI%3D'/>
       <h3>All</h3>
       </div>
          {categories.map((categories) =>(
            <Categories setcatfilter={setcatfilter} key={categories.name} categories={categories} />
          ))}
        </div>
        <div className="search-food">
         <input onChange={(e)=>setsearch(e.target.value)}
            className="search"
            type="text"
            placeholder="search for food"
          ></input>
        </div>
        <div className="foodmap">
          {foodinf.filter((foodinf)=>foodinf.foodcategorie.toLowerCase().includes(catfilter.toLowerCase())).filter((foodinf)=>foodinf.foodname.toLowerCase().includes(search.toLowerCase()))
            .map((foodinf,index) => (
              <Food cart={cart} index={index} handeldelete={handeldelete} foodinf={foodinf} key={foodinf.id} handelitem={handelitem} addcart={addcart}/>
            ))}
        </div>  
      </div>
      </div>
  );
}

export default Home;
