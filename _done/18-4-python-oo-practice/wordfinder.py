"""Word Finder: finds random words from a dictionary."""

from datetime import datetime

# generate random integer values
from random import seed
from random import randint

# seed random number generator
seed(datetime.now().timestamp() * 1000)

class WordFinder:
    def __init__(self, filename):
        self.filename = filename
        self.num_words = 0
        self.count = 0
        self.read_file()
    
    def read_file(self):
        f = None

        try:
            f = open(self.filename, 'r')
            self.words = self.split(f.read())
            self.num_words = len(self.words)
            print(f"{self.num_words} words read")
        finally:
            if f:
                f.close() 

    def split(self, text):
        return text.split()

    def reset(self):
        self.count = 0

    def random(self):
        self.last_rand = randint(0, self.num_words-1)
        self.last_word = self.get_words()[self.last_rand]

        print(f"# {self.count}, w {self.num_words}, r {self.last_rand}, {self.last_word}")
        self.count += 1

    def get_words(self):
        return self.words
    
    def get_num_words(self):
        return self.num_words

w = WordFinder("words.txt")
w.random()
