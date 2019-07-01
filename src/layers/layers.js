import L from "leaflet";

export default [
    {
        name: '3',
        opacity: 1,
        enabled: true,
        layer:L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
            layers: 'nexrad-n0r-900913',
            format: 'image/png',
            transparent: true,
            attribution: "Weather data © 2012 IEM Nexrad"
        })
    },
    {
        name: '2',
        opacity: 1,
        enabled: true,
        layer:L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi", {
         layers: 'nexrad-n0q',
         format: 'image/png',
         transparent: true,
         attribution: "Weather data &copy; 2015 IEMNexrad"
        })
    },
    {
        name: '1',
        opacity: 1,
        enabled: true,
        layer: L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/eet.cgi", {
            layers: 'nexrad-eet',
         format: 'image/png',
         transparent: true,
         attribution: "Weather data &copy; 2015 IEMNexrad"
        })
    }
];