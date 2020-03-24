var mapa = null;

function cargarMapa()
{
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var zoom = 12;

    // Se instancia el objeto mapa.
	mapa =  L.map('mapa').setView([latitud, longitud], zoom);

	// Humanitarian Style.
	var url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	//var url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
	L.tileLayer(url, {
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(mapa);
}