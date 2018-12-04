

class BaseChoice:
    CHOICES = []

    @classmethod
    def convert_choices_to_dict(cls):
        temp_dict = {}
        for val in cls.CHOICES:
            temp_dict[val[0]] = val[1]

        return temp_dict


class TicketPriorityChoices(BaseChoice):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    EXTREME = 4
    LOW_DISPLAY = 'low priority'
    MEDIUM_DISPLAY = 'medium priority'
    HIGH_DISPLAY = 'high priority'
    EXTREME_DISPLAY = 'extreme priority'
    CHOICES = (
        (LOW, LOW_DISPLAY),
        (MEDIUM, MEDIUM_DISPLAY),
        (HIGH, HIGH_DISPLAY),
        (EXTREME, EXTREME_DISPLAY)
    )


class TicketState(BaseChoice):
    OPEN = 1
    IN_PROGRESS = 2
    IN_REVIEW = 3
    REVIEW_DONE = 4
    IN_TESTING = 5
    TESTING_DONE = 6
    TESTING_ISSUES = 7
    BLOCKED = 8
    PRE_RELEASE = 9
    RELEASED = 10
    OPEN_DISPLAY = 'Open'
    IN_PROGRESS_DISPLAY = 'In Progress'
    IN_REVIEW_DISPLAY = 'In Review'
    REVIEW_DONE_DISPLAY = 'Review Done'
    IN_TESTING_DISPLAY = 'In Testing'
    TESTING_DONE_DISPLAY = 'Testing Done'
    TESTING_ISSUES_DISPLAY = 'Testing Issues'
    BLOCKED_DISPLAY = 'Blocked'
    PRE_RELEASE_DISPLAY = 'Pre Release'
    RELEASED_DISPLAY = 'Released'

    STATE_PATHS = {
        OPEN: [IN_PROGRESS],
        IN_PROGRESS: [IN_REVIEW, BLOCKED],
        IN_REVIEW: [REVIEW_DONE, BLOCKED],
        REVIEW_DONE: [IN_TESTING, IN_PROGRESS, BLOCKED],
        IN_TESTING: [TESTING_DONE, TESTING_ISSUES],
        TESTING_DONE: [PRE_RELEASE],
        TESTING_ISSUES: [TESTING_DONE, IN_REVIEW],
        PRE_RELEASE: [RELEASED]
    }

    CHOICES = (
        (OPEN, OPEN_DISPLAY),
        (IN_PROGRESS, IN_PROGRESS_DISPLAY),
        (IN_REVIEW, IN_REVIEW_DISPLAY),
        (REVIEW_DONE, REVIEW_DONE_DISPLAY),
        (IN_TESTING, IN_TESTING_DISPLAY),
        (TESTING_DONE, TESTING_DONE_DISPLAY),
        (TESTING_ISSUES, TESTING_ISSUES_DISPLAY),
        (BLOCKED, BLOCKED_DISPLAY),
        (PRE_RELEASE, PRE_RELEASE_DISPLAY),
        (RELEASED, RELEASED_DISPLAY)
    )
