class Map {
  constructor(listCity) {
    this.listCity = listCity;
    this.northernmostCity = null;
    this.eastermostCity = null;
    this.southernmostCity = null;
    this.westernmostCity = null;
    this.lenght = null; // distance between given coordinates and city
    this.pivot = null; // starting point for starting the search for the nearest city
    this.abbreviations = null;
    this.listWithoutRepeatedAbbreviations = null;
  }

  findToNorthernmostCity() {
    this.northernmostCity = this.listCity.reduce((acc, elem) => {
      return this._accumReduce(acc, elem, acc.latitudes, elem.latitudes);
    })
    console.log("The name of the northernmost city: " + this.northernmostCity.name);
  }

  findToEastermostCity() {
    this.eastermostCity = this.listCity.reduce((acc, elem) => {
      return this._accumReduce(acc, elem, acc.longitudes, elem.longitudes)
    });
    console.log("The name of the eastermost city: " + this.eastermostCity.name);
  }

  findToSouthernmostCity() {
    this.southernmostCity = this.listCity.reduce((acc, elem) => {
      return this._accumReduce(acc, elem, elem.latitudes, acc.latitudes);
    });
    console.log("The name of the southernmost city: " + this.southernmostCity.name);
  }

  findToWesternmostCity() {
    this.westernmostCity = this.listCity.reduce((acc, elem) => {
      return this._accumReduce(acc, elem, elem.longitudes, acc.longitudes);
    });
    console.log("The name of the westernmost city: " + this.westernmostCity.name);
  }

  findToNearestCity(latitudes, longitudes) {
    if (!this.listCity.lenght) {
      this.pivot = this.listCity[0];
      this.lenght = this._findToLenght(latitudes, longitudes, this.pivot);
      this.listCity.forEach(elem => {
        if (this._findToLenght(latitudes, longitudes, elem) < this.lenght) {
          this.pivot = elem;
          this.lenght = this._findToLenght(latitudes, longitudes, elem);
        }
      });
    }
    console.log("The name of the city nearest to this place: " + this.pivot.name);
  }

  findToCityAbbreviations() {
    this.abbreviations = this.listCity.map(city => city.name.split(",")[1].trim());
    this.listWithoutRepeatedAbbreviations = this.abbreviations.filter((elem, pos) => {
      return this.abbreviations.indexOf(elem) === pos
    });
    console.log("List without repeated abbreviations: " + this.listWithoutRepeatedAbbreviations.join(", "));
  }

  _accumReduce(acc, elem, coords1, coords2) {
    if (coords1 < coords2) {
      return acc = elem;
    } else {
      return acc;
    }
  }

  _findToLenght(latitudes, longitudes, city) {
    return Math.sqrt(
      (latitudes - city.latitudes) * (latitudes - city.latitudes) +
      (longitudes - city.longitudes) * (longitudes - city.longitudes)
    );
  }
}