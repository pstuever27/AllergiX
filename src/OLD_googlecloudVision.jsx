import { useState, useEffect } from "react";
import {Image, Listbox, ListboxItem} from "@nextui-org/react";
import axios from 'axios' //for making call to vision api
import env from '../GoogleCloud_API_KEY.json' //store your key here locally (DO NOT PUSH TO GITHUB)
const API_KEY = env.API_KEY;

function ImageSubmit() {
    const [imgFile, setFile] = useState(null);
    const [foodLabels, setLabels] = useState([]);

    const aiVisionScan = async (img, foods) => {
        const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
        const base64Img = img.split(',')[1]; //gets the base64 content from the base64 encoded url (the first portion is the header "data:image/png;base64," and the second portion at index 1 has the data we need to send)
        const request = {
            requests: [
                {
                    image: {
                        content: base64Img,
                    },
                    features: [{type: 'LABEL_DETECTION', maxResults: 5}],
                }
            ]
        };
        const response = await axios.post(apiURL, request);
        //console.log(response.data.responses[0].labelAnnotations);
        if(foods){
            if(foods === response.data.responses[0].labelAnnotations)
                return;
        }
        setLabels(response.data.responses[0].labelAnnotations);
    }

    useEffect( () => { //only runs when the image changes
        if(imgFile){
            console.log(imgFile);
            setLabels([]);
            aiVisionScan(imgFile, foodLabels);
        }
    }, [imgFile])
 
    return (
        <div className="imageSel">
            <input type="file" onChange={(e)=>{
                console.log(e.target.files);
                const file = e.target.files[0];
                const reader = new FileReader(); //sets to base64 format for being able to input into api later

                reader.onloadend = () => {
                    setFile(reader.result);
                };

                if (file) {
                reader.readAsDataURL(file);
                }
            }} />
            {imgFile && (
                <div>
                    <Image width={300} src={imgFile} />
                </div>
            )}
            {(foodLabels!=[]) && (
                <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                    <Listbox aria-label="theFoodLabels">
                        {foodLabels.map((label) => (
                            <ListboxItem key={label.mid} onClick={()=>(alert(label.description))}>
                                {label.description}
                            </ListboxItem>
                        ))}
                    </Listbox>
                </div>
            )}
        </div>
    );
}

export default ImageSubmit;