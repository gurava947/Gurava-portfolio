# Acronyms

## Question

Read a phrase and print the first letter of each word joined with dots.

## Supplied Python code

```python
S = input().split()
word = ""
for i in S:
    word = word + "." + i[0]
print(word[1:])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three words | 'International Business Machines\n' | 'I.B.M\n' |
| three words 2 | 'Object Oriented Programming\n' | 'O.O.P\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_acronyms.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One phrase.
- Output: One dotted acronym.
- Leading letters are taken as supplied, so the case of each word decides the case of its letter.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
