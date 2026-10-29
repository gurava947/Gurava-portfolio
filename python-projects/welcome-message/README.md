# Welcome Message

## Question

Read a name and print a welcome message for it.

## Supplied Python code

```python
def say_wishes(name):
    value = "Welcome " + name
    return value
name = input()
Output = say_wishes(name)
print(Output)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| one name | 'Guravaiah\n' | 'Welcome Guravaiah\n' |
| another name | 'Practice\n' | 'Welcome Practice\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_welcome_message.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One name.
- Output: One line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
