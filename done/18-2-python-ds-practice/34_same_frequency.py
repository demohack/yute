def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    f = freq(num1)
    g = freq(num2)

    for k, v in f.items():
        if v != g[k]:
            return False

    return True

def freq(num):
    f = {}
    for i in str(num):
        f[i] = f.get(i, 0) + 1
    return f

