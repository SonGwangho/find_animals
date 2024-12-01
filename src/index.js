const holiday = new Holiday();
holiday
  .getHoliday()
  .then((response) => response.json())
  .then((data) => {
    // 월별로 데이터 그룹화
    const holidaysByMonth = {};
    data.forEach((day) => {
      const date = new Date(day.date);
      const month = date.toLocaleString("default", { month: "long" });
      if (!holidaysByMonth[month]) {
        holidaysByMonth[month] = [];
      }
      holidaysByMonth[month].push(day);
    });

    // 캘린더 컨테이너 생성
    const calendarContainer = document.createElement("div");
    calendarContainer.className = "calendar-container";

    const calendarTitle = document.createElement("h2");
    calendarTitle.textContent = "Monthly Holiday Calendar";
    calendarContainer.appendChild(calendarTitle);

    // 월별 섹션 추가
    for (const [month, holidays] of Object.entries(holidaysByMonth)) {
      const monthSection = document.createElement("div");
      monthSection.className = "month-section";

      const monthHeader = document.createElement("h3");
      monthHeader.textContent = month;
      monthSection.appendChild(monthHeader);

      const holidayList = document.createElement("ul");
      holidayList.className = "holiday-list";

      holidays.forEach((day) => {
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
  })
  .catch((error) => {
    console.error("Error fetching holidays:", error);
  });
