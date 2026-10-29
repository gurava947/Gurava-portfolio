# First Uppercase Letter - 2

## Question

Read a word and print its first uppercase letter.

## Supplied Python code

```python
def get_first_upper_letter(string):
    for i in string:
        if (i.isupper()):
            string = i
            break
    return string
string = input()
upper_case_character = get_first_upper_letter(string)
print(upper_case_character)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| has one | 'Practice\n' | 'P\n' |
| none present | 'python\n' | 'python\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_uppercase_letter_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: One character, or the whole word.
- When the word has no uppercase letter the break never runs and the function returns the input unchanged.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
