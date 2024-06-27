function formatMongoDBDateToIST(isoDate) {
    const date = new Date(isoDate);

    // Convert to IST and ensure 24-hour format
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'short',
        timeZone: 'Asia/Kolkata', // IST timezone
        hour12: false, // 24-hour format
    };

    const formattedDate = date.toLocaleString('en-IN', options);
    const [time, dayMonth] = formattedDate.split(',');

    return `${time.trim()} - ${dayMonth.trim()}`;
}

export default formatMongoDBDateToIST;

