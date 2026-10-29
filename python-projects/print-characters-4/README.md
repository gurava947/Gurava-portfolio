# Print Characters - 4

## Question

Read a string and a range M to N, then print the characters whose code points fall inside that range, each followed by a space.

## Supplied Python code

```python
S = input()
M,N = int(input()),int(input())
word = ""
for i in S:
    for j in range(M,N+1):
        if (ord(i) == j):
            word += chr(j) + " "
print(word)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc in 97 to 99 | 'abc\n97\n99\n' | 'a b c \n' |
| Hello in 72 to 101 | 'Hello\n72\n101\n' | 'H e \n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_characters_4.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string and two integers.
- Output: One line of matching characters.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
