# Greeting Message

## Question

Write a program that reads an hour from 4 to 19 and prints the matching greeting, with "Good Night" for every other hour.

## Supplied Python code

```python
T = int(input())

if (4 <= T) and (11 >= T):
    print("Good Morning")
elif (12 <= T) and (15 >= T):
    print("Good Afternoon")
elif (16 <= T) and (19 >= T):
    print("Good Evening")
else:
    print("Good Night")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 8 is morning | `'8\n'` | `'Good Morning\n'` |
| 14 is afternoon | `'14\n'` | `'Good Afternoon\n'` |
| 18 is evening | `'18\n'` | `'Good Evening\n'` |
| 22 is night | `'22\n'` | `'Good Night\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_greeting_message.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer hour.
- Output: A greeting.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
