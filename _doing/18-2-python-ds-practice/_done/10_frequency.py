def frequency(lst, search_term):
    """Return frequency of term in lst.

        >>> frequency([1, 4, 3, 4, 4], 4)
        3

        >>> frequency([1, 4, 3], 7)
        0
    """
    d = {}
    for x in lst:
        if x in d:
            d[x] = d[x] + 1
        else:
            d[x] = 1
    if search_term in d:
        return d[search_term]

    return 0
