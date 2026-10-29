# Count the Vowels

## Question

Read a word and print how many of its letters are lowercase vowels.

## Supplied Python code

```python
def count_the_vowels(word):
    count = 0
    for i in word:
        for j in Vowels:
            if (i == j):
               count += 1
    return count
word = input()
Vowels = "aeiou"
Total = count_the_vowels(word=word)
print(Total)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| mixed case | 'Practice\n' | '3\n' |
| all uppercase | 'AEIOU\n' | '0\n' |
| with a space | 'Hello World\n' | '3\n' |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_count_the_vowels.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: One integer.
- The vowel table is the literal aeiou, so uppercase vowels are not counted. The function reads the module-level `Vowels`, which is assigned before the call.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
