var mapa = null;

function cargarMapa()
{
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var zoom = 12;
	var minZoom = 6;
	var maxZoom = 18;

	// Se instancia el objeto mapa.
	mapa = new L.map('mapa',
    {
        center: [latitud, longitud],
        minZoom: minZoom,
		maxZoom: maxZoom,
		zoom: zoom,
        scrollWheelZoom: false,
        fullscreenControl: true,
        fullscreenControlOptions:
        {
            position: 'topleft'
        }
    });

	// Humanitarian Style.
	var url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
	L.tileLayer(url,
	{
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(mapa);

	// Datos GeoJSON.
	var v_geojsonFeature = {
		"type": "FeatureCollection",
		"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates":[
				    "-57.521591",
				    "-25.335409"
				]
		    },
			"properties": {
			    "nombre": "Startup Weekend Asunci\u00f3n",
				"lugar": "Aula Magna de la Facultad Polit\u00e9cnica de la Universidad Nacional de Asunci\u00f3n",
				"fecha_inicio": "04-04-2014",
				"fecha_fin": "06-04-2014"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
				    "-57.521591",
				    "-25.335409"
				]
		    },
			"properties":{
			    "nombre": "Festival Latinoamericano de Instalaci\u00f3n de Software Libre (FLISOL)",
				"lugar": "Aula Magna de la Facultad Polit\u00e9cnica de la Universidad Nacional de Asunci\u00f3n",
				"fecha_inicio": "26-04-2014",
				"fecha_fin": "26-04-2014"
		    }
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
		            "-57.521591",
		            "-25.335409"
		        ]
		    },
		    "properties": {
		    	"nombre": "Festival de Danza Paraguaya",
		    	"lugar": "Aula Magna de la Facultad Polit\u00e9cnica de la Universidad Nacional de Asunci\u00f3n",
		    	"fecha_inicio": "21-06-2014",
		    	"fecha_fin": "25-06-2014"
		    }
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
		            "-57.561691",
		            "-25.278030"
		        ]
		    },
		    "properties": {
		    	"nombre": "San Juan ",
		    	"lugar": "SNPP (Servicio Nacional de Promoci\u00f3n Profesional)",
		    	"fecha_inicio": "21-06-2014",
		    	"fecha_fin": "21-06-2014"
		    }
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
		            "-57.561691",
		            "-25.278030"
		        ]
		    },
		    "properties": {
		    	"nombre": "Feria de Libros",
		    	"lugar": "SNPP (Servicio Nacional de Promoci\u00f3n Profesional)",
		    	"fecha_inicio": "21-06-2014",
		    	"fecha_fin": "28-06-2014"
		    }
		}]
	};

	// Agregando datos GeoJSON en una Capa (layer) vectorial.
	var geojsonLayer = L.geoJson(v_geojsonFeature, {
		onEachFeature: onEachFeature
	});

	// Cluster de marcadores.
	var cluster_marcadores = L.markerClusterGroup();   	// Se crea un cluster group.
	cluster_marcadores.addLayer(geojsonLayer);   		// Agrega el Layer GeoJSON al cluster group.
	mapa.addLayer(cluster_marcadores);           		// Agrega el cluster group al mapa.
	
	// Funcion que muestra informacion en un popup.
	function onEachFeature(p_feature, p_layer) {
		if (p_feature.properties) {
            var v_popupString = '<div class="popup">';

            for (var k in p_feature.properties) {
                var v = p_feature.properties[k];
                v_popupString += '<b>' + k + '</b>: ' + v + '<br />';
            }
            v_popupString += '</div>';
            p_layer.bindPopup(v_popupString);
        }
	}
}