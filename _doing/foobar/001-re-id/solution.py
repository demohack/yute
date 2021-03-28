def solution(i):
    # i = the starting index n of Lambda's string of all primes
    # returns the next five digits in the string

    # build prime string until size of string >= i + 5
    g = gen_primes()
    l = 0
    lz = i + 5
    p0 = 0
    p1 = ""
    p2 = ""      # 2357111317192329
    while l < lz:
        p0 = next(g)
        p1 = str(p0)
        p2 = p2 + p1
        l += len(p1)
        print({'p0': p0, 'p1': p1, 'p': p2, 'l': l, 'lz': lz})

    return str(p2[i:lz])

# Sieve of Eratosthenes
# Code by David Eppstein, UC Irvine, 28 Feb 2002
# http://code.activestate.com/recipes/117119/

def gen_primes():
    """ Generate an infinite sequence of prime numbers.
    """
    D = {}
    
    # The running integer that's checked for primeness
    q = 2
    
    while True:
        if q not in D:
            # q is a new prime.
            yield q
            D[q * q] = [q]
        else:
            # q is composite. D[q] is the list of primes that
            # divide it.
            for p in D[q]:
                D.setdefault(p + q, []).append(p)
            del D[q]
        
        q += 1

