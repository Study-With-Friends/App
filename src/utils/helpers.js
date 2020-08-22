const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const normalizeDate = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    console.log(date.getTime() + "," + today.getTime() + "," + yesterday.getTime())
    if (date.getTime() === today.getTime()) {
        return "Today";
    } else if (date.getTime() === yesterday.getTime()) {
        return "Yesterday";
    } else {
        return `${monthNames[date.getMonth()]} ${date.getDate()}${today.getFullYear() !== date.getFullYear ? ', ' + date.getFullYear() : ''}`;
    }
};