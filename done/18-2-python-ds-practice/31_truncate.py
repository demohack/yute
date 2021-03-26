def truncate(phrase, n):
    """Return truncated-at-n-chars version of  phrase.
    
    If the phrase is longer than, or the same size as, n make sure it ends with '...' and is no
    longer than n.
    
        >>> truncate("Hello World", 6)
        'Hel...'
        
        >>> truncate("Problem solving is the best!", 10)
        'Problem...'
        
        >>> truncate("Yo", 100)
        'Yo'
        
    The smallest legal value of n is 3; if less, return a message:
    
        >>> truncate('Cool', 1)
        'Truncation must be at least 3 characters.'

        >>> truncate("Woah", 4)
        'W...'

        >>> truncate("Woah", 3)
        '...'
    """
    
    if n < 3:
        r = 'Truncation must be at least 3 characters.'
    else:
        np = len(phrase)
            
        if n > np:
            r = phrase
        else:

            # n, whatever : 8
            # 3, ...      : 3 - 3
            # 4, w...     : 4 - 3
            # 5, wh...    : 5 - 3
            # 6, wha...   : 6 - 3
            # 7, what...  : 7 - 3
            # 8, whate... : 8 - 3

            z = "..."
            nz = n - len(z)
            r = phrase[0:nz] + z
    
    return r

"""
Note: Colt's version produces an error for cases of n = len + 1

In [185]: truncate("1234",5)
Out[185]: '1234'

In [186]: truncate_colts("1234",5)
Out[186]: '12...'

"""