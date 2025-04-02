/**
 * 格式化时间（微信风格）
 * @param timestamp 时间戳（number | string | Date）
 * @returns 格式化后的时间字符串
 */
export default (timestamp: number | string | Date): string => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid timestamp');
    }

    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const formatTime = (): string => 
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    // 今天
    if (diffDays === 0)  return formatTime();

    // 昨天
    else if (diffDays === 1) return `昨天 ${formatTime()}`;

    // 本周内（且不是昨天）
    else if (diffDays < 7 && diffDays > 1) return weekdays[date.getDay()];

    else if (date.getFullYear() === now.getFullYear()) 
        return `${date.getMonth() + 1}月${date.getDate()}日`;

    else return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    
};