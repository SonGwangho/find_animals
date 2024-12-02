class Holiday {
  constructor() {
    this._year = new Date().getFullYear(); // 기본 연도
    this._countryCode = "KR"; // 기본 국가 코드
    this._baseUrl = "https://date.nager.at/"; // API 기본 URL
  }

  // 공휴일 데이터를 가져오는 메서드
  getHoliday(year = this._year, countryCode = this._countryCode) {
    const url = `${this._baseUrl}api/v3/publicholidays/${year}/${countryCode}`;
    return fetch(url);
  }

  // 국가 코드 업데이트
  setCountryCode(countryCode) {
    this._countryCode = countryCode;
  }

  // 연도 업데이트
  setYear(year) {
    this._year = year;
  }
}
