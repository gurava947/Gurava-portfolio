# Uppercase and Lowercase Letters

## Question

Read a sentence and print its uppercase letters followed by its lowercase ones.

## Supplied Python code

```python
def get_lower_and_upper_case_letters(word):
    value_1,value_2 = "",""
    for i in word:
        if (i.isupper()):
            value_1 += i
        elif (i.islower()):
            value_2 += i
    print(value_1)
    print(value_2)
word = input()
get_lower_and_upper_case_letters(word)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| mixed | 'Hello World\n' | 'HW\nelloorld\n' |
| no lowercase | 'PYTHON\n' | 'PYTHON\n\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_uppercase_and_lowercase_letters.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: Two lines.
- The two runs are collected in the order the characters appear, so the letters are regrouped rather than kept in place.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
