const dates = {
    formatDate: (dateString) => {
        if (!dateString) return '';
        try {
            const dateOnly = dateString.split('T')[0]; 
            const [year, month, day] = dateOnly.split('-');
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    },
    
    formatTime: (timeString) => { // Removed 'async' as it's not needed here
        if (!timeString) return '';
        try {
            const [hours, minutes] = timeString.split(':');
            const date = new Date();
            date.setHours(parseInt(hours), parseInt(minutes));
            return date.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch (error) {
            return timeString;
        }
    },

    formatRemainingTime: (targetDateString) => {
        if (!targetDateString) return '';
        const eventDate = new Date(targetDateString);
        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) return "Event passed";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} remaining`;
        return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    },

    // NEW REACT-WAY METHOD: Returns a Boolean or a Class Name
    getEventStatus: (remainingText) => {
        const isPassed = remainingText === "Event passed";
        return {
            isPassed,
            className: isPassed ? "event-information event-passed" : "event-information"
        };
    }
};

export default dates;