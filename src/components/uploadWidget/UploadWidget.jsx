'use client'

import { useRef, useEffect } from 'react'

const Upload = () => {
    const cloudinary = useRef();
    const widgetRef = useRef();
    useEffect(()=>{
        cloudinary.current = window.cloudinary;
        widgetRef.current = cloudinary.current?.createUploadWidget({
          cloudName:'dyvnku5c4',
          uploadPreset: 'vasv6nvh',
          showAdvancedOptions: true
        }, (error, result)=>{

          //  if(result?.event === 'queues-end'){ video.id = result?.info?.files[0]?.upladInfo?.public_id; video.url = result?.info?.files[0]?.upladInfo?.url  }
          console.log(result.data);
          console.log(widgetRef.current, 'soy el widget');
          if(result?.event === "upload-added"){
            if(window.confirm("Estas seguro de subir este video => " + result?.info?.file?.name)){
              console.log('holi bobii');
            }
            else{
            widgetRef.current?.destroy(result?.info?.file?.upladId)

            }
          }
          if(result?.data?.info?.files){
            console.log(result.data.info?.files[0]?.url); 
          }

        })
    }, [cloudinary])
    console.log(cloudinary);
    console.log(widgetRef);
  return (
    <button onClick={()=>widgetRef.current?.open()}>
      Upload
    </button>
  )
}

export default Upload