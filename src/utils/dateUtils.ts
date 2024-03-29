export const getDate = (date: Date): string => {
    const now = new Date();
    const dayDelta = (now.getTime() - date.getTime()) / 1000 / 3600 / 24;
    if (dayDelta >= 365) {
        return `${Math.ceil(dayDelta / 365)} years ago`;
    } else if (dayDelta >= 30) {
        return `${Math.ceil(dayDelta / 30.5)} months ago`;
    } else if (now.getDate() !== date.getDate()) {
        return `${Math.ceil(dayDelta)} days ago`;
    } else {
        return "today";
    }
};
