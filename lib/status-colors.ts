export const BAGGAGE_STATUS_COLORS = {
    PRIS_EN_CHARGE: {
        bg: '#1a3a4a',
        text: '#7ac0d8',
        border: '#2a5a6a',
        icon: 'Package',
        labelFR: 'Pris en charge',
        labelEN: 'In our care',
    },
    EN_TRANSIT: {
        bg: '#3d4a1a',
        text: '#c8d888',
        border: '#5a6a2a',
        icon: 'Truck',
        labelFR: 'En transit',
        labelEN: 'In transit',
    },
    EN_LIVRAISON: {
        bg: '#1a4a1a',
        text: '#a8d878',
        border: '#3d7a18',
        icon: 'MapPin',
        labelFR: 'En livraison',
        labelEN: 'Out for delivery',
    },
    LIVRE: {
        bg: '#0f3a0f',
        text: '#a8d878',
        border: '#1a5a1a',
        icon: 'CheckCircle',
        labelFR: 'Livré',
        labelEN: 'Delivered',
    },
    INCIDENT: {
        bg: '#3a1a0a',
        text: '#e8a878',
        border: '#6a3a1a',
        icon: 'AlertTriangle',
        labelFR: 'Incident',
        labelEN: 'Issue reported',
    },
} as const;

export const BOOKING_STATUS_COLORS = {
    PENDING: {
        bg: '#3d4a1a', text: '#c8d888', border: '#5a6a2a',
        labelFR: 'En attente', labelEN: 'Pending',
    },
    CONFIRMED: {
        bg: '#1a4a1a', text: '#a8d878', border: '#3d7a18',
        labelFR: 'Confirmé', labelEN: 'Confirmed',
    },
    IN_PROGRESS: {
        bg: '#1a3a4a', text: '#7ac0d8', border: '#2a5a6a',
        labelFR: 'En cours', labelEN: 'In progress',
    },
    COMPLETED: {
        bg: '#0f3a0f', text: '#a8d878', border: '#1a5a1a',
        labelFR: 'Terminé', labelEN: 'Completed',
    },
    CANCELLED: {
        bg: '#3a1a1a', text: '#e87878', border: '#6a2a2a',
        labelFR: 'Annulé', labelEN: 'Cancelled',
    },
} as const;

export const JOB_STATUS_COLORS = {
    WAITING: {
        bg: '#3d4a1a', text: '#c8d888', border: '#5a6a2a',
        labelFR: 'En attente', labelEN: 'Waiting',
    },
    IN_PROGRESS: {
        bg: '#1a3a4a', text: '#7ac0d8', border: '#2a5a6a',
        labelFR: 'En cours', labelEN: 'In progress',
    },
    DONE: {
        bg: '#0f3a0f', text: '#a8d878', border: '#1a5a1a',
        labelFR: 'Terminé', labelEN: 'Done',
    },
    BILLED: {
        bg: '#3d4a1a', text: '#eef4cc', border: '#6b7a2a',
        labelFR: 'Facturé', labelEN: 'Billed',
    },
} as const;
