


export default function tituloFyO (prop){

	switch(prop){
		case 'precio':
			return 'Precio';
		case 'year':
			return 'Año';
		case 'marcaBarco':
			return 'Marca del barco';
		case 'tipo':
			return 'Tipo de embarcacion';
		case 'eslora':
			return 'Largo del barco';
		case 'capacidad':
			return 'Capacidad';

		
		default:
			return prop;
		
	
	}
}