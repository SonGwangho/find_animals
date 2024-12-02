const holiday = new Holiday();

const createSelectors = (countries, years, onSelectionChange) => {
  const selectorContainer = document.createElement("div");
  selectorContainer.className = "selector-container";

  // 연도 선택 드롭다운
  const yearSelector = document.createElement("select");
  yearSelector.className = "year-selector";

  const defaultYearOption = document.createElement("option");
  defaultYearOption.value = "";
  defaultYearOption.textContent = "Select a year";
  yearSelector.appendChild(defaultYearOption);

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
  });

  // 국가 선택 드롭다운
  const countrySelector = document.createElement("select");
  countrySelector.className = "country-selector";
  const defaultCountryOption = document.createElement("option");
  defaultCountryOption.value = "";
  defaultCountryOption.textContent = "Select a country";
  countrySelector.appendChild(defaultCountryOption);

  countries.forEach((country) => {
    const countryOption = document.createElement("option");
    countryOption.value = country.code;
    countryOption.textContent = country.name;
    countrySelector.appendChild(countryOption);
  });

  // 연도 선택 이벤트 처리
  yearSelector.addEventListener("change", () => {
    const selectedCountry = countrySelector.value;
    const selectedYear = yearSelector.value;
    onSelectionChange(selectedCountry, selectedYear); // 연도 변경 시 휴일 데이터 갱신
  });

  // 나라 선택 이벤트 처리
  countrySelector.addEventListener("change", () => {
    const selectedCountry = countrySelector.value;
    const selectedYear = yearSelector.value;
    onSelectionChange(selectedCountry, selectedYear); // 나라와 연도를 모두 선택했을 때 데이터 갱신
  });

  // 컨테이너에 추가
  selectorContainer.appendChild(yearSelector);
  selectorContainer.appendChild(countrySelector);
  document.body.appendChild(selectorContainer);
};

// 휴일 데이터 표시
const displayHolidays = (holidays) => {
  const existingCalendar = document.querySelector(".calendar-container");
  if (existingCalendar) existingCalendar.remove();

  const calendarContainer = document.createElement("div");
  calendarContainer.className = "calendar-container";

  const calendarTitle = document.createElement("h2");
  calendarTitle.textContent = "Holiday Calendar";
  calendarContainer.appendChild(calendarTitle);

  // 월별로 데이터 그룹화
  const holidaysByMonth = {};
  holidays.forEach((day) => {
    const date = new Date(day.date);
    const month = date.toLocaleString("default", { month: "long" });
    if (!holidaysByMonth[month]) {
      holidaysByMonth[month] = [];
    }
    holidaysByMonth[month].push(day);
  });

  // 월별 섹션 추가
  for (const [month, monthHolidays] of Object.entries(holidaysByMonth)) {
    const monthSection = document.createElement("div");
    monthSection.className = "month-section";

    const monthHeader = document.createElement("h3");
    monthHeader.textContent = month;
    monthSection.appendChild(monthHeader);

    const holidayList = document.createElement("ul");
    holidayList.className = "holiday-list";

    monthHolidays.forEach((day) => {
      const listItem = document.createElement("li");
      listItem.className = "holiday-item";
      listItem.innerHTML = `
        <strong>${day.date}</strong> - ${day.localName}
      `;
      holidayList.appendChild(listItem);
    });

    monthSection.appendChild(holidayList);
    calendarContainer.appendChild(monthSection);
  }

  document.body.appendChild(calendarContainer);
};

// 선택 이벤트 처리
const fetchAndDisplayHolidays = (countryCode, year) => {
  if (!countryCode || !year) return;

  holiday.setCountryCode(countryCode);
  holiday.setYear(year);

  holiday
    .getHoliday()
    .then((response) => response.json())
    .then((holidays) => displayHolidays(holidays))
    .catch((error) => console.error("Error fetching holidays:", error));
};

// 초기화
const initializeHolidayApp = () => {
  // 나라 목록 (예시)
  const countries = [
    { code: "US", name: "United States" },
    { code: "KR", name: "South Korea" },
    { code: "JP", name: "Japan" },
    { code: "FR", name: "France" },
    { code: "ID", name: "indonesia" },
  ];

  // 연도 목록
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i); // 최근 10년

  createSelectors(countries, years, fetchAndDisplayHolidays);
};

initializeHolidayApp();
