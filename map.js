class Map {
  constructor(listCity) {
    this.listCity = listCity;
    this.northernmostCity = null;
    this.easternmostCity = null;
    this.southernmostCity = null;
    this.westernmostCity = null;
    this.distanceBetweenCoordinatesAndCity = null;
    this.startingPoint = null;
    this.statesCodes = null;
    this.listWithoutRepeatedStatesCodes = null;
  }

  findToNorthernmostCity() {
    if (this.northernmostCity === null) {
      this.northernmostCity = this.listCity.reduce((acc, elem) => {
        return this._getMaxLatitudeOrLongitude(acc, elem, acc.latitudes, elem.latitudes);
      })
    }
    return "The name of the northernmost city: " + this.northernmostCity.name;
  }

  findToEasternmostCity() {
    if (this.easternmostCity === null) {      
      this.easternmostCity = this.listCity.reduce((acc, elem) => {
        return this._getMaxLatitudeOrLongitude(acc, elem, acc.longitudes, elem.longitudes);
      });
    }
    return "The name of the eastermost city: " + this.easternmostCity.name;
  }

  findToSouthernmostCity() {
    if (this.southernmostCity === null) {      
      this.southernmostCity = this.listCity.reduce((acc, elem) => {
        return this._getMinLatitudeOrLongitude(acc, elem, acc.latitudes, elem.latitudes);
      });
    }
    return "The name of the southernmost city: " + this.southernmostCity.name;
  }

  findToWesternmostCity() {
    if (this.westernmostCity === null) {      
      this.westernmostCity = this.listCity.reduce((acc, elem) => {
        return this._getMinLatitudeOrLongitude(acc, elem, acc.longitudes, elem.longitudes);
      });
    }
    return "The name of the westernmost city: " + this.westernmostCity.name;
  }

  findToNearestCity(latitudes, longitudes) {
    if (!this.listCity.lenght) {
      this.startingPoint = this.listCity[0];
      this.distanceBetweenCoordinatesAndCity = this._findToDistance(latitudes, longitudes, this.startingPoint);
      this.listCity.forEach(elem => {
        if (this._findToDistance(latitudes, longitudes, elem) < this.distanceBetweenCoordinatesAndCity) {
          this.startingPoint = elem;
          this.distanceBetweenCoordinatesAndCity = this._findToDistance(latitudes, longitudes, elem);
        }
      });
    }
    return "The name of the city nearest to this place: " + this.startingPoint.name;
  }

  findToStatesCodesWithoutRepeat() {
    this.statesCodes = this.listCity.map(city => city.name.split(",")[1].trim());
    this.listWithoutRepeatedStatesCodes = this.statesCodes.filter((elem, pos) => {
      return this.statesCodes.indexOf(elem) === pos
    });
    return "List without repeated abbreviations: " + this.listWithoutRepeatedStatesCodes.join(", ");
  }

  _getMaxLatitudeOrLongitude(maxCurrentPoint, newPoint, coordinate1, coordinate2) {
    if (coordinate1 < coordinate2) {
      return newPoint;
    } else {
      return maxCurrentPoint;
    }
  }

  _getMinLatitudeOrLongitude(minCurrentPoint, newPoint, coordinate1, coordinate2) {
    if (coordinate1 > coordinate2) {
      return newPoint;
    } else {
      return minCurrentPoint;
    }
  }

  _findToDistance(latitudes, longitudes, city) {
    return Math.sqrt(
      (latitudes - city.latitudes) * (latitudes - city.latitudes) +
      (longitudes - city.longitudes) * (longitudes - city.longitudes)
    );
  }
}