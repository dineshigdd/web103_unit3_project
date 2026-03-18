const dates = {
    formatDate: (dateString) => {
        if (!dateString) return '';

        try {
            // This ensures we only look at the '2026-04-02' part
            const dateOnly = dateString.split('T')[0]; 
            const [year, month, day] = dateOnly.split('-');
            
            // Note: Month is 0-indexed in JS (January is 0)
            const date = new Date(year, month - 1, day);
            
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return dateString;
        }
    },
    
    formatTime: async (timeString) => {
        if (!timeString) return '';

        try {
            // Split the "HH:MM:SS" string
            const [hours, minutes] = timeString.split(':');
            const date = new Date();
            date.setHours(parseInt(hours), parseInt(minutes));

            return date.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch (error) {
            console.error("Error formatting time:", error);
            return timeString; // Return raw time if it fails
        }
    },


    formatRemainingTime: async (targetDateString) => {
        if (!targetDateString) return '';

        const eventDate = new Date(targetDateString);
        const now = new Date();
        const diff = eventDate - now; // Result is in milliseconds

        if (diff <= 0) return "Event passed";

        //to convert ms to days/hours
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} remaining`;
        }
        return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    },

    // This handles the logic for hiding or styling expired events
    formatNegativeTimeRemaining: (remainingText, id) => {
        if (remainingText === "Event passed") {
            // You can use this to hide the card or dim it
            const element = document.getElementById(id);
            if (element) element.style.opacity = '0.5';
        }
    }
};
    


export default dates;