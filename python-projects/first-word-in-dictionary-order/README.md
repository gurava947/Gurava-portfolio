# First Word in Dictionary Order

## Question

Read a sentence and print its first word in dictionary order.

## Supplied Python code

```python
#s = input()
# first_word = s
# word = ""

# for i in range(len(s)):
    
#     char = s[i]
#     word += char
    
#     if (char == " " or i == len(s)-1):
#         if (word.lower() < first_word.lower()):
#             first_word = word
#         word = ""
        
# print(first_word)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc def | 'abc def\n' | '' |
| Hello world | 'Hello world\n' | '' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_word_in_dictionary_order.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string.
- Output: One word.
- Every line of the supplied snippet is commented out, so it reads nothing and prints nothing. It is preserved exactly as supplied.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
