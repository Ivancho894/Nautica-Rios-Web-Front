


export default function tituloFyO (prop){

    console.log(prop)
	switch(prop){
		case 'precio':
			return 'Precio';
		case 'material':
			return 'Material';
		case 'marca':
			return 'Marca';
		case 'tipo':
			return 'Tipo';

		
		default:
			return prop;
		
	
	}
}