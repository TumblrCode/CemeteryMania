var fs = require('fs');
var base64 = exports;

//SaveMap(ExampleMap(100, 100, 3, 20), "map.cmm");
LoadMap("map.cmm");

function ExampleMap(Width, Height, MapLayers, Diversity)
{

	var MapData = new Array(MapLayers);

	var MapHeader = "W" + Width + "H" + Height + "L" + MapLayers;

	for (var i = 0; i < MapLayers; i++)
		{
		var BlockDelimiter = "\nB";
		var tempData = "";

		for (var p = 0; p < Width * Height; p++)
		{
			tempData += Math.round(Math.random() * Diversity) + ",";
		}
		MapData[i] = BlockDelimiter + encode(tempData);
	}

	var FileString = MapHeader;
	for (var i = 0; i < MapLayers; i++)
	{
		FileString += MapData[i];
	}
	return FileString;
}

function encode(input) {
    var encoding = [];
    input = input.split(",");
    var prev, count, i;
    for (count = 1, prev = input[0], i = 1; i < input.length; i++) {
        if (input[i] != prev) {
            encoding.push([count, prev]);
            count = 1;
            prev = input[i];
        }
        else 
            count ++;
    }
    encoding.push([count, prev]);
    return encoding;
}

function decode(encoded) {
    encoded = encoded.split(",");
    var decodedstring = "";
    for (var i = 0; i < encoded.length; i += 2)
    {
	decodedstring += "," + repeat(encoded[i + 1], parseInt(encoded[i]));
    }
    return decodedstring;
}

function repeat(s, n)
{
	var a = [];
	while (a.length < n)
	{
		if (a.length > 0)
			a.push(",");
		a.push(s);
	}
	return a.join('');
}


function SaveMap(FileString, Filename)
{
	console.log("Converting: " + FileString.substring(0, 50));
	var FileBuffer = new Buffer(FileString, 'binary');
	
	console.log("Writing: " + FileBuffer.toString().substring(0, 50));

	fs.writeFile(Filename, FileBuffer, function (err)
	{
		if (err) throw err;
	});
}

function LoadMap(Filename)
{
	console.log("Loading file.");
	fs.readFile(Filename, function (err, data)
	{
		if (err) throw err;
		var DecodedFile = new Buffer(data, 'binary');
		var DecodedFileString = DecodedFile.toString();
		//console.log("Reading: (" + DecodedFile.length + ") " + DecodedFileString.substring(0, 50));
		//console.log("ConvertedBack: " + DecodedFileString.substring(0, 50));

		var Width,Height,Layers;
		var MapData = "";

		var Header = DecodedFileString.substring(0, DecodedFileString.indexOf("\n") + 2);

		MapData = DecodedFileString.substring(DecodedFileString.indexOf("\n") + 2);

		MapData = decode(MapData).split("\n");

		//console.log("Header: " + Header);
		
		Width = parseInt(Header.substring(Header.indexOf("W") + 1, Header.indexOf("H")));
		Height = parseInt(Header.substring(Header.indexOf("H") + 1, Header.indexOf("L")));
		Layers = parseInt(Header.substring(Header.indexOf("L") + 1, Header.length));

		console.log("Width: " + Width);
		console.log("Height: " + Height);
		console.log("Layers: " + Layers);

		console.log(MapData[0]);

	});
}
