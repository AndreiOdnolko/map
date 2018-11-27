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
    this.isMax = true;
    this.latitudes = "latitudes";
    this.longitudes = "longitudes";
  }
   
  findNorthernmostCity() {
    this.northernmostCity = this._findCity(this.northernmostCity, this.isMax, this.latitudes);
    return this.northernmostCity;
  }
  findEasternmostCity() {
    this.easternmostCity = this._findCity(this.easternmostCity, this.isMax, this.longitudes);
    return this.easternmostCity;
  }
  findSouthernmostCity() {
    this.southernmostCity = this._findCity(this.southernmostCity, !this.isMax, this.latitudes);
    return this.southernmostCity;
  }
  findWesternmostCity() {
    this.westernmostCity = this._findCity(this.westernmostCity, !this.isMax, this.longitudes);
    return this.westernmostCity;
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

  _getNameCityDependingOnTheCoordinates(isMax, currentPoint, newPoint, coordinate1, coordinate2) {
    if (isMax) {
      if (coordinate1 < coordinate2) {
        return newPoint;
      } else {
        return currentPoint;
      }
    }
    if (!isMax) {
      if (coordinate1 > coordinate2) {
        return newPoint;
      } else {
        return currentPoint;
      }
    }
  }

  _findCity(city, isMax, latOrLong) {
    if (city === null) {
      city = this.listCity.reduce((acc, elem) => {
        return this._getNameCityDependingOnTheCoordinates(isMax, acc, elem, acc[latOrLong], elem[latOrLong]);
      })
      return city.name
    }
    return city
  }

  _findToDistance(latitudes, longitudes, city) {
    return Math.sqrt(
      (latitudes - city.latitudes) * (latitudes - city.latitudes) +
      (longitudes - city.longitudes) * (longitudes - city.longitudes)
    );
  }
}