def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    d = {}
    for a in phrase:
        if a in d:
            c = d.get(a)
            d.update({a:c+1})
        else:
            d.update({a:1})
    return d
