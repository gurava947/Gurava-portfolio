# Count the Upper Case Letters

## Question

Read a sentence and print how many of its characters are uppercase.

## Supplied Python code

```python
def count_of_uppercase(word):
    count = 0
    for i in word:
       if (i.isupper()):
           count += 1
    return count
word = input()
result = count_of_uppercase(word = word)
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three capitals | 'Practice Makes Perfect\n' | '3\n' |
| none | 'hello world\n' | '0\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_count_the_upper_case_letters.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One integer.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
