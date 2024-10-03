export const ON_TAP_BOUNCE_ANIMATION = {
    scale: 0.95,
    transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
    },
};

export const USERS_ROLES = ["Admin", "Basic"] as const;

export const PASSWORD_SPECIAL_CHARACTERS_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
