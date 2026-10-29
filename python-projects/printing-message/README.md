# Printing Message

## Question

Read a name and an age and print the sentence that describes them.

## Supplied Python code

```python
def message(arg_1, arg_2):
    print(arg_1 + " is " + str(arg_2) + " years old.")
name = input()
age = int(input())
message(name,age)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| one person | 'Guravaiah\n22\n' | 'Guravaiah is 22 years old.\n' |
| another | 'Ravi\n30\n' | 'Ravi is 30 years old.\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_printing_message.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One name then one integer.
- Output: One sentence.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
