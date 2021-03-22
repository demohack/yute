from wordfinder import WordFinder

class SpecialWordFinder(WordFinder):
    def __init__(self, filename):
        super().__init__(filename)

    def split(self, text):
        words = text.split()
        special_words = []
        for w in words:
            if w.strip() and w[0] != "#":
                special_words.append(w)
        return special_words

w = SpecialWordFinder("special_words.txt")
w.random()
