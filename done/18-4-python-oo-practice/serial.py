"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start = 0):
        """init a new generator, with start value."""
        self.start = start
        self.next = start

    def __repr__(self):
        """special method used to represent a class’s objects as a string"""

        return f"<SerialGenerator start={self.start} next={self.next}>"

    def generate(self):
        """generate next number"""
        n = self.next
        print(self.next)
        self.next += 1
        return n
    
    def reset(self):
        """reset start value"""
        self.next = self.start

s = SerialGenerator(4)
s.generate()
s.generate()
