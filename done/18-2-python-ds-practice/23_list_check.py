def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    t = [1 if isinstance(x, list) else 0 for x in lst]
    return len(lst) == sum(t)