def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    d = {}
    v = set('aeiou')
    for c in phrase.lower():
        if c in v:
            # if c in d:
            #     d[c] = d[c] + 1
            # else:
            #     d[c] = 1
            d[c] = d.get(c, 0) + 1
    return d
