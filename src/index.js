const holiday = new Holiday();
holiday
  .getHoliday()
  .then((response) => response.json())
  .then((data) => {
    const holidayArray = Array.from(data);
    holidayArray.forEach((day) => {
      const date = day.date;
      const name = day.localName;

      const div = document.createElement("div");
      div.innerHTML = `${date} -> ${name}`;

      document.body.appendChild(div);
    });
  });
