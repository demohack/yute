def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        25
    """

    #                       # m4 = [[1, 2, 3, 4, 5, 6],     1, 6     0, 5    
    #                       #       [4, 5, 6, 7, 8, 6],     5, 8     1, 4      
    #                       #       [7, 8, 9, 0, 1, 6],     9, 0     2, 3      
    #                       #       [6, 7, 8, 9, 0, 6],     8, 9     3, 2      
    #                       #       [5, 6, 7, 8, 9, 6],     6, 9     4, 1      
    #                       #       [4, 5, 6, 7, 8, 9]]     4, 9     5, 0      

    #                       # ny = 6    my = 3
    #                       # nx = 6    mx = 3

    #                       # m4 = [[1, 2, 3, 4, 5],        1, 5     0, 4     
    #                       #       [4, 5, 6, 7, 8],        5, 7     1, 3     
    #                       #       [7, 8, 9, 0, 1],        9        2, 2     
    #                       #       [6, 7, 8, 9, 0],        7, 9     1, 3     
    #                       #       [5, 6, 7, 8, 9]]        5, 9     0, 4     

    #                       # ny = 5    my = 2
    #                       # nx = 5    mx = 2

    #                       # m4 = [[1, 2, 3, 4],      1, 4     0, 3        
    #                       #       [4, 5, 6, 7],      5, 6     1, 2        
    #                       #       [7, 8, 9, 0],      8, 9     2, 1        
    #                       #       [6, 7, 8, 9]]      6, 9     3, 0        

    #                       # ny = 4    my = 2
    #                       # nx = 4    mx = 2

    #                       # m3 = [[1, 2, 3],          1, 3    0, 2    
    #                       #       [4, 5, 6],          5       1, 1    
    #                       #       [7, 8, 9]]          7, 9    3, 0

    #                       # ny = 3    my = 1
    #                       # nx = 3    mx = 1

    #                       # m2 = [[1, 2],             1, 2    0, 1
    #                       #       [4, 5]]             4, 5    1, 0

    #                       # ny = 2    my = 1
    #                       # nx = 2    mx = 1

    ny = len(matrix)

    sum = 0

    for iy, m in enumerate(matrix):    # rows 0, 1
        ix = ny - iy -1
        m[ix] + m[iy]

        if (iy == ix):
            sum = sum + m[ix]
        else:
            sum = sum + m[ix] + m[iy]

    return sum

m1 = [[1,   2],
      [30, 40]]

sum_up_diagonals(m1)

m2 = [[1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]]

sum_up_diagonals(m2)
