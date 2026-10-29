# Team Points

## Question

Read a team's wins, draws and losses and print its league points.

## Supplied Python code

```python
def calculate_league_points(wins, draws, losses):
    points = (wins * 4) + (draws * 2) + (losses * -1)
    return points
statistics = input().split(",")
wins = int(statistics[0])
draws = int(statistics[1])
losses = int(statistics[2])
# Call the calculate_league_points function
total_points = calculate_league_points(wins, draws, losses)
print(total_points)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| mixed record | '10,5,2\n' | '48\n' |
| all losses | '0,0,3\n' | '-3\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_team_points.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Three comma-separated integers.
- Output: One integer.
- A win is worth four points, a draw two, and a loss takes one away.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
