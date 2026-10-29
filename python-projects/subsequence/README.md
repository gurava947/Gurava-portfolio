# Subsequence

## Question

Read two strings and print Yes when the second appears inside the first in order, otherwise No.

## Supplied Python code

```python
M,N = input(),input()
word_index = 0
for i in M:
    if (i == N[word_index]):
        word_index += 1
        if (len(N) == word_index):
           break
if (word_index == len(N)):
    print("Yes")
else:
    print("No")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| ace inside abcdef | 'abcdef\nace\n' | 'Yes\n' |
| aec inside abcdef | 'abcdef\naec\n' | 'No\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_subsequence.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two strings.
- Output: Yes or No.
- The second string is indexed one character at a time, so an empty second string raises IndexError before anything is compared.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
