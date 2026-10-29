# Count of Lowercase and Uppercase Letters

## Question

Read a sentence and print the count of uppercase characters followed by the count of lowercase ones.

## Supplied Python code

```python
def countOf_lowerAndupper(S):
    upper,lower = 0, 0
    for i in S:
        if i.isupper():
            upper += 1
        elif i.islower():
            lower += 1
    print(upper)
    print(lower)
S = input()
countOf_lowerAndupper(S)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| mixed | 'Hello World\n' | '2\n8\n' |
| all uppercase | 'PYTHON\n' | '6\n0\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_count_of_lowercase_and_uppercase_letters.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: Two integers, one per line.
- Spaces and digits belong to neither count.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
