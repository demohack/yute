def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

        >>> flip_case('Aaaa h:hh', 'h')
        'Aaaa H:HH'
    """
    list_a_to_z = list(map(chr, range(ord('a'), ord('z')+1)))
    list_A_to_Z = list(map(chr, range(ord('A'), ord('Z')+1)))
    lam_down = lambda x: x.lower() if x.lower() == to_swap.lower() else x
    lam_up = lambda x: x.upper() if x.lower() == to_swap.lower() else x
    ltest = lambda x: lam_down(x) if x in list_A_to_Z else lam_up(x) if x in list_a_to_z else x
    return "".join(list(map(ltest, phrase)))