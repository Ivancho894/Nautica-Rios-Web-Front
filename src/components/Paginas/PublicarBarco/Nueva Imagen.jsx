import { getStorage, ref ,uploadBytes,getDownloadURL} from "firebase/storage";
import {v4} from "uuid"

export default async function cargarImg(image,name){

    const storage = getStorage();
    //Toma la referencia
    const mountainsRef = ref(storage, `Fotos de barcos/${name}/${name+v4()}`);
    //Con esa referencia lo sube
    const data = await uploadBytes(mountainsRef, image)
    //Busca el link de descarga de la referencia
    const link = await getDownloadURL(data.ref)
    console.log(link)
    return link

}


// const mountainImagesRef = ref(storage, 'images/mountains.jpg');
