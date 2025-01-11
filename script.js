function calculateNight() {
    // الحصول على قيم وقت الغروب والشروق
    let sunset = document.getElementById("sunset").value;
    let sunrise = document.getElementById("sunrise").value;

    // التحقق من إدخال القيم
    if (!sunset || !sunrise) {
        alert("يرجى إدخال وقت الغروب ووقت الشروق.");
        return;
    }

    // تحويل الأوقات إلى كائنات Date
    const sunsetTime = parseTime24(sunset);
    const sunriseTime = parseTime24(sunrise);

    // إذا كان وقت الشروق أقل من وقت الغروب، نضيف يومًا
    if (sunriseTime <= sunsetTime) {
        sunriseTime.setDate(sunriseTime.getDate() + 1);
    }

    // حساب مدة الليل بالمللي ثانية
    const nightDurationMs = sunriseTime - sunsetTime;

    // تحويل المدة إلى ساعات ودقائق
    const nightHours = Math.floor(nightDurationMs / (1000 * 60 * 60));
    const nightMinutes = Math.floor((nightDurationMs % (1000 * 60 * 60)) / (1000 * 60));

    // حساب طول كل جزء من الليل
    const partDurationMs = nightDurationMs / 6;

    // إنشاء توقيت بداية كل جزء
    let parts = [];
    for (let i = 0; i < 6; i++) {
        const partStart = new Date(sunsetTime.getTime() + partDurationMs * i);
        const partTime = formatTimeAMPM(partStart); // تحويل الوقت إلى تنسيق AM/PM
        parts.push(`الجزء ${i + 1} يبدأ في: ${partTime}`);
    }

    // عرض النتائج
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <p>مدة الليل: ${nightHours} ساعة و${nightMinutes} دقيقة</p>
        <p>${parts.join("<br>")}</p>
    `;
}

// دالة لتحويل الوقت بصيغة 24 ساعة إلى كائن Date
function parseTime24(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return new Date(1970, 0, 1, hours, minutes);
}

// دالة لتحويل الوقت إلى تنسيق AM/PM
function formatTimeAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // تحويل 24 ساعة إلى 12 ساعة
    hours = hours % 12;
    if (hours === 0) {
        hours = 12; // 12 AM أو 12 PM
    }

    // إضافة صفر إلى الدقائق إذا كانت أقل من 10
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
}
