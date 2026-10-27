# Allowed to Exam

## Question

Write a program that reads a hall-ticket answer and an identification-card answer, then prints which document allows the exam.

## Supplied Python code

```python
H = input()
i = input()
if (H == "Y"):
    print("Allowed to Exam - Has Hall ticket")
elif (H != "Y"  or i == "Y"):
    print("Allowed to Exam - Has Identification Card")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hall ticket only | `'Y\nN\n'` | `'Allowed to Exam - Has Hall ticket\n'` |
| Identification card only | `'N\nY\n'` | `'Allowed to Exam - Has Identification Card\n'` |
| Neither document | `'N\nN\n'` | `'Allowed to Exam - Has Identification Card\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_allowed_to_exam.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two Y/N characters, one per line.
- Output: One of two permission messages.
- The identification-card input does not affect the result; answering N for both still prints the identification-card message.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
