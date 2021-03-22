def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    d = {}
    for x in nums:
        if x in d:
            d[x] = d[x] + 1
        else:
            d[x] = 1
    vp = d.items()
    x = 0
    y = 0
    mx = 0
    my = 0
    for x, y in vp:
        if y > my:
            mx = x
            my = y
        
    return mx
