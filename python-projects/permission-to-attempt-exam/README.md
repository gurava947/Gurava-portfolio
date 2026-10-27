# Permission to attempt Exam

## Question

Write a program that reads an attendance value and a Y/N identification-card answer, then prints whether the exam is allowed.

## Supplied Python code

```python
A , M = input(), input()
if (int(A[:len(A)-1]) >= 75) or (M == "Y"):
    print("Allowed to write exam")
else:
    print("Cannot write exam")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 80% and no card | `'80%\nN\n'` | `'Allowed to write exam\n'` |
| 60% and a card | `'60%\nY\n'` | `'Allowed to write exam\n'` |
| 60% and no card | `'60%\nN\n'` | `'Cannot write exam\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_permission_to_attempt_exam.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Attendance with a trailing %, then Y/N.
- Output: One of two permission messages.
- The attendance input must end with a non-digit such as %; otherwise the slice removes a digit.
- A one-character attendance input slices to an empty string and raises ValueError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
