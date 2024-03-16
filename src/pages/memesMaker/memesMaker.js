import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MemesMaker = () => {
const [imageData , setImageData] = useState(null)
const {id} = useParams()
const [changeText , setChangeText] = useState('');
const [changeText2 , setChangeText2] = useState('')
const [fontColor, setFontColor] = useState('#FFFFFF'); // Initialize font color state with default color
const [fontColor2, setFontColor2] = useState('#FFFFFF'); // Initialize font color state with default color



useEffect(() => {
    if(id)fetchImageData()
},[id])


const fetchImageData = async() =>{
    try{
const response = await fetch('https://api.imgflip.com/get_memes')
const data = await response.json()
setImageData(data.data.memes.filter((image)=>image.id == id)[0])
    }
    catch(error){
        console.error('Error fetching images:' , error)
    }

} 
const username = 'shariq98';
const password = 'mahdulkhalil1';

const handleDownload = async () => {
    try {
        const response = await fetch(`https://api.imgflip.com/caption_image?template_id=${id}&username=${username}&password=${password}&text0=${changeText}&text1=${changeText2}`);
        const data = await response.json();
        if (data.success) {
            const imageUrl = data.data.url;

            // Create a new image element to manipulate
            const image = new Image();
            image.crossOrigin = 'anonymous'; // Enable cross-origin request to load image
            image.onload = () => {
                // Create a canvas element
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                // Set canvas dimensions to match image dimensions
                canvas.width = image.width;
                canvas.height = image.height;

                // Draw the image onto the canvas
                context.drawImage(image, 0, 0);

                // Apply font colors to the text
                context.fillStyle = fontColor;
                context.font = 'bold 24px Arial';
                context.textAlign = 'center';
                context.fillText(changeText, canvas.width / 2, 50);

                context.fillStyle = fontColor2;
                context.fillText(changeText2, canvas.width / 2, canvas.height - 50);

                // Convert canvas to data URL and set it as the link's href
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg');
                link.download = 'meme.jpg';

                // Trigger the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            // Start loading the image
            image.src = imageUrl;
        } else {
            console.error('Error generating meme:', data.error_message);
        }
    } catch (error) {
        console.error('Error generating meme:', error);
    }
};



const handleChangeText = (e) => {
    setChangeText(e.target.value);
};

const handleChangeText2 = (e) => {
    setChangeText2(e.target.value);
};

const handleColor = (e) => {
    setFontColor(e.target.value)
}
const handleColor2 = (e) => {
    setFontColor2(e.target.value)
}

return(
    <>
            <h1 className='text-center text-3xl text-white mb-5 mt-1'>MEMES GENERATOR</h1>

    <div className="m-auto">
        <div className="lg:flex max-md:block justify-center gap-10">
        <div className="relative">
                        {imageData ? (
                            <div className="relative ">
                                <img src={imageData.url} className="m-auto" style={{ width: '400px' }} />
                                <p className="absolute left-0 top-0 text-white w-full text-center font-bold text-lg" style={{color : fontColor}}>{changeText}</p>
                                <p className="absolute left-0  bottom-0 text-white w-full text-center font-bold text-lg" style={{color: fontColor2}}>{changeText2}</p>
                            </div>
                        ) : (
                            <div>ERROR</div>
                        )}
                    </div>
<div>
<div className="flex items-center justify-center gap-2	">
  <div class="flex  rounded-lg shadow-sm h-10 w-96 lg:mt-6 max-lg:mt-6">
    <span class="py-3 px-4 inline-flex items-center min-w-fit border border-gray-200 bg-gray-50 text-sm text-gray-500 -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg w-auto first:rounded-s-lg sm:mt-0 sm:first:ms-0 first:rounded-se-none last:rounded-es-none last:rounded-e-lg dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Text#2</span>
    <input type="text"  value={changeText} onChange={handleChangeText}  class="py-3 px-4 pe-11 block w-full border-gray-200 sm:shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none last:rounded-es-none last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"></input>
  </div>
  <input type="color" id="favcolor" className="mt-6" name="favcolor" value={fontColor} onChange={handleColor} />

  </div>
<div className="flex items-center justify-center gap-2	">
  <div class="flex  rounded-lg shadow-sm h-10 w-96 lg:mt-6 max-lg:mt-6">
    <span class="py-3 px-4 inline-flex items-center min-w-fit border border-gray-200 bg-gray-50 text-sm text-gray-500 -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg w-auto first:rounded-s-lg sm:mt-0 sm:first:ms-0 first:rounded-se-none last:rounded-es-none last:rounded-e-lg dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">Text#2</span>
    <input type="text"  value={changeText2} onChange={handleChangeText2}  class="py-3 px-4 pe-11 block w-full border-gray-200 sm:shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none last:rounded-es-none last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"></input>
  </div>
  <input type="color" id="favcolor2" className="mt-6" name="favcolor" value={fontColor2} onChange={handleColor2} />

  </div>
  
<div  className="flex justify-center max-md:mx-auto w-full lg:mt-44 max-lg:mt-6">

  <button onClick={handleDownload} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  <span>Download</span>
</button>

</div>

  </div>
           
        </div>
    </div>
   

</>
)
}

export default MemesMaker;