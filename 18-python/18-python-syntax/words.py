#1
for word in ["hello", "hey", "goodbye", "yo", "yes"]:
	print(word.upper())


#2
def print_upper_words(list):
	"""print each word on its own line"""
	for word in list:
		print(word.upper())


#3
def print_upper_words(list):
	for word in list:
		if word[0].lower() == "e":
			print(word.upper())

#4
def print_upper_words(list, must_start_with={}):
	for word in list:
		for msw in must_start_with:
			if word[0].lower() == msw.lower():
				print(word.upper())

