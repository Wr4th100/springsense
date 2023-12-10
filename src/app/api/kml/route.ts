import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import parseKML from "parse-kml"; // eslint-disable-line

export async function POST(req: NextRequest) {
  let kmlStuff;
  console.log("=== POST ===");
  const file = JSON.parse(await req.text());
  console.log(file.kmlFile);

  await parseKML.toJson(file.kmlFile).then((res) => {
    kmlStuff = res;
  });
  return NextResponse.json(kmlStuff);
}
