import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react'
import '../../App.css'



const MemesGallery = () => {
    const [memes , setMemes] = useState([])
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(data => {
            if(data.success){
                setMemes(data.data.memes)
            }
            else{
                console.error('error :' , data.error_message)
            }
            
        })
        .catch(error => {
            console.error('error fetching memes :', error)
        })
        
    }, [])
    return (
        <>
        <h1 className='text-center text-3xl text-white mb-5 mt-1'>MEMES GALLERY</h1>
        <div className="flex justify-center items-center   mx-10 rounded-md gallery-image">
  <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-4 max-w-screen-lg p-2">
    {memes.map((meme) => (
            <Link key={meme.id} to={`/meme/${meme.id}`}>
      <img key={meme.id} src={meme.url} alt={`Meme ${meme.id}`} style={{maxHeight: '200px'}} className="w-full cursor-pointer h-auto rounded-lg   hover:opacity-50 transition-opacity duration-300" />
      </Link>
    ))}
   
  </div>
</div>


        </>
    )
}
export default MemesGallery 