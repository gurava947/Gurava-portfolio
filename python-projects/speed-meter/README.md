# Speed Meter

## Question

Read a speed and print whether the driving is Normal, Warning or Over Speed.

## Supplied Python code

```python
def get_speed_status(speed):
    if (speed <= 50):
        return "Normal"
    elif (speed >= 50) and (speed < 80):
        return "Warning"
    else:
        return "Over Speed"
speed = int(input())
speedMeter = get_speed_status(speed = speed)
print(speedMeter)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| normal | '40\n' | 'Normal\n' |
| at the limit | '50\n' | 'Normal\n' |
| warning | '70\n' | 'Warning\n' |
| over | '120\n' | 'Over Speed\n' |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_speed_meter.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer speed.
- Output: One status label.
- The first branch already catches every speed up to and including 50, so the `speed >= 50` test in the second branch never decides anything at exactly 50.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
