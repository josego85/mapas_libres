var mapa = null;
var geoJsonLayer = null;
var info = null;

function cargarMapa()
{
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -23.2961407;
	var zoom = 6;

	mapa = new L.map('mapa',
	{
		center: [latitud, longitud],
		zoom: zoom,
		fullscreenControl: true,
		fullscreenControlOptions:
		{
			position: 'topleft'
		}
	});

	var url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
	var layerOSM = L.tileLayer(url,
	{
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(mapa);

	$.getJSON("assets/data/Departamentos.geojson", function(data)
	{
		geoJsonLayer = L.geoJson(data,
		{
			style: style,
			onEachFeature: onEachFeature,
			// filter: function (p_feature, p_layer)
			// {
			// 	var area = p_feature.properties.Area;
			// 	var minArea = 50000000000;
			// 	var maxArea = 90000000000;

			// 	return (parseInt(area) > minArea && parseInt(area) < maxArea);
			// }
		});
		mapa.addLayer(geoJsonLayer);

		var baseMaps = 
		{
			"OSM": layerOSM
		};

		var overlayMaps = 
		{
			'Departamentos': geoJsonLayer
		};

		L.control.layers(baseMaps, overlayMaps,
		{
			collapsed: false
		}).addTo(mapa);
	});
	mostrarInfo();
}

function onEachFeature(p_feature, p_layer)
{
	p_layer.on(
	{
		mouseover: highlightFeature,
		mouseout: resetHighlight
	});
}

function style (feature)
{
	var area = parseInt(feature.properties.Area);

	return {
		fillColor: getColor(area),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

function getColor (area)
{
	return area > 90000000000 ? '#800026' :
	   area > 80000000000 ? '#BD0026' :
	   area > 40000000000 ? '#E31A1C' :
	   area > 20000000000 ? '#FC4E2A' :
	   area > 15000000000 ? '#FD8D3C' :
	   area > 12000000000 ? '#FEB24C' :
	   area > 10000000000 ? '#FED976' :
		'#FED976';
}

function highlightFeature (e)
{
	var layer = e.target;

	layer.setStyle(
	{
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});
	layer.bringToFront();
	info.update(layer.feature.properties);
}

function resetHighlight(e)
{
	geoJsonLayer.resetStyle(e.target);
	info.update();
}

function mostrarInfo ()
{
	info = L.control();

	info.onAdd = function ()
	{
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	}
	
	info.update = function (props)
	{
		this._div.innerHTML = '<h4>&Aacute;rea departamento</h4>' +  (props ?
		  '<b>' + props.Nombre + '</b><br />' + props.Area + ' m<sup>2</sup>'
		  : 'Pase el ratón sobre un departamento');
	};
	info.addTo(mapa);
}