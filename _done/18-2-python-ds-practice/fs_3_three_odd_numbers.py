def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?"

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """
    p1 = None
    p2 = None
    for p3 in nums:
        if p1 and p2:
            s = p1 + p2 + p3
            if s % 2 != 0:
                return True
            
        p1 = p2
        p2 = p3

    return False