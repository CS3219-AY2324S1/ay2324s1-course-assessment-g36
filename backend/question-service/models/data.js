const dummyQuestions = [
    {
      "id": 1,
      "title": "Reverse a String",
      "categories": ["Strings", "Algorithms"],
      "complexity": "Easy",
      "link": "https://leetcode.com/problems/reverse-string/",
      "description": "Write a function that reverses a string.\nThe input string is given as an array of characters.\n\nYou must do this by modifying the input array in-place with O(1) extra memory. "
    },
    {
      "id": 2,
      "title": "Linked List Cycle Detection",
      "categories": ["Data Structures", "Algorithms"],
      "complexity": "Easy",
      "link": "https://leetcode.com/problems/linked-list-cycle/",
      "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to.\nNote that pos is not passed as a parameter.\n\nReturn true if there is a cycle in the linked list. Otherwise, return false."
    },
    {
      "id": 3,
      "title": "Roman to Integer",
      "categories": ["Algorithms"],
      "complexity": "Easy",
      "link": "https://leetcode.com/problems/roman-to-integer/",
      "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written  as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used: \n\nI can be placed before V (5) and X (10) to make 4 and 9.\nX can be placed before L (50) and C (100) to make 40 and 90.\nC can be placed before D (500) and M (1000) to make 400 and 900.\nGiven a roman numeral, convert it to an integer."
    },
    {
      "id": 4,
      "title": "Add Binary",
      "categories": ["Bit Manipulation", "Algorithms"],
      "complexity": "Easy",
      "link": "https://leetcode.com/problems/add-binary/",
      "description": "Given two binary strings a and b, return their sum as a binary string."
    },
    {
      "id": 5,
      "title": "Fibonacci Number",
      "categories": ["Recursion", "Algorithms"],
      "complexity": "Easy",
      "link": "https://leetcode.com/problems/fibonacci-number/",
      "description": "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is, \n\nF(0) = 0, F(1) = 1\nF(n) = F(n - 1) + F(n - 2), for n > 1.\nGiven n, calculate F(n)."
    },
    {
      "id": 6,
      "title": "Implement Stack using Queues",
      "categories": ["Data Structures"],
      "complexity": "Easy",
      "link": "https://leetcode.com/problems/implement-stack-using-queues/",
      "description": "Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty)."
    },
    {
      "id": 7,
      "title": "Combine Two Tables",
      "categories": ["Databases"],
      "complexity": "Easy",
      "link": "https://leetcode.com/problems/combine-two-tables/",
      "description": "Write a solution to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead.\n\nReturn the result table in any order"
    },
    {
      "id": 8,
      "title": "Repeated DNA Sequences",
      "categories": ["Algorithms", "Bit Manipulation"],
      "complexity": "Medium",
      "link": "https://leetcode.com/problems/repeated-dna-sequences/",
      "description": "The DNA sequence is composed of a series of nucleotides abbreviated as 'A','C', 'G', and 'T'.\n\nFor example, 'ACGAATTCCG' is a DNA sequence. When studying DNA, it is useful to identify repeated sequences within the DNA.\n\nGiven a string s that represents a DNA sequence, return all the 10-letter long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order."
    },
    {
      "id": 9,
      "title": "Course Schedule",
      "categories": ["Data Structures"],
      "complexity": "Medium",
      "link": "https://leetcode.com/problems/course-schedule/",
      "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\nReturn true if you can finish all courses. Otherwise, return false. "
    },
    {
      "id": 10,
      "title": "LRU Cache Design",
      "categories": ["Data Structures"],
      "complexity": "Medium",
      "link": "https://leetcode.com/problems/lru-cache/",
      "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class:\n\nLRUCache(int capacity) Initialize the LRU cache with positive size capacity. int get(int key) Return the value of the key if the key exists, otherwise return 1.\n\nvoid put(int key, int value) Update the value of the key if the key exists. \n\nOtherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key. The functions get and put must each run in O(1) average time complexity."
    },
    {
      "id": 11,
      "title": "Zigzag Conversion",
      "categories": ["String"],
      "complexity": "Medium",
      "link": "https://leetcode.com/problems/zigzag-conversion/",
      "description": "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)\n\nP   A   H   N\nA P L S I I G\nY   I   R\nAnd then read line by line: 'PAHNAPLSIIGYIR'\n\nWrite the code that will take a string and make this conversion given a number of rows:\n\nstring convert(string s, int numRows);"
    },
    {
      "id": 14,
      "title": "Median of Two Sorted Arrays",
      "categories": ["Array"],
      "complexity": "Hard",
      "link": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n))."
    },
    {
      "id": 15,
      "title": "Sliding Window Maximum",
      "categories": ["Arrays", "Algorithms"],
      "complexity": "Hard",
      "link": "https://leetcode.com/problems/sliding-window-maximum/",
      "description": "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\n\n Return the max sliding window."
    },
    {
      "id": 15,
      "title": "Soduku Solver",
      "categories": ["Array", "Hash Table", "Backtracking", "Matrix"],
      "complexity": "Hard",
      "link": "https://leetcode.com/problems/sudoku-solver/description/",
      "description": "Write a program to solve a Sudoku puzzle by filling the empty cells.\n\nA sudoku solution must satisfy all of the following rules:\n\nEach of the digits 1-9 must occur exactly once in each row.\nEach of the digits 1-9 must occur exactly once in each column.\nEach of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.\nThe '.' character indicates empty cells."
    }
  ]

module.exports = { dummyQuestions }