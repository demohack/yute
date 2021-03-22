def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    
    f = [1] # factors of n include 1 and n, if n >  1

    for x in range(2, num):
        if num % x == 0:
            f.append(x)

    if (num > 1):
        f.append(num)

    return f

    # other useful info
    # https://stackoverflow.com/questions/6800193/what-is-the-most-efficient-way-of-finding-all-the-factors-of-a-number-in-python
