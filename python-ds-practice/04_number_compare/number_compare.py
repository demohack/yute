def number_compare(a, b):
    """Report on whether a>b, b>a, or b==a

        >>> number_compare(1, 1)
        'Numbers are equal'

        >>> number_compare(-1, 1)
        'Second is greater'

        >>> number_compare(1, -2)
        'First is greater'
    """
    retval = ""

    if (a == b):
        retval = 'Numbers are equal'

    if (a < b):
        retval = 'Second is greater'

    if (a > b):
        retval = 'First is greater'

    return retval
