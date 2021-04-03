//https://uber.github.io/react-map-gl/examples/clusters
import MapGL, { Source, Layer } from 'react-map-gl';
const MAPBOX_TOKEN = 'pk.eyJ1Ijoibm91YW1hbmV0YXppIiwiYSI6ImNrOGN5bjJ6YzByZ3YzZnRxZWZjZ3Vibm4ifQ.V5jHsPdhkDZEjGhbB_jQpw'; // Set your mapbox token here
import data from './cities.json'

const features = data.reduce((s, region) => {
    const feature = { type: 'Feature', properties: { name: region.name }, geometry: { type: 'Point', coordinates: [Number(region.longitude), Number(region.latitude)] } }
    let arr = Array(parseInt(region.counts)).fill(feature)
    return s.concat(arr)
}, [])

// console.log(data)
const geojson = {
    type: 'FeatureCollection',
    // crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    features: features
};


class Map extends React.Component {
    state = {
        viewport: {
            latitude: 28.8, // https://docs.mapbox.com/mapbox-gl-js/example/mouse-position/
            longitude: -10.20,
            zoom: 4.7,
            // bearing: 0,
            // pitch: 0,
        },
        hoveredFeature: undefined
    };
    _sourceRef = React.createRef();
    _onViewportChange = viewport => this.setState({ viewport });

    _onClick = event => {
        // console.log(event)
        const feature = event.features[0];
        if (feature && 'properties' in feature) {
            const clusterId = feature.properties.cluster_id;

            const mapboxSource = this._sourceRef.current.getSource();

            mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) {
                    return;
                }
                // console.log("zoom", zoom)
                this._onViewportChange({
                    ...this.state.viewport,
                    longitude: feature.geometry.coordinates[0],
                    latitude: feature.geometry.coordinates[1],
                    zoom: 6,
                    transitionDuration: 500
                });
            });
        }
    };
    _onHover = event => {
        const {
            features,
            srcEvent: { offsetX, offsetY }
        } = event;
        const hoveredFeature = features && features.find(f => f.layer.id === 'data');

        this.setState({ hoveredFeature: hoveredFeature })
    };


    render() {
        const { viewport, hoveredFeature } = this.state
        return (
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={this._onViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                interactiveLayerIds={["cluster-count", "clusters", "data"]}
                onClick={this._onClick}
                style={{ margin: "auto", marginBottom: "1em", position:"absolute", overflow: "hidden"}}
                height={"100%"}
                width={"100%"}
                onHover={this._onHover}
            >
                <Source
                    id="my-data" type="geojson" data={geojson}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={1}
                    ref={this._sourceRef}
                >
                    {/* <Layer id='clusters'
                        type='circle'
                        filter={['has', 'point_count']}
                        paint={{
                            'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
                            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
                        }} /> */}
                    <Layer id='clusters'
                        type='circle'
                        filter={['has', 'point_count']}
                        paint={{
                            'circle-color': '#51bbd6',
                            'circle-radius': ['step', ['get', 'point_count'], 10, 100, 15]
                        }} />
                    <Layer id='cluster-count'
                        type='symbol'
                        filter={['has', 'point_count']}
                        layout={{
                            'text-field': '{point_count}',
                            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                            'text-size': 12
                        }} />
                    <Layer id='data'
                        type='symbol'
                        filter={['has', 'name']}
                    />
                    <Layer id='unclustered-point'
                        type='circle'
                        filter={['!', ['has', 'point_count']]}
                        paint={{
                            'circle-color': '#11b4da',
                            'circle-radius': 4,
                            'circle-stroke-width': 3,
                            'circle-stroke-color': '#fff'
                        }} />
                </Source>
                {hoveredFeature && (
                    <div className="tooltip"
                    // style={{left: x, top: y}}
                    >
                        {/* {console.log(hoveredFeature)} */}
                        <div>State: {hoveredFeature.properties.name}</div>
                    </div>
                )}
            </MapGL >
        );
    }
}

export default Map;
