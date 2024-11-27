class Holiday {
  constructor() {
    this._year = new Date().getFullYear();
    this._countryCode = "KR";
    this._baseUrl = "https://date.nager.at/";
  }

  getHoliday(year = this._year, countryCode = this._countryCode) {
    const url = `${this._baseUrl}api/v3/publicholidays/${this._year}/${this._countryCode}`;
    return fetch(url);
  }
}
