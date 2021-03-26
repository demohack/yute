def find_greater_numbers(nums):
    """Return # of times a number is followed by a greater number.

    For example, for [1, 2, 3], the answer is 3:
    - the 1 is followed by the 2 *and* the 3
    - the 2 is followed by the 3

    Examples:

        >>> find_greater_numbers([1, 2, 3])
        3

        >>> find_greater_numbers([6, 1, 2, 7])
        4

        >>> find_greater_numbers([5, 4, 3, 2, 1])
        0

        >>> find_greater_numbers([])
        0
    """
    n = 0
    p = None
    for x in nums:
        if p:
            if x > p:
                n = n + 1
        else:
            p = x
    
    if len(nums) > 2:
        n = n + find_greater_numbers(nums[1:])
    
    return n