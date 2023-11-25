import { getStorage, ref ,uploadBytes,getDownloadURL} from "firebase/storage";
import {v4} from "uuid"

export default async function cargarImg(image,name){

    const storage = getStorage();
    
    const mountainsRef = ref(storage, `Fotos de barcos/${name}/${name+v4()}`);

    const data = await uploadBytes(mountainsRef, image)
    const link = await getDownloadURL(data.ref)
    return link

}


// const mountainImagesRef = ref(storage, 'images/mountains.jpg');
