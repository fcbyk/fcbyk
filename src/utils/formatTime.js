// 格式化时间（微信风格）
export default (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    // 今天
    if (diffDays === 0) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    // 昨天
    else if (diffDays === 1) {
        return '昨天 ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    // 本周内
    else if (diffDays < 7) {
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        return weekdays[date.getDay()]
    }
    // 今年
    else if (date.getFullYear() === now.getFullYear()) {
        return `${date.getMonth() + 1}月${date.getDate()}日`
    }
    // 更早
    else {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    }
}
