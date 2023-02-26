import { useRef, useState, useLayoutEffect, useContext } from "react";
import LocationContext from "../utils/LocationContext";
import AddressContext from "../utils/AddressContext";

// console.log("maps");

// function loadScript(url) {
//   const script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src = url;
//   script.charset = "utf-8";
//   document.body.prepend(script);
// }

// function loadLink(url) {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.type = "text/css";
//   link.href = url;
//   document.body.prepend(link);
// }
// loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
// loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
// loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");
// loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
// loadLink("https://js.api.here.com/v3/3.1/mapsjs-ui.css");

const Map = ({ location, address, setToggle }) => {
  // console.log(location, address);
  const [newAddress, setNewAddress] = useState("");
  const [newLocation, setNewLocation] = useState({});
  const { locationGlobal, setLocationGlobal } = useContext(LocationContext);
  const { addressGlobal, setAddressGlobal } = useContext(AddressContext);

  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef(null);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */

  // let  newAddress = "no address assigned";
  useLayoutEffect(() => {
    setNewAddress(address);
    let marker;
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current || !location.latitude) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: `${process.env.REACT_APP_HERE_API_KEY}`,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: {
        lat: location?.latitude,
        lng: location?.longitude,
      },
      zoom: 14,
      pixelRatio: window.devicePixelRatio || 1,
    });

    var service = platform.getSearchService();

    // Call the geocode method with the geocoding parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    service.geocode(
      {
        q: `${address}`,
      },
      (result) => {
        // Add a marker for each location found
        marker = new H.map.Marker(result.items[0].position, {
          volatility: true,
        });
        marker.draggable = true;
        hMap.addObject(marker);
        // console.log(marker?.a?.lat);
        service.reverseGeocode(
          {
            at: `${marker.a.lat},${marker.a.lng}`,
          },
          (result) => {
            // console.log(result);
            setNewAddress(result?.items?.[0]?.address?.label);
            setNewLocation(result?.items?.[0].position);
          }
        );
      },
      alert
    );

    // disable the default draggability of the underlying map
    // and calculate the offset between mouse and target's position
    // when starting to drag a marker object:
    hMap.addEventListener(
      "dragstart",
      function (ev) {
        var target = ev.target,
          pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          var targetPosition = hMap.geoToScreen(target.getGeometry());
          target["offset"] = new H.math.Point(
            pointer.viewportX - targetPosition.x,
            pointer.viewportY - targetPosition.y
          );
          behavior.disable();
        }
      },
      false
    );

    // re-enable the default draggability of the underlying map
    // when dragging has completed
    hMap.addEventListener(
      "dragend",
      function (ev) {
        var target = ev.target;
        if (target instanceof H.map.Marker) {
          behavior.enable();
        }
      },
      false
    );

    // Listen to the drag event and move the position of the marker
    // as necessary
    hMap.addEventListener(
      "dragend",
      function (ev) {
        var target = ev.target,
          pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          target.setGeometry(
            hMap.screenToGeo(
              pointer.viewportX - target["offset"].x,
              pointer.viewportY - target["offset"].y
            )
          );
          // console.log(marker);

          // Call the reverse geocode method with the geocoding parameters,
          // the callback and an error callback function (called if a
          // communication error occurs):
          service.reverseGeocode(
            {
              at: `${marker.a.lat},${marker.a.lng}`,
            },
            (result) => {
              // console.log(result);
              setNewAddress(result?.items?.[0]?.address?.label);
              setNewLocation(result?.items?.[0].position);
            },
            alert
          );
        }
      },
      false
    );

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);
    window.addEventListener("resize", () => hMap.getViewPort().resize());

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef, location]); // This will run this hook every time this ref is updated

  return (
    <>
      <div
        className="map "
        ref={mapRef}
        style={{
          height: "500px",
          width: "100%",
          marginTop: "10px",
        }}
      />
      <div className="border-2 p-3 font-bold">
        <p>{newAddress}</p>
      </div>
      <button
        className=" bg-slate-900 mt-4 p-2 text-white w-full"
        onClick={() => {
          // console.log(newLocation);
          setLocationGlobal({
            loaded: true,
            coordinates: {
              latitude: newLocation.lat,
              longitude: newLocation.lng,
            },
          });
          setToggle(false);
        }}
      >
        Confirm location
      </button>
    </>
  );
};

export default Map;
