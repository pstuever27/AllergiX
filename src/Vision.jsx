import { useState, useEffect } from "react";
import {Image, Listbox, ListboxItem} from "@nextui-org/react";
import axios from 'axios' //for making call to vision api
import env from '../HuggingFace_API_KEY.json' //store your key here locally (DO NOT PUSH TO GITHUB)
const API_KEY = env.API_KEY;

function ImageSubmit() {
    const [imgFile, setFile] = useState(null);
    const [foodLabels, setLabels] = useState([]);

    const aiVisionScan = async (img) => {
        const apiURL = `https://api-inference.huggingface.co/models/Kaludi/food-category-classification-v2.0`;
        const base64Img = img.split(',')[1]; //gets the base64 content from the base64 encoded url (the first portion is the header "data:image/png;base64," and the second portion at index 1 has the data we need to send)
        const data = {
            image: base64Img,
        };
        const param = {
            headers: { 
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.post(apiURL, data, param);
        setLabels(response.data);
    }

    useEffect( () => { //only runs when the image changes
        if(imgFile){
            aiVisionScan(imgFile);
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
                        {foodLabels.map((foodInfo, id) => (
                            <ListboxItem key={id} onClick={()=>(alert(foodInfo.label))}>
                                {id+"\t"}
                                {foodInfo.label+"\t"}
                                {foodInfo.score+"\t"}
                            </ListboxItem>
                        ))}
                    </Listbox>
                </div>
            )}
        </div>
    );
}

export default ImageSubmit;