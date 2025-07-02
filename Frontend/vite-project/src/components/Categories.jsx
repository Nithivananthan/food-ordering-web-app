import React from 'react'

function Genre({categories,setcatfilter}) {
  return (
    <div className='genre'>
     <div className='genre-child'>
      <img onClick={()=>setcatfilter(categories.name)} src= {categories.image}/>
      <h3>{categories.name}</h3>
      </div>
    </div>
  )
}
export default Genre
