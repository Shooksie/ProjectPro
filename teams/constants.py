class TeamRoleChoices:
    USER = 1
    ADMIN = 2
    OWNER = 3
    USER_DISPLAY = 'User'
    ADMIN_DISPLAY = 'Admin'
    OWNER_DISPLAY = 'Owner'
    CHOICES = ((USER, USER_DISPLAY), (ADMIN, ADMIN_DISPLAY), (OWNER, OWNER_DISPLAY))
