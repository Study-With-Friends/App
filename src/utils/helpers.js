const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const normalizeDate = (dateStr) => {
    const today = Date();
    const yesterday = Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    const date = new Date(dateStr);

    if (date.getTime() === today.getTime()) {
        return "Today";
    } else if (date.getTime() === yesterday.getTime()) {
        return "Yesterday";
    } else {
        return `${date.getDate()} ${monthNames[date.getMonth()]} ${today.getFullYear() !== date.getFullYear ? date.getFullYear() : ''}`;
    }
};