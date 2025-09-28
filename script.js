function calendar() {
    const today = new Date();  
    const year = today.getFullYear();

    
    const holidays = [
        "1-1",   // Новий рік
        "7-1",   // Різдво 
        "8-3",   // Міжнародний жіночий день
        "1-5",   // День праці
        "9-5",   // День перемоги
        "28-6",  // День Конституції
        "24-8",  // День Незалежності
        "14-10"  // День захисників і захисниць
    ];

    for (let month = 0; month < 12; month++) {
        let tabel = `<table><caption>${new Date(year, month).toLocaleString('uk-UA', {month:'long'})} ${year}</caption>`;
        tabel+= `<tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>НД</th></tr>`;

        let firstDay = new Date(year, month, 1);
        let startDay = convertDay(firstDay.getDay());
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let prevMonthDays = new Date(year, month, 0).getDate();

        tabel += "<tr>";

        // Дні попереднього місяця
        for (let i = 1; i < startDay; i++) {
            tabel += `<td class="inactive">${prevMonthDays - (startDay - i) + 1}</td>`;
        }

        // Дні поточного місяця
        for (let day = 1; day <= daysInMonth; day++) {
            let currentDate = new Date(year, month, day);
            let dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 0) dayOfWeek = 7;

            let classes = [];

            // вихідні
            if (dayOfWeek === 6 || dayOfWeek === 7) {
                classes.push("weekend");
            }

            // сьогодні
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                classes.push("today");
            }

            // свята
            let key = `${day}-${month+1}`;
            if (holidays.includes(key)) {
                classes.push("holiday");
                if (day === today.getDate() && month === today.getMonth()) {
                    alert("Сьогодні державне свято!");
                }
            }

            tabel += `<td class="${classes.join(" ")}">${day}</td>`;

            if (dayOfWeek === 7 && day !== daysInMonth) {
                tabel += "</tr><tr>";
            }
        }

        // Дні наступного місяця
        let lastDay = new Date(year, month + 1, 0).getDay();
        if (lastDay === 0) lastDay = 7;
        if (lastDay < 7) {
            for (let i = 1; i <= (7 - lastDay); i++) {
                tabel += `<td class="inactive">${i}</td>`;
            }
        }

        tabel += "</tr></table>";
        document.body.innerHTML += tabel;
    }
}

function convertDay(d) {
    if (d === 0) d = 7;
    return d;
}

calendar();