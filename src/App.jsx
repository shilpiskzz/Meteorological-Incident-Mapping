const applyFilters = (incidents) => {
    return incidents.filter((i) => {
        const { time, type, state, severity } = filters;

        const incidentDate = new Date(i.date);
        const today = new Date();

        const matchTime = !time || time === "all" || (
            (time === "today" && incidentDate.toDateString() === today.toDateString()) ||
            (time === "week" && incidentDate >= new Date(today - 7 * 86400000)) ||
            (time === "month" && incidentDate >= new Date(today - 30 * 86400000))
        );

        const matchType = !type || type === "all" || i.type === type;
        const matchState = !state || state === "all" || i.state === state;
        const matchSeverity = !severity || severity === "all" || i.severity === severity;

        return matchTime && matchType && matchState && matchSeverity;
    });
};

