
//TODO: This should be fetch from the backend instead of hardcoding here. Create a new endpoint specific to this screen where you can get all
// form information needed for first load.
export const statuses = [
    { value: -1, label: "All" },
    { value: 1, label: "New" },
    { value: 2, label: "Translated" },
    { value: 3, label: "Contractor Proofed" },
    { value: 5, label: "Active" }
];
  
export const assignmentStatuses = [
    { value: -2, label: "All" },
    { value: -1, label: "Assigned" },
    { value: 0, label: "Not Assigned" },
    { value: 1, label: "Pro Translating" },
    { value: 2, label: "MLG International" }
];

export const translationTypes = [
    { value: -1, label: "All" },
    { value: 0, label: "Enterprise Translation (REG)" },
    { value: 1, label: "Professional Translation (OST, OSO)" },
    { value: 4, label: "Machine Translation (MT, MTO)" }
];

export const TATStatuses = [
    { value: -1, label: "All" },
    { value: 1, label: "Past Due" },
    { value: 2, label: "Due Today EOD" },
    { value: 3, label: "Due Tomorrow EOD" }
]

export const flags = [
    { value: -1, label: "All" },
    { value: 1, label: "Flag 1" },
    { value: 2, label: "Flag 2" },
    { value: 3, label: "Flag 3" },
    { value: 4, label: "Flag 4" }
]

export const contentTypes = [
    { value: -1, label: "All" },
    { value: 0, label: "HTML" },
    { value: 1, label: "XML" },
    { value: 2, label: "JS" },
    { value: 3, label: "CSS" },
    { value: 4, label: "JSON" },
    { value: 5, label: "AJAX" },
    { value: 6, label: "AMF" },

]

export const priorities = [
    { value: -1, label: "All" },
    { value: 1, label: "Priority 1" },
    { value: 2, label: "Priority 2" },
    { value: 3, label: "Priority 3" }
]

export const internalReviewers = [
    { value: -1, label: "All" },
    { value: 1, label: "Reviewer 1" },
    { value: 2, label: "Reviewer 2" },
    { value: 3, label: "Reviewer 3" }
]

export const requestedBy = [
    { value: -1, label: "All" },
    { value: 1, label: "User 1" },
    { value: 2, label: "User 2" },
    { value: 3, label: "User 3" }
]