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
    if (this.northernmostCity != null) {
      this.northernmostCity;
    } else {
      this.northernmostCity = this.listCity.reduce((acc, elem) => {
        return this._getNorthernmostOrEasternmostPoint(acc, elem, acc.latitudes, elem.latitudes);
      })
    }
    return "The name of the northernmost city: " + this.northernmostCity.name;
  }

  findToEasternmostCity() {
    if (this.easternmostCity != null) {
      this.easternmostCity;
    } else {
      this.easternmostCity = this.listCity.reduce((acc, elem) => {
        return this._getNorthernmostOrEasternmostPoint(acc, elem, acc.longitudes, elem.longitudes);
      });
    }
    return "The name of the eastermost city: " + this.easternmostCity.name;
  }

  findToSouthernmostCity() {
    if (this.southernmostCity != null) {
      this.southernmostCity;
    } else {
      this.southernmostCity = this.listCity.reduce((acc, elem) => {
        return this._getSouthernmostOrWesternmostPoint(acc, elem, acc.latitudes, elem.latitudes);
      });
    }
    return "The name of the southernmost city: " + this.southernmostCity.name;
  }

  findToWesternmostCity() {
    if (this.westernmostCity != null) {
      this.westernmostCity;
    } else {
      this.westernmostCity = this.listCity.reduce((acc, elem) => {
        return this._getSouthernmostOrWesternmostPoint(acc, elem, acc.longitudes, elem.longitudes);
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

  _getNorthernmostOrEasternmostPoint(acc, elem, maxCoordinate1, maxCoordinate2) {
    if (maxCoordinate1 < maxCoordinate2) {
      return elem;
    } else {
      return acc;
    }
  }

  _getSouthernmostOrWesternmostPoint(acc, elem, minCoordinate1, minCoordinate2) {
    if (minCoordinate1 > minCoordinate2) {
      return elem;
    } else {
      return acc;
    }
  }

  _findToDistance(latitudes, longitudes, city) {
    return Math.sqrt(
      (latitudes - city.latitudes) * (latitudes - city.latitudes) +
      (longitudes - city.longitudes) * (longitudes - city.longitudes)
    );
  }
}