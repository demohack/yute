def any7(nums):
    """Are any of these numbers a 7? (True/False)"""

    is_seven = False

    # YOUR CODE HERE 
    for n in nums:
    	is_seven = is_seven or (n == 7)

    return is_seven

print("should be true", any7([1, 2, 7, 4, 5]))
print("should be false", any7([1, 2, 4, 5]))

