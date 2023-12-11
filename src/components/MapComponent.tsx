"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import * as L from "leaflet"; // eslint-disable-line
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  // GeoJSON,
  // CircleMarker,
} from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import "leaflet-defaulticon-compatibility";
import useSpring from "@/hooks/use-spring";
import type { KmlJSON } from "@/types";
import { capitalizeAllCaseWords } from "@/lib/utils";

const MapComponent = () => {
  const springStore = useSpring();
  const [kml, setKml] = React.useState<Document>();
  const [kmlJSON, setKmlJSON] = React.useState<KmlJSON>();

  useEffect(() => {
    async function fetchKml() {
      const parser = new DOMParser();
      const kmlFetch = await fetch("./BOUNDARYOFHILL1.kml");
      const kmlText = await kmlFetch.text();
      console.log("kmlText", kmlText);
      console.log("kml", kml);
      const kmlStuff = parser.parseFromString(kmlText, "text/xml");
      console.log("kmlStuff", kmlStuff);
      setKml(kmlStuff);
      const resJS = await fetch("/api/kml", {
        method: "POST",
        body: JSON.stringify({ kmlFile: "https://uploadthing.com/f/ed4e6fba-fd00-4e67-853b-51310547e60d-uoil8l.kml" }),
        headers: { "Content-Type": "application/json" },
      });
      const resJSON = (await resJS.json()) as KmlJSON;
      console.log("resJSON", resJSON);
      console.log("coor", resJSON.features[0]?.geometry.coordinates);
      setKmlJSON(resJSON);
    }
    fetchKml(); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, []);

  return (
    <div className="rounded-md border">
      <MapContainer
        center={[10.11217445031641, 78.23546193193022]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[400px] md:h-[700px] w-full rounded-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="rounded-md"
        />
        {kml && <ReactLeafletKml kml={kml} />}
        {kmlJSON
          ? kmlJSON.features.map((feature, index) => {
              if (feature.geometry.type === "Polygon") return;
              return (
                <Marker
                  position={[
                    feature.geometry.coordinates[1] as number,
                    feature.geometry.coordinates[0] as number,
                  ]}
                  key={index}
                >
                  <Popup>
                    <span className="text-lg font-bold">
                      {capitalizeAllCaseWords(feature.properties.name)}
                    </span>
                    <p>
                      ({feature.geometry.coordinates[1]},{" "}
                      {feature.geometry.coordinates[0]})
                    </p>
                    <Button
                      onClick={() => {
                        console.log("clicked");
                        springStore.addSpring(
                          feature.properties.name,
                          feature.geometry.coordinates[1] as number,
                          feature.geometry.coordinates[0] as number,
                        );
                      }}
                      className="mt-2 w-full"
                    >
                      See More
                    </Button>
                  </Popup>
                </Marker>
              );
            })
          : null}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
